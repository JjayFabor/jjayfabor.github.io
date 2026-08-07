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
    a: "I'm Jjay Fabor (full name Jaylord Vhan Fabor), a software engineer based in Iloilo City, Philippines. I build clean, reliable, and scalable backend systems — APIs, database design, and automation — and I increasingly integrate AI into real-world products. Online I also go by Jjayntic.",
  },
  {
    q: "What does Jjay Fabor specialize in?",
    a: "I focus on backend and full-stack development: Laravel/PHP and Python backends, REST API design, and business-process automation. Lately I specialize in AI integration — building AI voice agents, automating workflows with n8n, and wiring large language models into production apps.",
  },
  {
    q: "What technologies and tools does Jjay Fabor use?",
    a: "I work primarily with Laravel, PHP, Livewire, Python, and Django on the backend; React, React Native, Flutter, and TailwindCSS for web and mobile; MySQL, PostgreSQL, and Supabase for data; and n8n, VAPI AI, ElevenLabs, and Twilio for automation and AI voice agents.",
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
