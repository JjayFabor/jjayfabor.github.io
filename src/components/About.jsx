import { useState } from 'react';

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
        degree: "Associate's Degree in Computer Technology",
        year: "2019 - 2021",
        description: "Completed an intensive program focused on computer hardware servicing, networking, and software development, gaining hands-on experience in troubleshooting, system maintenance, and programming.",
        logo: "logo/peii_logo.png",
        skills: ["Hardware Servicing", "Networking", "Software Development"]
      }
    ];

    const toggleExpand = (index) => {
      if (expandedIndex === index) {
        setExpandedIndex(null);
      } else {
        setExpandedIndex(index);
      }
    };

  return (
      <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-4xl w-full mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">About Me</h2>

          <div className="mb-14">
            <h3 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 p-1.5 rounded-md mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Profile
            </h3>
            <div className="bg-white dark:bg-gray-800 p-7 rounded-xl border border-gray-100 dark:border-gray-700 shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-300">
              <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                I'm a backend developer who started out with Python and Django, but life had other plans!
                My current company got me into the Laravel and PHP world, and now I'm all about building
                efficient, scalable backends with it. Backend structure and clean code? That's my jam. 😎
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                It all started with a curiosity about how systems work behind the scenes, and that curiosity
                turned into a career focused on building reliable infrastructure and APIs. When I'm not
                knee-deep in code, you'll probably find me hiking or geeking out over new tech.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 p-1.5 rounded-md mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v10" />
                </svg>
              </span>
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
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
                      <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"> {/* Added bg for logo container */}
                        <img
                          src={edu.logo}
                          alt={`${edu.school} logo`}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{edu.school}</h4>
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base bg-blue-50 dark:bg-blue-900/50 px-3 py-1 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.degree}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                        ${expandedIndex === index
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
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
                    <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-700">
                      <div className="pl-0 md:pl-21">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{edu.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {edu.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

export default About;
