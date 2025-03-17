import { useState } from 'react';

const About = () => {
    // State to track which education item is expanded
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Education data with logos
    const education = [
      {
        school: "Central Philippine University",
        degree: "Bachelor of Science in Computer Science",
        year: "2021 - 2025",
        description: "Focused on software development with C# and ASP.NET, covering full-stack web application development, database management, and enterprise solutions. Also explored Artificial Intelligence and Machine Learning concepts, including data analytics and automation.",
        logo: "/src/assets/cpu_logo.png"
      },
      {
        school: "College Name",
        degree: "Associate's Degree in Computer Technology",
        year: "2019 - 2021",
        description: "Completed an intensive program focused on computer hardware servicing, networking, and software development, gaining hands-on experience in troubleshooting, system maintenance, and programming.",
        logo: "/src/assets/peii_logo.png"
      }
    ];

    // Toggle function to expand/collapse education item
    const toggleExpand = (index) => {
      if (expandedIndex === index) {
        setExpandedIndex(null);
      } else {
        setExpandedIndex(index);
      }
    };

    return (
      <section id="about" className="py-10">
        <div className="p-6 max-w-4xl w-full mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">Profile</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
                I'm a backend developer who started out with Python and Django, but life had other plans!
                My current company got me into the Laravel and PHP world, and now I'm all about building
                efficient, scalable backends with it. Backend structure and clean code? That’s my jam. 😎
            </p>
            <p className="text-gray-700">
                It all started with a curiosity about how systems work behind the scenes, and that curiosity
                turned into a career focused on building reliable infrastructure and APIs. When I’m not
                knee-deep in code, you’ll probably find me hiking or geeking out over new tech.
            </p>

            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md"
                  onClick={() => toggleExpand(index)}
                >
                  {/* Header - Always visible */}
                  <div className="p-4 cursor-pointer flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <h4 className="text-lg font-medium">{edu.school}</h4>
                        <span className="text-gray-500 text-sm md:text-base">{edu.year}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{edu.degree}</p>
                    </div>
                    <div className="flex-shrink-0">
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

                  {/* Description - Expandable content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 pt-0 border-t">
                      <p className="text-gray-700">{edu.description}</p>
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
