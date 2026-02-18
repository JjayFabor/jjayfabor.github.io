import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getWeeklyChronicleBySlug } from "../../data/weeklyChronicle";

function PullQuoteBlock({ pullQuote }) {
  return (
    <blockquote className="border-l-2 border-[#1a1a1a] dark:border-[#e8e6e3] pl-4 py-2 my-3">
      <p className="text-[#333] dark:text-[#ccc] italic text-[14px] leading-snug">
        {pullQuote.quote}
      </p>
      {pullQuote.attribution && (
        <cite className="text-xs not-italic text-[#555] dark:text-[#999] mt-1 block">
          — {pullQuote.attribution}
        </cite>
      )}
    </blockquote>
  );
}

const WeeklyChronicleIssue = () => {
  const { weekSlug } = useParams();
  const issue = getWeeklyChronicleBySlug(weekSlug);

  useEffect(() => {
    if (issue) {
      document.title = `${issue.mastheadDate} — Weekly Chronicle — Jjay Fabor`;
    }
    return () => {
      document.title = "Jjay Fabor — Software Developer | Backend Engineer";
    };
  }, [issue]);

  if (!issue) return <Navigate to="/blog/weekly-chronicle" replace />;

  const {
    mastheadTitle,
    tagline,
    mastheadDate,
    volumeIssue,
    author,
    frontPageStory,
    engineeringDesk,
    technicalDispatch,
    highlights,
    personalSection,
    metrics,
    lookingAhead,
  } = issue;

  return (
    <section
      className="min-h-screen bg-[#f5f2eb] dark:bg-[#1c1c1c] py-6 px-4 pb-28 font-newspaperBody text-[#1a1a1a] dark:text-[#e8e6e3]"
      aria-label="Weekly Chronicle issue"
    >
      <div className="max-w-5xl mx-auto">
        <Link
          to="/blog/weekly-chronicle"
          className="inline-block text-xs uppercase tracking-widest text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e6e3] mb-6 no-underline"
        >
          ← All issues
        </Link>

        {/* Masthead — uppercase, thin divider */}
        <header className="border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-4 mb-6">
          <h1 className="font-newspaperHeadline text-3xl md:text-4xl font-bold tracking-tight uppercase">
            {mastheadTitle}
          </h1>
          {tagline && (
            <p className="mt-1 text-base text-[#444] dark:text-[#aaa]">
              {tagline}
            </p>
          )}
          <p className="mt-2 text-sm uppercase tracking-widest text-[#555] dark:text-[#999] font-newspaper">
            {mastheadDate}
          </p>
          <p className="text-sm text-[#555] dark:text-[#999] font-newspaper">
            {volumeIssue}
          </p>
        </header>

        <div
          className="columns-1 md:columns-2 gap-10 text-[15px] leading-[1.55]"
          style={{ columnFill: "balance" }}
        >
          {/* Front Page Story — drop cap on first paragraph */}
          <article className="break-inside-avoid mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
              Front Page Story
            </h2>
            <h3 className="font-newspaper text-xl font-bold mb-1">
              {frontPageStory.headline}
            </h3>
            <p className="text-xs uppercase tracking-wide text-[#666] dark:text-[#888] mb-3">
              By {author} | {frontPageStory.bylineDate}
            </p>
            <div className="space-y-3">
              {(Array.isArray(frontPageStory.body) ? frontPageStory.body : [frontPageStory.body]).map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? "chronicle-drop-cap leading-[1.55] text-[#2a2a2a] dark:text-[#d8d6d3]" : "leading-[1.55] text-[#2a2a2a] dark:text-[#d8d6d3]"}
                >
                  {p}
                </p>
              ))}
            </div>
          </article>

          {/* Engineering Desk */}
          <article className="break-inside-avoid mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
              {engineeringDesk.title}
            </h2>
            {engineeringDesk.subtitle && (
              <p className="text-[13px] text-[#555] dark:text-[#999] mb-3 uppercase tracking-wide">
                {engineeringDesk.subtitle}
              </p>
            )}
            <ul className="space-y-1.5 list-none p-0 m-0">
              {engineeringDesk.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[#2a2a2a] dark:text-[#d8d6d3]">
                  <span className="text-[#1a1a1a] dark:text-[#e8e6e3]">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Technical Dispatch (optional mini deep-dive) */}
          {technicalDispatch && (
            <article className="break-inside-avoid mb-8">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
                Technical Dispatch
              </h2>
              <h3 className="font-newspaper font-semibold text-base mb-3">
                {technicalDispatch.title}
              </h3>
              <div className="space-y-3">
                {technicalDispatch.sections.map((s, i) => (
                  <section key={i}>
                    <h4 className="text-xs uppercase tracking-wider text-[#555] dark:text-[#999] mb-1 font-newspaper">
                      {s.label}
                    </h4>
                    <p className="text-[#2a2a2a] dark:text-[#d8d6d3] text-[14px] leading-[1.5]">
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>
            </article>
          )}

          {/* This Week's Highlights — table-like */}
          <article className="break-inside-avoid mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
              {highlights.title}
            </h2>
            <table className="w-full text-[14px] border-collapse">
              <tbody>
                {highlights.items.map((item, i) => (
                  <tr key={i} className="border-b border-[#ddd] dark:border-[#333]">
                    <td className="py-1.5 pr-3 font-semibold text-[#1a1a1a] dark:text-[#e8e6e3] align-top w-[38%]">
                      {item.emoji} {item.category}
                    </td>
                    <td className="py-1.5 text-[#2a2a2a] dark:text-[#d8d6d3]">
                      {item.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          {/* Personal Section */}
          <article className="break-inside-avoid mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
              {personalSection.title}
            </h2>
            {personalSection.subtitle && (
              <p className="text-[13px] text-[#555] dark:text-[#999] mb-3 uppercase tracking-wide">
                {personalSection.subtitle}
              </p>
            )}
            <div className="space-y-2">
              {personalSection.entries.map((e, i) => (
                <p key={i} className="text-[14px] leading-[1.5]">
                  <span className="font-semibold text-[#1a1a1a] dark:text-[#e8e6e3]">
                    {e.topic}.
                  </span>{" "}
                  <span className="text-[#2a2a2a] dark:text-[#d8d6d3]">{e.body}</span>
                </p>
              ))}
            </div>
          </article>

          {/* Metrics (optional) */}
          {metrics && (
            <article className="break-inside-avoid mb-8">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
                {metrics.title}
              </h2>
              <ul className="space-y-1 text-[14px]">
                {metrics.items.map((m, i) => (
                  <li key={i} className="flex justify-between gap-4">
                    <span className="text-[#2a2a2a] dark:text-[#d8d6d3]">{m.label}</span>
                    <span className="font-semibold text-[#1a1a1a] dark:text-[#e8e6e3]">{m.value}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* Looking Ahead */}
          <article className="break-inside-avoid mb-8">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
              {lookingAhead.title}
            </h2>
            <div className="space-y-3">
              {(Array.isArray(lookingAhead.body) ? lookingAhead.body : [lookingAhead.body]).map((p, i) => (
                <p key={i} className="leading-[1.55] text-[#2a2a2a] dark:text-[#d8d6d3]">
                  {p}
                </p>
              ))}
            </div>
            {lookingAhead.pullQuote && (
              <PullQuoteBlock pullQuote={lookingAhead.pullQuote} />
            )}
          </article>
        </div>
      </div>
    </section>
  );
};

export default WeeklyChronicleIssue;
