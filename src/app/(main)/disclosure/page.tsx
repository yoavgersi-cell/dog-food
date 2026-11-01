import { TextPage } from "@/components/text-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Advertising Disclosure",
  description: "How Dog Food Scout is funded, how affiliate commissions work, and the rules that keep them from influencing our scores.",
  path: "/disclosure",
  type: "website",
});

export default function Disclosure() {
  return (
    <TextPage crumb="Disclosure" title="Advertising Disclosure" intro="Dog Food Scout is free to read. We're funded by affiliate commissions: when you buy through some of our links, the brand may pay us. Here's how we keep that from affecting what we publish.">
      <h2>The rules</h2>
      <ul>
        <li>Scores come from our published rubric and are set before any commercial terms are discussed.</li>
        <li>The ranking order is always the score order. A brand can&apos;t pay to move up.</li>
        <li>We review brands whether or not they have an affiliate program.</li>
        <li>Outbound brand links are marked <code>rel=&quot;sponsored&quot;</code>.</li>
        <li>Offers shown are the brand&apos;s own and can change; we re-check them monthly.</li>
      </ul>
      <h2>Not veterinary advice</h2>
      <p>Our content is general information. Talk to your veterinarian before changing the diet of a dog with a medical condition, a puppy, or a pregnant or nursing dog.</p>
      <p>Brand names and logos belong to their respective owners and appear for identification only.</p>
    </TextPage>
  );
}
