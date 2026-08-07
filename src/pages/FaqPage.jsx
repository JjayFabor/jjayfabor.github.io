import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLockup from "../components/BrandLockup";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import LightSwitch from "../components/LightSwitch";

const FaqPage = () => {
  useEffect(() => {
    document.title = "Frequently Asked Questions — Jjay Fabor";
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <LightSwitch />

      <header className="bg-brand-bg border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6 py-5 pr-20">
          <Link
            to="/"
            aria-label="Back to home"
            className="group inline-flex items-center gap-3 text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-brand-bg rounded-md"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 text-brand-accent transition-transform group-hover:-translate-x-0.5"
            />
            <BrandLockup />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-10 md:py-14 flex-grow">
        <header className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-accent">
            Profile / FAQ
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-brand-text">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-muted">
            Concise answers about my background, specialties, tools,
            availability, and location.
          </p>
        </header>

        <div className="mt-8 md:mt-10">
          <Faq />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
