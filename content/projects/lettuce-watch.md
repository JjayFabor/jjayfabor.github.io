---
title: "Lettuce Watch"
slug: "lettuce-watch"
description: "A real-time monitoring system for lettuce farms."
category: "Full-Stack Application"
status: "completed"
featured: false
date: "2023-12-19"
image: "projects/lettuce-watch.png"
link: "https://github.com/JjayFabor/LettuceRealTimeMonitoringSystem"
techStack: ["Python", "Flask", "Machine Learning (ML)", "SQLite", "Arduino", "HTML", "CSS", "JavaScript"]
---

Lettuce Watch is a real-time monitoring system for a semi-automated hydroponic
lettuce setup, built as my Computer Science thesis project at Central Philippine
University. It pairs Arduino-based sensors with a Python/Flask web application to
track growing conditions live and predict the optimal harvest window with machine
learning.

## Problem

Small-scale hydroponic growers judge plant health and harvest timing largely by
eye, and the sensor data that could guide those calls is usually scattered or
never captured at all. The goal was a single system that continuously measures the
growing environment and turns those readings into a clear, actionable view of crop
status — instead of a guess.

## Approach

Sensors wired to an Arduino microcontroller stream environmental readings to a
Flask backend, which stores them and serves a live dashboard. On top of the
collected data I trained a machine-learning model to estimate the optimal number
of growth days for the lettuce, so the dashboard doesn't just show raw numbers —
it surfaces a prediction the grower can act on.

## Key features

- Real-time monitoring of the hydroponic environment through an Arduino-integrated
  sensor setup
- A Flask web dashboard visualizing both live and historical readings
- A machine-learning model that predicts optimal lettuce growth/harvest days
- A lightweight SQLite store for the captured sensor data

## Tech stack & role

As lead programmer on the thesis team I designed and implemented the system end to
end: the Arduino C++ firmware, the Python/Flask backend and the ML model, and the
HTML/CSS/JavaScript dashboard, backed by SQLite.

## Outcome & what I learned

Lettuce Watch tied together embedded hardware, a web backend, and applied machine
learning in one project — a sensor-to-dashboard problem where the hardest part is
making messy real-world data reliable enough to act on. It's where I first combined
data collection, storage, and prediction into a single product, a pattern I've
carried into the backend and automation work I do now.
