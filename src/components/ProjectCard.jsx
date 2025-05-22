import { Card } from "@/components/ui/card";
import techColors from "../constants/techColors";

const ProjectCard = ({ project }) => {
  const getTechColor = (tech) => techColors[tech] || "bg-white/20 text-white";

  return (
    <div className="w-[360px] flex-shrink-0 px-4">
      <Card className="h-[550px] overflow-hidden relative group">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-75 transition-all duration-300"></div>
        </div>

        {/* Status Badge */}
        <div
          className={`absolute top-6 right-6 z-10 px-3 py-1 rounded-full text-xs font-medium ${
            project.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
          }`}
        >
          {project.status === "completed" ? "Completed" : "Ongoing"}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
          <p className="text-gray-200 mb-6 max-w-md text-lg">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className={`backdrop-blur-sm text-sm px-4 py-1 rounded-full ${getTechColor(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* GitHub Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105 border border-gray-600"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;
