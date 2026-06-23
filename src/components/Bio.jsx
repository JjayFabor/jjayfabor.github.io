import { Button } from "@/components/ui/button";

function Bio({ onOpenContact = () => {} }) {
  return (
    <section id="bio" className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl w-full mx-auto px-6 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-10 gap-y-6 items-center">
        <div className="flex justify-center md:block">
          <img
            src="logo/profile.jpg"
            alt="Jaylord Vhan Fabor"
            className="w-32 h-32 md:w-full md:h-auto md:aspect-square rounded-lg object-cover border border-gray-200 dark:border-gray-700"
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Jaylord Vhan Fabor
          </h1>
          <p className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400">
            Software Engineer
          </p>
          <p className="mt-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose mx-auto md:mx-0">
            I build clean, reliable, and scalable backend systems &mdash; from
            APIs and database design to automation. I care about
            well-structured code that's easy to maintain and built to last.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button
              onClick={onOpenContact}
              className="h-11 px-6 text-base w-full sm:w-auto"
            >
              Get in touch
            </Button>
            <Button
              variant="outline"
              asChild
              className="h-11 px-6 text-base w-full sm:w-auto"
            >
              <a
                href="https://docs.google.com/document/d/1VQs6h8NJPEx_FUvsaaHDd1DYauJ5jI1y/edit?usp=sharing&ouid=108342282876658747339&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bio;
