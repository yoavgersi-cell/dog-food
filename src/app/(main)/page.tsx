import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { ComparisonMatrix } from "@/components/comparison-matrix";
import { Sidebar } from "@/components/sidebar";
import { FaqAccordion } from "@/components/faq-accordion";
import { Byline } from "@/components/byline";
import { HomeEditorial } from "@/components/home-editorial";
import { JsonLd } from "@/components/json-ld";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { matrixRows } from "@/lib/dogfood/matrix";
import { CONTENT_LAST_UPDATED, HERO_MONTH, HOME_FAQS, HOME_HERO, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { WEBSITE_ID, ENTITIES, faqSchema, orgRef, productEntity, citations } from "@/lib/geo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;

const TITLE = `Best Fresh Dog Food Delivery Services of ${HERO_MONTH}`;
const DESCRIPTION =
  "The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, Maxbone, The Pets Table and Redbarn compared on dry-matter protein, cost per day by weight, AAFCO compliance and plan flexibility.";
const REF_LB = 25;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, type: "website" },
};

export default function HomePage() {
  const brands = RANKED_BRANDS;

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
      <HeroSection backgroundImageUrl="" imageAlt="" sideImage={{ src: "/brand/hero-dog.webp", alt: "Golden retriever licking its nose, excited for fresh dog food", width: 760, height: 695 }} updatedLabel={HOME_HERO.updatedLabel} h1={<>{HOME_HERO.h1Before}<span className="text-[#A16207]">{HOME_HERO.h1Highlight}</span>{HOME_HERO.h1After}</>} h2={HOME_HERO.h2} description={<>{HOME_HERO.descriptionLead}<span className="hidden sm:inline"> {HOME_HERO.descriptionMore}</span></>} />

      <section className="mx-auto max-w-[1200px] px-4 pt-3">
        <Byline path="/" />
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-6 pt-4">
        {/* Heading sits above the two-column row so the #1 card and the sidebar share a top edge. */}
        <h2 className="mb-4 pt-2 text-[22px] font-bold text-[#191919]">Our 2026 ranking</h2>
        <div className="flex items-start gap-6">
          <div className="min-w-0 flex-1 space-y-4">
            {brands.map((b) => (
              <ComparisonCard key={b.slug} brand={b} refLb={REF_LB} />
            ))}
          </div>
          <Sidebar />
        </div>
      </section>

      {/* Comparison table + editorial run full width (1200px) below the ranking + sidebar row. */}
      <section className="mx-auto max-w-[1200px] px-4 pb-4">
        <section id="compare-matrix" className="pt-2">
          <h2 className="text-[22px] font-bold text-[#191919]">Compare all 7 brands side by side</h2>
          <p className="mb-3 mt-1 text-[14.5px] text-gray-600">
            Filter by processing method and plan features; sort by score, cost per day ({REF_LB} lb neutered adult) or dry-matter protein. Every brand name opens its spec sheet.
          </p>
          <ComparisonMatrix rows={matrixRows(brands, REF_LB)} refLb={REF_LB} />
        </section>

        <HomeEditorial />
      </section>

      <FaqAccordion items={HOME_FAQS} />
    </>
  );
}
