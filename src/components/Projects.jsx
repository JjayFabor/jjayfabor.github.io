import { useState } from "react";
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
          <div className="overflow-x-auto pb-4">
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
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>Swipe or scroll to view more projects &rarr;</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
