import { Card } from "@/components/ui/card";

const Bio = () => {
  return (
    <section id="bio" className="py-10 flex items-center justify-center">
      <div className="p-6 max-w-4xl w-full mx-auto shadow-none bg-transparent">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left md:pr-4">
            <h1 className="text-4xl font-bold">
              <span className="wave-emoji inline-block mr-2 text-7xl">👋</span>
              Hi, I'm Jaylord Vhan Fabor
            </h1>
            <p className="text-gray-600 mt-2 mb-4">
              Software Developer | Backend Developer
            </p>
            <p className="text-gray-700">
                Hey there! I'm more of a backend kind of person — I love setting up a clean, well-structured backend,
                but don't expect the frontend to look too pretty. 😆 As long as it works, right? Let’s keep it functional!
            </p>
          </div>
          <div className="flex-shrink-0 order-first md:order-last">
            <img
              src="/src/assets/profile.jpg"
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
