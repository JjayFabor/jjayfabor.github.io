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
    <div className="overflow-y-scroll">
      <LightSwitch />
      <Bio onOpenContact={() => setContactOpen(true)} />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Contact open={contactOpen} onClose={() => setContactOpen(false)} />
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
