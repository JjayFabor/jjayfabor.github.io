import { ExternalLink, Github, Lock } from "lucide-react";

const MAX_TAGS = 4;

const ProjectCard = ({ project }) => {
  const isCompleted = project.status === "completed";
  const tags = project.techStack.slice(0, MAX_TAGS);
  const extraTags = project.techStack.length - tags.length;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Project image */}
      <div className="relative">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-28 object-cover border-b border-gray-200 dark:border-gray-700"
        />
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
            isCompleted
              ? "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200"
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200"
          }`}
        >
          {isCompleted ? "Completed" : "Ongoing"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3.5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
          {project.description}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {extraTags > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 px-1 py-0.5">
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
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
          {!project.link && !project.preview && (
            <span className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3 rounded-md text-sm font-medium border border-dashed border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400">
              <Lock className="h-4 w-4" />
              Internal company project
            </span>
          )}
          {project.preview && (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-3 rounded-md text-sm font-medium border border-gray-300 text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
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
