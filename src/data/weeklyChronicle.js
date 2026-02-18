/**
 * Weekly Chronicle — loaded from content/weekly-chronicle/*.json at build time.
 * Filename (without .json) = slug. Add new issues by adding a JSON file.
 */
const DEFAULT_AUTHOR = "Jjay Fabor";
const DEFAULT_MASTHEAD_TITLE = "THE WEEKLY CHRONICLE";
const DEFAULT_TAGLINE = "Your Personal Week in Review";

const modules = import.meta.glob("../../content/weekly-chronicle/*.json", {
  eager: true,
});

function enrichIssue(data) {
  if (!data || !data.slug) return null;
  return {
    ...data,
    author: data.author ?? DEFAULT_AUTHOR,
    mastheadTitle: data.mastheadTitle ?? DEFAULT_MASTHEAD_TITLE,
    tagline: data.tagline ?? DEFAULT_TAGLINE,
    mastheadDate: data.mastheadDate ?? `Week of ${data.dateRange}`,
    volumeIssue:
      data.volumeIssue ?? `Volume ${data.volume}, Issue ${data.issue}`,
  };
}

const issuesList = Object.values(modules)
  .map((mod) => (mod.default && typeof mod.default === "object" ? enrichIssue(mod.default) : null))
  .filter(Boolean);

issuesList.sort((a, b) => {
  const v = (b.volume ?? 0) - (a.volume ?? 0);
  if (v !== 0) return v;
  return (b.issue ?? 0) - (a.issue ?? 0);
});

export const weeklyChronicleIssues = issuesList.map((i) => ({
  slug: i.slug,
  dateRange: i.dateRange,
  volume: i.volume,
  issue: i.issue,
}));

export function getWeeklyChronicleBySlug(slug) {
  const found = issuesList.find((i) => i.slug === slug);
  return found ?? null;
}
