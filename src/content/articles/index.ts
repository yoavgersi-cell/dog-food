// Article registry. To publish a new article: add one file next to this one
// exporting `meta` + `Body`, then add it to ARTICLES below (newest first).
import type { ComponentType } from "react";
import type { ArticleMeta } from "./types";
import * as howMuchToFeed from "./how-much-fresh-food-to-feed-a-dog";
import * as readLabel from "./how-to-read-a-dog-food-label";
import * as worthIt from "./is-fresh-dog-food-worth-it";
import * as freshVsKibble from "./fresh-vs-kibble";

export type { ArticleMeta } from "./types";

export interface Article {
  meta: ArticleMeta;
  Body: ComponentType;
}

export const ARTICLES: Article[] = [freshVsKibble, worthIt, readLabel, howMuchToFeed];

export const ARTICLE_BY_SLUG = new Map(ARTICLES.map((a) => [a.meta.slug, a]));
export const articlePath = (slug: string) => `/articles/${slug}`;

/** Articles relevant to a page path (for "Related guide" links on hubs and spokes). */
export function articlesFor(path: string): ArticleMeta[] {
  return ARTICLES.map((a) => a.meta).filter((m) => m.relatedPaths.some((p) => path === p || path.startsWith(`${p}/`)));
}
