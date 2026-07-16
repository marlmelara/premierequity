import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-white/60 max-w-xs">
            {siteConfig.legalName} buys vacant land for cash across{" "}
            {siteConfig.city} and beyond — no fees, no commissions, no delays.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white transition-colors">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>{siteConfig.city}</li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            Copyright © {new Date().getFullYear()} {siteConfig.name} - All Rights
            Reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
