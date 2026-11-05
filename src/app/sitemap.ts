import type { MetadataRoute } from "next";
import { BRANDS } from "@/lib/dogfood/brands";
import { PAIRS, comparePath } from "@/lib/dogfood/pairs";
import { BREEDS, DEMOGRAPHICS, DIETS, INGREDIENTS, bestForPath, dietPath, ingredientPath } from "@/lib/dogfood/taxonomy";
import { CONTENT_LAST_UPDATED, SITE_URL } from "@/lib/config";
import { programmaticIndexable } from "@/lib/seo";
import { ARTICLES, articlePath } from "@/content/articles";
import { REVIEW_CONTENT } from "@/content/reviews";
import { PRODUCTS, productsFor } from "@/lib/dogfood/products";

// Real per-page lastmod: IndexNow (src/app/api/indexnow) submits only URLs whose
// lastmod is recent, so every page must carry the date its content last changed.
const latest = (...dates: (string | undefined)[]) => new Date(dates.filter(Boolean).sort().at(-1)!);

// One sitemap, grouped by silo. Only indexable URLs are listed: the
// programmatic breed / diet / ingredient silos join automatically once the
// brand data gate passes (see programmaticIndexable in src/lib/seo.ts).
// At ~260 URLs a single file is well under the 50,000-URL limit; split into a
// sitemap index (generateSitemaps) past ~10k URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_LAST_UPDATED);
  const url = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const core = [
    url("/", 1),
    url("/reviews", 0.9),
    url("/compare", 0.9),
    url("/best-for", 0.8),
    url("/diets", 0.8),
    url("/ingredients", 0.6),
    url("/articles", 0.7),
    url("/how-we-rank", 0.6, "monthly"),
    url("/about", 0.4, "monthly"),
    url("/disclosure", 0.3, "monthly"),
    url("/contact", 0.3, "monthly"),
    url("/privacy", 0.2, "monthly"),
    url("/terms", 0.2, "monthly"),
  ];
  const reviewDate = (slug: string) => {
    const b = BRANDS.find((x) => x.slug === slug)!;
    return latest(CONTENT_LAST_UPDATED, REVIEW_CONTENT[slug]?.updatedAt, b.trustpilot?.checked, ...productsFor(slug).map((p) => p.checked));
  };
  const brands = BRANDS.flatMap((b) => [{ ...url(`/reviews/${b.slug}`, 0.9), lastModified: reviewDate(b.slug) }, url(`/brands/${b.slug}`, 0.8)]);
  const newestReview = new Date(Math.max(...BRANDS.map((b) => reviewDate(b.slug).getTime())));
  const newestArticle = latest(CONTENT_LAST_UPDATED, ...ARTICLES.map((a) => a.meta.updatedAt));
  // Homepage shows the product carousels; hubs list reviews / articles.
  core[0].lastModified = latest(CONTENT_LAST_UPDATED, ...PRODUCTS.map((p) => p.checked));
  core[1].lastModified = newestReview;
  core[6].lastModified = newestArticle;
  const compares = PAIRS.map((p) => url(comparePath(p.slug), 0.8));
  const articles = ARTICLES.map((a) => ({ ...url(articlePath(a.meta.slug), 0.7, "monthly"), lastModified: new Date(a.meta.updatedAt) }));
  const programmatic = programmaticIndexable()
    ? [
        ...BREEDS.map((b) => url(bestForPath(b.slug), 0.6)),
        ...DEMOGRAPHICS.map((d) => url(bestForPath(d.slug), 0.7)),
        ...DIETS.map((d) => url(dietPath(d.slug), 0.6)),
        ...INGREDIENTS.map((i) => url(ingredientPath(i.slug), 0.5, "monthly")),
      ]
    : [];

  return [...core, ...brands, ...compares, ...articles, ...programmatic];
}
