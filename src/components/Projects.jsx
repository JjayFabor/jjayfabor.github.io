import { useState, useRef, useCallback } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio website built with React + TailwindCSS.",
      image: "projects/portfolio.png",
      techStack: ["React", "TailwindCSS", "Vite", "Shadcn/ui"],
      status: "completed",
      link: "https://github.com/JjayFabor/portfolio"
    },
    {
      id: 2,
      title: "Lettuce Watch",
      description: "A real-time monitoring system for lettuce farms.",
      image: "projects/lettuce-watch.png",
      techStack: ["Python", "Flask", "Machine Learning (ML)", "SQLite", "Arduino", "HTML", "CSS", "JavaScript"],
      status: "completed",
      link: "https://github.com/JjayFabor/LettuceRealTimeMonitoringSystem"
    },
    {
      id: 3,
      title: "SwiftBidder",
      description: "A Laravel Realtime Auction System.",
      image: "projects/swiftbidder.png",
      techStack: ["Laravel", "PHP", "React", "InertiaJS", "TailwindCSS", "MySQL"],
      status: "ongoing",
      link: "https://github.com/JjayFabor/swift-bidder"
    },
    {
        id: 4,
        title: "BridgeAI",
        description: "An educational platform for personalized learning.",
        image: "projects/bridgeAI.png",
        techStack: ["Python", "GeminiAPI", "Flutter", "Dart", "Flask"],
        status: "ongoing",
        link: "https://github.com/JjayFabor/bridgeAI"
      },
  ];

  // Next slide function
  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, [projects.length]);

  // Previous slide function
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => setActiveIndex(index);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>

        <div className="relative">
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
                aria-label="Previous project"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
          {/* Slider */}
          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all"
            aria-label="Next project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>


          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? "bg-blue-500 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
