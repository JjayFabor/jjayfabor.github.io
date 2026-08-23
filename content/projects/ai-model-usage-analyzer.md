---
title: "AI Model Usage Analyzer"
slug: "ai-model-usage-analyzer"
description: "A Python data pipeline that cleans, validates, and analyzes messy AI model API usage logs, flags IQR outliers, and exports analysis-ready results."
category: "Learning Project"
contextLabel: "Week 2 Capstone · AI Engineering Roadmap"
status: "completed"
featured: false
date: "2026-08-23"
image: "projects/ai-model-usage-analyzer.svg"
link: "https://github.com/JjayFabor/ai-model-usage-analyzer"
techStack: ["Python", "Pandas", "NumPy", "CSV", "JSON", "Git"]
---

A Python data pipeline built as my Week 2 capstone. It transforms messy AI model API usage logs into analysis-ready data by cleaning and validating records, flagging unusual token usage, calculating overall and per-model metrics, and exporting clean CSV data and JSON summaries.

## What I built

- CSV ingestion and dataset inspection for shape, data types, missing values, duplicates, and descriptive statistics
- A cleaning pipeline that normalizes model names, imputes missing token counts with the median, removes rows with missing latency and duplicate records, and enforces positive token and latency values
- IQR-based token outlier detection that flags unusual observations for review instead of automatically removing them
- Overall and per-model metrics for requests, token consumption, latency, and success rate, with cleaned CSV and JSON summary exports

## Engineering lessons

This project reinforced that data quality has to come before analytics. Domain validation answers whether a measurement is valid, while statistical anomaly detection identifies observations that are merely unusual; keeping those decisions separate prevents legitimate workloads from being discarded. Separating processing, reporting, and export responsibilities also made the pipeline easier to understand and maintain.
