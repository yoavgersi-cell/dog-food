import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { ComparisonCard } from "@/components/comparison-card";
import { NutritionSpecTable } from "@/components/data-tables";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { Callout, H2, P, PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { FORMAT_LABEL, RANKED_BRANDS } from "@/lib/dogfood/brands";
import { dietFaqs } from "@/lib/dogfood/faqs";
import { dietLinks } from "@/lib/dogfood/links";
import { DIETS, DIET_BY_SLUG, dietPath, type Diet } from "@/lib/dogfood/taxonomy";
import { CONTENT_LAST_UPDATED, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { breadcrumbSchema, citations, ENTITIES, faqSchema, orgRef, productEntity, WEBSITE_ID } from "@/lib/geo";
import { AAFCO } from "@/lib/nutrition";
import { pageMeta, programmaticIndexable } from "@/lib/seo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return DIETS.map((d) => ({ slug: d.slug }));
}

const titleFor = (d: Diet) =>
  d.kind === "diet-type" ? `${d.name}: Best Brands Compared on Real Data (2026)` : `Best Fresh & Raw Dog Food for ${d.name} (2026)`;

const fitting = (d: Diet) => (d.formats ? RANKED_BRANDS.filter((b) => b.formats.some((f) => d.formats!.includes(f))) : RANKED_BRANDS);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = DIET_BY_SLUG.get((await params).slug);
  if (!d) return {};
  return pageMeta({ title: titleFor(d), description: `${d.focus} We compare ${fitting(d).length} brands on dry-matter nutrition and cost.`, path: dietPath(d.slug), index: programmaticIndexable() });
}

/** Standard checks every diet page lists, plus the page's own focus. */
function checklist(d: Diet): string[] {
  return [
    d.focus,
    `Confirm the AAFCO statement covers your dog's life stage (adult: >= ${AAFCO.adult.proteinPer1000} g protein / 1,000 kcal; growth: >= ${AAFCO.growth.proteinPer1000} g).`,
    "Compare nutrients per 1,000 kcal or on a dry-matter basis - never as-fed across formats.",
    "Portion to a calorie target and re-check body condition every 2-4 weeks after a switch.",
    "Transition over 7-10 days to avoid GI upset.",
  ];
}

export default async function DietPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = DIET_BY_SLUG.get((await params).slug);
  if (!d) notFound();
  const path = dietPath(d.slug);
  const brands = fitting(d);
  const pick = brands[0];
  const links = dietLinks(d);
  const faqs = dietFaqs(d);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: titleFor(d),
      url: `${SITE_URL}${path}`,
      datePublished: LAUNCH_DATE,
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      author: orgRef(),
      publisher: orgRef(),
      ...pageReviewSchema(path),
      about: { "@type": d.kind === "condition" ? "MedicalCondition" : "Thing", name: d.name },
      mentions: [ENTITIES.aafco, ENTITIES.wsava],
      citation: citations(),
      mainEntity: { "@type": "ItemList", itemListElement: brands.map((b, i) => ({ "@type": "ListItem", position: i + 1, item: productEntity(b) })) },
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Diets & health", path: "/diets" }, { name: d.name, path }]),
    faqSchema(faqs),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Diets & health", href: "/diets" }, { label: d.name }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{titleFor(d)}</h1>
      <div className="mb-5 mt-2"><Byline path={path} /></div>

      {d.therapeutic && (
        <Callout tone="warn">
          <strong>Talk to your vet first.</strong> {d.name} is often managed with a veterinary therapeutic diet. None of the seven brands we cover sells one, so use this page to prepare for that conversation, not to replace a prescription.
        </Callout>
      )}

      <QuickAnswer
        question={d.kind === "diet-type" ? `What is the best ${d.name.toLowerCase()}?` : `What should a dog with ${d.name.toLowerCase()} eat?`}
        answer={`${d.focus} ${d.therapeutic ? "Your veterinarian sets the diet; " : ""}Among the brands we test, ${pick.name} (${pick.score.toFixed(1)}/10) is the strongest fit${d.formats ? ` for this format (${d.formats.map((f) => FORMAT_LABEL[f].toLowerCase()).join(", ")})` : ""}.`}
        rows={[
          { label: "Brands that fit", value: brands.map((b) => b.name).join(", ") },
          { label: "Top fit", value: `${pick.name} (${pick.score.toFixed(1)}/10)`, href: `/reviews/${pick.slug}` },
          { label: "Vet involvement", value: d.therapeutic ? "Required - therapeutic diet territory" : "Recommended for any medical concern" },
        ]}
      />

      <H2 id="checklist">What to look for</H2>
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-[15.5px] leading-relaxed text-gray-700">
        {checklist(d).map((c) => <li key={c}>{c}</li>)}
      </ol>

      <H2 id="ranking">{d.formats ? "Brands that fit" : "Ranked picks"}</H2>
      <div className="space-y-4">
        {brands.map((b, i) => <ComparisonCard key={b.slug} brand={b} rank={i + 1} />)}
      </div>

      <H2 id="nutrition">Nutrition compared</H2>
      <P>The nutrient numbers that matter for {d.name.toLowerCase()}, converted to a dry-matter basis and per 1,000 kcal.</P>
      <NutritionSpecTable brands={brands.slice(0, 4)} />

      <FaqAccordion bare title="FAQs" items={faqs} />
      <LinkGrid title="Breeds where this comes up most" columns={3} items={links.breeds} />
      <LinkGrid title="Related comparisons" items={links.comparisons} />
      <LinkGrid title={d.kind === "diet-type" ? "Other diet types" : "Related health topics"} columns={3} items={links.related} />
    </PageShell>
  );
}
