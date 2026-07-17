import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Terms & Conditions | Premier Equity",
  description: "The terms that govern your use of the Premier Equity website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; Conditions" updated="July 2026">
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the
        website of {siteConfig.legalName} (&ldquo;{siteConfig.name},&rdquo;
        &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or
        using this website, you agree to these Terms. If you do not agree, please
        do not use the site.
      </p>

      <h2>Our Services</h2>
      <p>
        {siteConfig.name} buys vacant and unwanted land directly from property
        owners. This website provides information about our services and lets you
        request a cash offer. Submitting the form does not create a contract. No
        agreement to buy or sell exists unless and until both parties sign a
        written purchase agreement.
      </p>

      <h2>No Guarantee of an Offer</h2>
      <p>
        Submitting your information does not guarantee that we will make an offer.
        Any offer we extend is based on our own due diligence and may be revised
        or withdrawn before a written agreement is signed.
      </p>

      <h2>Not Legal or Financial Advice</h2>
      <p>
        Information on this website is provided for general purposes only and is
        not legal, tax, or financial advice. You should consult your own advisors
        before making decisions about your property.
      </p>

      <h2>Your Responsibilities</h2>
      <ul>
        <li>Provide accurate and complete information about yourself and your property;</li>
        <li>Confirm you have the legal authority to sell the property you submit; and</li>
        <li>Use this website only for lawful purposes.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website — including text, graphics, logos, and the
        Premier Equity name and mark — is owned by {siteConfig.legalName} and may
        not be copied or used without our permission.
      </p>

      <h2>Disclaimers</h2>
      <p>
        This website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, whether express or implied. We do not
        warrant that the site will be uninterrupted, error-free, or free of
        harmful components.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name} will not be
        liable for any indirect, incidental, or consequential damages arising from
        your use of, or inability to use, this website.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Texas, without regard
        to its conflict-of-laws rules.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Changes take effect when
        posted on this page, and the &ldquo;Last updated&rdquo; date above will
        reflect the most recent revision.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these Terms? Contact us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>. {siteConfig.legalName},{" "}
        {siteConfig.city}.
      </p>
    </LegalPage>
  );
}
