# Task: Palette + font swap → dark slate / cyan (supersedes navy/indigo rebrand)

## Goal
Colors and fonts ONLY. No layout, structure, or content changes. Resume-style
layout stays exactly as is.

## Palette (user-specified, single dark theme)
- bg `#0F1117` (hsl 225 21% 7%) · surface `#1C1E26` (hsl 228 15% 13%)
- border `#252836` (hsl 229 19% 18%) · accent `#06B6D4` (hsl 189 95% 43%)
- accent-hover `#22D3EE` (hsl 188 86% 53%) · text `#E2E8F0` (hsl 214 32% 91%)
- text-muted `#64748B` (hsl 215 16% 47%)

## Fonts
- Inter 400/500/600 → body AND headings (Space Grotesk removed).
- JetBrains Mono → tech/skill tags at 11px.

## Steps
1. tailwind.config.js — brand tokens → { bg, surface, border, accent, accent-hover,
   text, muted }; fontFamily: sans=Inter, mono=JetBrains Mono; drop `display`.
2. index.html — swap Google Fonts import (remove Space Grotesk; add JetBrains Mono);
   theme-color → #0F1117. All other meta untouched.
3. src/index.css — :root AND .dark get the same new palette (spec has no light
   variants); remove the h1–h6 Space Grotesk rule.
4. Monogram.jsx + public/favicon.svg — Jj mark recolored: #1C1E26 square,
   J #06B6D4, j #E2E8F0, Inter 600. Same size/placement (nav structure untouched).
5. Component color-class sweep (no markup changes): App, Bio, ResumeSection, About,
   Experience, TechStack, Projects, ProjectCard, Footer, Contact, LightSwitch.
   Tags → bg accent/10, text accent, font-mono 11px. Links → accent, hover accent-hover.
6. Verify: build, screenshots (both toggle states + mobile), lint.

## Decisions
- Spec defines ONE dark palette; site has a light/dark toggle. Applied the palette
  to both :root and .dark so both states render the specified design. Consequence:
  the toggle is now visually inert (still functional). Flag to user; options are
  removing the toggle or deriving a light variant (both out of scope here).
- No #0f172a occurrences exist (replaced with #1A1040 in prior rebrand); took the
  CSS-variable path per spec.
- Buttons/badges on cyan use #0F1117 text (white on #06B6D4 fails contrast).
- Pre-existing ThemeContext localStorage bug (reads `darkMode`, writes `theme`)
  still NOT fixed — out of scope, reported to user previously.

## Follow-up: "theme toggle not working" (debugged + fixed)
- Symptom: clicking the toggle changed nothing on the page; choice also lost on reload.
- Root causes (evidence via instrumented headless-browser click test):
  1. Both theme states had identical palette values (by design of the single-palette
     spec) → toggle was visually inert even though the `dark` class flipped correctly.
  2. Pre-existing: ThemeContext wrote localStorage key `theme` but read `darkMode`
     on init → saved state never restored.
- Fix (user chose "add a light theme"):
  1. brand.* tokens now resolve via CSS variables (`rgb(var(--brand-*))`) — :root
     holds a derived light variant (bg #F8FAFC, surface #FFF, border #E2E8F0,
     accent cyan-700 #0E7490 for AA contrast on white, hover #0891B2, text #0F1117,
     muted #64748B); .dark holds the user's exact spec palette. shadcn vars updated
     to match. ProjectCard hover glow now uses var-based color.
  2. ThemeContext init now reads `theme` (same key the effect writes).
- Verified live: click test shows body bg flipping #F8FAFC ↔ #0F1117; state persists
  across reload; both themes + mobile screenshot-checked; build + lint clean.

## Follow-up: favicon
- favicon.svg already carries the new Jj mark (dark surface square + cyan J + light j);
  single mark for both browser themes (self-contained background — no adaptive variant).
- Regenerated the stale public/favicon.ico (old pre-rebrand icon) from favicon.svg:
  16/32/48px PNG-in-ICO via headless Chromium. Gotcha: file:// subresources are
  blocked from setContent() pages — must page.goto() the SVG directly or captures
  are transparent blanks. Verified by extracting and viewing the embedded PNGs.
- Old favicon.ico recoverable from git history if ever needed.

## Status
- Done: all steps 1–6. Verified live: `npm run build` clean; `vite preview` +
  headless-Chromium screenshots of both toggle states (render identically, as
  intended) and 390px mobile; favicon render checked. Lint: 0 errors
  (2 pre-existing warnings in untouched shadcn ui/ files).
- Remaining: nothing. Not committed/deployed (user to review first).
- Open question for user: theme toggle is now visually inert (single dark palette
  in both states). Options: remove the toggle, or derive a light variant.
