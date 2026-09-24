---
title: "SecondTrip"
slug: "secondtrip"
description: "Callback and rework analytics that turns service-job history into explainable repeat-visit signals for human review."
category: "Full-Stack Application"
contextLabel: "Live private beta · Solo product build"
status: "ongoing"
featured: true
date: "2026-09-24"
image: "projects/secondtrip.png"
screenshots:
  - "projects/secondtrip-workflow.png"
  - "projects/secondtrip-private-beta.png"
preview: "https://secondtrip.jjayfabor.com/"
techStack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Python", "SQLAlchemy", "Neon", "Cloudflare R2", "Resend", "Vercel", "Render"]
---

SecondTrip is a multi-tenant callback and rework analytics product that turns service-job history into possible repeat visits, explains the signals behind each match, and records the manager's decision as ground truth. It is an intelligence layer for an existing CRM or field-service system—not a replacement for one.

## What problem does SecondTrip solve?

SecondTrip makes repeat visits in service-job history reviewable instead of leaving them hidden across thousands of records. A callback may appear as a warranty visit, an incomplete repair, a recurring fault, or a second invoice with different wording, so a simple report rarely captures the complete pattern.

The product narrows that history to credible job pairs while keeping uncertainty visible. It helps a manager investigate likely callbacks and rework without pretending that every surfaced pair is a confirmed failure.

## How does SecondTrip work?

SecondTrip takes a CSV from an existing service system through a deliberate import, detection, evidence, and review workflow. A user maps source columns, previews normalized records, resolves validation problems, and then commits the import.

Candidate generation compares jobs inside bounded customer, equipment, location, and time windows rather than performing an unbounded all-to-all search. Deterministic signals then contribute to a visible score: the interface shows both visits, each signal outcome, its arithmetic contribution, and evidence that did not match or could not be evaluated.

A manager confirms, rejects, or marks the pair uncertain. Reclassification creates a new review while preserving the earlier decision in append-only history, so the human audit trail remains visible when rules or scores change.

## Why deterministic scoring instead of AI?

SecondTrip uses deterministic scoring because V1 needs evidence that operators can inspect and challenge, not a black-box verdict. There is no AI provider, LLM call, embedding pipeline, or vector database in the current product.

The detector's score is only a prompt to review. The manager's judgment—not the score—is the ground truth. Keeping derived candidates separate from human-confirmed reviews also means detection can be recomputed as rules improve without overwriting the decisions people already made.

## What did I build?

I built SecondTrip solo across the product, frontend, backend, data model, infrastructure, and operational documentation. The implemented workflow includes:

- Multi-tenant workspaces with role-aware access
- CSV upload, column mapping, profiling, validation, and normalized import
- Blocked candidate generation and explainable deterministic scoring
- A review queue with evidence detail, confirmation, rejection, uncertainty, and reclassification
- Append-only review history that preserves the score shown when a decision was made
- FastAPI authentication using revocable opaque sessions in secure httpOnly cookies
- Transactional verification, reset, invitation, and security email through Resend

The frontend uses Next.js and TypeScript. FastAPI, Python, SQLAlchemy, and PostgreSQL provide the application and data layer.

## How is SecondTrip designed for production?

SecondTrip is designed as a KISS modular monolith with clear tenant and data boundaries. Every tenant-owned PostgreSQL table is protected by row-level security, and the application connects through a non-owner role so those policies remain enforceable.

PostgreSQL also acts as the durable job queue, avoiding Redis, Celery, and another operational dependency before scale requires them. Source CSVs and generated reports use private Cloudflare R2 objects with short-lived signed access. Neon hosts PostgreSQL, the Next.js frontend runs on Vercel, and the FastAPI service and in-process worker run on Render.

The architecture separates immutable source evidence, normalized operational records, rebuildable analytical results, and human-confirmed truth. That boundary allows candidates and signals to be regenerated without machine-writing or erasing manager decisions.

## What is the current release status?

SecondTrip is a live private beta restricted to fictional or properly anonymized data. It is deployed and usable for portfolio demonstration, but it is not approved for unrestricted production use or real customer personal data.

The remaining launch gates include full credentialed storage and email workflow tests, production observability, recovery drills, privacy operations, legal approval, and broader end-to-end validation. Billing is intentionally disabled, and the private beta is free while the product and operating controls mature.

## What I learned

The main lesson was to model certainty honestly. A detector can rank evidence, but it should not silently promote a probability into business truth. Preserving the arithmetic, contradictory evidence, rule version, and human review together makes the system easier to audit and safer to evolve.

I also learned that simple infrastructure can still be production-minded. A modular monolith, PostgreSQL-backed queue, private object storage, and explicit deployment gates keep the system understandable while leaving clear triggers for splitting services only when measured load justifies it.
