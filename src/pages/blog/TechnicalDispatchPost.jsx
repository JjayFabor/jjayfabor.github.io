import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getTechnicalDispatchBySlug } from "../../data/technicalDispatches";

const TechnicalDispatchPost = () => {
  const { slug } = useParams();
  const post = getTechnicalDispatchBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Technical Dispatch — Jjay Fabor`;
    }
    return () => {
      document.title = "Jjay Fabor — Software Developer | Backend Engineer";
    };
  }, [post]);

  if (!post) return <Navigate to="/blog/technical-dispatch" replace />;

  return (
    <section
      className="min-h-screen bg-[#f5f2eb] dark:bg-[#1c1c1c] py-6 px-4 pb-28 font-newspaperBody text-[#1a1a1a] dark:text-[#e8e6e3]"
      aria-label="Technical Dispatch"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog/technical-dispatch"
          className="inline-block text-xs uppercase tracking-widest text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e6e3] mb-6 no-underline"
        >
          ← All dispatches
        </Link>

        <header className="border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-[#555] dark:text-[#999] mb-1">
            Technical Dispatch
          </p>
          <h1 className="font-newspaper text-2xl md:text-3xl font-bold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-[#555] dark:text-[#999]">
            {post.date}
          </p>
        </header>

        <div className="space-y-6 text-[15px] leading-[1.55]">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1 mb-2 font-newspaper">
                {section.label}
              </h2>
              <div className="text-[#2a2a2a] dark:text-[#d8d6d3] whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalDispatchPost;
