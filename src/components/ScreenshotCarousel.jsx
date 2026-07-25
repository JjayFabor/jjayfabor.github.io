import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// A swipeable screenshot gallery. Uses native CSS scroll-snap for the sliding
// (so touch swipe works for free), with arrow buttons, dot indicators, and a
// "1 / n" counter for position feedback. No auto-advance.
const ScreenshotCarousel = ({ images, title }) => {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Reset to the first slide when the set of images changes (e.g. navigating
  // between two projects that both have galleries).
  useEffect(() => {
    setIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [images]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  // Keep the active dot/counter in sync while the user swipes or scrolls.
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const single = count <= 1;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-lg border border-brand-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
      >
        {images.map((src, i) => (
          <div key={i} className="w-full shrink-0 snap-center">
            <div className="aspect-[16/10] bg-brand-surface">
              <img
                src={src}
                alt={`${title} screenshot ${i + 1} of ${count}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next — hidden at the ends so there's never a dead button */}
      {!single && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous screenshot"
            className={`absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors ${index === 0 ? "opacity-0 pointer-events-none" : ""}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next screenshot"
            className={`absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-surface text-brand-text border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors ${index === count - 1 ? "opacity-0 pointer-events-none" : ""}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots + counter */}
      {!single && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex items-center">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="inline-flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-brand-accent" : "w-2 bg-brand-border"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-sm text-brand-muted tabular-nums">
            {index + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScreenshotCarousel;
