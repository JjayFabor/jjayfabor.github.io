import { useEffect } from "react";
import { Link } from "react-router-dom";
import { technicalDispatchSlugs } from "../../data/technicalDispatches";
import { getTechnicalDispatchBySlug } from "../../data/technicalDispatches";

const TechnicalDispatchList = () => {
  useEffect(() => {
    document.title = "Technical Dispatches — Jjay Fabor";
    return () => {
      document.title = "Jjay Fabor — Software Developer | Backend Engineer";
    };
  }, []);

  const posts = technicalDispatchSlugs
    .map((slug) => getTechnicalDispatchBySlug(slug))
    .filter(Boolean);

  return (
    <section
      className="min-h-screen bg-[#f5f2eb] dark:bg-[#1c1c1c] py-8 px-4 pb-28 font-newspaperBody"
      aria-label="Technical Dispatches"
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
            Technical Dispatches
          </h1>
          <p className="mt-2 text-[#444] dark:text-[#aaa] text-[15px]">
            Standalone deep-dives: Problem → Context → Investigation → Solution → Lessons.
          </p>
        </header>

        <ul className="space-y-3 list-none p-0 m-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/technical-dispatch/${post.slug}`}
                className="block py-3 border-b border-[#ccc] dark:border-[#444] no-underline text-[#1a1a1a] dark:text-[#e8e6e3] hover:underline"
              >
                <span className="font-newspaper font-semibold">
                  {post.title}
                </span>
                <span className="text-[#666] dark:text-[#888] text-sm block mt-0.5">
                  {post.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="text-[#666] dark:text-[#888]">No dispatches yet.</p>
        )}
      </div>
    </section>
  );
};

export default TechnicalDispatchList;
