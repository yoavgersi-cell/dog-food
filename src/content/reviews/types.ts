import type { ComponentType } from "react";
import type { FaqItem } from "@/lib/config";

/** Deep editorial content for a brand review (rendered inside /reviews/[slug]). */
export interface ReviewContent {
  updatedAt: string; // ISO date the editorial was last updated
  Body: ComponentType;
  faqs: FaqItem[]; // added to the generated FAQs (and FAQPage schema)
  sources: { label: string; publisher: string; year?: number; href: string }[];
  /** True when Body includes its own alternatives table (hides the generated one). */
  ownAlternatives?: boolean;
}
