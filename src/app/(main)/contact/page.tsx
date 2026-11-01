import { TextPage } from "@/components/text-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Dog Food Scout",
  description: "Corrections, data updates from brands, and reader questions for the Dog Food Scout research team.",
  path: "/contact",
  type: "website",
});

export default function Contact() {
  return (
    <TextPage crumb="Contact" title="Contact Us" intro="Spotted an out-of-date number? Represent a brand and want to supply verified data? We read everything.">
      <p>Email: <a href="mailto:hello@dogfoodscout.com">hello@dogfoodscout.com</a></p>
      <p>For data corrections, please include the source URL (recipe page, label photo or quote screenshot) so we can verify it before updating.</p>
    </TextPage>
  );
}
