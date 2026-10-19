---
title: "OpenRole Observatory"
slug: "openrole-observatory"
description: "A job-data reliability platform that preserves source evidence, tracks listing changes, and makes observation history visible."
category: "Backend System"
contextLabel: "Live demo · Backend system"
status: "ongoing"
featured: true
date: "2026-10-13"
image: "projects/openrole-observatory.png"
screenshots:
  - "projects/openrole-observatory-jobs.png"
  - "projects/openrole-observatory-detail.png"
link: "https://github.com/JjayFabor/openrole-observatory"
preview: "https://openrole-observatory.vercel.app/"
techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Next.js", "TypeScript", "Cloudflare R2", "Neon", "Render", "Vercel"]
---

OpenRole Observatory collects job listings directly from employer applicant-tracking systems and keeps the evidence behind each observation. It combines a Python ingestion pipeline, PostgreSQL history, private raw-response storage, and a public discovery interface.

I built the project to practice backend and platform engineering through a working system: integrating with external sources, validating what comes in, keeping every record traceable to its origin, making synchronization safe to re-run, and exposing clean APIs through FastAPI.

## What problem does OpenRole solve?

An employer can change or remove a listing without leaving a public record of what changed. An aggregator may also show stale information without explaining when it last checked the source.

OpenRole separates listing content from the evidence that it was observed. Job seekers can inspect a listing's source and last-observed timestamp, while operators can trace its history back to the original source response. An observation is evidence of source presence, not confirmation that an employer is hiring.

## How does ingestion work?

The initial provider is Greenhouse. Board discovery uses a public directory for candidates, then verifies each company through Greenhouse's native board metadata before registration.

The ingestion pipeline preserves the exact response bytes in private Cloudflare R2 before validating or transforming records. Valid source records become canonical job models; invalid individual records are quarantined with diagnostics rather than silently discarded.

PostgreSQL stores job identities, immutable versions, source observations, raw-snapshot metadata, and pipeline runs. Each version remains traceable through its observation and run to the raw response.

## What did I implement?

- Source discovery, HTTP acquisition, provider validation, and canonical mapping with explicit boundaries
- Deterministic content hashes and idempotent ingestion: unchanged content refreshes observations without creating duplicate jobs or unnecessary versions
- Immutable version history and field-level change events when canonical content changes
- Conservative absence and reappearance tracking, with source failures never treated as job removals
- PostgreSQL advisory locks and transaction boundaries for reliable synchronization
- An internal dashboard for source health, runs, quarantines, listing history, and guarded manual sync
- Public job search, filters, pagination, safe descriptions, source freshness, and recent listing changes

## Architecture and deployment

The backend is a modular monolith built with FastAPI, Pydantic, SQLAlchemy, and PostgreSQL. Alembic manages schema migrations, and an object-storage interface keeps Cloudflare R2 details outside the ingestion domain. Stored fixtures, unit tests, and PostgreSQL integration tests cover transformation, persistence, and pipeline behavior.

The Next.js frontend runs on Vercel, the FastAPI service runs on Render, and Neon hosts PostgreSQL. Public reads are separate from administrative routes, which require an operator credential. Raw responses remain private in R2.

## Current status

The public demo is live. An initial production ingestion on 13 October 2026 registered and synchronized 25 Greenhouse boards and created 1,281 listings, with no failed runs or quarantined records. Public discovery and job detail were verified against the resulting data, and a raw-response readback matched its persisted checksum.

Development continues. The pipeline can discover and synchronize sources, but the production six-hour scheduler is not yet configured. Greenhouse is the only implemented provider; the project does not claim complete employer coverage or a freshness guarantee.

## What I learned

The most useful distinction was between identity, content, and observation. A repeated source check should add evidence, not duplicate a job or rewrite its history. Keeping raw data, canonical records, and operational outcomes separate makes replay, debugging, and change detection easier to understand.

I also learned to model failure conservatively. A network error, invalid record, or failed source run is an operational fact—not evidence that an employer removed a listing. Explicit lineage and transaction boundaries keep those meanings separate.
