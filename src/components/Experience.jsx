import { useState } from 'react';
import ResumeSection from './ResumeSection';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const experiences = [
    {
      company: "Callbox Inc, Iloilo City",
      position: "Junior Software Developer",
      period: "10/2025 – 07/2026",
      description: [
        "Developed and customized HubSpot CRM solutions for sales and marketing teams — automated workflows, custom-coded actions (JavaScript/Python), and API integrations connecting HubSpot to the company pipeline database.",
        "Built and deployed an AI-powered Google Chat bot on Google Cloud Run, integrating Vertex AI and a RAG pipeline that uses historical Google Chat Space conversations as a knowledge base to provide context-aware, grounded responses.",
        "Built n8n workflows automating role-based document provisioning across the employee lifecycle — granting, revoking, and reassigning access to role-specific documents on hire, promotion, and demotion, with automated delivery via Google Drive, SFTP, and email.",
        "Implemented VAPI AI voice agents for automated webinar invitations and event reminders, handling 300+ outbound calls per campaign and increasing attendance.",
        "Coordinated between development and operations teams to ensure controlled, low-risk feature rollouts and deployments.",
        "Performed proactive debugging and issue resolution to reduce downtime and improve overall platform reliability."
      ],
      logo: "logo/callbox_logo.jpg",
      skills: ["HubSpot CRM", "JavaScript", "Python", "Vertex AI", "Google Cloud Run", "RAG", "n8n", "VAPI AI", "API Development", "Git"]
    },
    {
      company: "Freelance, Iloilo City",
      position: "Software Developer",
      period: "06/2025 – present",
      logo: "/logo-jf.png",
      clients: [
        {
          name: "Smartgenix",
          description: [
            "Developing a custom REST API consumed as a webhook by an ElevenLabs AI voice agent via Twilio — handling user authentication, OTP verification, and appointment booking over live phone calls.",
            "Building a cross-platform Flutter mobile app for iOS and Android, extending the platform's core booking features and AI-powered scheduling to mobile users.",
            "Integrated Stripe for in-app payments and wallet functionality.",
            "Designed the data model and API architecture supporting users, providers, availability, bookings.",
            "Improved frontend UI/UX and optimized backend query performance ahead of launch.",
          ],
          skills: ["Laravel", "PHP", "Livewire", "Flutter", "Mobile Development", "API Development", "Stripe", "ElevenLabs", "Twilio", "Git"]
        }
      ]
    },
    {
      company: "Callbox Inc, Iloilo City",
      position: "Software Development Intern",
      period: "02/2025 – 05/2025",
      description: [
        "Assisted in the development and implementation of Laravel-based applications.",
        "Helped optimize application performance.",
        "Collaborated with the development team to integrate frontend and backend components.",
        "Gained hands-on experience with Laravel, MySQL, and best practices in web development."
      ],
      logo: "logo/callbox_logo.jpg",
      skills: ["Laravel", "PHP", "MySQL", "Bootstrap", "API Development", "Git", "PhpMyAdmin"]
    },
    {
      company: "Central Philippine University - Thesis Project",
      position: "Lead Programmer",
      period: "09/2023 - 12/2023",
      description: [
        "Designed and implemented a semi-automated hydroponic system with integrated sensors",
        "Developed machine learning models to predict optimal lettuce growth days",
        "Built the system using Arduino C++, Python (Flask, ML), JavaScript, HTML, and CSS"
      ],
      logo: "logo/cpu_logo.png",
      skills: ["Python", "Arduino", "C++", "Flask", "Machine Learning", "Web Development", "Github", "Jupyter Notebook", "SQlite"]
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ResumeSection id="experience" title="Experience">
      <div className="space-y-3">
        {experiences.map((exp, index) => {
          const isOpen = expandedIndex === index;
          return (
            <div
              key={index}
              className="bg-brand-surface rounded-lg border border-brand-border overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleExpand(index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 flex items-center gap-4 hover:bg-brand-border/40 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-brand-border bg-white">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                    <h3 className="text-base font-semibold text-brand-text">
                      {exp.position}
                    </h3>
                    <span className="text-sm font-medium text-brand-accent self-start whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-brand-muted mt-0.5">{exp.company}</p>
                </div>

                <svg
                  className={`flex-shrink-0 w-5 h-5 text-brand-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-brand-border">
                  {exp.clients ? (
                    <div className="mt-3 space-y-5">
                      {exp.clients.map((client, ci) => (
                        <div key={ci}>
                          <h4 className="text-sm font-semibold text-brand-text">
                            {client.name}
                          </h4>
                          <ul className="text-brand-text/85 leading-relaxed mt-2 space-y-2 list-disc pl-5">
                            {client.description.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                          {client.skills && client.skills.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {client.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="bg-brand-accent/10 text-brand-accent font-mono text-[11px] px-2 py-0.5 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <ul className="text-brand-text/85 leading-relaxed mt-3 space-y-2 list-disc pl-5">
                        {exp.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-brand-accent/10 text-brand-accent font-mono text-[11px] px-2 py-0.5 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ResumeSection>
  );
};

export default Experience;
