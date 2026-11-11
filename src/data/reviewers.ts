// ───── Veterinary reviewers ─────
// A page says "reviewed by" and emits `reviewedBy` / `lastReviewed` ONLY when
// REVIEW_LOG has an entry for its path, added when the operator confirms the
// named reviewer actually went through that page. Credentials are exactly as
// supplied by the reviewer - never added or upgraded.

import { SITE_URL } from "@/lib/config";
import { ORG_ID } from "@/lib/geo";

export interface Reviewer {
  slug: string;
  name: string; // full name, as supplied
  shortName: string; // how the site displays the name (owner's choice)
  postNominal: string; // shown after the name, e.g. "DVM" - degree actually held
  honorificPrefix?: string;
  credentials: string; // short form for bylines - only as held
  jobTitle: string;
  image: string; // square, public path
  headline: string; // one line under the name
  shortBio: string; // 1-2 sentences for the end-of-article box
  bio: string[]; // full profile paragraphs
  education: { name: string; category: "degree" | "certificate" | "license" }[];
  focus: string[];
  sameAs: string[];
}

export const REVIEWERS: Reviewer[] = [
  {
    slug: "margarette-prudente",
    name: "Margarette Prudente",
    shortName: "Dr. M. Prudente",
    postNominal: "DVM",
    honorificPrefix: "Dr.",
    credentials: "DVM graduate",
    jobTitle: "Veterinary Medical Reviewer",
    image: "/reviewers/margarette-prudente.webp",
    headline:
      "Doctor of Veterinary Medicine graduate with experience in small animal healthcare, veterinary telehealth, clinical documentation, and veterinary practice operations.",
    shortBio:
      "Dr. Margarette Prudente is a Doctor of Veterinary Medicine graduate with experience in small animal telehealth, including nutrition and diet, preventive care and pet owner education. She reviews veterinary health information for accuracy against established veterinary references and clinical evidence.",
    bio: [
      "Dr. Margarette Prudente is a Doctor of Veterinary Medicine graduate with experience supporting veterinary practices and pet owners through clinical consultations, telehealth services, and veterinary medical documentation. Her professional background combines veterinary knowledge with practical experience in evaluating patient histories, addressing health concerns, providing care recommendations, and educating pet owners on animal health and preventive care.",
      "She has experience providing veterinary telehealth support for dogs and cats, addressing a wide range of general health and wellness concerns, including nutrition and diet, preventive care, skin and coat health, behavioral concerns, and overall pet health management. Her work includes gathering patient histories, providing practical care recommendations, educating pet owners, and identifying cases that require further veterinary examination.",
      "Her experience also extends to veterinary clinical documentation and practice management, including preparing SOAP notes, maintaining electronic medical records, coordinating appointments, processing prescriptions, and communicating with veterinarians, pharmacies, and pet owners.",
      "As a veterinary medical reviewer, she applies her clinical knowledge to evaluating veterinary health information, checking medical terminology, assessing the accuracy of treatment and medication information, and reviewing recommendations against established veterinary references and clinical evidence. She is particularly interested in making veterinary medical information accurate, practical, and understandable for both veterinary professionals and pet owners.",
    ],
    education: [{ name: "Doctor of Veterinary Medicine (DVM) Graduate", category: "degree" }],
    focus: [
      "Small animal health and wellness (dogs and cats)",
      "Veterinary telehealth and clinical triage",
      "Pet nutrition and dietary management",
      "Preventive healthcare and vaccination",
      "Skin and coat health",
      "Pet health and home care management",
      "Veterinary clinical documentation and SOAP notes",
      "Veterinary pharmacology and medication guidance",
      "Veterinary medical content review and fact-checking",
      "Pet owner education and veterinary health communication",
      "Veterinary practice management and electronic health records",
    ],
    sameAs: ["https://www.linkedin.com/in/margarette-prudente-85952635a"],
  },
];

/** path -> reviewer slug + ISO date reviewed. Add a line only once the reviewer has confirmed the review. */
export const REVIEW_LOG: Record<string, { reviewer: string; reviewedAt: string }> = {
  "/": { reviewer: "margarette-prudente", reviewedAt: "2026-11-11" }, // homepage ranking; confirmed by owner 2026-11-11
};

export const reviewerPath = (slug: string) => `/reviewers/${slug}`;
export const reviewerId = (slug: string) => `${SITE_URL}${reviewerPath(slug)}#person`;
export const displayName = (r: Reviewer) => `${r.shortName}, ${r.postNominal}`;
export const getReviewer = (slug: string) => REVIEWERS.find((r) => r.slug === slug);

export function getPageReview(path: string) {
  const entry = REVIEW_LOG[path];
  if (!entry) return null;
  const reviewer = getReviewer(entry.reviewer);
  return reviewer ? { reviewer, reviewedAt: entry.reviewedAt } : null;
}

/** Pages a reviewer has reviewed, newest first. */
export function pagesReviewedBy(slug: string) {
  return Object.entries(REVIEW_LOG)
    .filter(([, e]) => e.reviewer === slug)
    .map(([path, e]) => ({ path, reviewedAt: e.reviewedAt }))
    .sort((a, b) => b.reviewedAt.localeCompare(a.reviewedAt));
}

/** Full Person entity (used on the reviewer's profile page). */
export function personSchema(r: Reviewer) {
  return {
    "@type": "Person",
    "@id": reviewerId(r.slug),
    name: r.name,
    alternateName: r.shortName,
    ...(r.honorificPrefix ? { honorificPrefix: r.honorificPrefix } : {}),
    jobTitle: r.jobTitle,
    description: r.headline,
    image: `${SITE_URL}${r.image}`,
    url: `${SITE_URL}${reviewerPath(r.slug)}`,
    sameAs: r.sameAs,
    knowsAbout: r.focus,
    hasCredential: r.education.map((e) => ({ "@type": "EducationalOccupationalCredential", name: e.name, credentialCategory: e.category })),
    affiliation: { "@id": ORG_ID },
  };
}

/** Spread into an Article/WebPage schema: reviewedBy/lastReviewed only when logged. */
export function pageReviewSchema(path: string) {
  const r = getPageReview(path);
  if (!r) return {};
  return {
    lastReviewed: r.reviewedAt,
    reviewedBy: {
      "@type": "Person",
      "@id": reviewerId(r.reviewer.slug),
      name: r.reviewer.name,
      alternateName: r.reviewer.shortName,
      jobTitle: r.reviewer.jobTitle,
      url: `${SITE_URL}${reviewerPath(r.reviewer.slug)}`,
      image: `${SITE_URL}${r.reviewer.image}`,
    },
  };
}
