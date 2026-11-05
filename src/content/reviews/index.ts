// Per-brand deep review content. Brands without an entry fall back to the
// generated review. Add one file per brand and register it here.
import type { ReviewContent } from "./types";
import { content as theFarmersDog } from "./the-farmers-dog";

export type { ReviewContent } from "./types";

export const REVIEW_CONTENT: Record<string, ReviewContent> = {
  "the-farmers-dog": theFarmersDog,
};
