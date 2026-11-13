import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import { ProductShelf } from "@/components/product-shelf";
import { productsFor, whereToBuyFaq } from "@/lib/dogfood/products";
import { TrustpilotBlock } from "@/components/trustpilot-block";
import { REVIEW_CONTENT } from "@/content/reviews";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { ComparisonCard } from "@/components/comparison-card";
import { CostTable, FeatureTable, NutritionSpecTable } from "@/components/data-tables";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { Callout, H2, P, PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { BRANDS, FORMAT_LABEL, RANKED_BRANDS, getBrand } from "@/lib/dogfood/brands";
import { brandFaqs } from "@/lib/dogfood/faqs";
import { brandLinks } from "@/lib/dogfood/links";
import { pairsForBrand } from "@/lib/dogfood/pairs";
import { RUBRIC } from "@/lib/dogfood/rubric";
import { CONTENT_LAST_UPDATED, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { breadcrumbSchema, citations, faqSchema, orgRef, reviewEntity, WEBSITE_ID } from "@/lib/geo";
import { costPerDay, fmtUsd, PENDING } from "@/lib/nutrition";
import { pageMeta } from "@/lib/seo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = getBrand((await params).slug);
  if (!b) return {};
  return pageMeta({
    title: `${b.name} Review (2026): Honest Pros, Cons & Verdict`,
    description: `Is ${b.name} worth it? Our ${b.score.toFixed(1)}/10 verdict, the real pros and cons${b.trustpilot ? ", what customers say" : ""}, and who should (and shouldn't) buy it vs ${pairsForBrand(b.slug).length} rivals.`,
    path: `/reviews/${b.slug}`,
  });
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = getBrand((await params).slug);
  if (!b) notFound();
  const path = `/reviews/${b.slug}`;
  const editorial = REVIEW_CONTENT[b.slug];
  const products = productsFor(b.slug);
  const buyFaq = whereToBuyFaq(b.slug, b.name);
  const faqs = [...(editorial?.faqs ?? []), ...(buyFaq ? [buyFaq] : []), ...brandFaqs(b)];
  const links = brandLinks(b);
  // Closest alternatives: the brands directly above and below in the ranking.
  const i = RANKED_BRANDS.findIndex((x) => x.slug === b.slug);
  const alts = [RANKED_BRANDS[i - 1], RANKED_BRANDS[i + 1]].filter(Boolean);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${b.name} review`,
      url: `${SITE_URL}${path}`,
      datePublished: LAUNCH_DATE,
      dateModified: editorial?.updatedAt ?? CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: orgRef(),
      citation: [
        ...(editorial?.sources ?? []).map((src) => ({ "@type": "CreativeWork", name: src.label, url: src.href, publisher: { "@type": "Organization", name: src.publisher } })),
        ...citations(),
      ],
      ...pageReviewSchema(path),
      mainEntity: reviewEntity(b, path),
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }, { name: `${b.name} review`, path }]),
    faqSchema(faqs),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews", href: "/reviews" }, { label: b.name }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{b.name} Review (2026): Is It Worth It?</h1>
      <p className="mt-1 text-[16px] font-semibold text-[#A16207]">Our verdict: {b.verdict} · {b.score.toFixed(1)}/10</p>
      <div className="mb-5 mt-2"><Byline path={path} updatedAt={editorial?.updatedAt} /></div>

      <QuickAnswer
        question={`Is ${b.name} good dog food?`}
        answer={`Yes - ${b.name} scores ${b.score.toFixed(1)}/10 (${b.scoreLabel}) and is our pick for: ${b.verdict.toLowerCase()}. ${b.summary.split(". ")[0]}.`}
        rows={[
          { label: "Scout Score", value: `${b.score.toFixed(1)}/10 (#${b.rank} of ${RANKED_BRANDS.length})` },
          { label: "Best for", value: b.bestFor[0] },
          { label: "Not ideal for", value: b.notIdealFor[0] },
          b.price ? { label: "Cost per day (25 lb adult)", value: fmtUsd(costPerDay(b.price, 25)) } : { label: "Current offer", value: b.offer },
          { label: "Formats", value: b.formats.map((f) => FORMAT_LABEL[f]).join(", ") },
        ]}
      />

      <div className="mt-6"><ComparisonCard brand={b} hideRank pageType="review" sourceFlow="provider_review" /></div>

      <section aria-labelledby="at-a-glance" className="mt-6 rounded-xl border-2 border-[#FDE68A] bg-[#FEFCE8] p-5">
        <h2 id="at-a-glance" className="mb-3 text-[18px] font-bold text-[#191919]">{b.name} at a glance</h2>
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {[
            ["Best for", b.bestFor[0]],
            ["Skip it if", b.notIdealFor[0]],
            ["Formats", b.formats.map((f) => FORMAT_LABEL[f]).join(", ")],
            ["Main proteins", b.proteins.map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(", ")],
            ["Plan", b.subscriptionRequired === null ? null : b.subscriptionRequired ? `Subscription${b.pauseSkipOnline ? " - pause or cancel anytime online" : ""}` : "No subscription needed"],
            ["Portions", b.customPortions === null ? null : b.customPortions ? "Personalized to your dog's calories" : "Standard bags - you portion"],
            ["Storage", b.storage === "pantry" ? "Pantry - no freezer needed" : b.storage === "freezer + fridge" ? "Freezer and fridge" : "Freezer/fridge, or pantry for the dry line"],
            ["Delivery", b.delivery],
          ]
            .filter((r): r is [string, string] => !!r[1])
            .map(([k, v]) => (
              <div key={k}>
                <dt className="text-[12px] font-bold uppercase tracking-wide text-[#A16207]">{k}</dt>
                <dd className="text-[15px] font-semibold text-[#191919]">{v}</dd>
              </div>
            ))}
        </dl>
      </section>

      <H2 id="verdict">Our verdict</H2>
      <P>{b.summary}</P>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#F3E3A3] bg-white p-5">
          <p className="mb-2 font-bold text-[#191919]">Pros</p>
          <ul className="space-y-1.5">{b.pros.map((x) => <li key={x} className="flex gap-2 text-[15px] text-gray-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A16207]" />{x}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-[#F3E3A3] bg-white p-5">
          <p className="mb-2 font-bold text-[#191919]">Cons</p>
          <ul className="space-y-1.5">{b.cons.map((x) => <li key={x} className="flex gap-2 text-[15px] text-gray-700"><X className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />{x}</li>)}</ul>
        </div>
      </div>

      <H2 id="who">Who it&apos;s for - and who should skip it</H2>
      <div className="grid gap-4 sm:grid-cols-2">
        <ul className="list-disc space-y-1 pl-5 text-[15px] text-gray-700">{b.bestFor.map((x) => <li key={x}>{x}</li>)}</ul>
        <ul className="list-disc space-y-1 pl-5 text-[15px] text-gray-700">{b.notIdealFor.map((x) => <li key={x}>Skip if: {x.charAt(0).toLowerCase() + x.slice(1)}</li>)}</ul>
      </div>

      {editorial && <editorial.Body />}

      <H2 id="pricing">{b.name} pricing and plans</H2>
      <div className="rounded-xl border border-[#F3E3A3] bg-white p-5">
        <p className="inline-flex rounded-md bg-[#FEF3C7] px-3 py-1.5 text-[14px] font-bold text-[#713F12] ring-1 ring-inset ring-[#FDE68A]">Current offer: {b.offer}</p>
        <ul className="mt-4 space-y-2 text-[15px] text-gray-700">
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A16207]" />{b.subscriptionRequired ? "Sold as a subscription" : "Buy once, no subscription required"}{b.pauseSkipOnline ? ": pause, skip or cancel online anytime" : ""}.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A16207]" />Plans: {b.formats.map((f) => FORMAT_LABEL[f].toLowerCase()).join(", ")}{b.customPortions ? ", portioned to your dog's daily calories" : ""}.</li>
          <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A16207]" />Price depends on your dog&apos;s weight and calorie needs. Our cost-per-day figures appear here once checked against {b.name}&apos;s standard (non-intro) prices.</li>
        </ul>
        {b.price && <CostTable brands={[b]} />}
        <ProviderCta
          href={b.affiliateUrl}
          providerName={b.name}
          providerSlug={b.slug}
          position={b.rank}
          pageType="review"
          sourceFlow="provider_review"
          className="mt-5 inline-flex h-[46px] items-center gap-2 rounded-lg bg-[#A16207] px-6 text-[15.5px] font-bold text-white transition-colors hover:bg-[#854D0E]"
        >
          See {b.name}&apos;s current price <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </ProviderCta>
      </div>

      {products.length > 0 && (
        <>
          <H2 id="products">{b.name} products and prices</H2>
          <p className="mb-5 text-[15.5px] leading-relaxed text-gray-700">
            Every {b.name} product we track, grouped by type, with the price, pack size and seller as listed. Swipe or use the arrows to see them all.
          </p>
          <ProductShelf products={products} path={path} name={`${b.name} products and prices`} />
        </>
      )}

      {b.nutrition && (
        <>
          <H2 id="nutrition">Nutrition analysis (dry-matter basis)</H2>
          <NutritionSpecTable brands={[b]} />
        </>
      )}

      {b.trustpilot && (
        <>
          <H2 id="trustpilot">What {b.name} customers say on Trustpilot</H2>
          <TrustpilotBlock brandName={b.name} logo={b.logo} data={b.trustpilot} />
        </>
      )}

      {/* Deep editorial reviews carry their own alternatives table. */}
      {!editorial?.ownAlternatives && (
        <>
          <H2 id="compare">{b.name} vs. its closest alternatives</H2>
          <FeatureTable brands={[b, ...alts]} />
        </>
      )}

      <H2 id="scoring">How we scored {b.name}</H2>
      <P>The Scout Score weights six criteria. Here&apos;s what we checked for {b.name}:</P>
      <ul className="mb-4 space-y-2">
        {RUBRIC.map((r) => (
          <li key={r.key} className="rounded-lg border border-[#F3E3A3] bg-white px-4 py-2.5 text-[14.5px] text-gray-700">
            <strong className="text-[#191919]">{r.label} ({r.weight}%)</strong> - {r.detail}
          </li>
        ))}
      </ul>
      {b.toVerify.length > 0 && (
        <Callout>
          Still being verified against {b.name}&apos;s own published information: {b.toVerify.join(", ")}. These fields show &quot;{PENDING}&quot; until confirmed; the score will be re-checked when they are.
        </Callout>
      )}

      <section className="mt-10 rounded-xl bg-[#191919] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-[18px] font-bold">Ready to try {b.name}?</p>
          <p className="mt-1 text-[14.5px] text-gray-300">{b.verdict} · {b.score.toFixed(1)}/10 · {b.offer}</p>
        </div>
        <ProviderCta
          href={b.affiliateUrl}
          providerName={b.name}
          providerSlug={b.slug}
          position={b.rank}
          pageType="review"
          sourceFlow="provider_review"
          className="mt-4 inline-flex h-[46px] shrink-0 items-center gap-2 rounded-lg bg-[#EAB308] px-6 text-[15.5px] font-bold text-[#191919] transition-colors hover:bg-[#FDE68A] sm:mt-0"
        >
          Visit {b.name} <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </ProviderCta>
      </section>

      <FaqAccordion bare title={`${b.name} FAQs`} items={faqs} />
      {editorial && editorial.sources.length > 0 && (
        <section className="mt-10 rounded-xl border border-[#F3E3A3] bg-white p-5">
          <h2 className="mb-2 text-[16px] font-bold text-[#191919]">Sources</h2>
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-gray-600">
            {editorial.sources.map((src) => (
              <li key={src.href}>
                <a href={src.href} rel="noopener" className="text-[#A16207] hover:underline">{src.label}</a> ({src.publisher}{src.year ? `, ${src.year}` : ""})
              </li>
            ))}
          </ul>
        </section>
      )}
      <LinkGrid title={`Compare ${b.name}`} items={links.comparisons} />
      <LinkGrid title="Diets this brand fits" columns={3} items={links.diets} />
      <LinkGrid title="By life stage and size" columns={3} items={links.lifeStages} />
      <p className="mt-8 text-[14px] text-gray-600">
        Every recipe, ingredient and nutrient: <Link href={`/brands/${b.slug}`} className="font-semibold text-[#A16207] hover:underline">{b.name} recipes &amp; nutrition</Link>.{" "}
        Back to the <Link href="/" className="font-semibold text-[#A16207] hover:underline">full ranking</Link>.
      </p>
    </PageShell>
  );
}
