import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { INGREDIENTS, ingredientPath, type IngredientCategory } from "@/lib/dogfood/taxonomy";
import { breadcrumbSchema } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Dog Food Ingredient Guide: Proteins, Carbs, Fats & Supplements",
  description: `${INGREDIENTS.length} ingredients explained - what each does, the cautions, and which fresh and raw brands use it.`,
  path: "/ingredients",
  type: "website",
});

const CATS: IngredientCategory[] = ["protein", "organ", "carb", "vegetable", "fruit", "fat", "supplement"];

export default function IngredientsIndex() {
  return (
    <PageShell blocks={["methodology", "reviews"]}>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Ingredients", path: "/ingredients" }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ingredients" }]} />
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Dog Food Ingredient Guide</h1>
      {CATS.map((c) => (
        <section key={c}>
          <h2 className="mb-2 mt-8 text-[20px] font-bold capitalize text-[#191919]">{c === "carb" ? "Carbohydrates" : `${c}s`}</h2>
          <ul className="grid gap-2 sm:grid-cols-3">
            {INGREDIENTS.filter((i) => i.category === c).map((i) => (
              <li key={i.slug}><Link href={ingredientPath(i.slug)} className="block rounded-lg border border-[#F3E3A3] bg-white px-3 py-2 text-[14px] font-semibold text-[#191919] hover:border-[#EAB308]">{i.name}</Link></li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
