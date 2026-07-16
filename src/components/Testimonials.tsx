"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const testimonials = [
  {
    quote:
      "I'd been paying taxes for years on a lot I never used. Their offer came in higher than I thought it would, and everything wrapped up in about two weeks. They took care of all the paperwork and checked in with me at every step.",
    name: "Linda S.",
  },
  {
    quote:
      "Straightforward and honest from start to finish. Every time I had a question they explained things clearly and never made me feel rushed. If I ever sell another property, they'll be my first call.",
    name: "James T.",
  },
  {
    quote:
      "I ended up with a piece of land from a relative and had no use for it. A few days after reaching out I had a fair cash offer with no fees attached. Start to finish it was painless — I'd point anyone who needs to sell land their way.",
    name: "Michael R.",
  },
  {
    quote:
      "I live three states away and had no clue how to sell a lot I owned in Texas. They handled the whole thing remotely, so I never had to travel, and the money hit my account faster than I expected.",
    name: "Sarah M.",
  },
  {
    quote:
      "My realtor had the property listed for almost a year with no bites. These folks made a cash offer the same week I called, and we closed a couple weeks later. I only wish I'd found them sooner.",
    name: "Robert K.",
  },
  {
    quote:
      "I'd fallen behind on the taxes and was scared I'd lose the land altogether. They walked me through everything, covered the closing costs, and I came away with cash instead of a headache.",
    name: "Denise P.",
  },
  {
    quote:
      "The lot was tied up in my dad's estate and I assumed selling it would be a nightmare. They were patient while probate finished up and made the closing simple once it cleared.",
    name: "Anthony G.",
  },
  {
    quote:
      "My husband and I are retiring and wanted to clean up the properties we'd collected over the years. They gave us a fair offer on our vacant acreage and closed quickly — no games.",
    name: "Karen W.",
  },
  {
    quote:
      "I needed cash quickly for a family situation and didn't have time for a long listing. I had an offer within a day and money in hand before the end of the month.",
    name: "Marcus D.",
  },
  {
    quote:
      "I bought some rural acreage years ago planning to build, and never did. Selling it seemed complicated until I called them. Fair price, no fees, and they did all the legwork.",
    name: "Patricia L.",
  },
  {
    quote:
      "I was stuck paying HOA dues on an empty lot I'd honestly forgotten I owned. They took it off my hands at a price I was happy with and handled every bit of the paperwork.",
    name: "Steven H.",
  },
  {
    quote:
      "We inherited farmland none of us lived near and couldn't agree on what to do with it. They made it easy for the whole family, and the offer was more than fair.",
    name: "Gloria R.",
  },
  {
    quote:
      "Going through a divorce, we just needed the land sold and behind us. They were respectful, quick, and made a clean cash offer so we could both move on.",
    name: "Brian F.",
  },
  {
    quote:
      "I had a vacant lot here in San Antonio sitting empty for over a decade. They knew the area, gave me a solid offer, and we closed without a single surprise fee.",
    name: "Teresa V.",
  },
];

export function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateArrows() {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  function scrollByCards(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth : el.clientWidth;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl text-center sm:text-left">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900">
              Hear from Landowners Just Like You
            </h2>
            <p className="mt-4 text-neutral-600">
              We take pride in providing a smooth, transparent, and stress-free
              land-selling experience. Here&apos;s what some of our recent
              clients have to say about working with {siteConfig.legalName}.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-forest transition hover:bg-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-forest transition hover:bg-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="w-full shrink-0 snap-start px-3 sm:w-1/2 lg:w-1/3"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-neutral-200 p-8">
                <blockquote className="flex-1 text-sm leading-relaxed text-neutral-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 font-heading font-semibold text-forest">
                  {t.name}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
