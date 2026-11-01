import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ComparisonCard } from "@/components/comparison-card";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema, productEntity } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Fresh & Raw Dog Food Reviews (2026): All 7 Brands Scored",
  description: "Every brand we review, scored out of 10 with the same published rubric: The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, Maxbone, The Pet Table and Redbarn.",
  path: "/reviews",
  type: "website",
});

export default function ReviewsIndex() {
  return (
    <PageShell blocks={["calculator", "methodology", "comparisons", "disclosure"]}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Dog food brand reviews",
            url: `${SITE_URL}/reviews`,
            mainEntity: { "@type": "ItemList", itemListElement: RANKED_BRANDS.map((b, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/reviews/${b.slug}`, item: productEntity(b) })) },
          },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Dog Food Brand Reviews</h1>
      <p className="mb-6 mt-2 max-w-[680px] text-[15.5px] text-gray-700">
        Seven brands, one rubric. Each review covers dry-matter nutrition, cost per day by weight, the exact AAFCO statement, and who should and shouldn&apos;t buy. <Link href="/how-we-rank" className="font-semibold text-[#A16207] hover:underline">How we score</Link>.
      </p>
      <div className="space-y-4">
        {RANKED_BRANDS.map((b) => <ComparisonCard key={b.slug} brand={b} pageType="review" sourceFlow="provider_review" />)}
      </div>
    </PageShell>
  );
}
