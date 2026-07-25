import ResumeSection from "./ResumeSection";
import { faq } from "../data/faq";

// Answers are always visible (no accordion): hiding them behind a click keeps
// them out of some crawlers/answer engines, which defeats the point.
const Faq = () => {
  return (
    <ResumeSection id="faq" title="FAQ">
      <dl className="space-y-6">
        {faq.map(({ q, a }) => (
          <div key={q}>
            <dt className="text-base font-semibold text-brand-text">{q}</dt>
            <dd className="mt-1.5 text-brand-text/85 leading-relaxed">{a}</dd>
          </div>
        ))}
      </dl>
    </ResumeSection>
  );
};

export default Faq;
