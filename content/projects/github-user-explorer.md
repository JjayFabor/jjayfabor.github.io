---
title: "GitHub User Explorer"
slug: "github-user-explorer"
description: "A Python CLI that explores GitHub user profiles and stores reliable, duplicate-free search history with defensive file and network handling."
category: "Learning Project"
contextLabel: "Week 1 Capstone · AI Engineering Roadmap"
status: "completed"
featured: false
date: "2026-08-14"
image: "projects/github-user-explorer.svg"
link: "https://github.com/JjayFabor/github-user-explorer"
techStack: ["Python", "Requests", "REST API", "JSON", "Git"]
---

A Python CLI application built as my Week 1 capstone. It integrates with the GitHub REST API, retrieves and displays user profiles, persists search history using JSON, prevents duplicate history entries, validates input, and handles missing files, malformed JSON, HTTP errors, and network failures.

## What I built

- A command-line flow for looking up and displaying GitHub user profiles
- GitHub REST API integration with explicit handling for HTTP and network failures
- JSON-backed search history that tolerates missing or malformed files
- Input validation and duplicate prevention for cleaner persisted history

## Engineering lessons

This project reinforced the importance of treating API responses as an external boundary, handling file and network failures defensively, and keeping configuration secrets out of source control with environment variables and `.gitignore`.
