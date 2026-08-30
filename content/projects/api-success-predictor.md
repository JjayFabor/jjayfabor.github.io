---
title: "API Success Predictor"
slug: "api-success-predictor"
description: "An end-to-end classification workflow that predicts API request success from request characteristics, with leakage-safe preprocessing, model comparison, and resilient raw-request inference."
category: "Learning Project"
contextLabel: "Week 3 Capstone · AI Engineering Roadmap"
status: "completed"
featured: false
date: "2026-08-30"
image: "projects/api-success-predictor.svg"
techStack: ["Python", "Pandas", "scikit-learn", "Machine Learning", "Classification"]
---

An end-to-end machine learning classification project built as my Week 3 capstone. It predicts whether an API request will succeed from its token count, latency, model, region, and retry count while keeping preprocessing, model selection, evaluation, and raw-request inference in one reproducible scikit-learn workflow.

## The problem

The project frames API request success as a binary classification task. Its dataset contains **50 observations**, balanced evenly between successful and unsuccessful requests. Each observation includes three numerical features—tokens, latency, and retries—and two categorical features—model and region.

The goal was not to claim production-ready prediction from a small dataset. It was to implement the complete workflow correctly and make every evaluation boundary explicit.

## End-to-end, leakage-safe workflow

I separated features from the target, then created an **80/20 stratified split** so the 50/50 class balance remained consistent across 40 training observations and 10 held-out observations. The split happens before preprocessing is fitted, preventing statistics from the held-out data from influencing training.

The fitted preprocessing lives inside each scikit-learn `Pipeline`:

- Numerical features use median imputation followed by standard scaling.
- Categorical features use most-frequent imputation followed by one-hot encoding.
- `handle_unknown="ignore"` allows categories not seen during training to pass through inference safely.

Keeping the `ColumnTransformer` and classifier together ensures cross-validation learns preprocessing parameters independently within each training fold and that later predictions reuse the exact fitted transformations.

## Model comparison and honest results

I compared Logistic Regression with a depth-3 Decision Tree using the same preprocessing and **5-fold cross-validation on the training set**. Logistic Regression reached **97.5% mean CV accuracy**, ahead of the Decision Tree at **95%**, so it was selected without consulting the held-out test labels.

After fitting the selected pipeline on all 40 training observations, it achieved **90% accuracy** on the 10-observation test set. The confusion matrix was:

```text
[[5, 0],
 [1, 4]]
```

That represents five true negatives, no false positives, one false negative, and four true positives. Because the held-out set contains only 10 observations, the 90% result is a demonstration of a sound evaluation workflow—not evidence of production performance or broad generalization.

## Resilient raw-request inference

The final pipeline accepts raw request-shaped records directly and applies every learned transformation before classification. I tested three inference cases, including one with a missing `latency_ms` value and an unseen `south_america` region.

Median imputation handles the missing numerical value, while unknown-category handling prevents the new region from breaking the encoder. This keeps inference behavior aligned with training and demonstrates how the pipeline responds to imperfect real-world inputs without requiring callers to reproduce preprocessing manually.

## Engineering lessons

- Fit every data-dependent transformation on training data only; preprocessing is part of the model, not a step performed before the split.
- Compare candidates under the same cross-validation procedure, then reserve the held-out set for one final evaluation.
- Treat small-sample metrics as workflow evidence rather than production claims, and report the sample size with the score.
- Package preprocessing and classification together so raw inference stays consistent, resilient, and maintainable.
