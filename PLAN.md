# Task: Clickable project detail pages + `portfolio-mcp` scaffolding server

Design locked via a grilling session (2026-07-25). No code written yet.
Domain terms live in [CONTEXT.md](CONTEXT.md).

## Goal
1. **Feature A** — project cards become clickable and open a full **Project Detail
   Page** (medium case-study) per project.
2. **Feature B** — a standalone MCP server (`portfolio-mcp`, its own repo) that
   **scaffolds a curated Draft** project from a GitHub repo, on demand. PRIMARY goal
   is the MCP-building skill / résumé + portfolio credential; utility is the bonus.
3. **Migration** — move project data from the hardcoded `src/data/projects.js` array
   to a **Markdown-per-project content collection** under `content/projects/`.

## Decisions (why + rejected alternative)
1. **Curated-with-assist**, not auto-publish. Owner is the source of truth; GitHub is
   only a *source* to scaffold from. Rejected full-auto (would flood the portfolio with
   forks/experiments and lose category/status/ordering/curated prose the API can't give).
2. **On-demand trigger**, not automatic-on-new-repo. The scarce input is judgment about
   which repos belong, not typing. Rejected polling/webhook auto-draft.
3. **Build a real MCP server**, not a Claude Code Skill/CLI script. Chosen *because*
   the learning/credential goal is primary; a standalone MCP is the stronger artifact
   and becomes its own portfolio project. Rejected in-repo Skill (weaker showcase).
4. **Markdown-per-project, no database.** Flat files, git-tracked (git = the DB: history,
   diffs, review, rollback; zero runtime cost). Frontmatter = card fields, body =
   case-study prose. Rejected: single big JS array (fragile MCP edits, ugly prose-in-
   strings) and JSON-per-project (prose-in-JSON clunky, not README/LLM-native). Rejected
   a database (no scale/search/multi-user need at <50 entries).
5. **Detail page = medium case-study**: header (title, status, category, date, tags,
   GitHub/Preview links) · large hero · 2–3¶ overview · key-features list · optional
   screenshots gallery · back link. Rejected lightweight (too thin to be worth a click)
   and full case-study (too much hand-writing for ~10 projects; upgrade standouts later).
6. **Slug**: explicit `slug` in frontmatter, MCP-proposed from repo name (slugified title
   for repo-less projects), **frozen after publish**; filename = slug = URL. Numeric `id`
   retired — slug is the identity/key/route param. Rejected raw-title-derived (renames
   break URLs) and pure-repo-name (repo-less Callbox projects need a slug too).
7. **Ordering**: `featured: true` floats to top, else sort by manual `date` (MCP-seeded
   from `pushed_at`) descending. Rejected explicit `order` int (renumbering pain) and
   pure-date (can't pin a favorite).
8. **Whole card is the link**; GitHub/Preview action buttons **move to the detail page**
   (can't nest links; also routes visitors through the curated story before GitHub).
   Rejected keeping buttons on the card (nested-link/a11y mess) and title-only-clickable
   (weak affordance).
9. **Images optional, graceful degrade.** Hero falls back to GitHub's per-repo social
   image (`opengraph.githubassets.com/<hash>/<owner>/<repo>`); gallery hidden if empty.
   Screenshots live in `public/projects/<slug>-*.png`. Rejected images-required (kills
   one-shot scaffolding).
10. **Scaffold contract — guess-with-TODO.** Auto-fill factual fields; the fields GitHub
    can't know (`category`, `status`) are guessed and marked `# TODO: confirm` so a wrong
    guess never silently ships. Rejected leave-blank-required (breaks one-shot feel).
    Field sources: slug/title/description/link←repo, preview←repo `homepage`, date←
    `pushed_at`, techStack←topics+language (mapped to display names), image←social-image
    fallback, overview/features←drafted from README, category/status←guessed+TODO,
    featured←false.
11. **MCP tools (v1)**: `scaffold_project_from_repo(repo)` + `list_unshowcased_repos()`
    (diffs owned repos against existing Projects, excludes forks/archived). Deferred a
    third `validate_projects` (scope creep).
12. **MCP = standalone repo** `portfolio-mcp`, TypeScript + official MCP TS SDK, **stdio**
    transport (nothing to host). Writes into the site via a `PORTFOLIO_DIR` env var.
    Rejected in-repo `mcp/` folder (weaker résumé artifact).
13. **Auth**: `GITHUB_TOKEN` env var (portable for a reusable repo; `gh auth token` to
    populate). Optional `gh` fallback later. **Git boundary**: MCP writes files ONLY —
    never `git commit/push`, never deploys. Human reviews diff → commits → `npm run deploy`.
14. **SEO/link-previews**: v1 = client-side `document.title` per project only. Deferred
    (planned) upgrade = Cloudflare Worker injects per-project `<title>`/OG tags into
    index.html via `HTMLRewriter` for `/projects/:slug`. Rejected full SSG (overkill).

### Detail-page deep-dive sections (added after Phase 1)
15. **Opt-in per-project**, not universal tabs. Detail page is a clean single scroll by
    default; a flagship project *declares* extra sections. Rejected universal (most of
    the 10 projects have no architecture/docs story → padded/empty sections).
16. **Docs link out, never re-hosted.** The portfolio curates narrative + links to the
    canonical repo/docs. Rejected mirroring docs (duplication + staleness).
17. **Anchored sections + sticky jump-nav, NOT hide-behind tabs.** Tabs hurt skim-reading,
    SPA SEO (content only renders on click), and deep-linking, and look broken with 0–1
    sections. Sections stay visible, crawlable, and give free `#anchor` deep-links.
18. **Content model = H2 headings in the single body.** `## Architecture` etc. → the page
    derives the jump-nav from the H2s (id = slugified heading); Gallery from a
    `screenshots: [...]` frontmatter array. Zero change to storage format or the MCP.
    Rejected multiple-files-per-project and structured-frontmatter-sections.

## Steps
### Phase 0 — shared data migration  ✅ DONE (built + verified, not committed)
- [x] Frontmatter schema: `title, slug, description, techStack[], status, category,
      image?, preview?, link?, featured, date` + Markdown body.
- [x] Vite `import.meta.glob('/content/projects/*.md', {eager, query:'?raw'})` loader in
      `src/data/projects.js` (js-yaml frontmatter parse; sorts featured-then-date-desc;
      undated last). Exports `projectsData`, `categories`, `getProjectBySlug` — drop-in.
      NOTE: js-yaml v4 ESM has no default export — use `import { load } from "js-yaml"`.
- [x] Migrated all **10** entries into `content/projects/<slug>.md` (real dates from
      `gh api` pushed_at). Fixed `key={project.id}` → `key={project.slug}` in the two
      consumers. `npm run build` + loader verification + lint all pass.

Open data TODOs left in the files (grep `TODO`):
- `portfolio-website.md` — dead link `github.com/JjayFabor/portfolio`; guessed this repo,
  needs confirm (vs `react-portfolio` / `Online-Portfolio`).
- `secure-file-transfer.md`, `hubspot-pipeline-sync.md` — no repo (Callbox), no `date`;
  currently sort last until real dates are set.

### Phase 1 — Feature A (clickable detail pages)  ✅ DONE (verified live, not committed)
- [x] Added `react-markdown` + `remark-gfm`.
- [x] Route `/projects/:slug` → `ProjectDetailPage`; friendly not-found → `/projects`.
- [x] `ProjectCard` is now a `<Link>` to `/projects/<slug>` with a "View details →"
      affordance; action buttons removed (they live on the detail page). Both home + list.
- [x] `ProjectDetailPage` built per the skeleton (back link, title/badge/category/date,
      full tech tags, GitHub/Preview or internal-lock, hero, Markdown body); sets
      `document.title`. Bug found + fixed: relative `image` paths 404'd on the depth-2
      route — loader now normalizes them to root-absolute (`/projects/x.svg`).
      Verified live via headless-Chromium screenshots (list, 2 detail pages, internal
      no-links case, not-found). Build + lint clean.

### Phase 1b — deep-dive sections + sticky jump-nav  ✅ DONE (verified live)
- [x] `ProjectDetailPage` derives a sticky jump-nav from the body's `## ` headings
      (anchor id = slugified heading; `scroll-mt` offset; smooth-scroll + `#hash` update;
      honors deep-link hash on load). Nav shows only when ≥2 sections exist.
- [x] Opt-in Gallery from a `screenshots: [...]` frontmatter array (loader normalizes
      those paths root-absolute too). Isolated to `ProjectDetailPage.jsx` + the loader —
      no storage/MCP change. Verified live by temporarily enriching delphi (then reverted).

### Phase 2 — Feature B (`portfolio-mcp`, separate repo)  ✅ DONE (verified, committed)
Location: `/home/jjayfabor/JjayFiles/portfolio-mcp` (own git repo, initial commit made).
- [x] Repo: TS + `@modelcontextprotocol/sdk` 1.29 over stdio; GitHub REST via native
      `fetch` (no Octokit); `GITHUB_TOKEN` auth; writes into `$PORTFOLIO_DIR`.
- [x] `scaffold_project_from_repo` — guess-with-TODO, README→overview/features,
      social-image hero fallback, topics+language→display-name mapping, prettified title,
      no-overwrite (frozen-slug) guard, never commits/deploys.
- [x] `list_unshowcased_repos` — owned repos − existing project links/slugs, minus
      forks/archived, newest-first.
- Verified: live logic (28 unshowcased found, 8 showcased correctly excluded); generated
  Markdown round-trips through js-yaml (the portfolio loader's parser); MCP stdio
  `initialize` + `tools/list` handshake advertises both tools; `tsc` clean.
- To use: wire into an MCP host (see repo README) with `PORTFOLIO_DIR` = this repo.

### Phase 3 — SEO / AEO  ✅ DONE (built + verified live over HTTP, not committed)
Superseded decision 14's deferred plan: chose **build-time prerender** over a Worker
`HTMLRewriter` because prerender puts real *body content* (not just meta) into the raw
HTML — the thing AI answer engines (ChatGPT/Perplexity/AI Overviews) and link-preview
bots read without executing JS. Zero runtime cost (static assets), no hydration (the app
still `createRoot().render()`s over the shell).
- [x] **Root cause of "jjayfabor.com not in search"**: every SEO signal pointed at
      `jjayfabor.github.io`, which is now a 404 (GitHub Pages disabled). The
      `<link rel="canonical">` → dead github.io told Google not to index jjayfabor.com.
      Fixed canonical/OG/Twitter/JSON-LD/sitemap/robots/`homepage` → `jjayfabor.com`.
- [x] Enriched Person JSON-LD (address = Iloilo City PH, alumniOf = CPU).
- [x] `scripts/prerender.mjs` (runs in `build`, before `deploy`): writes per-route static
      `index.html` for `/`, `/projects`, and every `/projects/:slug`, each with route-
      correct `<head>` (title/description/canonical/OG/Twitter) + JSON-LD
      (CreativeWork + BreadcrumbList per project; CollectionPage for the list) + a
      crawlable content shell in `#root`. Reuses the app's own react-markdown+remark-gfm
      via `renderToStaticMarkup` so project bodies can't drift from the UI. Also
      regenerates `dist/sitemap.xml` with all project URLs.
- [x] Client-side `document.title` on Home + Projects pages for SPA-nav polish.
- Verified: `npm run build` → 10 project pages + home + list; all 12 pages' JSON-LD parse;
      served over HTTP (python http.server) — `/projects/lettuce-watch/` returns 200 with
      the prerendered title/canonical/body; homepage delivers real bio text + 10 project
      links with no JS. Lint clean (0 errors).
- **User action still required** (not code): add a Google Search Console **Domain
  property** for `jjayfabor.com` (DNS TXT via Cloudflare), submit
  `https://jjayfabor.com/sitemap.xml`, and URL-Inspect → Request indexing for the home +
  a couple of project URLs.

### Phase 3b — AEO content pass  ✅ DONE (built + verified live)
- [x] Shared FAQ (`src/data/faq.js`) → visible `Faq.jsx` section on the homepage
      (answers always shown, not accordion) + baked into the prerendered shell +
      `FAQPage` JSON-LD. One source of truth so the citable Q&A can't drift.
- [x] Enriched `lettuce-watch.md` into a full case study (Problem/Approach/Key features/
      Tech stack & role/Outcome) as the template for the rest — its 5 `## ` sections also
      light up the detail page's sticky jump-nav.
- User action for AEO (not code): **Bing Webmaster Tools** (feeds ChatGPT/Copilot —
  import from Google Search Console), keep LinkedIn/GitHub bios consistent with the site,
  optionally enable Cloudflare IndexNow.

### Phase 4 — later
- [ ] Add `portfolio-mcp` itself as a Project (self-referential card + detail page).
- [ ] Enrich the remaining thin detail-page bodies using the lettuce-watch case study as
      the template (dogfood `portfolio-mcp`) — richer bodies improve both SEO and AEO,
      since the body is prerendered into the crawlable shell.

## Status
- Done: design locked (14 decisions) + [CONTEXT.md](CONTEXT.md) glossary + ADRs 0001/0002.
  **Phase 0** (Markdown migration + loader), **Phase 1** (clickable cards + detail pages),
  and **Phase 2** (the `portfolio-mcp` server) all implemented and verified.
  - Phases 0–1 committed on branch `feat/project-detail-pages` (not yet merged/deployed).
  - Phase 2 committed in the sibling repo `/home/jjayfabor/JjayFiles/portfolio-mcp`.
- Remaining:
  - Ship Phases 0–1: `git checkout main && git merge feat/project-detail-pages && npm run deploy`.
  - Data: real `date`s for the two Callbox projects; the Portfolio Website repo is
    confirmed (`jjayfabor.github.io`).
  - Content: detail-page bodies are thin — enrich them (dogfood `portfolio-mcp` to redraft
    from each README).
  - **Phase 3**: push `portfolio-mcp` to GitHub, then use it to scaffold itself as a
    Project; Worker-injected OG/meta for per-project link previews.
