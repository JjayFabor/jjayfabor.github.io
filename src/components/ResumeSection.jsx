// A resume-style section: an underlined heading with content below.
// Designed to sit inside the page's column grid (see App.jsx).
const ResumeSection = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={className}>
      <h2 className="text-base font-bold uppercase tracking-wide text-brand-text pb-2 border-b border-brand-border">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
};

export default ResumeSection;
