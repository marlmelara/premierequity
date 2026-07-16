import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ValueProps } from "@/components/ValueProps";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Process />
        <WhatWeOffer />
        <ComparisonTable />
        <ValueProps />
        <FAQ />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
