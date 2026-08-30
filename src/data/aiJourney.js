/**
 * @typedef {"completed" | "in-progress" | "upcoming"} JourneyStatus
 *
 * @typedef {Object} JourneyProject
 * @property {string} name
 * @property {string} [description]
 * @property {string[]} [tech]
 * @property {string} [github]
 * @property {string} [liveDemo]
 * @property {string} [projectUrl]
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
      status: "completed",
      weeks: [
        {
          week: 2,
          status: "completed",
          summary:
            "Built a Python data pipeline that cleans, validates, and analyzes messy AI model API usage logs, then exports analysis-ready results.",
          skills: [
            "Pandas DataFrames",
            "CSV ingestion",
            "Dataset inspection",
            "Missing-value handling",
            "Median imputation",
            "Boolean filtering and domain validation",
            "Duplicate detection",
            "IQR outlier detection",
            "groupby and aggregation",
            "JSON export",
            "Reproducible pipeline design",
          ],
          project: {
            name: "AI Model Usage Analyzer",
            description:
              "A Python data pipeline built as my Week 2 capstone. It normalizes model names, imputes missing token counts with the median, removes records with missing latency, duplicates, and invalid measurements, and flags token-usage outliers using IQR without treating unusual observations as invalid. It calculates overall and per-model metrics, then exports cleaned CSV data and JSON summaries.",
            tech: ["Python", "Pandas", "NumPy", "CSV", "JSON", "Git"],
            github: "https://github.com/JjayFabor/ai-model-usage-analyzer",
          },
          keyLessons: [
            "Clean and validate data before trusting the analytics built from it.",
            "Keep domain validation separate from statistical anomaly detection; flag unusual observations instead of automatically deleting them.",
            "Separate processing, reporting, and export responsibilities to keep the pipeline maintainable.",
          ],
          dateCompleted: "2026-08-23",
        },
      ],
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      status: "completed",
      weeks: [
        {
          week: 3,
          status: "completed",
          summary:
            "Built a leakage-safe classification workflow that compares candidate models, evaluates the selected pipeline honestly, and accepts raw API request data for inference.",
          skills: [
            "Binary classification",
            "Feature and target selection",
            "Stratified train/test splits",
            "scikit-learn pipelines",
            "ColumnTransformer",
            "Missing-value imputation",
            "Feature scaling",
            "One-hot encoding",
            "5-fold cross-validation",
            "Model comparison and selection",
            "Confusion matrix analysis",
            "Raw-request inference",
            "Data leakage prevention",
          ],
          project: {
            name: "API Success Predictor",
            description:
              "An end-to-end binary classification capstone trained on 50 balanced API request observations. It uses leakage-safe numerical and categorical preprocessing, compares Logistic Regression with a depth-3 Decision Tree using 5-fold cross-validation, selects Logistic Regression, and supports inference on raw requests with missing values and unseen categories.",
            tech: [
              "Python",
              "Pandas",
              "scikit-learn",
              "Machine Learning",
              "Classification",
            ],
            projectUrl: "/projects/api-success-predictor",
          },
          keyLessons: [
            "Fit preprocessing only on training data by keeping every transformation inside the model pipeline.",
            "Use cross-validation for model selection and preserve the held-out set for one honest final evaluation.",
            "Report small-sample metrics with their limits; 90% accuracy on 10 held-out requests demonstrates the workflow, not production performance.",
          ],
          dateCompleted: "2026-08-30",
        },
      ],
    },
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
