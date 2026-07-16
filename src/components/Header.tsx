import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-700">
          {siteConfig.navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={i === 0 ? "text-olive" : "hover:text-forest transition-colors"}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={siteConfig.phoneHref}
          className="hidden sm:inline-flex items-center rounded-md bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors"
        >
          {siteConfig.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
