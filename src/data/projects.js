// Single source of truth for portfolio projects.
//
// Projects are now authored as Markdown files under `content/projects/*.md`
// (YAML frontmatter for the card fields + a Markdown body for the case-study
// write-up). This module loads them at build time and rebuilds the same
// `projectsData` / `categories` exports the rest of the app already imports,
// so consumers (Projects.jsx, ProjectsPage.jsx, the detail page) don't care
// that the storage changed. Add a new project by dropping in a new `.md` file
// (the `portfolio-mcp` server scaffolds one from a GitHub repo).
import { load as loadYaml } from "js-yaml";

// Eagerly pull every project file in as raw text. Vite resolves the leading
// `/` from the project root, where `content/` lives.
const files = import.meta.glob("/content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Split `---` frontmatter from the Markdown body and parse the YAML block.
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

const parse = (raw) => {
  const match = FRONTMATTER.exec(raw);
  if (!match) return { body: raw.trim() };
  const data = loadYaml(match[1]) || {};
  // Normalize image paths to root-absolute so they resolve at any route depth.
  // A bare `projects/x.svg` would resolve relative to `/projects/:slug` and 404.
  const toAbsolute = (p) =>
    typeof p === "string" && !/^https?:\/\//.test(p) && !p.startsWith("/") ? `/${p}` : p;
  if (data.image) data.image = toAbsolute(data.image);
  if (Array.isArray(data.screenshots)) data.screenshots = data.screenshots.map(toAbsolute);
  return { ...data, body: match[2].trim() };
};

// featured first; then newest `date` first; undated entries sort last.
const byFeaturedThenDate = (a, b) => {
  if (Boolean(b.featured) !== Boolean(a.featured)) {
    return Boolean(b.featured) - Boolean(a.featured);
  }
  const ad = a.date || "";
  const bd = b.date || "";
  if (!ad && !bd) return 0;
  if (!ad) return 1;
  if (!bd) return -1;
  return bd.localeCompare(ad);
};

export const projectsData = Object.values(files)
  .map(parse)
  .sort(byFeaturedThenDate);

// "All" plus every distinct category, in display order.
export const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

// Detail-page lookup by slug (used by /projects/:slug).
export const getProjectBySlug = (slug) =>
  projectsData.find((p) => p.slug === slug);
