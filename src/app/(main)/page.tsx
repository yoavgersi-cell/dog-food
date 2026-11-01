import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { ComparisonMatrix } from "@/components/comparison-matrix";
import { Sidebar } from "@/components/sidebar";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuickAnswer } from "@/components/quick-answer";
import { Byline } from "@/components/byline";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { RANKED_BRANDS, getBrand } from "@/lib/dogfood/brands";
import { matrixRows } from "@/lib/dogfood/matrix";
import { PAIRS, comparePath } from "@/lib/dogfood/pairs";
import { BREEDS, DEMOGRAPHICS, DIETS, bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { RUBRIC } from "@/lib/dogfood/rubric";
import { CONTENT_LAST_UPDATED, HOME_FAQS, HOME_HERO, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { WEBSITE_ID, ENTITIES, faqSchema, orgRef, productEntity, citations } from "@/lib/geo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;

const TITLE = "Best Fresh & Raw Dog Food Delivery of 2026 - 7 Brands Compared";
const DESCRIPTION =
  "The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, Maxbone, The Pet Table and Redbarn compared on dry-matter protein, cost per day by weight, AAFCO compliance and plan flexibility.";
const REF_LB = 25;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, type: "website" },
};

// Winner Summary rows (in the Quick Answer table) - one decisive pick per common need.
const WINNERS = [
  { label: "Best overall", slug: "the-farmers-dog" },
  { label: "Best raw", slug: "we-feed-raw" },
  { label: "Best without a freezer", slug: "spot-and-tango" },
  { label: "Best for part-fresh budgets", slug: "the-pet-table" },
];

const nameOf = (slug: string) => getBrand(slug)?.name ?? slug;

export default function HomePage() {
  const brands = RANKED_BRANDS;
  const top = brands[0];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      name: TITLE,
      description: DESCRIPTION,
      url: SITE_URL,
      inLanguage: "en-US",
      datePublished: LAUNCH_DATE,
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: orgRef(),
      author: orgRef(),
      about: [ENTITIES.dog, { "@type": "Thing", name: "Fresh dog food" }],
      mentions: [ENTITIES.aafco, ENTITIES.fda],
      citation: citations(),
      ...pageReviewSchema("/"),
      mainEntity: {
        "@type": "ItemList",
        name: "Best fresh & raw dog food delivery brands, 2026",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: brands.length,
        itemListElement: brands.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/reviews/${b.slug}`,
          item: productEntity(b),
        })),
      },
    },
    faqSchema(HOME_FAQS),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <HeroSection backgroundImageUrl="" imageAlt="" updatedLabel={HOME_HERO.updatedLabel} h1={HOME_HERO.h1} h2={HOME_HERO.h2} description={HOME_HERO.description} />

      <section className="mx-auto max-w-[1200px] px-4 pt-3">
        <Byline path="/" />
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-4">
        <div className="flex items-start gap-6">
          <div className="min-w-0 flex-1 space-y-4">
            <QuickAnswer
              question="What is the best fresh dog food in 2026?"
              answer={`${top.name} is our best overall fresh dog food (${top.score.toFixed(1)}/10): gently cooked recipes pre-portioned to each dog's calorie target. Pick We Feed Raw for raw, Spot & Tango if you have no freezer space, and The Pet Table to add fresh food on a part-fresh budget.`}
              rows={WINNERS.map((w) => ({ label: w.label, value: `${nameOf(w.slug)} (${getBrand(w.slug)!.score.toFixed(1)}/10)`, href: `/reviews/${w.slug}` }))}
            />

            <h2 className="pt-2 text-[22px] font-bold text-[#191919]">Our 2026 ranking</h2>
            {brands.map((b) => (
              <ComparisonCard key={b.slug} brand={b} refLb={REF_LB} />
            ))}

            <section id="compare-matrix" className="pt-6">
              <h2 className="text-[22px] font-bold text-[#191919]">Compare all 7 brands side by side</h2>
              <p className="mb-3 mt-1 text-[14.5px] text-gray-600">
                Filter by processing method and plan features; sort by score, cost per day ({REF_LB} lb neutered adult) or dry-matter protein. Every brand name opens its spec sheet.
              </p>
              <ComparisonMatrix rows={matrixRows(brands, REF_LB)} refLb={REF_LB} />
            </section>

            <section className="pt-6">
              <h2 className="text-[22px] font-bold text-[#191919]">How we score</h2>
              <p className="mt-1 text-[15px] leading-relaxed text-gray-700">
                Every brand gets a Scout Score out of 10 from six weighted criteria. Nutrition and value together are half the score, because those are the numbers that change what your dog eats and what you pay.{" "}
                <Link href="/how-we-rank" className="font-semibold text-[#A16207] hover:underline">Read the full methodology</Link>.
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {RUBRIC.map((r) => (
                  <li key={r.key} className="rounded-lg border border-[#F3E3A3] bg-white px-3.5 py-2.5 text-[14px]">
                    <span className="font-bold text-[#191919]">{r.label}</span> <span className="font-bold text-[#A16207]">{r.weight}%</span>
                  </li>
                ))}
              </ul>
            </section>

            <LinkGrid
              title="Head-to-head comparisons"
              columns={3}
              items={PAIRS.slice(0, 9).map((p) => ({ href: comparePath(p.slug), label: `${nameOf(p.a)} vs ${nameOf(p.b)}` }))}
            />
            <LinkGrid
              title="Best dog food by breed and life stage"
              columns={3}
              items={[
                ...["french-bulldog", "golden-retriever", "labrador-retriever", "dachshund", "german-shepherd", "goldendoodle"].map((s) => {
                  const b = BREEDS.find((x) => x.slug === s)!;
                  return { href: bestForPath(s), label: `${b.name}s`, note: `${b.minLb}-${b.maxLb} lb` };
                }),
                ...["puppy", "senior-dog", "large-breed"].map((s) => ({ href: bestForPath(s), label: DEMOGRAPHICS.find((d) => d.slug === s)!.name })),
              ]}
            />
            <LinkGrid
              title="Diets and health conditions"
              columns={3}
              items={["sensitive-stomach", "weight-loss", "allergies", "raw", "high-protein", "grain-free", "joint-health", "skin-and-coat", "fresh-topper"].map((s) => ({
                href: dietPath(s),
                label: DIETS.find((d) => d.slug === s)!.name,
              }))}
            />
          </div>
          <Sidebar />
        </div>
      </section>

      <FaqAccordion items={HOME_FAQS} />
    </>
  );
}
