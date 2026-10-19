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
    a: "I'm Jjay Fabor (full name Jaylord Vhan Fabor), a software engineer and AI engineer based in Iloilo City, Philippines. I build AI agents, developer tools, and workflow automation — software where AI does useful work inside real systems — on top of reliable backends.",
  },
  {
    q: "What does Jjay Fabor specialize in?",
    a: "I specialize in AI engineering and automation: building AI agents with the Claude Agent SDK, MCP servers and connectors, AI voice agents, n8n workflows, and large language model integrations for production apps. Underneath that is solid backend and full-stack work — Laravel/PHP and Python backends, REST API design, and business-process automation.",
  },
  {
    q: "What technologies and tools does Jjay Fabor use?",
    a: "I work primarily with Laravel, PHP, Livewire, Python, and Django on the backend; React, React Native, Flutter, and TailwindCSS for web and mobile; and MySQL, PostgreSQL, SQLite, and Supabase for databases. For AI and automation I use the Claude Agent SDK, MCP, n8n, Cloudflare Workers, VAPI AI, ElevenLabs, and Twilio.",
  },
  {
    q: "What AI engineering projects has Jjay Fabor built?",
    a: "I've built Delphi, a self-hosted personal AI agent on the Claude Agent SDK with persistent memory, teachable skills, MCP connectors, and scheduled tasks, reachable over Telegram and Discord. At work I built n8n workflows that automate role-based document provisioning across the employee lifecycle, VAPI AI voice agents that handle 300+ outbound calls per campaign, and HubSpot custom-coded actions and API integrations. As a freelancer I built a REST API that an ElevenLabs voice agent calls over Twilio to authenticate users and book appointments live.",
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
