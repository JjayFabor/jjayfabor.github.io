import Monogram from "./Monogram";

const BrandLockup = ({ className = "" }) => (
  <span
    className={`inline-flex min-w-0 items-center gap-3.5 text-left ${className}`}
  >
    <Monogram alt="" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />

    <span className="hidden min-w-0 flex-col justify-center sm:flex">
      <span className="whitespace-nowrap text-[0.875rem] font-semibold leading-none tracking-[0.085em] text-brand-text">
        JAYLORD VHAN <span className="text-brand-gold">FABOR</span>
      </span>

      <span className="mt-2 flex items-center gap-2" aria-label="Software Engineer">
        <span
          aria-hidden="true"
          className="h-px w-5 shrink-0 bg-brand-border"
        />
        <span className="whitespace-nowrap font-mono text-[0.625rem] font-medium leading-none tracking-[0.24em] text-brand-muted">
          SOFTWARE ENGINEER
        </span>
        <span
          aria-hidden="true"
          className="h-px w-5 shrink-0 bg-brand-border"
        />
      </span>
    </span>
  </span>
);

export default BrandLockup;
