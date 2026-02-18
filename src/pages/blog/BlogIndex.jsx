import { useEffect } from "react";
import { Link } from "react-router-dom";

const BlogIndex = () => {
  useEffect(() => {
    document.title = "Blog — Jjay Fabor";
    return () => {
      document.title = "Jjay Fabor — Software Developer | Backend Engineer";
    };
  }, []);

  return (
    <section
      className="min-h-screen bg-[#f5f2eb] dark:bg-[#1c1c1c] py-8 px-4 pb-28 font-newspaperBody"
      aria-label="Blog"
    >
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-block text-xs uppercase tracking-widest text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e6e3] mb-8 no-underline"
        >
          ← Home
        </Link>

        <header className="border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-4 mb-8">
          <h1 className="font-newspaper text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#e8e6e3] uppercase">
            Personal Publication
          </h1>
          <p className="mt-2 text-[#444] dark:text-[#aaa] text-[15px]">
            Two editorial tracks: weekly summaries and technical deep-dives.
          </p>
        </header>

        <nav className="space-y-6" aria-label="Blog streams">
          <Link
            to="/blog/weekly-chronicle"
            className="block p-5 border border-[#1a1a1a] dark:border-[#e8e6e3] no-underline text-[#1a1a1a] dark:text-[#e8e6e3] hover:bg-[#eee] dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="text-2xl" aria-hidden="true">📰</span>
            <h2 className="font-newspaper text-xl font-bold mt-2 uppercase">
              The Weekly Chronicle
            </h2>
            <p className="text-sm text-[#555] dark:text-[#999] mt-1">
              Recurring structured weekly summary — front page, engineering desk, highlights, personal, looking ahead.
            </p>
          </Link>

          <Link
            to="/blog/technical-dispatch"
            className="block p-5 border border-[#1a1a1a] dark:border-[#e8e6e3] no-underline text-[#1a1a1a] dark:text-[#e8e6e3] hover:bg-[#eee] dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="text-2xl" aria-hidden="true">🧾</span>
            <h2 className="font-newspaper text-xl font-bold mt-2 uppercase">
              Technical Dispatches
            </h2>
            <p className="text-sm text-[#555] dark:text-[#999] mt-1">
              Standalone deep-dive articles: DevOps, cPanel, GitHub, Cursor, n8n, bug fixes. Problem → Solution → Lessons.
            </p>
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default BlogIndex;
