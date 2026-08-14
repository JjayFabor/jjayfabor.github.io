// Build-time prerenderer (runs after `vite build`, see package.json).
//
// The site is a client-rendered React SPA: the built `dist/index.html` ships an
// empty `<div id="root">`, so anything that does NOT execute JavaScript —
// notably AI answer engines (ChatGPT, Perplexity, Google AI Overviews) and
// link-preview bots (Slack, LinkedIn, X) — sees a blank page with only the
// homepage's <head>. Google *can* render JS, but relies on it too.
//
// This script fixes that WITHOUT touching the interactive app. For every route
// it writes a static `index.html` whose:
//   1. <head> carries route-correct <title>, description, canonical, OG/Twitter
//      and JSON-LD, and
//   2. <div id="root"> is pre-filled with a real, crawlable content shell.
// On load, `createRoot().render()` (see src/main.jsx) simply replaces that shell
// with the live app — so users get the normal SPA and there is no hydration.
//
// Project content is parsed from the SAME `content/projects/*.md` files the app
// uses (js-yaml frontmatter) and rendered through the SAME markdown pipeline
// (react-markdown + remark-gfm), so the crawlable HTML can't drift from the UI.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { load as loadYaml } from "js-yaml";
import { faq } from "../src/data/faq.js";
import {
  aiRoadmap,
  activeWeek,
  completedWeekCount,
  journeyWeeks,
  latestCompletedWeek,
  roadmapStages,
} from "../src/data/aiJourney.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const CONTENT = join(ROOT, "content", "projects");
const SITE = "https://jjayfabor.com";

// ---- content loading (mirrors src/data/projects.js) -----------------------

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

const toAbsolutePath = (p) =>
  typeof p === "string" && !/^https?:\/\//.test(p) && !p.startsWith("/")
    ? `/${p}`
    : p;

const parseProject = (raw) => {
  const match = FRONTMATTER.exec(raw);
  if (!match) return { body: raw.trim() };
  const data = loadYaml(match[1]) || {};
  if (data.image) data.image = toAbsolutePath(data.image);
  if (Array.isArray(data.screenshots))
    data.screenshots = data.screenshots.map(toAbsolutePath);
  return { ...data, body: match[2].trim() };
};

const byFeaturedThenDate = (a, b) => {
  if (Boolean(b.featured) !== Boolean(a.featured)) {
    return Boolean(b.featured) - Boolean(a.featured);
  }
  const ad = a.date || "";
  const bd = b.date || "";
  if (!ad && !bd) return 0;
  if (!ad) return 1;
  if (!bd) return -1;
  return bd.localeCompare(ad);
};

const projects = readdirSync(CONTENT)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseProject(readFileSync(join(CONTENT, f), "utf8")))
  .filter((p) => p.slug)
  .sort(byFeaturedThenDate);

// ---- small helpers --------------------------------------------------------

// Escape for use inside an HTML attribute value ("..."), incl. & and quotes.
const attr = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Escape for HTML text content.
const text = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Absolute URL for an on-site path or a value that's already absolute.
const abs = (p) => (!p ? p : /^https?:\/\//.test(p) ? p : `${SITE}${p}`);

// Strip authoring TODO comments, then render markdown exactly like the app.
const renderBody = (body) => {
  const clean = String(body || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
  if (!clean) return "";
  return renderToStaticMarkup(
    React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, clean),
  );
};

const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

// ---- template stamping ----------------------------------------------------

const template = readFileSync(join(DIST, "index.html"), "utf8");

// Replace a single tag (matched by `re`) with `replacement`. Non-greedy so a
// multi-line source tag is matched up to its first '>'.
const swap = (html, re, replacement) => html.replace(re, replacement);

// Build one route's HTML from the shared template.
function stampPage({
  title,
  description,
  canonical,
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = "summary_large_image",
  extraJsonLd = "",
  root,
}) {
  let html = template;
  const url = `${SITE}${canonical}`;
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${text(title)}</title>`);
  html = swap(
    html,
    /<meta\s+name="description"[\s\S]*?>/,
    `<meta name="description" content="${attr(description)}" />`,
  );
  html = swap(
    html,
    /<link\s+rel="canonical"[\s\S]*?>/,
    `<link rel="canonical" href="${attr(url)}" />`,
  );
  html = swap(
    html,
    /<meta\s+property="og:url"[\s\S]*?>/,
    `<meta property="og:url" content="${attr(url)}" />`,
  );
  html = swap(
    html,
    /<meta\s+property="og:title"[\s\S]*?>/,
    `<meta property="og:title" content="${attr(title)}" />`,
  );
  html = swap(
    html,
    /<meta\s+property="og:description"[\s\S]*?>/,
    `<meta property="og:description" content="${attr(description)}" />`,
  );
  html = swap(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?>/,
    `<meta name="twitter:title" content="${attr(title)}" />`,
  );
  html = swap(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?>/,
    `<meta name="twitter:description" content="${attr(description)}" />`,
  );
  html = swap(
    html,
    /<meta\s+name="twitter:card"[\s\S]*?>/,
    `<meta name="twitter:card" content="${attr(twitterCard)}" />`,
  );
  if (ogImage) {
    const img = abs(ogImage);
    html = swap(
      html,
      /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta property="og:image" content="${attr(img)}" />`,
    );
    html = swap(
      html,
      /<meta\s+name="twitter:image"[\s\S]*?>/,
      `<meta name="twitter:image" content="${attr(img)}" />`,
    );
    html = swap(
      html,
      /<meta\s+property="og:image:width"[\s\S]*?>/,
      `<meta property="og:image:width" content="${attr(ogImageWidth)}" />`,
    );
    html = swap(
      html,
      /<meta\s+property="og:image:height"[\s\S]*?>/,
      `<meta property="og:image:height" content="${attr(ogImageHeight)}" />`,
    );
  }
  if (extraJsonLd) html = html.replace("</head>", `    ${extraJsonLd}\n  </head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${root}</div>`,
  );
  return html;
}

// The crawlable shell is transient (React replaces it on mount), so it needs
// only enough inline style to read cleanly on the default dark theme's first
// paint. Content, not pixels, is the point.
const shell = (inner) =>
  `<div style="max-width:56rem;margin:0 auto;padding:2rem 1.5rem;line-height:1.6">${inner}</div>`;

function writePage(routePath, html) {
  const outDir = routePath === "/" ? DIST : join(DIST, routePath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
}

// ---- per-project pages ----------------------------------------------------

const projectListItems = projects
  .map(
    (p) =>
      `<li><a href="/projects/${attr(p.slug)}">${text(p.title)}</a>${
        p.description ? ` — ${text(p.description)}` : ""
      }</li>`,
  )
  .join("\n");

// Social cards are pre-generated at exactly 1200x630 by scripts/og-cards.py, which
// is what the og:image:width/height tags claim. Falling back to the raw project
// image would reinstate the mismatch — those range from portrait to ultra-wide, and
// three are SVG, which most platforms refuse to render in a card.
function ogCardFor(p) {
  const card = `/og/${p.slug}.png`;
  if (existsSync(new URL(`../public${card}`, import.meta.url))) return card;
  console.warn(`prerender: no og card for ${p.slug} — run \`npm run og:cards\``);
  return p.image;
}

for (const p of projects) {
  const canonical = `/projects/${p.slug}`;
  const metaBits = [p.status === "completed" ? "Completed" : "Ongoing", p.category, p.date]
    .filter(Boolean)
    .join(" · ");
  const tech = Array.isArray(p.techStack) ? p.techStack : [];
  const links = [
    p.link ? `<a href="${attr(p.link)}">Source code (GitHub)</a>` : "",
    p.preview ? `<a href="${attr(p.preview)}">Live preview</a>` : "",
  ]
    .filter(Boolean)
    .join(" &middot; ");

  const inner = [
    `<p><a href="/projects">← Back to projects</a></p>`,
    p.contextLabel ? `<p>${text(p.contextLabel)}</p>` : "",
    `<h1>${text(p.title)}</h1>`,
    `<p>${text(metaBits)}</p>`,
    p.description ? `<p>${text(p.description)}</p>` : "",
    tech.length
      ? `<p><strong>Tech stack:</strong> ${tech.map(text).join(", ")}</p>`
      : "",
    links ? `<p>${links}</p>` : "",
    renderBody(p.body),
  ]
    .filter(Boolean)
    .join("\n");

  const ld = jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description || undefined,
        url: `${SITE}${canonical}`,
        author: { "@type": "Person", name: "Jjay Fabor", url: `${SITE}/` },
        dateCreated: p.date || undefined,
        keywords: tech.length ? tech.join(", ") : undefined,
        image: p.image ? abs(p.image) : undefined,
        ...(p.link ? { codeRepository: p.link } : {}),
        isPartOf: { "@type": "WebSite", name: "Jaylord Vhan Fabor Portfolio", url: `${SITE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
          { "@type": "ListItem", position: 3, name: p.title, item: `${SITE}${canonical}` },
        ],
      },
    ],
  });

  writePage(canonical, stampPage({
    title: `${p.title} — Jjay Fabor`,
    description: p.description || `${p.title} — a project by Jjay Fabor.`,
    canonical,
    ogImage: ogCardFor(p),
    extraJsonLd: ld,
    root: shell(inner),
  }));
}

// ---- /projects list page --------------------------------------------------

writePage("/projects", stampPage({
  title: "Projects — Jjay Fabor",
  description:
    "Projects by Jjay Fabor (Jaylord Vhan Fabor) — backend systems, REST APIs, full-stack and mobile apps, and AI automation across Laravel, Python, React, and n8n/VAPI.",
  canonical: "/projects",
  ogImage: "/logo-jf.png",
  ogImageWidth: 1026,
  ogImageHeight: 1026,
  twitterCard: "summary",
  extraJsonLd: jsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects — Jjay Fabor",
    url: `${SITE}/projects`,
    isPartOf: { "@type": "WebSite", name: "Jaylord Vhan Fabor Portfolio", url: `${SITE}/` },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      url: `${SITE}/projects/${p.slug}`,
    })),
  }),
  root: shell(
    `<h1>Projects</h1><p>Selected work by Jjay Fabor (Jaylord Vhan Fabor).</p><ul>\n${projectListItems}\n</ul>`,
  ),
}));

// ---- homepage --------------------------------------------------------------
//
// The homepage's real copy lives in React components (Bio/About/Experience).
// This is a hand-kept factual summary so answer engines can describe who Jjay
// is without executing JS. Keep it in sync if the bio/experience change.
const homeInner = `
<h1>Jaylord Vhan Fabor (Jjay Fabor)</h1>
<p><strong>Software Engineer</strong> — @JjayFabor — based in Iloilo City, Philippines.</p>
<p>I build clean, reliable, and scalable backend systems — from APIs and database design to automation — with well-structured code that's easy to maintain and built to last.</p>
<p>I focus on productive, real-world applications: clean, scalable backends and APIs, and automated workflows that save teams hours of manual work. Lately I've been leveraging AI to make products genuinely more useful — integrating AI voice agents, automating business processes with n8n, and wiring LLMs into real workflows.</p>
<h2>Currently</h2>
<p>Junior Software Developer at Callbox Iloilo — HubSpot CRM development (custom workflows, coded actions, API integrations), n8n business-process automation, and VAPI AI voice agents.</p>
<h2>Core skills</h2>
<p>Laravel, PHP, Livewire, Python, Django, REST API development, React, React Native, Expo, Flutter, TailwindCSS, MySQL, PostgreSQL, Supabase, HubSpot CRM, n8n automation, VAPI AI, ElevenLabs, Twilio, AI/LLM integration, Git &amp; GitHub.</p>
<h2>Education</h2>
<p>BS Computer Science, Central Philippine University (2021–2025). Vocational Degree in Computer Technology, Professional Electronics Institute, Inc. (2019–2021).</p>
<h2>Projects</h2>
<ul>
${projectListItems}
</ul>
<h2>Contact</h2>
<p><a href="https://github.com/JjayFabor">GitHub</a> &middot; <a href="https://www.linkedin.com/in/jjayfabor/">LinkedIn</a></p>
`.trim();

writePage("/", stampPage({
  title: "Jaylord Vhan Fabor (Jjay Fabor) — Software Engineer",
  description:
    "Jaylord Vhan Fabor (Jjay Fabor) is a Software Engineer based in Iloilo, Philippines who builds productive, real-world apps — scalable Laravel/PHP & Python backends, REST APIs, React & mobile apps (React Native, Flutter), HubSpot CRM development, and AI-powered automation with n8n and VAPI AI.",
  canonical: "/",
  ogImage: "/logo-jf.png",
  ogImageWidth: 1026,
  ogImageHeight: 1026,
  twitterCard: "summary",
  root: shell(homeInner),
}));

// ---- /faq ---------------------------------------------------------------

const faqDescription =
  "Concise answers about Jjay Fabor's software engineering background, specialties, tools, availability, and location.";

const faqInner = `
<p><a href="/">← Back to home</a></p>
<h1>Frequently asked questions</h1>
<p>${text(faqDescription)}</p>
<dl>
${faq.map((f) => `<dt>${text(f.q)}</dt><dd>${text(f.a)}</dd>`).join("\n")}
</dl>
`.trim();

// FAQPage structured data mirrors the visible /faq questions and answers.
const faqLd = jsonLd({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

writePage("/faq", stampPage({
  title: "Frequently Asked Questions — Jjay Fabor",
  description: faqDescription,
  canonical: "/faq",
  ogImage: "/logo-jf.png",
  ogImageWidth: 1026,
  ogImageHeight: 1026,
  twitterCard: "summary",
  extraJsonLd: faqLd,
  root: shell(faqInner),
}));

// ---- /ai-journey ---------------------------------------------------------

const journeyDescription =
  "Follow Jjay Fabor's project-based journey toward AI Engineering, from Python and data foundations to machine learning, LLMs, RAG, agents, and production AI systems.";

const statusLabel = (status) =>
  ({ completed: "Completed", "in-progress": "In Progress", upcoming: "Upcoming" })[
    status
  ] || status;

const journeyInner = `
<p><a href="/">← Back to home</a></p>
<p>${text(aiRoadmap.title)}</p>
<h1>Building toward AI Engineering</h1>
<p>${text(aiRoadmap.introduction)}</p>
<h2>${aiRoadmap.totalWeeks}-week project-based roadmap</h2>
<p>Week ${completedWeekCount} of ${aiRoadmap.totalWeeks} completed</p>
${latestCompletedWeek?.project ? `<h3>Latest completed capstone: ${text(latestCompletedWeek.project.name)}</h3>
<p><a href="${attr(latestCompletedWeek.project.github)}">View GitHub repository</a></p>` : ""}
${latestCompletedWeek && activeWeek ? `<h3>Active progression</h3>
<p>Week ${latestCompletedWeek.week} shipped → Week ${activeWeek.week} · ${text(activeWeek.title)} · ${text(statusLabel(activeWeek.status))}</p>` : ""}
<h2>Weekly progress</h2>
${journeyWeeks
  .map(
    (week) => `<article>
<h3>Week ${week.week}: ${text(week.title)}</h3>
<p>${text(statusLabel(week.status))}${
      week.dateCompleted ? ` · Completed ${text(week.dateCompleted)}` : ""
    }</p>
${week.summary ? `<p>${text(week.summary)}</p>` : ""}
${week.project ? `<h4>Capstone: ${text(week.project.name)}</h4>
${week.project.description ? `<p>${text(week.project.description)}</p>` : ""}
${week.project.tech?.length ? `<p><strong>Tech:</strong> ${week.project.tech.map(text).join(", ")}</p>` : ""}
<p>${week.project.github ? `<a href="${attr(week.project.github)}">GitHub repository</a>` : ""}${
      week.project.liveDemo
        ? ` · <a href="${attr(week.project.liveDemo)}">Live demo</a>`
        : ""
    }</p>` : ""}
${week.skills?.length ? `<h4>Skills learned</h4>
<ul>${week.skills.map((skill) => `<li>${text(skill)}</li>`).join("")}</ul>` : ""}
${week.keyLessons?.length ? `<h4>Key lessons</h4>
<ul>${week.keyLessons.map((lesson) => `<li>${text(lesson)}</li>`).join("")}</ul>` : ""}
</article>`,
  )
  .join("\n")}
<h2>Overall roadmap</h2>
<ol>
${roadmapStages
  .map((stage) => `<li><strong>${text(stage.title)}</strong> — ${text(statusLabel(stage.status))}</li>`)
  .join("\n")}
</ol>
`.trim();

const journeyLd = jsonLd({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "AI Engineering Journey — Jjay Fabor",
      description: journeyDescription,
      url: `${SITE}/ai-journey`,
      author: { "@type": "Person", name: "Jjay Fabor", url: `${SITE}/` },
      isPartOf: { "@type": "WebSite", name: "Jaylord Vhan Fabor Portfolio", url: `${SITE}/` },
      hasPart: journeyWeeks.map((week) => ({
        "@type": "CreativeWork",
        name: `Week ${week.week}: ${week.project?.name || week.title}`,
        description: week.project?.description || week.summary,
        dateCreated: week.dateCompleted || undefined,
        codeRepository: week.project?.github || undefined,
        keywords: week.project?.tech?.join(", ") || undefined,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Engineering Journey",
          item: `${SITE}/ai-journey`,
        },
      ],
    },
  ],
});

writePage("/ai-journey", stampPage({
  title: "AI Engineering Journey — Jjay Fabor",
  description: journeyDescription,
  canonical: "/ai-journey",
  ogImage: "/logo-jf.png",
  ogImageWidth: 1026,
  ogImageHeight: 1026,
  twitterCard: "summary",
  extraJsonLd: journeyLd,
  root: shell(journeyInner),
}));

// ---- sitemap.xml (complete + always in sync with the project set) ---------

const sitemapUrls = [
  { loc: `${SITE}/`, priority: "1.0", changefreq: "weekly" },
  { loc: `${SITE}/faq`, priority: "0.7", changefreq: "monthly" },
  { loc: `${SITE}/ai-journey`, priority: "0.8", changefreq: "weekly" },
  { loc: `${SITE}/projects`, priority: "0.8", changefreq: "weekly" },
  ...projects.map((p) => ({
    loc: `${SITE}/projects/${p.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: p.date || undefined,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>${
        u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""
      }\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf8");

console.log(
  `prerender: wrote ${projects.length} project pages + home + /faq + /ai-journey + /projects + sitemap.xml`,
);
