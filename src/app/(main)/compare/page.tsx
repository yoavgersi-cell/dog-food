import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { RANKED_BRANDS, getBrand } from "@/lib/dogfood/brands";
import { pairLabel } from "@/lib/dogfood/links";
import { PAIRS, comparePath, pairsForBrand } from "@/lib/dogfood/pairs";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Dog Food Comparisons: 21 Head-to-Head Brand Matchups (2026)",
  description: "Every pairing of The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, The Pet Table, Maxbone and Redbarn, each with a decisive winner and side-by-side nutrition and cost data.",
  path: "/compare",
  type: "website",
});

export default function CompareIndex() {
  return (
    <PageShell blocks={["calculator", "methodology", "reviews", "disclosure"]}>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dog food comparisons", url: `${SITE_URL}/compare`, mainEntity: { "@type": "ItemList", numberOfItems: PAIRS.length, itemListElement: PAIRS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: pairLabel(p), url: `${SITE_URL}${comparePath(p.slug)}` })) } },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Dog Food Comparisons: All 21 Matchups</h1>
      <p className="mb-6 mt-2 max-w-[680px] text-[15.5px] text-gray-700">Each comparison names a winner, explains the one difference that decides it, and puts dry-matter nutrition and cost per day side by side.</p>

      <div className="space-y-8">
        {RANKED_BRANDS.map((b) => (
          <section key={b.slug}>
            <h2 className="mb-2 text-[19px] font-bold text-[#191919]">{b.name} comparisons</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {pairsForBrand(b.slug).map((p) => {
                const w = getBrand(p.overall)!;
                return (
                  <li key={p.slug}>
                    <Link href={comparePath(p.slug)} className="block rounded-lg border border-[#F3E3A3] bg-white px-3.5 py-2.5 hover:border-[#EAB308] hover:bg-[#FEFCE8]">
                      <span className="text-[14.5px] font-semibold text-[#191919]">{pairLabel(p)}</span>
                      <span className="block text-[12.5px] text-gray-500">Winner: {w.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
