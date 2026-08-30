import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

const statusClasses = {
  completed: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  "in-progress": "border-brand-accent/50 bg-brand-surface text-brand-accent",
  upcoming: "border-brand-border bg-brand-bg text-brand-muted",
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const JourneyWeekCard = ({ week }) => (
  <article className="overflow-hidden rounded-lg border border-brand-border bg-brand-surface">
    <header
      className={
        week.project || week.skills?.length || week.keyLessons?.length
          ? "border-b border-brand-border px-5 py-5 sm:px-6"
          : "px-5 py-5 sm:px-6"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-accent">
            Week {String(week.week).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-brand-text">
            {week.title}
          </h3>
        </div>
        <span className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${statusClasses[week.status]}`}>
          {statusLabels[week.status]}
        </span>
      </div>
      {week.summary && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted">
          {week.summary}
        </p>
      )}
      {week.dateCompleted && (
        <p className="mt-3 text-xs text-brand-muted">
          Completed <time dateTime={week.dateCompleted}>{formatDate(week.dateCompleted)}</time>
        </p>
      )}
    </header>

    {(week.project || week.skills?.length) && (
      <div className="grid gap-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {week.project && (
          <section className={`px-5 py-5 sm:px-6 ${week.skills?.length ? "border-b border-brand-border md:border-b-0 md:border-r" : ""}`}>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
              Capstone
            </p>
            <h4 className="mt-2 text-lg font-semibold text-brand-text">
              {week.project.name}
            </h4>
            {week.project.description && (
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {week.project.description}
              </p>
            )}

            {week.project.tech?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-brand-accent" aria-label="Capstone technology stack">
                {week.project.tech.map((tech, index) => (
                  <li key={tech}>
                    {index > 0 && <span aria-hidden="true" className="mr-2 text-brand-border">/</span>}
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {week.project.projectUrl && (
                <Link
                  to={week.project.projectUrl}
                  aria-label={`View the ${week.project.name} project details`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-accent px-4 text-sm font-medium text-brand-bg transition-colors hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  View project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {week.project.github && (
                <a
                  href={week.project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${week.project.name} source code on GitHub`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-accent px-4 text-sm font-medium text-brand-bg transition-colors hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub repository
                </a>
              )}
              {week.project.liveDemo && (
                <a
                  href={week.project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the live demo for ${week.project.name}`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-brand-accent/50 px-4 text-sm font-medium text-brand-accent transition-colors hover:bg-brand-accent/10 hover:text-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live demo
                </a>
              )}
            </div>
          </section>
        )}

        {week.skills?.length > 0 && (
          <section className="px-5 py-5 sm:px-6">
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-muted">
              Skills learned
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`Skills learned in week ${week.week}`}>
              {week.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-brand-border bg-brand-bg px-2.5 py-1.5 text-xs leading-none text-brand-text"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )}

    {week.keyLessons?.length > 0 && (
      <section className="border-t border-brand-border bg-brand-bg/40 px-5 py-5 sm:px-6">
        <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-brand-muted">
          Key lessons
        </h4>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {week.keyLessons.map((lesson) => (
            <li key={lesson} className="flex gap-2 text-sm leading-relaxed text-brand-muted">
              <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-brand-accent" />
              {lesson}
            </li>
          ))}
        </ul>
      </section>
    )}
  </article>
);

export default JourneyWeekCard;
