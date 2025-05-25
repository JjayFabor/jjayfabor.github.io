import React, { useState, useEffect } from 'react';

const ROLES_LIST = ["Software", "Backend"];

const Bio = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const pauseDuration = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = ROLES_LIST[currentRoleIndex];
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(75);
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % ROLES_LIST.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed, pauseDuration]);

  return (
    <section id="bio" className="py-4 pb-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-w-4xl w-full mx-auto shadow-none bg-transparent">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left md:pr-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              <span className="wave-emoji inline-block mr-2 text-7xl">👋</span>
              Hi, I'm Jaylord Vhan Fabor
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4 h-8 text-3xl">
              <span className="underline font-extrabold">{displayedText}</span>
              <span className="animate-pulse"> Developer</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                Hey there! I'm more of a backend kind of person — I love setting up a clean, well-structured backend,
                but don't expect the frontend to look too pretty. 😆 As long as it works, right? Let’s keep it functional!
            </p>
          </div>
          <div className="flex-shrink-0 order-first md:order-last">
            <img
              src="logo/profile.jpg"
              alt="Profile"
              className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
