---
title: "Leaffliction"
description: "Let's identify some diseased leaves"
date: "07/01/2026"
repoURL: "https://github.com/Neopuyo/Leaffliction.git"
tags: ["ai", "computer vision", "transfer learning"]
draft: false
---

## Transfer Learning
Le transfer learning consiste à utiliser un modèle pré-entrainé sur une certaine tache et de le réutiliser sur une autre tache. 
Il existe différents type de modèle de base, de différentes tailles de paramètres, selon la taille du dataset visé et le type d'appareil sur lequel il tournera. 
MobileNet est un exemple de modèle mobile (edge computing), pour les plus petits appareils.
EfficientNet est plus lourd, plus compétent pour des taches plus complexes.
### Éléments d'un modèle
Un modèle est constitué :
- d'un backbone (la colonne vertébrale), qui permet d'identifier les caractéristiques (features) d'une image. 
- d'une tête (head), qui permet de classifier ces features en prédictions.

### Alternative ? Transfer learning vs CNN 
Le transfer learning s'oppose à la réalisation en partant de zéro (from scratch) d'un CNN (Convolutional Neural Network - 2/3D, évolution du Neural Network - 1D, qui ne prends pas en compte les caractéristiques spaciales).
Créer un CNN demande une large quantité de matière, ce qui peut amener des résultats limités en cas de petits datasets. C'est aussi bien plus lourd et long à entrainer.

### Préparer sa data : l'ETL
Le traitement d'image (ou ETL, extract/transform/load), en computer vision, consiste en plusieurs étapes : 
- analyser : quelle distribution dans le dataset parmi les labels, quelles différences?  Cette analyse nous permettra de définir les champs d'action pour les deux prochaines étapes.
- augmenter: lorsqu'on entraine un modèle, il doit rencontrer autant d'images de chaque label, sinon il sera biaisé. Il convient donc d'augmenter artificiellement le nombre d'image en appliquant de légères modification : crop/blur/rotate/flip...
- transformer: il faut uniformiser les images, pour que le réseau de neurone extrait plus efficacement les poids identifiant chaque label. On applique un masque pour enlever les champs de l'image qui ne contiennent pas d'information pertinentes au modèle, on applique un filtre de couleur pour faire ressortir les anomalies, on enlève les ombres, on extrait les couleurs... Il existe un tas de méthodes différentes spécifiques aux images du dataset.
- séparer : afin de tester notre modèle après entrainement, on split notre dataset (80-20 ou 90-10 si gros dataset) afin de tester le modèle sur des images jamais vues
	- -> on évite ainsi le phénomène de 'overfitting' : un modèle qui ne sait identifier que ce sur quoi il s'est entrainé.

### Entrainement
L'entrainement peut être décomposé en plusieurs parties :
- l'entrainement initial (initial training) : la tête est créée sur le dataset visé, avec un learning rate rapide.
- l'affinage (fine-tuning): qui consiste à dégeler (unfreeze) un certain nombre de couches du backbone, puis de l'entrainer sur notre dataset. La vitesse d'apprentissage (learning rate) est plus courte pour ne pas trop modifier les poids existants du modèle.

L'entrainement comporte quelques outils importants :
- la normalisation des images : taille
- le calcul de la perte (loss) il en existe plusieurs (cross_entropy...)
- l'optimisateur de vitesse d'apprentissage (learning rate optimiser), (adam...) 
	- plus la perte est grande, plus le lr est grand, et inversement
- Les différents paramêtres : nb_epochs, batch_size, nb_layer_unfrozen
- Les différents optimiseurs : EarlyStop (si pas d'amélioration pendant plusieurs epochs -> stop)

Glossaire :
-Epoch : un cycle d'entrainement. Le modèle parcourt l'entièreté du dataset et ajuste ses poids. Les images sont re-mélangées à chaque fois. La vitesse d'amélioration est rapide au début (les poids initiaux sont la plupart du temps aléatoires), puis converge plus ou moins rapidement.
