import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { ComparisonCard } from "@/components/comparison-card";
import { CostTable, FeatureTable, NutritionSpecTable } from "@/components/data-tables";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { H2, P, PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { getBrand } from "@/lib/dogfood/brands";
import { pairFaqs } from "@/lib/dogfood/faqs";
import { pairLabel } from "@/lib/dogfood/links";
import { PAIRS, PAIR_BY_SLUG, comparePath, pairBrands, pairsForBrand } from "@/lib/dogfood/pairs";
import { CONTENT_LAST_UPDATED, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { breadcrumbSchema, faqSchema, orgRef, productEntity, WEBSITE_ID } from "@/lib/geo";
import { costPerDay, fmtUsd, PENDING } from "@/lib/nutrition";
import { pageMeta } from "@/lib/seo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return PAIRS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pair = PAIR_BY_SLUG.get((await params).slug);
  if (!pair) return {};
  const [a, b] = pairBrands(pair);
  const w = getBrand(pair.overall)!;
  return pageMeta({
    title: `${a.name} vs ${b.name} (2026): ${w.name} Wins`,
    description: `${pair.angle} Dry-matter nutrition, cost per day by weight and a clear verdict.`,
    path: comparePath(pair.slug),
  });
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const pair = PAIR_BY_SLUG.get((await params).slug);
  if (!pair) notFound();
  const [a, b] = pairBrands(pair);
  const winner = getBrand(pair.overall)!;
  const loser = winner.slug === a.slug ? b : a;
  const path = comparePath(pair.slug);
  const faqs = pairFaqs(pair, a, b);
  const c = (x: typeof a) => (x.price ? fmtUsd(costPerDay(x.price, 25)) : PENDING);
  const others = [...pairsForBrand(a.slug), ...pairsForBrand(b.slug)].filter((p) => p.slug !== pair.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${a.name} vs ${b.name}`,
      url: `${SITE_URL}${path}`,
      datePublished: LAUNCH_DATE,
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: orgRef(),
      author: orgRef(),
      ...pageReviewSchema(path),
      about: [productEntity(a), productEntity(b)],
      mainEntity: {
        "@type": "ItemList",
        name: `${a.name} vs ${b.name} verdict`,
        itemListElement: [winner, loser].map((x, i) => ({ "@type": "ListItem", position: i + 1, item: productEntity(x) })),
      },
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }, { name: `${a.name} vs ${b.name}`, path }]),
    faqSchema(faqs),
  ];

  return (
    <PageShell featuredPairs={others.slice(0, 6).map((p) => p.slug)}>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: `${a.name} vs ${b.name}` }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">
        {a.name} vs {b.name} (2026): {winner.name} Wins for Most Dogs
      </h1>
      <div className="mb-5 mt-2"><Byline path={path} /></div>

      <QuickAnswer
        question={`Which is better, ${a.name} or ${b.name}?`}
        answer={`${winner.name} is the better choice for most dogs (${winner.score.toFixed(1)}/10 vs ${loser.score.toFixed(1)}/10). ${pair.angle} ${loser.name} is the better pick for: ${loser.bestFor[0].toLowerCase()}.`}
        rows={[
          { label: "Overall winner", value: `${winner.name} (${winner.score.toFixed(1)}/10)`, href: `/reviews/${winner.slug}` },
          ...pair.decisions.map((d) => ({ label: d.question, value: d.winner === "tie" ? "Tie" : getBrand(d.winner)!.name })),
          { label: "Cost/day, 25 lb adult", value: `${a.name}: ${c(a)} · ${b.name}: ${c(b)}` },
        ]}
      />

      <div className="mt-6 space-y-3">
        {[winner, loser].map((x, i) => <ComparisonCard key={x.slug} brand={x} rank={i + 1} pageType="battle" sourceFlow="battle_page" />)}
      </div>

      <H2 id="decisions">Head-to-head, decision by decision</H2>
      <div className="space-y-3">
        {pair.decisions.map((d) => (
          <div key={d.question} className="rounded-xl border border-[#F3E3A3] bg-white p-4">
            <p className="font-bold text-[#191919]">{d.question}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[15px] text-gray-700">
              <Trophy className="h-4 w-4 text-[#EAB308]" />
              <strong className="text-[#A16207]">{d.winner === "tie" ? "Tie" : getBrand(d.winner)!.name}</strong> - {d.why}
            </p>
          </div>
        ))}
      </div>

      <H2 id="features">Features side by side</H2>
      <FeatureTable brands={[a, b]} />

      <H2 id="nutrition">Nutrition: dry matter and per 1,000 kcal</H2>
      <P>Comparing as-fed percentages across formats is misleading because water content differs. Every number below is converted to a dry-matter basis and to grams per 1,000 kcal.</P>
      <NutritionSpecTable brands={[a, b]} />

      <H2 id="cost">Cost per day at 10-100 lb</H2>
      <CostTable brands={[a, b]} />

      <H2 id="choose">Which should you choose?</H2>
      <div className="grid gap-4 sm:grid-cols-2">
        {[a, b].map((x) => (
          <div key={x.slug} className="rounded-xl border border-[#F3E3A3] bg-[#FEFCE8] p-5">
            <p className="mb-2 font-bold text-[#191919]">Choose {x.name} if…</p>
            <ul className="list-disc space-y-1 pl-5 text-[15px] text-gray-700">{x.bestFor.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
      </div>

      <FaqAccordion bare title={`${a.name} vs ${b.name} FAQs`} items={faqs} />
      <LinkGrid title="More comparisons" items={others.slice(0, 8).map((p) => ({ href: comparePath(p.slug), label: pairLabel(p), note: p.angle }))} />
      <p className="mt-8 text-[14px] text-gray-600">
        Full reviews: <Link href={`/reviews/${a.slug}`} className="font-semibold text-[#A16207] hover:underline">{a.name}</Link> ·{" "}
        <Link href={`/reviews/${b.slug}`} className="font-semibold text-[#A16207] hover:underline">{b.name}</Link> ·{" "}
        <Link href="/" className="font-semibold text-[#A16207] hover:underline">All 7 brands ranked</Link>
      </p>
    </PageShell>
  );
}
