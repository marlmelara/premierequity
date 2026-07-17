import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Privacy Policy | Premier Equity",
  description: "How Premier Equity collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        {siteConfig.legalName} (&ldquo;{siteConfig.name},&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy
        Policy explains what information we collect when you visit our website or
        submit a request for a cash offer, how we use it, and the choices you
        have. By using our website, you agree to the practices described here.
      </p>

      <h2>Information We Collect</h2>
      <p>
        <strong>Information you provide.</strong> When you submit our cash-offer
        form or otherwise contact us, we collect the details you give us, such as
        your name, email address, phone number, and information about your
        property (size, address or parcel ID, and your reason for selling).
      </p>
      <p>
        <strong>Information collected automatically.</strong> Like most websites,
        we may automatically collect limited technical information such as your IP
        address, browser type, device information, and basic usage data through
        cookies or similar technologies.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To review your property and prepare a cash offer;</li>
        <li>To contact you about your inquiry by phone, email, or text;</li>
        <li>To complete a transaction if you choose to sell to us;</li>
        <li>To operate, maintain, and improve our website; and</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>How We Share Your Information</h2>
      <p>
        <strong>We do not sell your personal information.</strong> We may share it
        only as needed to serve you or run our business — for example, with title
        companies, closing attorneys, and trusted service providers (such as
        hosting and email providers) who help us respond to your request, or when
        required by law.
      </p>

      <h2>Data Retention</h2>
      <p>
        We keep your information only as long as necessary to respond to your
        inquiry, complete any transaction, and meet our legal and business
        obligations.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may opt out of marketing communications at any time by replying to
        stop or contacting us directly. You may also request that we access,
        update, or delete the personal information you have provided by emailing
        us at the address below.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards to protect your information. However, no
        method of transmission or storage is completely secure, and we cannot
        guarantee absolute security.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our website may link to third-party sites we do not control. We are not
        responsible for the privacy practices of those sites.
      </p>

      <h2>Children&rsquo;s Privacy</h2>
      <p>
        Our website is not directed to children under 18, and we do not knowingly
        collect information from them.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes take effect
        when posted on this page, and the &ldquo;Last updated&rdquo; date above
        will reflect the most recent revision.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this Privacy Policy? Contact us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>. {siteConfig.legalName},{" "}
        {siteConfig.city}.
      </p>
    </LegalPage>
  );
}
