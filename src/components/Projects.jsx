import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ResumeSection from "./ResumeSection";

const projectsData = [
  {
    id: 8,
    title: "Delphi",
    description: "A self-hosted personal AI agent built on the Claude Agent SDK. Message it via Telegram or Discord for your own AI — with persistent memory, teachable skills, MCP connectors, and scheduled tasks.",
    image: "projects/delphi.svg",
    techStack: ["Python", "Claude Agent SDK", "Next.js", "TypeScript", "TailwindCSS", "SQLite", "Telegram", "Discord"],
    status: "completed",
    category: "AI Agent",
    preview: "https://delphi-livid.vercel.app",
    link: "https://github.com/JjayFabor/delphi"
  },
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal portfolio website built with React + TailwindCSS.",
    image: "projects/portfolio.png",
    techStack: ["React", "TailwindCSS", "Vite", "Shadcn/ui"],
    status: "completed",
    category: "Full-Stack Application",
    link: "https://github.com/JjayFabor/portfolio"
  },
  {
    id: 2,
    title: "Lettuce Watch",
    description: "A real-time monitoring system for lettuce farms.",
    image: "projects/lettuce-watch.png",
    techStack: ["Python", "Flask", "Machine Learning (ML)", "SQLite", "Arduino", "HTML", "CSS", "JavaScript"],
    status: "completed",
    category: "Full-Stack Application",
    link: "https://github.com/JjayFabor/LettuceRealTimeMonitoringSystem"
  },
  {
    id: 3,
    title: "SwiftBidder",
    description: "A Laravel realtime auction system.",
    image: "projects/swiftbidder.png",
    techStack: ["Laravel", "PHP", "React", "InertiaJS", "TailwindCSS", "MySQL"],
    status: "ongoing",
    category: "Full-Stack Application",
    link: "https://github.com/JjayFabor/swift-bidder"
  },
  {
    id: 4,
    title: "DevTrack API",
    description: "A personal productivity API for developers to manage tasks, log learning sessions, and track progress on side projects.",
    image: "projects/devtrack-api.png",
    techStack: ["Laravel", "PHP", "Laravel Scribe", "Postman", "RESTful API"],
    status: "ongoing",
    category: "Backend API",
    preview: "https://devtrack-api-production.up.railway.app",
    link: "https://github.com/JjayFabor/devtrack-api"
  },
  {
    id: 5,
    title: "AncestraLink API",
    description: "A platform to preserve, explore, and share cultural heritage from around the world — bringing communities together through storytelling and multimedia content.",
    image: "projects/ancestralink.png",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Postman", "RESTful API"],
    status: "ongoing",
    category: "Backend API",
    link: "https://github.com/JjayFabor/ancestralink-backend"
  },
  {
    id: 6,
    title: "BridgeAI",
    description: "An educational platform for personalized learning.",
    image: "projects/bridgeAI.png",
    techStack: ["Python", "GeminiAPI", "Flutter", "Dart", "Flask"],
    status: "completed",
    category: "Mobile Application",
    link: "https://github.com/JjayFabor/bridgeAI"
  },
  {
    id: 7,
    title: "Overload Workout Tracker",
    description: "A PWA for tracking science-based workout programs with progress analytics, a rest timer, and offline support.",
    image: "projects/overload-workout-tracker.png",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "SWR", "Recharts"],
    status: "ongoing",
    category: "Full-Stack Application",
    link: "https://github.com/JjayFabor/overload-workout-tracker"
  },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const MAX_VISIBLE = 4;
  const matchingProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory);
  const filteredProjects = matchingProjects.slice(0, MAX_VISIBLE);
  const hiddenCount = matchingProjects.length - filteredProjects.length;

  return (
    <ResumeSection id="projects" title="Projects">
      <div className="flex gap-2 mb-5 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <a
            href="https://github.com/JjayFabor?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline"
          >
            {hiddenCount > 0 ? `View all ${matchingProjects.length} projects on GitHub` : "View more on GitHub"}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            No projects in this category yet.
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            View all projects
          </button>
        </div>
      )}
    </ResumeSection>
  );
};

export default Projects;
