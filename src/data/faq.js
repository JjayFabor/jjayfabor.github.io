// Shared FAQ content — the single source of truth for:
//   1. the visible FAQ accordion (src/components/Faq.jsx),
//   2. the prerendered /faq shell + FAQPage JSON-LD (scripts/prerender.mjs).
// Keeping it here means the answer-engine-facing copy can never drift from what
// visitors see. Answers are first person (Jjay's own voice), but the questions
// name "Jjay Fabor" and the first answer anchors the full name, so an AI engine
// can still attach a quoted answer to the right person.
export const faq = [
  {
    q: "Who is Jjay Fabor?",
    a: "I'm Jjay Fabor (full name Jaylord Vhan Fabor), a software engineer based in Iloilo City, Philippines, and an aspiring data engineer. I'm building toward Data Engineering through hands-on work with Python data pipelines, data quality, databases, and automation, while continuing to build reliable backend systems and AI-powered products.",
  },
  {
    q: "What does Jjay Fabor specialize in?",
    a: "I focus on backend and full-stack development: Laravel/PHP and Python backends, REST API design, and business-process automation. I'm also building Data Engineering skills through Python data pipelines, cleaning and validation, relational data modeling, and database integrations. My AI work includes voice agents, n8n workflows, and large language model integrations for production apps.",
  },
  {
    q: "What technologies and tools does Jjay Fabor use?",
    a: "I work primarily with Laravel, PHP, Livewire, Python, and Django on the backend; React, React Native, Flutter, and TailwindCSS for web and mobile; and MySQL, PostgreSQL, SQLite, and Supabase for databases. For hands-on Data Engineering work, I use Pandas for data pipelines, cleaning, and validation, and I practice relational data modeling with MySQL, PostgreSQL, and SQLite. I also use n8n, VAPI AI, ElevenLabs, and Twilio for automation and AI voice agents.",
  },
  {
    q: "What Data Engineering projects has Jjay Fabor built?",
    a: "I've built AI Model Usage Analyzer, a Python and Pandas pipeline that cleans and validates API usage logs, analyzes IQR outliers, and exports analysis-ready CSV and JSON results. I also built HubSpot Pipeline Data Sync, a workflow and REST API integration that synchronizes CRM records with MySQL. These are hands-on projects supporting my ongoing transition into Data Engineering, not professional Data Engineer employment.",
  },
  {
    q: "Is Jjay Fabor available for freelance work or hire?",
    a: "Yes — I'm open to freelance software engineering projects. I've delivered SaaS features, cross-platform mobile apps, payment integrations, and AI voice-agent APIs for clients. The best way to reach me is the contact form on this site or my LinkedIn profile.",
  },
  {
    q: "Where is Jjay Fabor based?",
    a: "I'm based in Iloilo City, Western Visayas, Philippines, and I work with both local and remote clients.",
  },
];
