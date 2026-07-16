import { siteConfig } from "@/lib/site-config";

const steps = [
  {
    number: "01",
    title: "Contact Us",
    body: `Ready to sell your land? Whether you reach out by phone, email, or through our website, the ${siteConfig.name} team is here to listen, answer your questions, and understand your goals. We're ready to help you start the process with clarity and confidence.`,
  },
  {
    number: "02",
    title: "Receive Your Offer",
    body: "After reviewing your property, we'll send you a fair, no-obligation cash offer based on its value and potential. No fluff, no pressure—just a clear, honest proposal tailored to your situation.",
  },
  {
    number: "03",
    title: "Get Paid At Closing",
    body: "Once you accept our offer, we take care of the rest. From paperwork to closing, we work with trusted title professionals to ensure everything goes smoothly. You'll get paid quickly, with no fees, commissions, or delays—just a simple, straightforward transaction.",
  },
];

export function About() {
  return (
    <section id="approach" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-olive">
          About Us
        </p>
        <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-semibold text-neutral-900 max-w-2xl">
          Team-Focused Solutions, Client-First Results
        </h2>
        <p className="mt-5 max-w-3xl text-neutral-600">
          At {siteConfig.name}, we&apos;re more than a land investment
          company—we&apos;re a dedicated team that values relationships,
          integrity, and transparency. We believe in working hand-in-hand with
          landowners like you to ensure a smooth, stress-free experience from
          start to finish. Our commitment goes beyond the transaction—we&apos;re
          here to serve, support, and simplify the process for you, every step
          of the way.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-heading text-4xl font-bold text-olive/30">
                {step.number}
              </span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-neutral-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
