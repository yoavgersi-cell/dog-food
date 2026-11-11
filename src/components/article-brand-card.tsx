import { ComparisonCard } from "@/components/comparison-card";
import { getBrand } from "@/lib/dogfood/brands";

/** Inline provider card for articles: the ranking-chart card without the rank number. */
export function ArticleBrandCard({ slug }: { slug: string }) {
  const b = getBrand(slug);
  if (!b) return null;
  return (
    <div className="my-8">
      <ComparisonCard brand={b} hideRank pageType="article" sourceFlow="article_inline" />
    </div>
  );
}
