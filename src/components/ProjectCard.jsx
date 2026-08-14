import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MAX_TAGS = 4;

// The whole card is a link into the Project Detail Page. Action links
// (GitHub / Preview) deliberately live on the detail page, not here — the
// card's one job is to invite the click. See ADR-0001 / PLAN.md decision 8.
const ProjectCard = ({ project }) => {
  const isCompleted = project.status === "completed";
  const tags = project.techStack.slice(0, MAX_TAGS);
  const extraTags = project.techStack.length - tags.length;

  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`View details for ${project.title}`}
      className="group flex flex-col h-full bg-brand-surface rounded-lg border border-brand-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent hover:shadow-[0_8px_24px_rgb(var(--brand-accent)/0.25)]"
    >
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
        {project.contextLabel && (
          <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-brand-accent">
            {project.contextLabel}
          </p>
        )}
        <h3 className="text-base font-semibold text-brand-text group-hover:text-brand-accent transition-colors">
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

        {/* Affordance pinned to the bottom — signals the card is clickable */}
        <div className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
