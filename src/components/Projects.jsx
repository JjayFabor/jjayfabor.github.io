import { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {

  const projectsData = [
    {
      id: 8,
      title: "Delphi",
      description: "A self-hosted personal AI agent built on the Claude Agent SDK. Message it via Telegram or Discord and get your own AI — with persistent memory, teachable skills, MCP connectors, and scheduled tasks.",
      image: "projects/delphi.svg",
      techStack: ["Python", "Claude Agent SDK", "Next.js", "TypeScript", "TailwindCSS", "SQLite", "Telegram", "Discord"],
      status: "completed",
      category: "AI Agent",
      featured: true,
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
      description: "A Laravel Realtime Auction System.",
      image: "projects/swiftbidder.png",
      techStack: ["Laravel", "PHP", "React", "InertiaJS", "TailwindCSS", "MySQL"],
      status: "ongoing",
      category: "Full-Stack Application",
      link: "https://github.com/JjayFabor/swift-bidder"
    },
    {
      id: 4,
      title: "DevTrack API",
      description: "A personal productivity API for developers to manage tasks, log learning sessions, track progress on side projects.",
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
      description: "A platform to preserve, explore, and share cultural heritage from around the world. The idea is to bring communities together through storytelling and multimedia content. ",
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
      description: "A PWA for tracking science-based workout programs with progress analytics, rest timer, and offline support.",
      image: "projects/overload-workout-tracker.png",
      techStack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "SWR", "Recharts"],
      status: "ongoing",
      category: "Full-Stack Application",
      link: "https://github.com/JjayFabor/overload-workout-tracker"
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const featuredProject = projectsData.find((p) => p.featured);

  const filteredProjects = (selectedCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory)
  ).filter((p) => !p.featured);

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      isDown = true;
      slider.classList.add('cursor-grabbing');
      slider.classList.remove('cursor-grab');
      slider.classList.add('select-none');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('cursor-grabbing');
      slider.classList.add('cursor-grab');
      slider.classList.remove('select-none');
    };

    slider.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      slider.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      if (slider) {
        slider.classList.remove('cursor-grabbing');
        slider.classList.add('cursor-grab');
        slider.classList.remove('select-none');
      }
    };
  }, []);

  return (
    <section id="projects" className="py-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">Projects</h2>

        {/* Featured project spotlight */}
        {featuredProject && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-sm font-semibold uppercase tracking-widest text-yellow-400">Featured Project</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-yellow-400/30 shadow-xl group">
              {/* Background */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-contain bg-gray-900 transition-transform duration-500 group-hover:scale-105 p-12"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 dark:from-black/90 dark:via-black/65 dark:to-black/35" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 min-h-[320px] md:max-w-[60%]">
                <h3 className="text-4xl font-bold text-white mb-3">{featuredProject.title}</h3>
                <p className="text-gray-200 text-base leading-relaxed mb-6">{featuredProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.techStack.map((tech, i) => (
                    <span key={i} className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm ${
                      { "Claude Agent SDK": "bg-violet-600/40 text-violet-100", Telegram: "bg-sky-500/40 text-sky-100", Discord: "bg-indigo-500/40 text-indigo-100" }[tech]
                      || "bg-white/15 text-white"
                    }`}>{tech}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {featuredProject.preview && (
                    <a href={featuredProject.preview} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      View Page
                    </a>
                  )}
                  <a href={featuredProject.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white border border-gray-600 px-5 py-2.5 rounded-lg transition-all duration-200 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div ref={sliderRef} className="overflow-x-auto pb-4 cursor-grab">
            <div className="flex gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects found in this category.</p>
        )}

        {filteredProjects.length > 0 && (
          <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <p>Swipe to view more projects &rarr;</p>
            <div className="relative group">
              <span className="cursor-help text-gray-400 hover:text-gray-600">
                (?)
              </span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Using an external mouse? Hold left-click and drag to swipe.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
