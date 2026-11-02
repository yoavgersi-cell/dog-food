// ───── Veterinary reviewers ─────
// A page says "reviewed by" and emits `reviewedBy` / `lastReviewed` ONLY when
// REVIEW_LOG has an entry for its path, added when the operator confirms the
// named reviewer actually went through that page. Credentials are exactly as
// supplied by the reviewer - never added or upgraded.
//
// Launch state: no reviewer is on file yet, so every page renders the
// editorial byline only. Add the reviewer below, then log pages as reviewed.

import { SITE_URL } from "@/lib/config";

export interface Reviewer {
  slug: string;
  name: string;
  credentials: string; // e.g. "DVM, DACVIM (Nutrition)" - only as held
  jobTitle: string;
  bio: string;
}

export const REVIEWERS: Reviewer[] = [];

/** path -> ISO date reviewed. */
export const REVIEW_LOG: Record<string, { reviewer: string; reviewedAt: string }> = {};

export function getPageReview(path: string) {
  const entry = REVIEW_LOG[path];
  if (!entry) return null;
  const reviewer = REVIEWERS.find((r) => r.slug === entry.reviewer);
  return reviewer ? { reviewer, reviewedAt: entry.reviewedAt } : null;
}

/** Spread into a WebPage schema: reviewedBy/lastReviewed only when logged. */
export function pageReviewSchema(path: string) {
  const r = getPageReview(path);
  if (!r) return {};
  return {
    lastReviewed: r.reviewedAt,
    reviewedBy: {
      "@type": "Person",
      "@id": `${SITE_URL}/about#${r.reviewer.slug}`,
      name: r.reviewer.name,
      jobTitle: r.reviewer.jobTitle,
    },
  };
}
