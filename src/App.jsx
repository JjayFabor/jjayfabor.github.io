import { useState } from "react";
import Bio from "./components/Bio";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";
import { Toaster } from "@/components/ui/sonner";
import LightSwitch from "./components/LightSwitch";

const App = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg">
      <LightSwitch />
      <Bio onOpenContact={() => setContactOpen(true)} />

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

      <Contact open={contactOpen} onClose={() => setContactOpen(false)} />
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
