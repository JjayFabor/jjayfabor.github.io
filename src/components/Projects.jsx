import { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {

  const projectsData = [
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
      title: "BridgeAI",
      description: "An educational platform for personalized learning.",
      image: "projects/bridgeAI.png",
      techStack: ["Python", "GeminiAPI", "Flutter", "Dart", "Flask"],
      status: "ongoing",
      category: "Mobile Application",
      link: "https://github.com/JjayFabor/bridgeAI"
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === selectedCategory);

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
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>

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
            <div className="flex gap-6">
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
