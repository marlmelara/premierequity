const receive = [
  "Receive a fair offer.",
  "Sign a state-approved agreement contract.",
  "Work with an independent, third-party title company.",
  "Have confidence that your sale will close, fast.",
];

const avoid = [
  "No waiting.",
  "No commissions.",
  "No unnecessary paperwork.",
  "No closing costs.",
  "No unexpected fees.",
];

export function ValueProps() {
  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-7xl px-6 py-20 text-white">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-center">
          Fair Offer. Simple Process. Fast Close.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-white/80">
          It&apos;s our mission to offer a fair price for the land with a
          straightforward, stress-free process from start to finish.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 max-w-3xl mx-auto">
          <ul className="space-y-3">
            {receive.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-olive text-xs">
                  ✓
                </span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {avoid.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                  ✕
                </span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#hero-form"
            className="inline-flex items-center rounded-md bg-olive px-8 py-4 font-semibold text-white hover:bg-olive-dark transition-colors"
          >
            Get My Cash Offer
          </a>
        </div>
      </div>
    </section>
  );
}
