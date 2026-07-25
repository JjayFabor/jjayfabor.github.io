# Markdown-per-project content collection instead of a database

Projects are a curated set that tops out around 50 entries and changes rarely. We store
each Project as a **Markdown file** (`content/projects/<slug>.md`: YAML frontmatter for the
card fields + a Markdown body for the case-study write-up), loaded at build time via Vite
`import.meta.glob`, rather than in a database. Git gives us the versioning, diff review, and
rollback a curated portfolio actually wants, at zero runtime cost — and Markdown is the
format both a README and an LLM speak natively, which is exactly what the scaffolding MCP
produces.

## Considered options

- **Single JS array (`src/data/projects.js`)** — the status quo; fragile for tool-driven
  edits (splicing objects into shared JS) and miserable for long prose in string literals.
- **JSON-per-project** — clean per-file writes, but prose-in-JSON is clunky and it isn't the
  format a README or an LLM naturally emits.
- **A database (D1/KV)** — no scale, server-side search, or multi-user-write need exists at
  <50 entries; it would only *remove* git's history/review and add a runtime query path.
- **Markdown-per-project** — chosen.

## Consequences

Adds a small Markdown-render dependency (`react-markdown` + `remark-gfm`) and a one-time
migration of the existing entries out of the JS array. A loader module rebuilds the same
`projectsData` / `categories` exports the app already imports, so consumers barely change.
The MCP writes exactly one new file per Draft.
