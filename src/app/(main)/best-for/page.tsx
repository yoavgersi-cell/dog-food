import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { BREEDS, DEMOGRAPHICS, bestForPath, type SizeClass } from "@/lib/dogfood/taxonomy";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/geo";
import { kcalPerDayForLb } from "@/lib/nutrition";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Best Fresh & Raw Dog Food by Breed, Size & Life Stage",
  description: `${BREEDS.length} breed guides and ${DEMOGRAPHICS.length} life-stage guides with daily calories, cost per day and ranked fresh and raw picks.`,
  path: "/best-for",
  type: "website",
});

const SIZES: SizeClass[] = ["toy", "small", "medium", "large", "giant"];

export default function BestForIndex() {
  return (
    <PageShell>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Best for", path: "/best-for" }]), { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dog food by breed and life stage", url: `${SITE_URL}/best-for` }]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Breeds & life stages" }]} />
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Best Dog Food by Breed &amp; Life Stage</h1>
      <p className="mb-6 mt-2 max-w-[680px] text-[15.5px] text-gray-700">Each guide calculates daily calories and cost per day at the breed&apos;s real weight range, then ranks all 7 brands.</p>

      <h2 className="mb-2 mt-6 text-[20px] font-bold text-[#191919]">By life stage, size and lifestyle</h2>
      <ul className="grid gap-2 sm:grid-cols-3">
        {DEMOGRAPHICS.map((d) => (
          <li key={d.slug}><Link href={bestForPath(d.slug)} className="block rounded-lg border border-[#F3E3A3] bg-white px-3 py-2 text-[14px] font-semibold text-[#191919] hover:border-[#EAB308]">{d.name}</Link></li>
        ))}
      </ul>

      {SIZES.map((size) => (
        <section key={size}>
          <h2 className="mb-2 mt-8 text-[20px] font-bold capitalize text-[#191919]">{size} breeds</h2>
          <ul className="grid gap-2 sm:grid-cols-3">
            {BREEDS.filter((b) => b.size === size).map((b) => (
              <li key={b.slug}>
                <Link href={bestForPath(b.slug)} className="block rounded-lg border border-[#F3E3A3] bg-white px-3 py-2 hover:border-[#EAB308]">
                  <span className="text-[14px] font-semibold text-[#191919]">{b.name}</span>
                  <span className="block text-[12px] text-gray-500">{b.minLb}-{b.maxLb} lb · {kcalPerDayForLb(b.minLb).toLocaleString("en-US")}-{kcalPerDayForLb(b.maxLb).toLocaleString("en-US")} kcal/day</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
