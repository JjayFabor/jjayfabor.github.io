import { useEffect } from "react";
import { Link } from "react-router-dom";
import { weeklyChronicleIssues } from "../../data/weeklyChronicle";

const WeeklyChronicleList = () => {
  useEffect(() => {
    document.title = "Weekly Chronicle — Jjay Fabor";
    return () => {
      document.title = "Jjay Fabor — Software Developer | Backend Engineer";
    };
  }, []);

  return (
    <section
      className="min-h-screen bg-[#f5f2eb] dark:bg-[#1c1c1c] py-8 px-4 pb-28 font-newspaperBody"
      aria-label="Weekly Chronicle"
    >
      <div className="max-w-2xl mx-auto">
        <Link
          to="/blog"
          className="inline-block text-xs uppercase tracking-widest text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e6e3] mb-6 no-underline"
        >
          ← Blog
        </Link>

        <header className="border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-4 mb-6">
          <h1 className="font-newspaper text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#e8e6e3] uppercase">
            The Weekly Chronicle
          </h1>
          <p className="mt-2 text-[#444] dark:text-[#aaa] text-[15px]">
            Your personal week in review. Structured summaries and technical progress.
          </p>
        </header>

        <ul className="space-y-3 list-none p-0 m-0">
          {weeklyChronicleIssues.map((issue) => (
            <li key={issue.slug}>
              <Link
                to={`/blog/weekly-chronicle/${issue.slug}`}
                className="block py-3 border-b border-[#ccc] dark:border-[#444] no-underline text-[#1a1a1a] dark:text-[#e8e6e3] hover:underline"
              >
                <span className="font-newspaper font-semibold uppercase">
                  Week of {issue.dateRange}
                </span>
                <span className="text-[#666] dark:text-[#888] text-sm ml-2">
                  Volume {issue.volume}, Issue {issue.issue}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {weeklyChronicleIssues.length === 0 && (
          <p className="text-[#666] dark:text-[#888]">No issues yet.</p>
        )}
      </div>
    </section>
  );
};

export default WeeklyChronicleList;
