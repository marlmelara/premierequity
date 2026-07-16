import { siteConfig } from "@/lib/site-config";

const features = [
  {
    title: "Fair Cash Offers",
    body: "Receive fair, transparent cash offers tailored to your property.",
  },
  {
    title: "Fast Closings",
    body: "Fast, seamless closings tailored to match your preferred timeline.",
  },
];

export function WhatWeOffer() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-olive">
          What We Offer
        </p>
        <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-semibold text-neutral-900 max-w-2xl">
          Integrity. Transparency. Efficiency.
        </h2>
        <p className="mt-5 max-w-3xl text-neutral-600">
          At {siteConfig.legalName}, we make the land-selling process fast,
          fair, and frustration-free. Whether you&apos;re dealing with
          inherited land, back taxes, or just want to get rid of an unused
          parcel, we&apos;ll handle the heavy lifting.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-3xl">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-200 p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-forest">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
