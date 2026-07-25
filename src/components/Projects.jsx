import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ResumeSection from "./ResumeSection";
import { projectsData, categories } from "../data/projects";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
                ? "bg-brand-accent text-brand-bg"
                : "bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent/60 hover:text-brand-accent"
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
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link
            to={selectedCategory === "All"
              ? "/projects"
              : `/projects?category=${encodeURIComponent(selectedCategory)}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent hover:text-brand-accent-hover hover:underline"
          >
            {hiddenCount > 0 ? `View all ${matchingProjects.length} projects` : "View all projects"}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-brand-text/85 font-medium">
            No projects in this category yet.
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="mt-4 px-4 py-2 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
          >
            View all projects
          </button>
        </div>
      )}
    </ResumeSection>
  );
};

export default Projects;
