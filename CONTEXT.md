# Portfolio

The public portfolio site for Jjay Fabor. This context covers how projects are
modelled, curated, and displayed.

## Language

**Project**:
A curated portfolio entry that the owner has chosen to showcase. It may or may not
correspond to a GitHub repository (some are internal company work with no public repo).
The owner is the source of truth for a Project's content.
_Avoid_: Repo, Repository (a Project is not the same thing as its source repo)

**Repository**:
A GitHub repo. A possible *source* the tooling can scaffold a Project from — never
automatically a Project on its own.
_Avoid_: Project (see above)

**Project Detail Page**:
The full-page view of a single Project, reached by clicking its card. Holds the
medium case-study content: hero/screenshots, an overview, key features, tech stack
with context, and links. Richer than the card, which is only a summary.
_Avoid_: Project page (ambiguous with the `/projects` list)

**Card**:
The summary tile for a Project shown in a grid (home preview and the `/projects`
list). A truncated view whose job is to invite a click into the Detail Page.

**Draft**:
A scaffolded Project that is not yet published — generated from a Repository and
pending the owner's edit and commit. Nothing is live until the owner commits it.

**Scaffold** (verb):
To generate a Draft from a Repository via the MCP — pre-filling what the GitHub
API can supply so the owner only has to curate, not type from scratch.

**Unshowcased Repository**:
A Repository the owner owns that has no corresponding Project yet — the gap between
what exists on GitHub and what has been curated onto the portfolio. The candidate
set the owner picks from when deciding what to scaffold next.
