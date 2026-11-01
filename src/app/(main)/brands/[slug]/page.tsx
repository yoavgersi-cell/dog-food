import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { ComparisonCard } from "@/components/comparison-card";
import { CostTable, FeatureTable, NutritionSpecTable } from "@/components/data-tables";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { H2, P, PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { BRANDS, FORMAT_LABEL, getBrand } from "@/lib/dogfood/brands";
import { brandLinks } from "@/lib/dogfood/links";
import { pairsForBrand } from "@/lib/dogfood/pairs";
import { CONTENT_LAST_UPDATED, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { breadcrumbSchema, orgRef, productEntity, WEBSITE_ID } from "@/lib/geo";
import { costPerDay, fmtUsd, PENDING } from "@/lib/nutrition";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = getBrand((await params).slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.name}: Recipes, Dry-Matter Nutrition & Cost per Day`,
    description: `${b.name} spec sheet: formats (${b.formats.map((f) => FORMAT_LABEL[f]).join(", ")}), proteins, dry-matter nutrients, AAFCO statement, cost per day at 10-100 lb, and all 6 head-to-head comparisons.`,
    path: `/brands/${b.slug}`,
  });
}

export default async function BrandHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = getBrand((await params).slug);
  if (!b) notFound();
  const path = `/brands/${b.slug}`;
  const links = brandLinks(b);
  const c25 = b.price ? fmtUsd(costPerDay(b.price, 25)) : PENDING;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      name: `${b.name} dog food`,
      url: `${SITE_URL}${path}`,
      datePublished: LAUNCH_DATE,
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: orgRef(),
      mainEntity: productEntity(b),
      relatedLink: pairsForBrand(b.slug).map((p) => `${SITE_URL}/compare/${p.slug}`),
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }, { name: b.name, path }]),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews" }, { label: b.name }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{b.name} Dog Food: Specs, Nutrition &amp; Cost</h1>
      <div className="mb-5 mt-2"><Byline path={path} /></div>

      <QuickAnswer
        question={`What is ${b.name} dog food?`}
        answer={`${b.tagline}. Scout Score ${b.score.toFixed(1)}/10 - ${b.verdict.toLowerCase()}. ${b.subscriptionRequired ? "Sold by subscription" : b.subscriptionRequired === false ? "No subscription required" : "Subscription terms being verified"}; stored in the ${b.storage}.`}
        rows={[
          { label: "Formats", value: b.formats.map((f) => FORMAT_LABEL[f]).join(", ") },
          { label: "Main proteins", value: b.proteins.join(", ") },
          { label: "Cost per day (25 lb adult)", value: c25 },
          { label: "Current offer", value: b.offer },
          { label: "Full review", value: `${b.name} review (${b.score.toFixed(1)}/10)`, href: `/reviews/${b.slug}` },
        ]}
      />

      <div className="mt-6"><ComparisonCard brand={b} hideRank pageType="review" sourceFlow="provider_review" /></div>

      <H2 id="nutrition">Nutrition spec sheet</H2>
      <P>All values convert the brand&apos;s published guaranteed analysis to a dry-matter basis and to grams per 1,000 kcal, the only fair way to compare fresh (about 70% water) with freeze-dried and air-dried food.</P>
      <NutritionSpecTable brands={[b]} />

      <H2 id="cost">Cost per day by weight</H2>
      <CostTable brands={[b]} />

      <H2 id="features">Plan features</H2>
      <FeatureTable brands={[b]} />

      <LinkGrid title={`${b.name} vs. the competition`} items={links.comparisons} />
      <LinkGrid title="Diets this brand fits" columns={3} items={links.diets} />
      <LinkGrid title="By protein" columns={3} items={links.proteins} />
      <LinkGrid title="By life stage and size" columns={3} items={links.lifeStages} />
      <p className="mt-8 text-[14px] text-gray-600">
        Want our verdict and the trade-offs? Read the full <Link href={`/reviews/${b.slug}`} className="font-semibold text-[#A16207] hover:underline">{b.name} review</Link>.
      </p>
    </PageShell>
  );
}
