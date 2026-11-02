import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { ComparisonCard } from "@/components/comparison-card";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { Callout, H2, P, PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { ingredientLinks } from "@/lib/dogfood/links";
import { INGREDIENTS, INGREDIENT_BY_SLUG, ingredientPath } from "@/lib/dogfood/taxonomy";
import { CONTENT_LAST_UPDATED, LAUNCH_DATE, SITE_URL } from "@/lib/config";
import { breadcrumbSchema, orgRef, productEntity, WEBSITE_ID } from "@/lib/geo";
import { pageMeta, programmaticIndexable } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return INGREDIENTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const ing = INGREDIENT_BY_SLUG.get((await params).slug);
  if (!ing) return {};
  return pageMeta({
    title: `${ing.name} in Dog Food: Benefits, Cautions & Which Brands Use It`,
    description: `${ing.note} Which fresh and raw brands feature ${ing.name.toLowerCase()}, and the diets it matters for.`,
    path: ingredientPath(ing.slug),
    index: programmaticIndexable(),
  });
}

export default async function IngredientPage({ params }: { params: Promise<{ slug: string }> }) {
  const ing = INGREDIENT_BY_SLUG.get((await params).slug);
  if (!ing) notFound();
  const path = ingredientPath(ing.slug);
  const links = ingredientLinks(ing);
  const isProtein = ing.category === "protein";

  return (
    <PageShell>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${ing.name} in dog food`,
            url: `${SITE_URL}${path}`,
            datePublished: LAUNCH_DATE,
            dateModified: CONTENT_LAST_UPDATED,
            isPartOf: { "@id": WEBSITE_ID },
            author: orgRef(),
            publisher: orgRef(),
            about: { "@type": "Thing", name: ing.name },
            ...(links.brands.length > 0 && { mentions: links.brands.map(productEntity) }),
          },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ingredients", path: "/ingredients" }, { name: ing.name, path }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ingredients", href: "/ingredients" }, { label: ing.name }]} />
      <h1 className="text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{ing.name} in Dog Food</h1>
      <div className="mb-5 mt-2"><Byline path={path} /></div>

      <QuickAnswer
        question={`Is ${ing.name.toLowerCase()} good for dogs?`}
        answer={ing.note}
        rows={[
          { label: "Category", value: ing.category },
          ...(isProtein ? [{ label: "Brands with a main recipe", value: links.brands.length ? links.brands.map((b) => b.name).join(", ") : "None of the 7 brands we cover" }] : []),
        ]}
      />

      {isProtein && links.brands.length > 0 && (
        <>
          <H2 id="brands">Brands with a {ing.name.toLowerCase()} recipe</H2>
          <div className="space-y-4">{links.brands.map((b, i) => <ComparisonCard key={b.slug} brand={b} rank={i + 1} />)}</div>
        </>
      )}
      {!isProtein && (
        <>
          <H2 id="brands">Which brands use it?</H2>
          <P>We are compiling recipe-level ingredient lists for all seven brands from their published labels. This section will list every recipe that contains {ing.name.toLowerCase()}, with its position on the ingredient list.</P>
        </>
      )}
      <Callout>Ingredient lists are ordered by weight before cooking. An ingredient&apos;s position tells you more than its presence.</Callout>

      <LinkGrid title="Diets where this matters" columns={3} items={links.diets} />
      <LinkGrid title={`Other ${ing.category} ingredients`} columns={3} items={links.siblings} />
    </PageShell>
  );
}
