import { HeroBackground } from "@/components/HeroBackground";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig } from "@/lib/site-config";

const valueProps = [
  "No Fees or Commissions",
  "Fair Cash Offers – No Obligations",
  "We Buy Vacant Land in Any Condition or Location",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="text-white">
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold leading-tight">
            Get a Fast Cash Offer for Your Vacant Land
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Welcome to {siteConfig.legalName}
          </p>
          <p className="mt-4 text-white/80 max-w-xl">
            Need to sell your land quickly in {siteConfig.city} or anywhere in
            the U.S.? We make it easy with hassle-free, fair cash offers and a
            fast closing process — no fees, no commissions, and no delays.
          </p>

          <ul className="mt-6 space-y-3">
            {valueProps.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-olive text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div id="hero-form">
          <LeadForm idPrefix="hero" />
        </div>
      </div>
    </section>
  );
}
