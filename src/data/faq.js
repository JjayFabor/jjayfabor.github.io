// Shared FAQ content — the single source of truth for:
//   1. the visible FAQ section (src/components/Faq.jsx),
//   2. the prerendered homepage shell + FAQPage JSON-LD (scripts/prerender.mjs).
// Keeping it here means the answer-engine-facing copy can never drift from what
// visitors actually see. Answers are written to stand alone (each names "Jjay
// Fabor" rather than "he") so an AI engine can quote one without surrounding
// context — the format that earns citations.
export const faq = [
  {
    q: "Who is Jjay Fabor?",
    a: "Jjay Fabor (full name Jaylord Vhan Fabor) is a software engineer based in Iloilo City, Philippines. He builds clean, reliable, and scalable backend systems — APIs, database design, and automation — and increasingly integrates AI into real-world products. He also goes by the handle Jjayntic.",
  },
  {
    q: "What does Jjay Fabor specialize in?",
    a: "Jjay Fabor focuses on backend and full-stack development: Laravel/PHP and Python backends, REST API design, and business-process automation. Lately he specializes in AI integration — building AI voice agents, automating workflows with n8n, and wiring large language models into production apps.",
  },
  {
    q: "What technologies and tools does Jjay Fabor use?",
    a: "Jjay Fabor works primarily with Laravel, PHP, Livewire, Python, and Django on the backend; React, React Native, Flutter, and TailwindCSS for web and mobile; MySQL, PostgreSQL, and Supabase for data; and n8n, VAPI AI, ElevenLabs, and Twilio for automation and AI voice agents.",
  },
  {
    q: "Is Jjay Fabor available for freelance work or hire?",
    a: "Yes. Jjay Fabor is open to freelance software engineering projects and has delivered SaaS features, cross-platform mobile apps, payment integrations, and AI voice-agent APIs for clients. The best way to reach him is the contact form on this site or his LinkedIn profile.",
  },
  {
    q: "Where is Jjay Fabor based?",
    a: "Jjay Fabor is based in Iloilo City, Western Visayas, Philippines, and works with both local and remote clients.",
  },
];
