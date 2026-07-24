import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ContactProvider } from "./context/ContactProvider";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

// Reset scroll to the top whenever the route (path or query) changes, so
// navigating between pages doesn't preserve the previous scroll position.
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
};

const App = () => {
  return (
    <ContactProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Toaster />
    </ContactProvider>
  );
};

export default App;
