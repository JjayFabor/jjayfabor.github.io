import ResumeSection from "./ResumeSection";

const skillGroups = [
  {
    title: "Languages",
    skills: ["PHP", "Python", "JavaScript", "TypeScript", "Dart", "C++", "C#"],
  },
  {
    title: "Frontend",
    skills: ["React", "Vite", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    skills: ["Laravel", "Livewire", "Django", "Flask", "Linux"],
  },
  {
    title: "Mobile",
    skills: ["React Native (Expo)", "Flutter"],
  },
  {
    title: "AI & Automation",
    skills: ["VAPI AI", "ElevenLabs", "Twilio", "n8n", "LLM Integration"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQLite", "Supabase"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Postman", "HubSpot CRM", "Vercel", "Render", "cPanel"],
  },
];

const SkillGroup = ({ title, skills }) => (
  <div className="mb-5 last:mb-0">
    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <ResumeSection id="tech-stack" title="Skills">
      {skillGroups.map((group) => (
        <SkillGroup key={group.title} title={group.title} skills={group.skills} />
      ))}
    </ResumeSection>
  );
};

export default TechStack;
