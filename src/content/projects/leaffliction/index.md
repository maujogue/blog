---
title: "Diagnostiquer des feuilles malades. Computer vision et transfer learning"
description: "Un classifieur d'images qui reconnaît des maladies."
date: "07/01/2026"
repoURL: "https://github.com/Neopuyo/Leaffliction.git"
tags: ["ai", "computer vision", "transfer learning"]
draft: true
---

Une photo de feuille de pommier ou de vigne en entrée, un diagnostic en sortie : saine, ou atteinte de pourriture noire, de rouille, de tavelure, d'esca... C'est l'objectif de ce projet de computer vision, réalisé à trois dans le cadre du cursus de l'école 42.

Le défi : atteindre au moins 90 % de précision sur des images que le modèle n'a jamais vues, avec un dataset de quelques milliers d'images seulement. Pas de quoi entraîner un réseau de neurones à partir de zéro. C'est là qu'intervient le transfer learning.

## Le problème

Le dataset contient 8 classes, réparties sur deux plantes :

- **Pommier** : pourriture noire (black rot), rouille (rust), tavelure (scab), et feuilles saines
- **Vigne** : pourriture noire (black rot), esca, tache foliaire (spot), et feuilles saines

Un seul modèle doit reconnaître les 8 classes. Certaines maladies se ressemblent beaucoup à l'œil nu (la pourriture noire existe sur les deux plantes), et toutes les classes ne contiennent pas le même nombre d'images.

## Transfer Learning

Le transfer learning consiste à prendre un modèle pré-entraîné sur une certaine tâche et à le réutiliser sur une autre tâche.

Il existe différents types de modèles de base, avec différentes tailles de paramètres, selon la taille du dataset visé et le type d'appareil sur lequel il tournera.
MobileNet est un exemple de modèle mobile (edge computing), pour les plus petits appareils.
EfficientNet est plus lourd, plus compétent pour des tâches plus complexes.

Pour ce projet, on a choisi **MobileNetV4 Conv Small**, pré-entraîné sur ImageNet (via la librairie `timm`). Il est léger, s'entraîne en un temps raisonnable sans GPU dédié (CPU, ou Metal sur Mac), et largement suffisant pour notre dataset.

### Éléments d'un modèle

Un modèle est constitué :

- d'un backbone (la colonne vertébrale), qui permet d'identifier les caractéristiques (features) d'une image : bords, textures, formes, taches...
- d'une tête (head), qui permet de classifier ces features en prédictions.

Tout l'intérêt du transfer learning est là : le backbone a déjà appris à « voir » sur des millions d'images. Il suffit de lui greffer une nouvelle tête qui apprend nos 8 classes.

### Alternative ? Transfer learning vs CNN

Le transfer learning s'oppose à la réalisation en partant de zéro (from scratch) d'un CNN (Convolutional Neural Network, réseau 2D/3D, évolution du réseau de neurones « classique » en 1D, qui ne prend pas en compte les caractéristiques spatiales).

Créer un CNN demande une large quantité de données, ce qui peut amener des résultats limités en cas de petits datasets. C'est aussi bien plus lourd et long à entraîner.

## Préparer sa data : l'ETL

Le traitement d'image (ou ETL, extract/transform/load), en computer vision, consiste en plusieurs étapes :

- **analyser** : quelle distribution dans le dataset parmi les labels, quelles différences ? Cette analyse permet de définir les champs d'action pour les deux prochaines étapes.
- **augmenter** : lorsqu'on entraîne un modèle, il doit rencontrer autant d'images de chaque label, sinon il sera biaisé. Il convient donc d'augmenter artificiellement le nombre d'images en appliquant de légères modifications : crop/blur/rotate/flip/contraste...
- **transformer** : il faut uniformiser les images, pour que le réseau de neurones extraie plus efficacement les poids identifiant chaque label. On applique un masque pour enlever les zones de l'image qui ne contiennent pas d'information pertinente pour le modèle, on applique un filtre de couleur pour faire ressortir les anomalies, on enlève les ombres, on extrait les couleurs... Il existe un tas de méthodes différentes, spécifiques aux images du dataset. On s'est appuyés sur la librairie **PlantCV**, conçue justement pour l'analyse d'images de plantes.
- **séparer** : afin de tester notre modèle après entraînement, on split notre dataset (80-20, ou 90-10 si gros dataset) afin de tester le modèle sur des images jamais vues.
	- On évite ainsi de se faire piéger par l'_overfitting_ : un modèle qui ne sait identifier que ce sur quoi il s'est entraîné.

Chaque étape est un script indépendant (`Distribution.py`, `Augmentation.py`, `Transformation.py`, `Split_dataset.py`), ce qui permet de visualiser et vérifier le résultat de chacune avant de passer à la suivante.

### Le piège : transformer pareil à l'entraînement et à la prédiction

Au départ, on a voulu tout appliquer : flou gaussien, masque, région d'intérêt, pseudo-landmarks, détection d'ombres, renforcement des couleurs... Ces transformations sont très utiles pour _analyser_ une feuille, mais pour l'entraînement on n'a finalement gardé que le **renforcement des couleurs des zones malades**.

Surtout, la leçon la plus importante du projet : **une image doit être transformée exactement de la même façon à l'entraînement et à la prédiction**. Si le modèle a appris sur des images aux couleurs renforcées, et qu'on lui présente ensuite une photo brute, ses performances s'effondrent. Les deux pipelines utilisent donc la même fonction : les images d'entraînement sont transformées une fois sur disque, et les images à prédire sont transformées à la volée.

## Entraînement

L'entraînement peut être décomposé en plusieurs parties :

- **l'entraînement initial** (initial training) : le backbone est gelé, et seule la tête est entraînée sur le dataset visé, avec un learning rate relativement élevé.
- **l'affinage** (fine-tuning) : on dégèle (unfreeze) un certain nombre de couches du backbone, puis on l'entraîne sur notre dataset. Le learning rate est plus faible, pour ne pas trop modifier les poids existants du modèle.

L'entraînement comporte quelques outils importants :

- la **normalisation des images** : taille (256×256), valeurs des pixels
- la **fonction de perte** (loss) : il en existe plusieurs, on a utilisé la cross-entropy, standard pour la classification
- l'**optimiseur** (Adam, RMSprop...), qui décide de combien ajuster chaque poids à chaque étape. Adam adapte le pas de chaque paramètre selon l'historique de ses gradients.
- les **hyperparamètres** : nb_epochs, batch_size, nb_layer_unfrozen
- les **callbacks** : EarlyStopping (si pas d'amélioration pendant plusieurs epochs → stop), et la sauvegarde du meilleur modèle (checkpoint)

Notre configuration, avec PyTorch Lightning :

| | Entraînement initial | Fine-tuning |
|---|---|---|
| Optimiseur | Adam | RMSprop |
| Learning rate | 1e-4 | 1e-5 |
| Couches entraînées | tête seule | tête + 10 dernières couches |

20 % des images d'entraînement sont mises de côté pour la validation, ce qui permet de surveiller l'overfitting epoch après epoch.

## Résultats

Sur le jeu de test (des images jamais vues pendant l'entraînement), le modèle dépasse largement l'objectif de 90 % :

| Classe | Images | Correctes | Précision |
|---|---|---|---|
| Apple_Black_rot | 328 | 323 | 98,5 % |
| Apple_healthy | 328 | 327 | 99,7 % |
| Apple_rust | 328 | 325 | 99,1 % |

Le script `Predict.py` fonctionne sur une image seule (il affiche l'image d'origine, l'image transformée, la classe prédite et le niveau de confiance) ou sur un dossier entier, en calculant la précision par sous-dossier.

## Ce que j'en retiens

- **Le transfer learning est un gros raccourci.** Avec un petit dataset et sans GPU, on obtient un modèle à plus de 98 % de précision. Partir de zéro aurait demandé beaucoup plus d'effort et de puissance.
- **La data compte plus que le modèle.** L'essentiel du travail n'a pas porté sur l'architecture mais sur la préparation et l'analyse des données.
- **La cohérence entre entraînement et inférence est une obligation.** Un écart de prétraitement et le modèle ne sat plus rien faire.
- **Plus de transformations ≠ meilleur modèle.** Le backbone pré-entraîné sait déjà extraire les features, trop de prétraitement peut abtraire des informations utiles.

## Glossaire

- **Epoch** : un cycle d'entraînement. Le modèle parcourt l'entièreté du dataset et ajuste ses poids. Les images sont re-mélangées à chaque fois. La vitesse d'amélioration est rapide au début (la tête démarre avec des poids aléatoires), puis converge plus ou moins rapidement.
- **Batch** : un paquet d'images traité d'un coup. Les poids sont ajustés après chaque batch.
- **Learning rate** : la taille du pas avec lequel on ajuste les poids. Trop grand, l'entraînement diverge ; trop petit, il n'avance pas.
- **Overfitting** : le modèle apprend par cœur ses images d'entraînement au lieu de généraliser.
- **Backbone / head** : la partie du modèle qui extrait les features / celle qui les classifie.
