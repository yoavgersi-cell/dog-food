import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ReviewBox } from "@/components/review-box";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema, productEntity } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Fresh & Raw Dog Food Reviews (2026): All 7 Brands Scored",
  description: "In-depth reviews of The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, Maxbone, The Pets Table and Redbarn: pricing, pros and cons, and who each one suits.",
  path: "/reviews",
  type: "website",
});

export default function ReviewsIndex() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-14 pt-5">
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
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Fresh &amp; Raw Dog Food Reviews</h1>
      <p className="mt-2 max-w-[760px] text-[15.5px] leading-relaxed text-gray-700">
        Seven brands, one rubric. Every review covers pricing and plans, pros and cons, nutrition on a dry-matter basis, and exactly who should and shouldn&apos;t buy.
        Open any review for the full breakdown, or see <Link href="/how-we-rank" className="font-semibold text-[#A16207] hover:underline">how we score</Link>.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RANKED_BRANDS.map((b) => <ReviewBox key={b.slug} brand={b} />)}
      </div>

      <p className="mt-10 text-[14px] text-gray-600">
        Can&apos;t decide between two? Every pairing has its own <Link href="/compare" className="font-semibold text-[#A16207] hover:underline">head-to-head comparison</Link>, or start from the <Link href="/" className="font-semibold text-[#A16207] hover:underline">full ranking</Link>.
      </p>
    </section>
  );
}
