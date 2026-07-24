// Single source of truth for portfolio projects.
// Consumed by the home preview (components/Projects.jsx) and the dedicated
// projects page (pages/ProjectsPage.jsx). Add new projects here.
export const projectsData = [
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
  {
    id: 9,
    title: "Secure File Transfer & Sharing",
    description: "n8n workflow automating secure Google Drive file transfers — provisioning dedicated folders and enforcing role-based sharing access for employees. Built at Callbox.",
    image: "projects/n8n-file-transfer.svg",
    techStack: ["n8n", "Google Drive API", "Webhooks", "Role-Based Access"],
    status: "completed",
    category: "Automation",
  },
  {
    id: 10,
    title: "HubSpot Pipeline Data Sync",
    description: "HubSpot workflow integration syncing CRM data into the internal pipeline database, keeping sales records consistent without manual exports. Built at Callbox.",
    image: "projects/hubspot-pipeline-sync.svg",
    techStack: ["HubSpot CRM", "HubSpot Workflows", "REST API", "MySQL"],
    status: "completed",
    category: "Automation",
  },
];

// "All" plus every distinct category, in first-seen order.
export const categories = ["All", ...new Set(projectsData.map((p) => p.category))];
