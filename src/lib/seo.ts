import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { isDataGatePassed } from "@/lib/dogfood/brands";

/**
 * Indexing policy for number-heavy programmatic pages (breed, diet, ingredient).
 * They render for users from day one, but stay `noindex, follow` - and out of
 * the sitemap - until every brand has verified nutrition + price data, so we
 * never ask Google or AI engines to index a page full of "Verifying" cells.
 * Homepage, reviews, brand hubs and the 21 comparisons are always indexable
 * (their verdicts don't depend on the pending numbers).
 *
 * Override for a staged rollout with PROGRAMMATIC_INDEX=1 at build time.
 */
export function programmaticIndexable(): boolean {
  return process.env.PROGRAMMATIC_INDEX === "1" || isDataGatePassed();
}

export function pageMeta({
  title,
  description,
  path,
  index = true,
  type = "article",
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  type?: "article" | "website";
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type, siteName: SITE_NAME, images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: SITE_NAME }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-default.jpg"] },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
  };
}
