import { useState } from "react";
import { faq } from "../data/faq";

// The interactive FAQ and the crawlable /faq shell both source the exact same
// data. Answers remain in the DOM when collapsed, while the build-time page and
// matching FAQPage JSON-LD expose every answer to non-JavaScript crawlers.
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" aria-label="Frequently asked questions">
      <div className="space-y-3">
        {faq.map(({ q, a }, index) => {
          const isOpen = openIndex === index;
          const questionId = `faq-question-${index + 1}`;
          const answerId = `faq-answer-${index + 1}`;

          return (
            <div
              key={q}
              className={`bg-brand-surface rounded-lg border overflow-hidden transition-colors ${
                isOpen ? "border-brand-accent/60" : "border-brand-border"
              }`}
            >
              <h2 id={questionId}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="w-full text-left p-4 md:px-5 md:py-[1.125rem] flex items-center gap-4 hover:bg-brand-border/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent"
                >
                  <span className="flex-grow text-base font-semibold text-brand-text">
                    {q}
                  </span>
                  <svg
                    aria-hidden="true"
                    className={`flex-shrink-0 w-5 h-5 text-brand-accent transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h2>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                className="px-4 pb-4 md:px-5 md:pb-5 border-t border-brand-border"
              >
                <p className="text-brand-text/85 leading-relaxed mt-4">{a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
