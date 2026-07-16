import { LeadForm } from "@/components/LeadForm";

export function FinalCTA() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900">
            Ready to Sell Your Vacant Land Fast?
          </h2>
          <p className="mt-3 text-lg text-forest font-medium">
            Get a Fair, No-Obligation Cash Offer in Minutes
          </p>
          <p className="mt-5 max-w-xl text-neutral-600">
            Complete the form and take the first step toward a simple,
            hassle-free land sale. Whether you&apos;re dealing with unused
            land, back taxes, or inherited property — we make it easy. No
            commissions, no delays, just cash in your hands.
          </p>
        </div>

        <LeadForm idPrefix="final" />
      </div>
    </section>
  );
}
