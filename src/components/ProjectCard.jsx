import { ExternalLink, Github, Lock } from "lucide-react";

const MAX_TAGS = 4;

const ProjectCard = ({ project }) => {
  const isCompleted = project.status === "completed";
  const tags = project.techStack.slice(0, MAX_TAGS);
  const extraTags = project.techStack.length - tags.length;

  return (
    <div className="flex flex-col h-full bg-brand-surface rounded-lg border border-brand-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent hover:shadow-[0_8px_24px_rgb(var(--brand-accent)/0.25)]">
      {/* Project image */}
      <div className="relative">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-28 object-cover border-b border-brand-border"
        />
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
            isCompleted
              ? "bg-brand-accent/90 text-brand-bg"
              : "bg-brand-bg/85 text-brand-accent border border-brand-accent/50"
          }`}
        >
          {isCompleted ? "Completed" : "Ongoing"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3.5">
        <h3 className="text-base font-semibold text-brand-text">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-brand-muted leading-snug line-clamp-2">
          {project.description}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tech, index) => (
            <span
              key={index}
              className="bg-brand-accent/10 text-brand-accent font-mono text-[11px] px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {extraTags > 0 && (
            <span className="text-xs text-brand-muted px-1 py-0.5">
              +{extraTags}
            </span>
          )}
        </div>

        {/* Actions pinned to the bottom */}
        <div className="mt-auto pt-3 flex gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
          {!project.link && !project.preview && (
            <span className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3 rounded-md text-sm font-medium border border-dashed border-brand-border text-brand-muted">
              <Lock className="h-4 w-4" />
              Internal company project
            </span>
          )}
          {project.preview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3 rounded-md text-sm font-medium border border-brand-accent/50 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent-hover transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
