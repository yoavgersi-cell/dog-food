import { TextPage } from "@/components/text-page";
import { pageMeta } from "@/lib/seo";

// OPERATOR: starter terms - have counsel review before launch.
export const metadata = pageMeta({
  title: "Terms of Service",
  description: "Terms governing use of Dog Food Scout, including its informational nature, affiliate links and limitation of liability.",
  path: "/terms",
  type: "website",
});

export default function Terms() {
  return (
    <TextPage path="/terms" schemaType="WebPage" crumb="Terms" title="Terms of Service" intro="Last updated November 1, 2026.">
      <h2>Information only</h2>
      <p>Content on dogfoodscout.com is general information about dog food. It is not veterinary advice and does not create a veterinarian-client relationship. Ask your veterinarian about your own dog&apos;s diet.</p>
      <h2>Accuracy</h2>
      <p>We work to keep prices, offers and nutrition data accurate and say &quot;Verifying&quot; where a number isn&apos;t confirmed, but brands change products and prices without notice. Check the brand&apos;s site before you buy.</p>
      <h2>Affiliate links</h2>
      <p>Some links earn us a commission. Purchases are between you and the brand, under the brand&apos;s terms.</p>
      <h2>Intellectual property</h2>
      <p>Site content and design belong to Dog Food Scout. Brand names and logos belong to their owners.</p>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, Dog Food Scout is not liable for any loss arising from use of the site or from products bought through it.</p>
    </TextPage>
  );
}
