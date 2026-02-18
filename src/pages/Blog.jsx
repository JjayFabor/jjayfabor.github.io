import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogData } from "../data/blogEntries";

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

function ArticleSection({ section, author }) {
  const byline = section.bylineDate
    ? `By ${author} | ${section.bylineDate}`
    : null;
  const bodyItems = Array.isArray(section.body) ? section.body : [section.body];

  return (
    <article className="break-inside-avoid mb-8">
      <h2 className="font-newspaper text-xl font-bold text-[#1a1a1a] dark:text-[#e8e6e3] mb-1">
        {section.title}
      </h2>
      {byline && (
        <p className="text-xs uppercase tracking-wide text-[#666] dark:text-[#888] mb-3">
          {byline}
        </p>
      )}
      <div className="space-y-3">
        {bodyItems.map((item, i) => {
          if (typeof item === "string") {
            return (
              <p key={i} className="leading-[1.55] text-[#2a2a2a] dark:text-[#d8d6d3]">
                {item}
              </p>
            );
          }
          if (item && item.pullQuote) {
            return <PullQuoteBlock key={i} pullQuote={item.pullQuote} />;
          }
          return null;
        })}
      </div>
      {section.imagePlaceholder && (
        <p className="mt-3 text-sm italic text-[#666] dark:text-[#888] border border-dashed border-[#999] dark:border-[#666] py-4 px-3 text-center">
          [{section.imagePlaceholder}]
        </p>
      )}
      {section.pullQuote && (
        <PullQuoteBlock pullQuote={section.pullQuote} />
      )}
    </article>
  );
}

function HighlightsSection({ section }) {
  return (
    <article className="break-inside-avoid mb-8">
      <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] dark:text-[#e8e6e3] border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-4 font-newspaper">
        {section.title}
      </h2>
      <ul className="space-y-2 text-[15px]">
        {section.items.map((item, i) => (
          <li key={i} className="leading-[1.5]">
            <span className="font-semibold text-[#1a1a1a] dark:text-[#e8e6e3]">
              {item.category}:
            </span>{" "}
            <span className="text-[#2a2a2a] dark:text-[#d8d6d3]">{item.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SubsectionBlock({ section }) {
  return (
    <article className="break-inside-avoid mb-8">
      <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] dark:text-[#e8e6e3] border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-4 font-newspaper">
        {section.title}
      </h2>
      <div className="space-y-5">
        {section.entries.map((entry, i) => (
          <section key={i} className="break-inside-avoid">
            <h3 className="font-newspaper font-semibold text-[#1a1a1a] dark:text-[#e8e6e3] text-base mb-1">
              {entry.title}
            </h3>
            <p className="leading-[1.55] text-[#2a2a2a] dark:text-[#d8d6d3] text-[15px]">
              {entry.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}

function BlockSection({ section }) {
  const paragraphs = Array.isArray(section.body) ? section.body : [section.body];
  return (
    <article className="break-inside-avoid mb-8">
      <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1a1a1a] dark:text-[#e8e6e3] border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-1.5 mb-3 font-newspaper">
        {section.title}
      </h2>
      {section.subtitle && (
        <h3 className="font-newspaper font-semibold text-[#1a1a1a] dark:text-[#e8e6e3] text-base mb-2">
          {section.subtitle}
        </h3>
      )}
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="leading-[1.55] text-[#2a2a2a] dark:text-[#d8d6d3] text-[15px]">
            {p}
          </p>
        ))}
      </div>
      {section.pullQuote && (
        <PullQuoteBlock pullQuote={section.pullQuote} />
      )}
    </article>
  );
}

const Blog = () => {
  useEffect(() => {
    document.title = "Blog — Jjay Fabor";
    return () => {
      document.title = "Jjay Fabor — Software Developer | Backend Engineer";
    };
  }, []);

  const {
    mastheadTitle,
    tagline,
    mastheadDate,
    volumeIssue,
    author,
    sections,
  } = blogData;

  return (
    <section
      className="min-h-screen bg-[#f5f2eb] dark:bg-[#1c1c1c] py-6 px-4 pb-28 font-newspaperBody text-[#1a1a1a] dark:text-[#e8e6e3]"
      aria-label="Weekly blog"
    >
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-block text-xs uppercase tracking-widest text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e6e3] mb-6 no-underline"
        >
          ← Home
        </Link>

        <header className="border-b border-[#1a1a1a] dark:border-[#e8e6e3] pb-4 mb-6">
          <h1 className="font-newspaper text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#e8e6e3] uppercase">
            {mastheadTitle}
          </h1>
          {tagline && (
            <p className="mt-1 text-base text-[#444] dark:text-[#aaa] font-newspaperBody">
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
          className="columns-1 md:columns-2 lg:columns-3 gap-10 text-[15px] leading-[1.5]"
          style={{ columnFill: "balance" }}
        >
          {sections.map((section, idx) => {
            const key = section.id || idx;
            if (section.type === "article") {
              return (
                <ArticleSection
                  key={key}
                  section={section}
                  author={author}
                />
              );
            }
            if (section.type === "highlights") {
              return <HighlightsSection key={key} section={section} />;
            }
            if (section.type === "subsection") {
              return <SubsectionBlock key={key} section={section} />;
            }
            if (section.type === "block") {
              return <BlockSection key={key} section={section} />;
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
