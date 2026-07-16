"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    q: "How do I sell my vacant land fast with your company?",
    a: `Fill out the form on this page with a few details about your property. Our team reviews it, sends you a fair cash offer, and once you accept, we handle the paperwork and closing — often in as little as a few weeks.`,
  },
  {
    q: "Are there any fees or commissions I have to pay?",
    a: "No. There are no realtor commissions, no closing costs, and no hidden fees. The offer we make you is the amount you receive at closing.",
  },
  {
    q: "How do you determine the value of my land?",
    a: "We research recent comparable sales, location, access, zoning, and market data for your area to arrive at a fair, all-cash offer.",
  },
  {
    q: "What types of land do you buy?",
    a: `We buy vacant, rural, and unwanted land of nearly any kind — residential lots, acreage, agricultural land, inherited property, and land with back taxes owed, across ${siteConfig.city} and the rest of the U.S.`,
  },
  {
    q: "What if I don't know my property's Parcel ID or exact size?",
    a: "No problem. Give us your best estimate or your address, and our team can look up the parcel details for you.",
  },
  {
    q: "Can I still sell if my land has back taxes or legal issues?",
    a: "In most cases, yes. We regularly work with sellers who have back taxes, liens, or title issues and can often resolve them as part of closing.",
  },
  {
    q: "How long does it take to get paid?",
    a: "Once you accept an offer and the title company completes its work, most sellers are paid within 7 to 21 business days.",
  },
  {
    q: "Do I need to visit your office or meet in person?",
    a: "No. The entire process — from offer to closing — can be handled remotely by phone, email, and mail.",
  },
  {
    q: "Am I obligated to sell if I request an offer?",
    a: "Never. Requesting a cash offer is completely free with no obligation to accept.",
  },
  {
    q: "How will I know the offer is fair?",
    a: "We walk you through exactly how we arrived at your offer, including the comparable sales and data we used, so you can make an informed decision.",
  },
  {
    q: "Will you visit the property before making an offer?",
    a: "Usually not — we're able to evaluate most properties remotely using public records, maps, and market data, which is part of what keeps the process fast.",
  },
  {
    q: "Can I sell land that I inherited or received through probate?",
    a: "Yes. We frequently help heirs and executors sell inherited or probate land, and can guide you through any extra paperwork involved.",
  },
  {
    q: "Is the process different for out-of-state owners?",
    a: "Not at all. Everything can be signed and notarized remotely, so owning land outside of Texas is never an obstacle.",
  },
  {
    q: "Will I have to handle any paperwork?",
    a: "We prepare the purchase agreement and coordinate with an independent title company, so there's very little for you to handle beyond signing.",
  },
  {
    q: "What if there are multiple owners on the deed?",
    a: "That's fine — all owners of record will need to agree to the sale and sign the closing documents, and we can help coordinate that.",
  },
  {
    q: "How do I get started?",
    a: "Just fill out the form on this page with your property details, or call us directly — we'll take it from there.",
  },
  {
    q: "Will my personal information be kept private when I submit the form?",
    a: "Yes. Your information is used solely to evaluate your property and prepare your offer, and is never sold or shared with third parties.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900 text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-center text-neutral-600">
          Got questions? We&apos;ve got answers. Here&apos;s everything you
          need to know about selling your land fast, easy, and hassle-free
          with {siteConfig.name}.
        </p>

        <div className="mt-10 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-neutral-900">{faq.q}</span>
                  <span
                    className={`shrink-0 text-olive transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm text-neutral-600">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
