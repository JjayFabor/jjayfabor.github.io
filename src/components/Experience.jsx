import { useState } from 'react';

const Experience = () => {
  // State to track which experience item is expanded
  const [expandedIndex, setExpandedIndex] = useState(null); // Default to first item expanded

  // Experience data with company logos
  const experiences = [
    {
      company: "Callbox Iloilo",
      position: "Intern Software Developer",
      period: "Jan 2025 - Present",
      description: "Working primarily as a backend developer using Laravel, focusing on building and optimizing APIs, database management, and system integrations. Assisting in implementing additional features and enhancements for the company's portal. Collaborating with the team to ensure seamless functionality and performance improvements.",
      logo: "/src/assets/callbox_logo.jpg"
    },
  ];

  // Toggle function to expand/collapse experience item
  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="experience" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="p-6 max-w-4xl w-full mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out
                ${expandedIndex === index
                  ? 'shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]'
                  : 'shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)]'}
                hover:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)]`}
              onClick={() => toggleExpand(index)}
            >
              {/* Header - Always visible */}
              <div className="p-5 cursor-pointer flex items-center gap-5">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md border border-gray-100">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-blue-600 font-medium text-sm md:text-base bg-blue-50 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{exp.company}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                    ${expandedIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
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

              {/* Description - Expandable content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 border-t border-gray-100">
                  <div className="pl-0 md:pl-21"> {/* Align with content above */}
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>

                    {/* Optional: Add skills or technologies used */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Laravel</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">PHP</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">MySQL</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Bootstrap</span>
                    </div>
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
