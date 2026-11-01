import { TextPage } from "@/components/text-page";
import { pageMeta } from "@/lib/seo";

// OPERATOR: starter policy - have counsel review before launch.
export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Dog Food Scout collects, uses and protects information, including analytics, cookies and affiliate tracking.",
  path: "/privacy",
  type: "website",
});

export default function Privacy() {
  return (
    <TextPage crumb="Privacy" title="Privacy Policy" intro="Last updated November 1, 2026.">
      <p>Dog Food Scout (&quot;we&quot;) runs dogfoodscout.com, an independent publisher comparing dog food brands. We don&apos;t sell products and don&apos;t ask you to create an account.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Analytics (Vercel Analytics, Google Analytics when enabled): pages viewed, device and approximate location, collected in aggregate.</li>
        <li>Affiliate click data: when you click a brand link, the brand or affiliate network may set cookies to attribute a purchase.</li>
        <li>Anything you send us by email.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To understand which pages are useful, to fix errors, and to be paid commissions. We don&apos;t sell personal information.</p>
      <h2>Your choices</h2>
      <p>You can block cookies in your browser and opt out of Google Analytics with Google&apos;s opt-out add-on. To ask about your data, email <a href="mailto:privacy@dogfoodscout.com">privacy@dogfoodscout.com</a>.</p>
    </TextPage>
  );
}
