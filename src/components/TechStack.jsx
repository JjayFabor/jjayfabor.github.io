import { animate } from "motion";
import { useEffect, useRef } from "react";

const frontendTools = [
  {
    name: "React",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    width: 80,
    height: 72
  },
  {
    name: "Vite",
    iconUrl: "https://vitejs.dev/logo.svg",
    width: 80,
    height: 80
  },
  {
    name: "Tailwind CSS",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    width: 80,
    height: 48
  },
  {
    name: "Bootstrap",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg",
    width: 80,
    height: 80
  },
  {
    name: "JavaScript",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    width: 80,
    height: 80
  },
  {
    name: "HTML5",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    width: 80,
    height: 80
  },
  {
    name: "CSS3",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    width: 80,
    height: 80
  }
];

const backendTools = [
//   {
//     name: "Node.js",
//     iconUrl: "https://static-00.iconduck.com/assets.00/node-js-icon-1817x2048-g8tzf91e.png",
//     width: 80,
//     height: 60
//   },
  {
    name: "Laravel",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    width: 80,
    height: 80
  },
  {
    name: "PHP",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
    width: 80,
    height: 50
  },
  {
    name: "Python",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    width: 80,
    height: 80
  },
  {
    name: "Django",
    iconUrl: "https://static.djangoproject.com/img/logos/django-logo-positive.svg",
    width: 80,
    height: 80
  },
  {
    name: "Linux",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
    width: 80,
    height: 80
  }
];

const databaseTools = [
  {
    name: "MySQL",
    iconUrl: "https://labs.mysql.com/common/logos/mysql-logo.svg",
    width: 80,
    height: 80
  },
  {
    name: "PostgreSQL",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    width: 80,
    height: 80
  },
//   {
//     name: "MongoDB",
//     iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
//     width: 80,
//     height: 80
//   },
  {
    name: "SQLite",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Sqlite-square-icon.svg",
    width: 80,
    height: 80
  },
  {
    name: "Git",
    iconUrl: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    width: 80,
    height: 80
  },
  {
    name: "GitHub",
    iconUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    width: 80,
    height: 80
  }
];

const TechStack = () => {
  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const databaseRef = useRef(null);

  useEffect(() => {
    if (frontendRef.current) {
      animate(
        frontendRef.current,
        { x: ["100%", "-100%"] },
        {
          duration: 40,
          repeat: Infinity,
          easing: "linear"
        }
      );
    }

    if (backendRef.current) {
      animate(
        backendRef.current,
        { x: ["-100%", "100%"] },
        {
          duration: 45,
          repeat: Infinity,
          easing: "linear"
        }
      );
    }

    if (databaseRef.current) {
      animate(
        databaseRef.current,
        { x: ["100%", "-100%"] },
        {
          duration: 50,
          repeat: Infinity,
          easing: "linear"
        }
      );
    }
  }, []);

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-center text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        My Tech Stack
      </h2>

      <div className="relative w-full overflow-hidden py-4">

        {/* Frontend Tools */}
        <div
          ref={frontendRef}
          className="flex gap-16 px-4 mb-12"
        >
          {[...frontendTools, ...frontendTools].map((tech, index) => (
            <div
              key={`frontend-${index}`}
              className="flex flex-col items-center min-w-[120px] shrink-0"
            >
              <div style={{ width: tech.width, height: tech.height }}>
                <img
                  src={tech.iconUrl}
                  alt={`${tech.name} logo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <span className="text-sm mt-2 text-gray-700 dark:text-gray-300">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Backend Tools */}
        <div
          ref={backendRef}
          className="flex gap-16 px-4 mb-12"
        >
          {[...backendTools, ...backendTools].map((tech, index) => (
            <div
              key={`backend-${index}`}
              className="flex flex-col items-center min-w-[120px] shrink-0"
            >
              <div style={{ width: tech.width, height: tech.height }}>
                <img
                  src={tech.iconUrl}
                  alt={`${tech.name} logo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <span className="text-sm mt-2 text-gray-700 dark:text-gray-300">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Database Tools */}
        <div
          ref={databaseRef}
          className="flex gap-16 px-4"
        >
          {[...databaseTools, ...databaseTools].map((tech, index) => (
            <div
              key={`database-${index}`}
              className="flex flex-col items-center min-w-[120px] shrink-0"
            >
              <div style={{ width: tech.width, height: tech.height }}>
                <img
                  src={tech.iconUrl}
                  alt={`${tech.name} logo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <span className="text-sm mt-2 text-gray-700 dark:text-gray-300">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
