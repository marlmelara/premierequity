const steps = [
  {
    title: "We Research Your Land",
    body: "Just fill out our simple Sell My Land form, and we'll start a quick due diligence process. Our team uses real market data and price-per-square-foot analysis to give you the best possible cash offer.",
  },
  {
    title: "We Present You With An Offer",
    body: "Once we have verified that your land meets our buying criteria, our property underwriters will determine an offer amount and contact you by either phone or email to discuss how we can proceed.",
  },
  {
    title: "We Send You An Agreement",
    body: "Once we have come to an agreement, we will prepare a basic purchase agreement we use with our closing attorneys. Once signed, it will be automatically forwarded to the title company.",
  },
  {
    title: "We Open Escrow",
    body: "The title company will confirm receipt of the purchase agreement and we will deposit the earnest money. The title company will contact you and send the seller information sheet.",
  },
];

export function Process() {
  return (
    <section id="advantage" className="scroll-mt-24 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-14 lg:grid-cols-2 items-start">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900">
            Streamlining the Land Selling Process
          </h2>
          <p className="mt-5 text-neutral-600">
            We specialize in buying vacant, rural, and unwanted land directly
            from property owners—in a quick and simple manner. Our experienced
            team is committed to making the process easy and stress-free from
            start to finish.
          </p>
          <p className="mt-4 text-neutral-600">
            We offer fair, all-cash deals with no agent fees, commissions, or
            closing costs. Whether you&apos;re dealing with inherited land,
            back taxes, or just want to sell quickly, we&apos;ll guide you
            every step of the way and close on your timeline. It&apos;s land
            selling made easy.
          </p>
        </div>

        <ol className="space-y-8">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest font-heading font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
