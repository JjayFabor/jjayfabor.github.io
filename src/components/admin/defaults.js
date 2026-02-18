/**
 * Default shapes for new Weekly Chronicle issue and Technical Dispatch.
 */
export const defaultWeeklyChronicle = () => ({
  slug: "week-01",
  dateRange: "May 3-10, 2025",
  volume: 1,
  issue: 1,
  frontPageStory: {
    headline: "",
    bylineDate: "",
    body: [""],
  },
  engineeringDesk: {
    title: "Engineering Desk",
    subtitle: "Technical Progress",
    bullets: [""],
  },
  highlights: {
    title: "This Week's Highlights",
    items: [
      { category: "Accomplishment", emoji: "🚀", text: "" },
      { category: "Problem Solved", emoji: "🧩", text: "" },
      { category: "Fitness", emoji: "🏋", text: "" },
      { category: "Learning", emoji: "📚", text: "" },
      { category: "Experiment", emoji: "🧪", text: "" },
    ],
  },
  personalSection: {
    title: "Personal Section",
    subtitle: "Human Layer",
    entries: [{ topic: "", body: "" }],
  },
  lookingAhead: {
    title: "Looking Ahead",
    body: [""],
    pullQuote: { quote: "", attribution: "" },
  },
});

export const defaultTechnicalDispatch = () => ({
  slug: "",
  title: "",
  date: (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })(),
  sections: [
    { label: "Problem", body: "" },
    { label: "Context", body: "" },
    { label: "Investigation", body: "" },
    { label: "Solution", body: "" },
    { label: "Code Snippets", body: "" },
    { label: "Lessons Learned", body: "" },
    { label: "Preventative Strategy", body: "" },
  ],
});
