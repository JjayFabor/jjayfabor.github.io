// "Jj" brand mark: 40px rounded square, surface background,
// Inter 600 — accent "J", primary-text "j".
const Monogram = ({ className = "" }) => (
  <div
    aria-label="Jj monogram"
    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface ring-1 ring-brand-border font-semibold text-2xl leading-none tracking-tighter select-none ${className}`}
  >
    <span className="text-brand-accent">J</span>
    <span className="text-brand-text">j</span>
  </div>
);

export default Monogram;
