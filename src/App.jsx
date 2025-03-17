import Bio from './components/Bio';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import { Toaster } from '@/components/ui/sonner';

const App = () => {
  return (
    <div className="overflow-y-scroll">
        <Bio />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Toaster />
        <Footer />
    </div>
  );
};

export default App;
