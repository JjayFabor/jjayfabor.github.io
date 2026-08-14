/**
 * @typedef {"completed" | "in-progress" | "upcoming"} JourneyStatus
 *
 * @typedef {Object} JourneyProject
 * @property {string} name
 * @property {string} [description]
 * @property {string[]} [tech]
 * @property {string} [github]
 * @property {string} [liveDemo]
 *
 * @typedef {Object} JourneyWeek
 * @property {number} week
 * @property {JourneyStatus} status
 * @property {string} [summary]
 * @property {string[]} [skills]
 * @property {JourneyProject} [project]
 * @property {string[]} [keyLessons]
 * @property {string} [dateCompleted]
 *
 * @typedef {Object} RoadmapStage
 * @property {string} id
 * @property {string} title
 * @property {JourneyStatus} status
 * @property {JourneyWeek[]} [weeks]
 */

export const aiRoadmap = {
  title: "AI Engineering Journey",
  introduction:
    "I'm following a structured, project-based roadmap toward AI Engineering—building the foundations to design, build, and deploy practical AI systems.",
  totalWeeks: 24,
  stages: /** @type {RoadmapStage[]} */ ([
    {
      id: "python-foundations",
      title: "Python & Software Engineering Foundations",
      status: "completed",
      weeks: [
        {
          week: 1,
          status: "completed",
          summary:
            "Established the Python and software engineering fundamentals needed to build reliable, maintainable applications and work confidently with external APIs.",
          skills: [
            "Python fundamentals",
            "Functions and control flow",
            "Lists and dictionaries",
            "JSON and file I/O",
            "Exception handling",
            "Modules and imports",
            "Virtual environments",
            "pip and requirements.txt",
            "REST APIs",
            "HTTP GET and POST",
            "HTTP status codes",
            "Environment variables",
            ".env and secret management",
            "Git and .gitignore",
          ],
          project: {
            name: "GitHub User Explorer",
            description:
              "A Python CLI application built as my Week 1 capstone. It integrates with the GitHub REST API, retrieves and displays user profiles, persists search history using JSON, prevents duplicate history entries, validates input, and handles missing files, malformed JSON, HTTP errors, and network failures.",
            tech: ["Python", "Requests", "REST API", "JSON", "Git"],
            github: "https://github.com/JjayFabor/github-user-explorer",
          },
          keyLessons: [
            "Treat API responses as an external boundary that requires validation and clear error handling.",
            "Design file and network operations defensively so expected failures remain understandable and recoverable.",
            "Keep secrets outside source control by using environment-based configuration and a deliberate .gitignore.",
          ],
          dateCompleted: "2026-08-14",
        },
      ],
    },
    {
      id: "data-foundations",
      title: "Data Foundations",
      status: "in-progress",
      weeks: [{ week: 2, status: "in-progress" }],
    },
    { id: "machine-learning", title: "Machine Learning", status: "upcoming" },
    { id: "deep-learning", title: "Deep Learning", status: "upcoming" },
    { id: "llm-fundamentals", title: "LLM Fundamentals", status: "upcoming" },
    {
      id: "embeddings-vector-databases",
      title: "Embeddings & Vector Databases",
      status: "upcoming",
    },
    { id: "rag-systems", title: "RAG Systems", status: "upcoming" },
    { id: "ai-agents-tool-use", title: "AI Agents & Tool Use", status: "upcoming" },
    {
      id: "evaluation-observability",
      title: "Evaluation & Observability",
      status: "upcoming",
    },
    {
      id: "production-ai-engineering",
      title: "Deployment & Production AI Engineering",
      status: "upcoming",
    },
  ]),
};

export const roadmapStages = aiRoadmap.stages.map(({ id, title, status }) => ({
  id,
  title,
  status,
}));

export const journeyWeeks = aiRoadmap.stages
  .flatMap((stage) =>
    (stage.weeks ?? []).map((week) => ({
      ...week,
      stageId: stage.id,
      title: stage.title,
    })),
  )
  .sort((a, b) => a.week - b.week);

export const completedWeekCount = journeyWeeks.filter(
  (week) => week.status === "completed",
).length;

export const latestCompletedWeek = journeyWeeks
  .filter((week) => week.status === "completed")
  .sort((a, b) => b.week - a.week)[0];

export const activeWeek = journeyWeeks.find(
  (week) => week.status === "in-progress",
);
