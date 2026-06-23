import { useState } from 'react';
import ResumeSection from './ResumeSection';

const About = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const education = [
    {
      school: "Central Philippine University",
      degree: "Bachelor of Science in Computer Science",
      year: "2021 - 2025",
      description: "Focused on software development with C# and ASP.NET, covering full-stack web application development, database management, and enterprise solutions. Also explored Artificial Intelligence and Machine Learning concepts, including data analytics and automation.",
      logo: "logo/cpu_logo.png",
      skills: ["C#", "ASP.NET", "AI/ML", "Python", "Database Management"]
    },
    {
      school: "Professional Electronics Institute, Inc.",
      degree: "Vocational Degree in Computer Technology",
      year: "2019 - 2021",
      description: "Completed an intensive program focused on computer hardware servicing, networking, and software development, gaining hands-on experience in troubleshooting, system maintenance, and programming.",
      logo: "logo/peii_logo.png",
      skills: ["Hardware Servicing", "Networking", "Software Development"]
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ResumeSection id="about" title="About">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        I'm a software engineer focused on building productive, real-world
        applications &mdash; from clean, scalable backends and APIs to
        automated workflows that save teams hours of manual work.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
        Lately I've been leveraging AI to make products genuinely more useful:
        integrating AI voice agents, automating business processes with n8n, and
        wiring LLMs into real workflows. My goal is always the same &mdash;
        practical tools that help people work faster and smarter.
      </p>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-8 mb-3">
        Education
      </h3>
      <div className="space-y-3">
        {education.map((edu, index) => {
          const isOpen = expandedIndex === index;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleExpand(index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700">
                  <img
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                    {edu.school}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{edu.degree}</p>
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    {edu.year}
                  </span>
                </div>
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                    {edu.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {edu.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ResumeSection>
  );
};

export default About;
