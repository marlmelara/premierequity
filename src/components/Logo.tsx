import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/lib/site-config";

export function Logo({ light = false }: { light?: boolean }) {
  const textColor = light ? "text-white" : "text-forest";
  const subColor = light ? "text-white/70" : "text-forest/60";

  return (
    <Link href="/" className="flex items-center gap-3">
      <BrandMark size={44} light={light} />
      <span className="flex flex-col leading-tight">
        <span className={`font-heading font-semibold text-xl ${textColor}`}>
          {siteConfig.name}
        </span>
        <span className={`text-[10px] tracking-[0.2em] uppercase ${subColor}`}>
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
