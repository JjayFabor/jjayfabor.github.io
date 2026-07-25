import { useEffect } from "react";
import Bio from "../components/Bio";
import Projects from "../components/Projects";
import TechStack from "../components/TechStack";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import About from "../components/About";
import LightSwitch from "../components/LightSwitch";
import { useContact } from "../context/ContactContext";

const HomePage = () => {
  const { openContact } = useContact();

  // Keep the tab title correct when navigating back to home within the SPA
  // (the prerendered <title> already covers first load and crawlers).
  useEffect(() => {
    document.title = "Jjay Fabor — Software Engineer | Backend, AI & Automation";
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      <LightSwitch />
      <Bio onOpenContact={openContact} />

      <main className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8">
          {/* Left rail: who I am + what I know */}
          <div className="lg:col-span-1 space-y-8">
            <About />
            <TechStack />
          </div>

          {/* Main column: track record */}
          <div className="lg:col-span-2 space-y-8">
            <Experience />
            <Projects />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
