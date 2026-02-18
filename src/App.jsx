import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogIndex from "./pages/blog/BlogIndex";
import WeeklyChronicleList from "./pages/blog/WeeklyChronicleList";
import WeeklyChronicleIssue from "./pages/blog/WeeklyChronicleIssue";
import TechnicalDispatchList from "./pages/blog/TechnicalDispatchList";
import TechnicalDispatchPost from "./pages/blog/TechnicalDispatchPost";
import Admin from "./pages/admin/Admin";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";
import LightSwitch from "./components/LightSwitch";

const App = () => {
  return (
    <div className="overflow-y-scroll">
      <LightSwitch />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/weekly-chronicle" element={<WeeklyChronicleList />} />
        <Route path="/blog/weekly-chronicle/:weekSlug" element={<WeeklyChronicleIssue />} />
        <Route path="/blog/technical-dispatch" element={<TechnicalDispatchList />} />
        <Route path="/blog/technical-dispatch/:slug" element={<TechnicalDispatchPost />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
