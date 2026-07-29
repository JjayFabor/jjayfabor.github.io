---
title: "SwiftBidder"
slug: "swiftbidder"
description: "A real-time auction platform where bids update live across every connected browser."
category: "Full-Stack Application"
status: "ongoing"
featured: false
date: "2026-05-26"
image: "projects/swiftbidder.png"
screenshots:
  - "projects/swiftbidder-dark.png"
  - "projects/swiftbidder-login.png"
link: "https://github.com/JjayFabor/swift-bidder"
preview: "https://swift-bidder.jjayfabor.com"
techStack: ["Laravel", "PHP", "React", "InertiaJS", "TailwindCSS", "PostgreSQL", "Pusher", "Docker"]
---

SwiftBidder is a real-time auction platform built with Laravel 12 and React over
Inertia. Admins list items with a start and end window; bidders browse what's open
and place bids that appear instantly in every other connected browser, without a
refresh.

## Problem

An auction is only fair if everyone is looking at the same number at the same time.
The moment one bidder's screen is stale, they're bidding against a price that no
longer exists. A page that only updates on reload turns a live auction into a
guessing game — so the interesting problem here wasn't the CRUD around auctions, it
was keeping every viewer honest about the current price and making the bidding rules
hard to get around.

## Approach

Each auction gets its own broadcast channel. When a bid is accepted the server emits
a `BidPlaced` event over Pusher, and every client watching that auction updates its
current price and bid history in place. The bidder who placed it doesn't get their
own event echoed back — the UI already reflects it.

Auction state is derived rather than stored. Instead of a scheduled job flipping
rows between *pending*, *active* and *closed*, the status is computed from the
auction's own start and end times whenever it's read. That removes a whole class of
bug: there's no window where the database disagrees with the clock, and no cron job
to keep alive for the app to be correct.

## Key features

- Live bid updates broadcast over WebSockets — no polling, no manual refresh
- Bid history showing recent bids and the current winner, updating in real time
- Server-side bid rules: a bid must beat the current price, and you can't outbid
  yourself
- Auction lifecycle (pending → active → closed) derived from time windows
- Role-based access separating auction administration from bidding
- Multi-image uploads served from S3-compatible object storage
- Registration with emailed OTP verification
- Light and dark themes across the whole interface

## Tech stack & role

I built this solo, end to end. Laravel 12 and PostgreSQL on the backend, React with
Inertia and TailwindCSS on the front, Pusher for the real-time layer, and Cloudflare
R2 for uploaded images. It ships as a multi-stage Docker image — Vite builds the
assets, then nginx and PHP-FPM serve them — deployed on Render behind a managed
Postgres instance.

## Outcome & what I learned

The live demo runs on seeded data with public demo accounts, so anyone can sign in
as an admin or as one of several bidders and watch prices move between two browser
windows.

The lesson that stuck was about derived state. My first instinct was a scheduled
command marking auctions active or closed on a timer, which meant the app was only
correct as often as the scheduler ran — and quietly wrong in between. Computing the
status from the timestamps instead made a moving part disappear entirely. Deploying
it taught the same lesson from the other direction: uploads written to a container's
own disk vanish on every deploy, which is only obvious once it happens to you.
