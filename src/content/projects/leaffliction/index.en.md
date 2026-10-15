---
title: "Diagnosing diseased leaves. Computer vision and transfer learning"
description: "An image classifier that recognises diseases."
date: "07/01/2026"
repoURL: "https://github.com/Neopuyo/Leaffliction.git"
tags: ["ai", "computer vision", "transfer learning"]
draft: false
lang: en
aiTranslated: true
---

A photo of an apple or grape leaf goes in, a diagnosis comes out: healthy, or affected by black rot, rust, scab, esca... That's the goal of this computer vision project, built by a team of three as part of the 42 school curriculum.

The challenge: reach at least 90% accuracy on images the model has never seen, with a dataset of only a few thousand images. Not nearly enough to train a neural network from scratch. That's where transfer learning comes in.

## The problem

The dataset has 8 classes, split across two plants:

- **Apple**: black rot, rust, scab, and healthy leaves
- **Grape**: black rot, esca, leaf spot, and healthy leaves

A single model has to recognise all 8 classes. Some diseases look very similar to the naked eye (black rot exists on both plants), and the classes don't all contain the same number of images.

## Transfer Learning

Transfer learning means taking a model pre-trained on one task and reusing it on another task.

There are different kinds of base models, with different parameter sizes, depending on the size of the target dataset and the type of device it will run on.
MobileNet is an example of a mobile model (edge computing), for the smallest devices.
EfficientNet is heavier, and better at more complex tasks.

For this project we chose **MobileNetV4 Conv Small**, pre-trained on ImageNet (via the `timm` library). It's lightweight, trains in a reasonable time without a dedicated GPU (CPU, or Metal on a Mac), and is more than enough for our dataset.

### Parts of a model

A model is made of:

- a backbone, which identifies the features of an image: edges, textures, shapes, spots...
- a head, which classifies those features into predictions.

That's the whole point of transfer learning: the backbone has already learned to "see" from millions of images. We just attach a new head that learns our 8 classes.

### Alternative? Transfer learning vs CNN

Transfer learning is the opposite of building a CNN from scratch (Convolutional Neural Network, a 2D/3D network, an evolution of the "classic" 1D neural network, which doesn't take spatial features into account).

Building a CNN takes a large amount of data, which can lead to limited results with small datasets. It's also much heavier and slower to train.

## Preparing the data: ETL

Image processing (or ETL, extract/transform/load) in computer vision has several steps:

- **analyse**: how is the dataset distributed across labels, what are the differences? This analysis defines what to act on in the next two steps.
- **augment**: when training a model, it must see as many images of each label, otherwise it will be biased. So we artificially increase the number of images by applying slight changes: crop/blur/rotate/flip/contrast...
- **transform**: images need to be made uniform, so the neural network more efficiently extracts the weights that identify each label. We apply a mask to remove the parts of the image that contain no information relevant to the model, apply a colour filter to bring out anomalies, remove shadows, extract colours... There are plenty of different methods specific to the dataset's images. We relied on **PlantCV**, a library designed precisely for analysing plant images.
- **split**: to test our model after training, we split the dataset (80-20, or 90-10 for a large dataset) so we can test the model on images it has never seen.
	- This keeps us from being fooled by _overfitting_: a model that can only identify what it was trained on.

Each step is its own script (`Distribution.py`, `Augmentation.py`, `Transformation.py`, `Split_dataset.py`), so we could visualise and check the output of each one before moving on.

### The trap: transform the same way for training and prediction

At first we wanted to apply everything: Gaussian blur, mask, region of interest, pseudo-landmarks, shadow detection, colour enhancement... These transformations are very useful for _analysing_ a leaf, but for training we ended up keeping only the **enhancement of diseased-area colours**.

Above all, the most important lesson of the project: **an image must be transformed exactly the same way during training and prediction**. If the model learned on colour-enhanced images and is then shown a raw photo, its performance collapses. So both pipelines use the same function: training images are transformed once on disk, and images to predict are transformed on the fly.

## Training

Training can be broken down into several parts:

- **initial training**: the backbone is frozen and only the head is trained on the target dataset, with a relatively high learning rate.
- **fine-tuning**: we unfreeze a number of the backbone's layers, then train it on our dataset. The learning rate is lower so the model's existing weights don't change too much.

Training relies on a few important tools:

- **image normalisation**: size (256×256), pixel values
- the **loss function**: there are several, we used cross-entropy, the standard for classification
- the **optimiser** (Adam, RMSprop...), which decides how much to adjust each weight at each step. Adam adapts each parameter's step size based on the history of its gradients.
- the **hyperparameters**: nb_epochs, batch_size, nb_layer_unfrozen
- the **callbacks**: EarlyStopping (no improvement for several epochs → stop), and saving the best model (checkpoint)

Our setup, with PyTorch Lightning:

| | Initial training | Fine-tuning |
|---|---|---|
| Optimiser | Adam | RMSprop |
| Learning rate | 1e-4 | 1e-5 |
| Trained layers | head only | head + last 10 layers |

20% of the training images are held out for validation, which lets us watch for overfitting epoch after epoch.

## Results

On the test set (images never seen during training), the model comfortably beats the 90% target:

| Class | Images | Correct | Accuracy |
|---|---|---|---|
| Apple_Black_rot | 328 | 323 | 98.5% |
| Apple_healthy | 328 | 327 | 99.7% |
| Apple_rust | 328 | 325 | 99.1% |

The `Predict.py` script works on a single image (it shows the original image, the transformed image, the predicted class and the confidence level) or on a whole folder, computing accuracy per subfolder.

## What I take away from it

- **Transfer learning is a huge shortcut.** With a small dataset and no GPU, we get a model with over 98% accuracy. Starting from scratch would never have got us there.
- **Data matters more than the model.** Most of the work went into analysing, balancing and transforming images, not into the architecture.
- **Consistency between training and inference is non-negotiable.** A mismatch in preprocessing is enough to ruin a good model.
- **More transformations ≠ a better model.** The pre-trained backbone already knows how to extract features; too much preprocessing can strip away useful information.

## Glossary

- **Epoch**: one training cycle. The model goes through the entire dataset and adjusts its weights. The images are reshuffled each time. Improvement is fast at first (the head starts with random weights), then converges more or less quickly.
- **Batch**: a bundle of images processed at once. The weights are adjusted after each batch.
- **Learning rate**: the step size used to adjust the weights. Too big and training diverges; too small and it doesn't progress.
- **Overfitting**: the model memorises its training images instead of generalising.
- **Backbone / head**: the part of the model that extracts features / the part that classifies them.
