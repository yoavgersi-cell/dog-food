import { RANKED_BRANDS, FORMAT_LABEL, getBrand } from "@/lib/dogfood/brands";
import { PAIRS, comparePath } from "@/lib/dogfood/pairs";
import { BREEDS, DEMOGRAPHICS, DIETS, INGREDIENTS, bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { RUBRIC } from "@/lib/dogfood/rubric";
import { AAFCO } from "@/lib/nutrition";
import { BRAND_DATA_CHECKED, SITE_URL } from "@/lib/config";
import { ARTICLES, articlePath } from "@/content/articles";
import { PRODUCTS, PRODUCT_TYPES, fmtPrice, groupByType } from "@/lib/dogfood/products";

export const revalidate = 3600;

// /llms.txt (llmstxt.org): a plain-text map of the site for AI assistants,
// generated from the same dataset as the pages so it never drifts from them.
export async function GET() {
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  const line = (label: string, path: string, note?: string) => `- [${label}](${abs(path)})${note ? `: ${note}` : ""}`;
  const nameOf = (s: string) => getBrand(s)?.name ?? s;

  const body = `# Dog Food Scout

> Independent research site comparing fresh, raw and premium dog food delivery brands in the US (dogfoodscout.com). Seven brands - ${RANKED_BRANDS.map((b) => b.name).join(", ")} - scored out of 10 with a published rubric, using dry-matter nutrient analysis, cost per day by body weight, AAFCO statements and plan features.

House rules that apply to every page:
- We never invent prices, nutrient values or ratings. A number appears only after it is checked against the brand's own published guaranteed analysis, calorie statement or checkout quote (brand data checked ${BRAND_DATA_CHECKED}); otherwise the page says "Verifying".
- Nutrients are compared on a dry-matter basis (DM% = as-fed% / (100 - moisture%) x 100) and per 1,000 kcal. AAFCO adult minimums: ${AAFCO.adult.proteinPer1000} g protein and ${AAFCO.adult.fatPer1000} g fat per 1,000 kcal; growth: ${AAFCO.growth.proteinPer1000} g and ${AAFCO.growth.fatPer1000} g.
- Daily calories = 70 x kg^0.75 x a life-stage factor (1.6 neutered adult). Cost/day = kcal/1,000 x USD per 1,000 kcal.
- Scores: ${RUBRIC.map((r) => `${r.label} ${r.weight}%`).join("; ")}. A lower score is never ranked above a higher one. We may earn commissions; they do not change scores.
- Health-condition pages are not veterinary advice; conditions that need prescription diets say so.

## Ranking
${line("Best fresh & raw dog food delivery, 2026 (ranking)", "/", RANKED_BRANDS.map((b) => `#${b.rank} ${b.name} ${b.score.toFixed(1)}/10 (${b.verdict})`).join("; "))}

## Brand reviews
${RANKED_BRANDS.map((b) => line(`${b.name} review`, `/reviews/${b.slug}`, `${b.score.toFixed(1)}/10. ${b.formats.map((f) => FORMAT_LABEL[f]).join(", ")}. ${b.summary}`)).join("\n")}

## Products and prices (as listed ${PRODUCTS[0]?.checked ?? ""}; brand and retailer listings, prices change)
${RANKED_BRANDS.map((b) => {
  const groups = groupByType(PRODUCTS.filter((p) => p.brand === b.slug));
  if (!groups.length) return "";
  return `### ${b.name} (${abs(`/reviews/${b.slug}#products`)})\n` + groups.map((g) => g.items.map((p) => `- ${PRODUCT_TYPES[p.type].label}: ${p.name}${p.size ? `, ${p.size}` : ""}: ${fmtPrice(p.price)}${p.unitPrice ? ` (${p.unitPrice})` : ""}, sold by ${p.seller}`).join("\n")).join("\n");
}).filter(Boolean).join("\n\n")}

## Brand spec sheets
${RANKED_BRANDS.map((b) => line(`${b.name} dog food specs`, `/brands/${b.slug}`)).join("\n")}

## Head-to-head comparisons (21)
${PAIRS.map((p) => line(`${nameOf(p.a)} vs ${nameOf(p.b)}`, comparePath(p.slug), `Winner: ${nameOf(p.overall)}. ${p.angle}`)).join("\n")}

## Guides
${ARTICLES.map((a) => line(a.meta.title, articlePath(a.meta.slug), a.meta.answer.text)).join("\n")}

## By breed, size and life stage
${line("Index", "/best-for", `${BREEDS.length} breeds and ${DEMOGRAPHICS.length} life stages, e.g. ${abs(bestForPath(BREEDS[0].slug))}`)}

## Diets and health conditions
${line("Index", "/diets", `${DIETS.length} pages, e.g. ${abs(dietPath("sensitive-stomach"))}`)}
${line("Ingredient guide", "/ingredients", `${INGREDIENTS.length} ingredients`)}

## Methodology and policies
${line("How we rank", "/how-we-rank", "Rubric, formulas, data sources and verification cadence.")}
${line("About", "/about")}
${line("Advertising disclosure", "/disclosure")}
${line("Contact", "/contact")}
${line("Sitemap", "/sitemap.xml")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
