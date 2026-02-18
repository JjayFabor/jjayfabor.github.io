import { useState } from "react";
import Bio from "../components/Bio";
import Projects from "../components/Projects";
import TechStack from "../components/TechStack";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import About from "../components/About";

const Home = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Bio onOpenContact={() => setContactOpen(true)} />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Contact open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Home;
