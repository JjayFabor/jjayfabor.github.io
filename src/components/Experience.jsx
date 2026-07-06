import { useState } from 'react';
import ResumeSection from './ResumeSection';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const experiences = [
    {
      company: "Callbox Iloilo",
      position: "Junior Software Developer",
      period: "10/2025 - 07/2026",
      description: [
        "Streamline development workflows by creating comprehensive project documentation, enabling faster onboarding and reducing knowledge gaps across teams",
        "Develop and customize HubSpot CRM solutions — building automated workflows, custom-coded actions, and API integrations to streamline sales and marketing operations",
        "Bridge communication between developers and operations teams to ensure smooth feature rollouts and minimize deployment risks",
        "Accelerate issue resolution through proactive code debugging and troubleshooting, reducing system downtime and improving overall reliability",
        "Automate business processes using n8n workflows, saving hours of manual work and increasing operational efficiency",
        "Enhance customer engagement by implementing VAPI AI Voice Agents for webinar invitations and event reminders, improving attendance rates and user experience"
      ],
      logo: "logo/callbox_logo.jpg",
      skills: ["Laravel", "PHP", "MySQL", "HubSpot CRM", "n8n", "VAPI AI", "API Development", "Documentation", "Git", "Automation"]
    },
    {
      company: "Personal",
      position: "Freelance Software Engineer",
      period: "06/2025 - present",
      logo: "logo/jjayntic.png",
      clients: [
        {
          name: "Smartgenix",
          description: [
            "Developed and enhanced a SaaS application by improving frontend UI/UX design and backend performance",
            "Built a cross-platform mobile app with Flutter to extend the platform to mobile users, with access to core features and AI-powered appointment booking",
            "Integrated Stripe Wallet for secure, seamless payment processing",
            "Built a custom API consumed by an ElevenLabs AI Voice Agent (via Twilio) as a webhook for user authentication, OTP verification, and appointment booking",
            "Strengthened application security measures and optimized overall user experience and system efficiency"
          ],
          skills: ["Laravel", "PHP", "Livewire", "Flutter", "Mobile Development", "API Development", "Stripe", "ElevenLabs", "Twilio", "Git"]
        }
      ]
    },
    {
      company: "Callbox Iloilo",
      position: "Intern Software Developer",
      period: "02/2025 - 05/2025",
      description: [
        "Working primarily as a backend developer using Laravel",
        "Focusing on building and optimizing APIs, database management, and system integrations",
        "Assisting in implementing additional features and enhancements for the company's portal",
        "Collaborating with the team to ensure seamless functionality and performance improvements"
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
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {exp.position}
                    </h3>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300 self-start whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{exp.company}</p>
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
                  {exp.clients ? (
                    <div className="mt-3 space-y-5">
                      {exp.clients.map((client, ci) => (
                        <div key={ci}>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {client.name}
                          </h4>
                          <ul className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2 space-y-2 list-disc pl-5">
                            {client.description.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                          {client.skills && client.skills.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {client.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
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
                      <ul className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3 space-y-2 list-disc pl-5">
                        {exp.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
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
