# Build a standalone MCP server to scaffold portfolio projects

We add projects to this curated portfolio only a handful of times a year, so on pure
utility grounds an in-repo Claude Code Skill or a small script would be enough. We are
instead building a **standalone `portfolio-mcp` server** (TypeScript, MCP SDK, stdio
transport, `GITHUB_TOKEN` auth) that scaffolds a Draft project from a GitHub repo. The
reason is that the **primary goal is gaining and demonstrating the MCP-building
competency** (a résumé / portfolio credential); the scaffolding utility is a secondary
benefit, and the server doubles as its own portfolio project.

## Considered options

- **In-repo Claude Code Skill (`SKILL.md`)** — zero new infrastructure and reuses the
  tool already running, but it's a weak showcase and earns no "I built an MCP" credential.
- **Plain CLI script** — deterministic field-copying with no AI assist; you still hand-write
  every description.
- **Standalone MCP server** — chosen. Portable, reusable by others, and a genuine artifact.

## Consequences

More moving parts than utility alone justifies: a second repo, an install step, and a
`PORTFOLIO_DIR` env var so the server knows where to write. This cost is accepted because
the learning goal *is* the point. The server never commits or deploys — it only writes
Draft files; the human reviews the diff, commits, and runs `npm run deploy`.
