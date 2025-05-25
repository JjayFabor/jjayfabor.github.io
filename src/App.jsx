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
  return (
    <div className="overflow-y-scroll">
      <LightSwitch />
      <Bio />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Contact />
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
