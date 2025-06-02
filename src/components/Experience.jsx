import { useState } from 'react';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const experiences = [
    {
      company: "Callbox Iloilo",
      position: "Intern Software Developer",
      period: "02/2025 - 05/2025",
      description: "Working primarily as a backend developer using Laravel, focusing on building and optimizing APIs, database management, and system integrations. Assisting in implementing additional features and enhancements for the company's portal. Collaborating with the team to ensure seamless functionality and performance improvements.",
      logo: "logo/callbox_logo.jpg",
      skills: ["Laravel", "PHP", "MySQL", "Bootstrap", "API Development", "Git", "PhpMyAdmin"]
    },
    {
      company: "Central Philippine University - Thesis Project",
      position: "Lead Programmer",
      period: "09/2023 - 12/2023",
      description: "Designed and implemented a semi-automated hydroponic system with integrated sensors and machine learning to predict optimal lettuce growth days, using Arduino C++, Python (Flask, ML), JavaScript, HTML, and CSS.",
      logo: "logo/cpu_logo.png",
      skills: ["Python", "Arduino", "C++", "Flask", "Machine Learning", "Web Development", "Github", "Jupyter Notebook", "SQlite"]
    },
  ];

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="experience" className="py-4 bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-w-4xl w-full mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out
                ${expandedIndex === index
                  ? 'shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)]'
                  : 'shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)]'}
                hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.5)]`}
              onClick={() => toggleExpand(index)}
            >
              <div className="p-5 cursor-pointer flex items-center gap-5">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{exp.position}</h3>
                    <span className="text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base bg-blue-50 dark:bg-blue-900/50 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{exp.company}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                    ${expandedIndex === index ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 border-t border-gray-100 dark:bordere-gray-700">
                  <div className="pl-0 md:pl-[calc(4rem+1.25rem)]">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">{exp.description}</p>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
