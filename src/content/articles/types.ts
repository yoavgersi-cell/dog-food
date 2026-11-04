import type { FaqItem } from "@/lib/config";

export interface ArticleMeta {
  slug: string;
  title: string; // H1 + social title
  seoTitle: string; // <title> before the brand suffix (aim <= 60 chars)
  description: string; // meta description (aim 140-160 chars)
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  readMinutes: number;
  category: "Feeding" | "Nutrition" | "Health" | "Buying guide";
  /** Direct-answer block shown at the top (AEO). */
  answer: { question: string; text: string };
  keyTakeaways: string[];
  faqs: FaqItem[];
  /** Article-specific sources (statistics, studies) - listed first under Sources. */
  sources?: { label: string; publisher: string; year: number; href: string }[];
  /** Internal pages this article is about - reused for "related guide" links elsewhere. */
  relatedPaths: string[];
}
