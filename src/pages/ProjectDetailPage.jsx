import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import Footer from "../components/Footer";
import LightSwitch from "../components/LightSwitch";
import Monogram from "../components/Monogram";

// Brand-styled renderers for the Markdown case-study body (no typography plugin).
const markdownComponents = {
  h2: (props) => (
    <h2 className="text-xl font-semibold text-brand-text mt-8 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-lg font-semibold text-brand-text mt-6 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="text-brand-muted leading-relaxed mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-5 space-y-1.5 text-brand-muted mb-4" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-5 space-y-1.5 text-brand-muted mb-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-brand-accent hover:text-brand-accent-hover underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono text-sm bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-brand-text font-semibold" {...props} />
  ),
};

const formatDate = (d) => {
  if (!d) return null;
  const parsed = new Date(`${d}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// Shared page shell: fixed theme toggle, home-linking header, footer.
const Shell = ({ children }) => (
  <div className="min-h-screen bg-brand-bg flex flex-col">
    <LightSwitch />
    <header className="bg-brand-bg border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-6 py-5 pr-20">
        <Link
          to="/"
          aria-label="Back to home"
          className="group inline-flex items-center gap-2.5 text-brand-text"
        >
          <Monogram className="w-9 h-9 rounded-lg text-lg" />
          <span className="font-semibold text-base group-hover:text-brand-accent transition-colors">
            Jjay Fabor
          </span>
        </Link>
      </div>
    </header>
    <main className="max-w-4xl w-full mx-auto px-6 py-8 md:py-10 flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    const prev = document.title;
    document.title = project
      ? `${project.title} — Jjay Fabor`
      : "Project not found — Jjay Fabor";
    return () => {
      document.title = prev;
    };
  }, [project]);

  if (!project) {
    return (
      <Shell>
        <div className="text-center py-16">
          <p className="text-brand-text/85 font-medium">
            That project doesn&rsquo;t exist.
          </p>
          <Link
            to="/projects"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </div>
      </Shell>
    );
  }

  const isCompleted = project.status === "completed";
  const formattedDate = formatDate(project.date);
  // Strip authoring TODO comments; render the rest as the case-study body.
  const body = (project.body || "").replace(/<!--[\s\S]*?-->/g, "").trim();

  return (
    <Shell>
      {/* Back to the list */}
      <Link
        to="/projects"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent hover:text-brand-accent-hover"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </Link>

      {/* Title + meta */}
      <div className="mt-5">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-text">
          {project.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-brand-muted">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              isCompleted
                ? "bg-brand-accent/90 text-brand-bg"
                : "bg-brand-bg text-brand-accent border border-brand-accent/50"
            }`}
          >
            {isCompleted ? "Completed" : "Ongoing"}
          </span>
          <span>{project.category}</span>
          {formattedDate && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{formattedDate}</span>
            </>
          )}
        </div>
      </div>

      {/* Tech stack — full list */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-brand-accent/10 text-brand-accent font-mono text-[11px] px-2 py-0.5 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions — moved here from the card */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium bg-brand-accent text-brand-bg hover:bg-brand-accent-hover transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
        {project.preview && (
          <a
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium border border-brand-accent/50 text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent-hover transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Live Preview
          </a>
        )}
        {!project.link && !project.preview && (
          <span className="inline-flex items-center gap-2 h-10 px-4 rounded-md text-sm font-medium border border-dashed border-brand-border text-brand-muted">
            <Lock className="h-4 w-4" />
            Internal company project
          </span>
        )}
      </div>

      {/* Hero image */}
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="mt-8 w-full max-h-[420px] object-contain rounded-lg border border-brand-border bg-brand-surface"
        />
      )}

      {/* Case-study body */}
      {body && (
        <div className="mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {body}
          </ReactMarkdown>
        </div>
      )}
    </Shell>
  );
};

export default ProjectDetailPage;
