/**
 * Admin GitHub API config. Used by the admin UI to read/write content files.
 */
export const adminConfig = {
  owner: "jjayfabor",
  repo: "jjayfabor.github.io",
  branch: "main",
  paths: {
    weeklyChronicle: "content/weekly-chronicle",
    technicalDispatch: "content/technical-dispatch",
  },
};

export const GITHUB_API_BASE = "https://api.github.com";
