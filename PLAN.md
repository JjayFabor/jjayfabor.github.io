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

### Phase 2 — Feature B (`portfolio-mcp`, separate repo)
- [ ] New repo: TS + `@modelcontextprotocol/sdk`, stdio server, `GITHUB_TOKEN`,
      `PORTFOLIO_DIR` write target.
- [ ] Tool `scaffold_project_from_repo` (guess-with-TODO contract, README→overview/
      features, social-image hero fallback, topics→display-name tech mapping).
- [ ] Tool `list_unshowcased_repos` (owned repos − existing Projects, minus forks/archived).

### Phase 3 — later
- [ ] Worker-injected per-project OG/meta (the SEO upgrade).
- [ ] Add `portfolio-mcp` itself as a Project (self-referential card + detail page).

## Status
- Done: design locked (14 decisions) + [CONTEXT.md](CONTEXT.md) glossary + ADRs 0001/0002.
  **Phase 0** (Markdown migration + loader) and **Phase 1** (clickable cards + detail
  pages) implemented and verified live. Nothing committed yet.
- Remaining:
  - Data: real `date`s for the two Callbox projects; confirm Portfolio Website repo
    (answered → `jjayfabor.github.io`, TODO comment can be dropped once you're happy).
  - Content: detail-page bodies are thin (seeded from the one-line description) — enrich
    them (great first dogfood job for `portfolio-mcp`: draft from each README).
  - **Phase 2**: build the `portfolio-mcp` server (separate repo).
  - **Phase 3**: Worker OG/meta; add `portfolio-mcp` as its own Project.
  - Commit when ready (currently on `main`, working tree dirty).
