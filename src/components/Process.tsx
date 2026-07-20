import { SectionBackdrop } from "@/components/SectionBackdrop";

// Optional background photo behind the timeline. Drop an image in
// /public/backdrops/ and set this to e.g. "/backdrops/process.jpg".
const PROCESS_BACKDROP = "";

const steps = [
  {
    title: "We Research Your Land",
    body: "Just fill out our simple form, and we'll start a quick due diligence process. Our team uses real market data and price-per-square-foot analysis to give you the best possible cash offer.",
  },
  {
    title: "We Present You With An Offer",
    body: "Once we've verified that your land meets our buying criteria, our property team determines an offer amount and contacts you by phone or email to discuss how we can proceed.",
  },
  {
    title: "We Send You An Agreement",
    body: "After we agree on a price, we prepare a simple purchase agreement that we use with our closing attorneys. Once you sign, it's forwarded to the title company.",
  },
  {
    title: "We Close & You Get Paid",
    body: "The title company confirms the agreement and we deposit the earnest money. They handle the paperwork and, on your timeline, you get paid — no fees, commissions, or delays.",
  },
];

export function Process() {
  return (
    <section
      id="advantage"
      className="relative scroll-mt-8 overflow-hidden bg-cream"
    >
      <SectionBackdrop src={PROCESS_BACKDROP} overlay="cream" />

      <div className="relative mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-olive">
            Our Process
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-neutral-900 sm:text-4xl">
            See How Our Process Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            From your first message to cash at closing, here&apos;s exactly what
            to expect — simple, transparent, and on your timeline.
          </p>
        </div>

        <ol className="relative mt-16">
          {/* Vertical timeline line */}
          <div
            className="absolute top-2 bottom-2 left-5 w-0.5 bg-forest/25 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const leftSide = i % 2 === 0;
            return (
              <li
                key={step.title}
                className="relative mb-10 last:mb-0 md:mb-14 md:grid md:grid-cols-2 md:items-center md:gap-x-16"
              >
                {/* Numbered node on the line */}
                <span className="absolute left-5 top-1 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-forest font-heading text-lg font-semibold text-white shadow-md ring-4 ring-cream md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  {i + 1}
                </span>

                {/* Step card, alternating sides on desktop */}
                <div
                  className={
                    leftSide
                      ? "ml-16 md:col-start-1 md:mr-10 md:ml-0 md:text-right"
                      : "ml-16 md:col-start-2 md:ml-10"
                  }
                >
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <h3 className="font-heading text-lg font-semibold text-forest">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
