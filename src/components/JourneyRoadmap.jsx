import { Check, Circle, CircleDot } from "lucide-react";

const statusStyles = {
  completed: {
    label: "Completed",
    icon: Check,
    node: "border-brand-accent bg-brand-accent text-brand-bg",
    status: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
    title: "text-brand-text",
  },
  "in-progress": {
    label: "In Progress",
    icon: CircleDot,
    node: "border-brand-accent bg-brand-surface text-brand-accent",
    status: "border-brand-accent/50 bg-brand-surface text-brand-accent",
    title: "text-brand-text",
  },
  upcoming: {
    label: "Upcoming",
    icon: Circle,
    node: "border-brand-border bg-brand-bg text-brand-muted",
    status: "text-brand-muted",
    title: "text-brand-muted",
  },
};

const JourneyRoadmap = ({ stages }) => (
  <ol className="relative" aria-label="AI Engineering roadmap stages">
    {stages.map((stage, index) => {
      const style = statusStyles[stage.status];
      const StatusIcon = style.icon;
      const isLast = index === stages.length - 1;

      return (
        <li key={stage.id} className="relative grid grid-cols-[2rem_1fr] gap-4 pb-5 last:pb-0">
          {!isLast && (
            <span
              aria-hidden="true"
              className={`absolute left-[0.9375rem] top-8 h-[calc(100%-1rem)] w-px ${
                stage.status === "completed"
                  ? "bg-brand-accent"
                  : "bg-brand-border"
              }`}
            />
          )}
          <span
            aria-hidden="true"
            className={`relative z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full border ${style.node}`}
          >
            <StatusIcon className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="min-w-0 pt-0.5 sm:flex sm:items-start sm:justify-between sm:gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-muted">
                Stage {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className={`mt-1 text-sm font-semibold leading-snug ${style.title}`}>
                {stage.title}
              </h3>
            </div>
            <span
              className={`mt-2 inline-flex shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.12em] sm:mt-0 ${
                stage.status === "upcoming"
                  ? style.status
                  : `rounded-md border px-2 py-1 ${style.status}`
              }`}
            >
              {style.label}
            </span>
          </div>
        </li>
      );
    })}
  </ol>
);

export default JourneyRoadmap;
