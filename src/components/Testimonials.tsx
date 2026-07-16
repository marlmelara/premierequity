import { siteConfig } from "@/lib/site-config";

const testimonials = [
  {
    quote:
      "I was tired of paying property taxes on land I wasn't using. They made me an offer that was better than I expected, and we closed within two weeks. They handled everything and kept me informed the whole time.",
    name: "Linda S.",
  },
  {
    quote:
      "Professional, honest, and super easy to work with. I had questions, and they were patient and clear throughout the process. I'd absolutely use them again if I had more land to sell.",
    name: "James T.",
  },
  {
    quote:
      "I inherited a piece of land I had no plans for. I contacted them and within days, I had a fair cash offer with zero fees. The entire process was simple, fast, and stress-free. Highly recommend to anyone looking to sell land quickly!",
    name: "Michael R.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900 text-center">
          Hear from Landowners Just Like You
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-neutral-600">
          We take pride in providing a smooth, transparent, and stress-free
          land selling experience. Here&apos;s what some of our recent clients
          have to say about working with {siteConfig.legalName}.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-neutral-200 p-8"
            >
              <blockquote className="text-sm text-neutral-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-heading font-semibold text-forest">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
