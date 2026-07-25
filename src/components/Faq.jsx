import { useState } from "react";
import ResumeSection from "./ResumeSection";
import { faq } from "../data/faq";

// Accordion, matching the About/Experience sections. Collapsing the answers is
// fine for AEO here: the full Q&A is still emitted into the prerendered raw HTML
// and FAQPage JSON-LD (see scripts/prerender.mjs), so crawlers and answer
// engines get every answer regardless of the on-page open/closed state.
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <ResumeSection id="faq" title="FAQ">
      <div className="space-y-3">
        {faq.map(({ q, a }, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={q}
              className="bg-brand-surface rounded-lg border border-brand-border overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 flex items-center gap-4 hover:bg-brand-border/40 transition-colors"
              >
                <h3 className="flex-grow text-base font-semibold text-brand-text">
                  {q}
                </h3>
                <svg
                  className={`flex-shrink-0 w-5 h-5 text-brand-accent transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-brand-border">
                  <p className="text-brand-text/85 leading-relaxed mt-3">{a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ResumeSection>
  );
};

export default Faq;
