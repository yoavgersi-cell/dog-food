import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { ComparisonCard } from "@/components/comparison-card";
import { CalorieTable, CostTable } from "@/components/data-tables";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { Callout, H2, P, PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { RANKED_BRANDS, getBrand } from "@/lib/dogfood/brands";
import { breedFaqs, demographicFaqs } from "@/lib/dogfood/faqs";
import { breedLinks } from "@/lib/dogfood/links";
import {
  BEST_FOR_SUFFIX, BREEDS, BREED_BY_SLUG, DEMOGRAPHICS, DEMOGRAPHIC_BY_SLUG, DIET_BY_SLUG, bestForPath, breedMidLb, type Breed, type Demographic,
} from "@/lib/dogfood/taxonomy";
import { CONTENT_LAST_UPDATED, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { breadcrumbSchema, ENTITIES, faqSchema, orgRef, productEntity, WEBSITE_ID } from "@/lib/geo";
import { AAFCO, kcalPerDayForLb, type LifeStage } from "@/lib/nutrition";
import { pageMeta, programmaticIndexable } from "@/lib/seo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;
export const dynamicParams = false;

type Target = { kind: "breed"; breed: Breed } | { kind: "demo"; demo: Demographic };

function resolve(param: string): Target | null {
  if (!param.endsWith(BEST_FOR_SUFFIX)) return null;
  const slug = param.slice(0, -BEST_FOR_SUFFIX.length);
  const breed = BREED_BY_SLUG.get(slug);
  if (breed) return { kind: "breed", breed };
  const demo = DEMOGRAPHIC_BY_SLUG.get(slug);
  return demo ? { kind: "demo", demo } : null;
}

export function generateStaticParams() {
  return [...BREEDS, ...DEMOGRAPHICS].map((x) => ({ slug: `${x.slug}${BEST_FOR_SUFFIX}` }));
}

const titleFor = (t: Target) =>
  t.kind === "breed" ? `Best Fresh & Raw Dog Food for ${t.breed.name}s (2026)` : `Best Fresh & Raw Dog Food for ${t.demo.name} (2026)`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = resolve((await params).slug);
  if (!t) return {};
  const description =
    t.kind === "breed"
      ? `${t.breed.name} feeding data: ${kcalPerDayForLb(t.breed.minLb).toLocaleString("en-US")}-${kcalPerDayForLb(t.breed.maxLb).toLocaleString("en-US")} kcal/day for a ${t.breed.minLb}-${t.breed.maxLb} lb adult, cost per day for 7 fresh and raw brands, and the health issues that shape the choice.`
      : `${t.demo.focus} Calories, cost per day and our ranked picks across 7 fresh and raw brands.`;
  const slug = t.kind === "breed" ? t.breed.slug : t.demo.slug;
  return pageMeta({ title: titleFor(t), description, path: bestForPath(slug), index: programmaticIndexable() });
}

const TRANSITION = [
  ["Days 1-3", "25% new, 75% old"],
  ["Days 4-6", "50% new, 50% old"],
  ["Days 7-9", "75% new, 25% old"],
  ["Day 10+", "100% new"],
];

const MEALS: Record<string, string> = {
  toy: "3-4 small meals a day (helps prevent low blood sugar)",
  small: "2-3 meals a day",
  medium: "2 meals a day",
  large: "2 meals a day; avoid vigorous exercise for an hour after eating",
  giant: "2-3 smaller meals a day to reduce bloat (GDV) risk; avoid exercise around meals",
};

export default async function BestForPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = resolve((await params).slug);
  if (!t) notFound();
  const top = RANKED_BRANDS[0];
  const raw = getBrand("we-feed-raw")!;
  const flex = getBrand("the-pet-table")!;

  if (t.kind === "demo") return <DemographicView d={t.demo} />;

  const br = t.breed;
  const mid = breedMidLb(br);
  const path = bestForPath(br.slug);
  const links = breedLinks(br);
  const faqs = breedFaqs(br);
  const weights = Array.from(new Set([br.minLb, mid, br.maxLb]));
  const stages: LifeStage[] = ["neutered-adult", "intact-adult", "senior", "active", "weight-loss"];
  const largeGrowth = br.maxLb >= 70;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: titleFor(t),
      url: `${SITE_URL}${path}`,
      datePublished: LAUNCH_DATE,
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      author: orgRef(),
      publisher: orgRef(),
      ...pageReviewSchema(path),
      about: [{ "@type": "Thing", name: br.name, description: `${br.name} dog breed` }, ENTITIES.dog],
      mentions: [ENTITIES.aafco],
      mainEntity: { "@type": "ItemList", itemListElement: RANKED_BRANDS.map((b, i) => ({ "@type": "ListItem", position: i + 1, item: productEntity(b) })) },
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Best for", path: "/best-for" }, { name: `${br.name}s`, path }]),
    faqSchema(faqs),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Breeds", href: "/best-for" }, { label: `${br.name}s` }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{titleFor(t)}</h1>
      <div className="mb-5 mt-2"><Byline path={path} /></div>

      <QuickAnswer
        question={`What is the best fresh dog food for a ${br.name}?`}
        answer={`${top.name} is our top pick for most ${br.name}s because its packs are portioned to a calorie target - and a ${mid} lb neutered adult ${br.name} needs about ${kcalPerDayForLb(mid).toLocaleString("en-US")} kcal a day. Choose ${raw.name} for raw, or ${flex.name} to add fresh food on a part-fresh budget.`}
        rows={[
          { label: "Adult weight range", value: `${br.minLb}-${br.maxLb} lb (${br.size})` },
          { label: "Calories/day, neutered adult", value: `${kcalPerDayForLb(br.minLb).toLocaleString("en-US")}-${kcalPerDayForLb(br.maxLb).toLocaleString("en-US")} kcal` },
          { label: "Top pick", value: `${top.name} (${top.score.toFixed(1)}/10)`, href: `/reviews/${top.slug}` },
          { label: "Best raw pick", value: raw.name, href: `/reviews/${raw.slug}` },
          { label: "Watch for", value: links.risks.map((r) => r.label).join(", ") },
        ]}
      />

      <H2 id="calories">How much should a {br.name} eat?</H2>
      <P>Daily energy needs scale with metabolic body weight (kg^0.75), not linearly with weight, so a {br.maxLb} lb {br.name} needs far less than {(br.maxLb / br.minLb).toFixed(1)}x the calories of a {br.minLb} lb one.</P>
      <CalorieTable weights={weights} stages={stages} />

      <H2 id="ranking">Ranked for {br.name}s</H2>
      <P>Same Scout Scores as our main ranking; cost per day is shown at {mid} lb, the middle of the breed&apos;s adult range.</P>
      <div className="space-y-4">
        {RANKED_BRANDS.map((b) => <ComparisonCard key={b.slug} brand={b} refLb={mid} />)}
      </div>

      <H2 id="cost">Cost per day for a {br.name}</H2>
      <CostTable brands={RANKED_BRANDS} weights={weights} />

      <H2 id="health">{br.name} health considerations that affect diet</H2>
      <ul className="space-y-3">
        {br.risks.map((slug) => {
          const d = DIET_BY_SLUG.get(slug);
          const link = links.risks.find((r) => r.href.endsWith(slug));
          return (
            <li key={slug} className="rounded-xl border border-[#F3E3A3] bg-white p-4">
              {link ? <Link href={link.href} className="font-bold text-[#A16207] hover:underline">{link.label}</Link> : <span className="font-bold">{slug}</span>}
              {d && <p className="mt-1 text-[15px] text-gray-700">{d.focus}</p>}
            </li>
          );
        })}
      </ul>
      <Callout>Breed tendencies are population-level. Your vet&apos;s assessment of your own dog - weight, body condition score, bloodwork - outranks any breed guide.</Callout>

      <H2 id="puppies">Feeding {br.name} puppies</H2>
      <P>
        Puppies need a recipe that meets AAFCO&apos;s growth or all-life-stages profile: at least {AAFCO.growth.proteinPer1000} g protein and {AAFCO.growth.fatPer1000} g fat per 1,000 kcal.
        {largeGrowth ? ` Because adult ${br.name}s can exceed 70 lb, the label must also cover "growth of large size dogs", which caps calcium at ${AAFCO.largeBreedGrowthCaMaxDM}% DM to protect developing joints.` : ""}
      </P>

      <H2 id="how">How to feed fresh food to a {br.name}</H2>
      <P>Meal frequency: {MEALS[br.size]}. Switch foods gradually over about 10 days:</P>
      <div className="overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
        <table className="w-full text-left text-[14px]">
          <tbody>
            {TRANSITION.map(([day, mix]) => (
              <tr key={day} className="border-t border-[#FEF3C7] first:border-t-0">
                <th scope="row" className="px-3 py-2 font-semibold text-[#191919]">{day}</th>
                <td className="px-3 py-2 text-gray-700">{mix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FaqAccordion bare title={`${br.name} feeding FAQs`} items={faqs} />
      <LinkGrid title="Similar breeds" columns={3} items={links.siblings} />
      <LinkGrid title="Keep exploring" items={[links.sizeHub, links.puppy, ...links.comparisons]} />
    </PageShell>
  );
}

function DemographicView({ d }: { d: Demographic }) {
  const path = bestForPath(d.slug);
  const faqs = demographicFaqs(d);
  const weights = [Math.max(4, Math.round(d.refLb * 0.5)), d.refLb, Math.round(d.refLb * 1.5)];
  const t: Target = { kind: "demo", demo: d };
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: titleFor(t),
      url: `${SITE_URL}${path}`,
      datePublished: LAUNCH_DATE,
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      author: orgRef(),
      publisher: orgRef(),
      ...pageReviewSchema(path),
      about: ENTITIES.dog,
      mainEntity: { "@type": "ItemList", itemListElement: RANKED_BRANDS.map((b, i) => ({ "@type": "ListItem", position: i + 1, item: productEntity(b) })) },
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Best for", path: "/best-for" }, { name: d.name, path }]),
    faqSchema(faqs),
  ];
  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Best for", href: "/best-for" }, { label: d.name }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{titleFor(t)}</h1>
      <div className="mb-5 mt-2"><Byline path={path} /></div>
      <QuickAnswer
        question={`What is the best fresh dog food for ${d.name.toLowerCase()}?`}
        answer={`${d.focus} For most owners our top pick is ${RANKED_BRANDS[0].name} (${RANKED_BRANDS[0].score.toFixed(1)}/10).`}
        rows={[
          { label: "Reference weight", value: `${d.refLb} lb` },
          { label: "Calories/day at that weight", value: `${kcalPerDayForLb(d.refLb, d.stage).toLocaleString("en-US")} kcal` },
          { label: "Top pick", value: RANKED_BRANDS[0].name, href: `/reviews/${RANKED_BRANDS[0].slug}` },
        ]}
      />
      <H2 id="calories">Calories per day</H2>
      <CalorieTable weights={weights} stages={[d.stage, "neutered-adult", "senior"].filter((s, i, a) => a.indexOf(s) === i) as LifeStage[]} />
      <H2 id="ranking">Ranked picks</H2>
      <div className="space-y-4">
        {RANKED_BRANDS.map((b) => <ComparisonCard key={b.slug} brand={b} refLb={d.refLb} />)}
      </div>
      <H2 id="cost">Cost per day</H2>
      <CostTable brands={RANKED_BRANDS} weights={weights} stage={d.stage} />
      <FaqAccordion bare title="FAQs" items={faqs} />
      <LinkGrid
        title="Other life stages and sizes"
        columns={3}
        items={DEMOGRAPHICS.filter((x) => x.slug !== d.slug).slice(0, 9).map((x) => ({ href: bestForPath(x.slug), label: x.name }))}
      />
    </PageShell>
  );
}
