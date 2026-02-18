/**
 * Technical Dispatches — loaded from content/technical-dispatch/*.json at build time.
 * Filename (without .json) = slug. Add new posts by adding a JSON file.
 */
const modules = import.meta.glob("../../content/technical-dispatch/*.json", {
  eager: true,
});

const postsList = Object.values(modules)
  .map((mod) => (mod.default && typeof mod.default === "object" ? mod.default : null))
  .filter(Boolean);

postsList.sort((a, b) => {
  const dA = a.date ? new Date(a.date) : 0;
  const dB = b.date ? new Date(b.date) : 0;
  return dB - dA;
});

export const technicalDispatchSlugs = postsList.map((p) => p.slug).filter(Boolean);

export function getTechnicalDispatchBySlug(slug) {
  return postsList.find((p) => p.slug === slug) ?? null;
}
