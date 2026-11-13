// ───── GEO (Generative Engine Optimization) helpers ─────
// One Organization + WebSite entity with stable @ids, referenced from every
// page's JSON-LD so AI answer engines resolve the publisher consistently;
// brand entities (Brand + official site sameAs); entity references for AAFCO,
// FDA and WSAVA; and the AI crawlers robots.txt names explicitly.
import { SITE_URL, SITE_NAME, SITE_DOMAIN } from "@/lib/config";
import type { Brand } from "@/lib/dogfood/brands";
import { PRODUCTS } from "@/lib/dogfood/products";

export { SITE_URL };
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function orgRef() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: [SITE_DOMAIN],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
    description:
      "Independent research publisher comparing fresh, raw and premium dog food delivery brands on dry-matter nutrition, cost per day, AAFCO compliance and plan flexibility.",
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Fresh dog food",
      "Raw dog food",
      "Canine nutrition",
      "AAFCO Dog Food Nutrient Profiles",
      "Dry matter basis",
      "Dog food cost per day",
      "The Farmer's Dog",
      "Ollie",
      "Spot & Tango",
      "We Feed Raw",
      "Maxbone",
      "The Pets Table",
      "Redbarn",
    ],
    publishingPrinciples: `${SITE_URL}/how-we-rank`,
    ethicsPolicy: `${SITE_URL}/disclosure`,
    contactPoint: { "@type": "ContactPoint", contactType: "editorial", url: `${SITE_URL}/contact` },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: [SITE_DOMAIN],
    url: SITE_URL,
    inLanguage: "en-US",
    description: "Data-first comparisons of fresh, raw and premium dog food brands.",
    publisher: { "@id": ORG_ID },
  };
}

/** Brand entity (the company/label). */
export function brandEntity(b: Pick<Brand, "name" | "officialSite">) {
  return { "@type": "Brand", name: b.name, url: b.officialSite, sameAs: [b.officialSite] };
}

/** Product entity for a brand's dog food line - the itemReviewed of a Review. */
export function productEntity(b: Brand, opts: { withReview?: boolean } = {}) {
  const { withReview = true } = opts;
  // Raster images only (Google ignores SVG for product results): product photos first, then the logo.
  const images = [
    ...PRODUCTS.filter((x) => x.brand === b.slug).slice(0, 3).map((x) => `${SITE_URL}${x.image}`),
    ...(b.logo.endsWith(".svg") ? [] : [`${SITE_URL}${b.logo}`]),
  ];
  return {
    "@type": "Product",
    "@id": `${SITE_URL}/brands/${b.slug}#product`,
    name: `${b.name} Dog Food`,
    brand: brandEntity(b),
    category: "Pet Supplies > Dog Food",
    description: b.tagline,
    url: `${SITE_URL}/brands/${b.slug}`,
    ...(images.length ? { image: images } : {}),
    // Our single editorial review (not user ratings), so Product is a valid rich-result item everywhere it appears.
    ...(withReview
      ? {
          review: {
            "@type": "Review",
            url: `${SITE_URL}/reviews/${b.slug}`,
            reviewRating: { "@type": "Rating", ratingValue: b.score, bestRating: 10, worstRating: 0 },
            author: orgRef(),
          },
        }
      : {}),
  };
}

/** Editorial review (single rating). NOT AggregateRating - we have no user ratings. */
export function reviewEntity(b: Brand, path: string) {
  return {
    "@type": "Review",
    "@id": `${SITE_URL}${path}#review`,
    itemReviewed: productEntity(b, { withReview: false }),
    reviewRating: { "@type": "Rating", ratingValue: b.score, bestRating: 10, worstRating: 0 },
    author: orgRef(),
    publisher: orgRef(),
    reviewBody: b.summary,
    positiveNotes: { "@type": "ItemList", itemListElement: b.pros.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })) },
    negativeNotes: { "@type": "ItemList", itemListElement: b.cons.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })) },
  };
}

/** Authoritative entities referenced in copy (about / mentions / citation). */
export const ENTITIES = {
  aafco: { "@type": "Organization", name: "Association of American Feed Control Officials", alternateName: "AAFCO", url: "https://www.aafco.org", sameAs: ["https://en.wikipedia.org/wiki/Association_of_American_Feed_Control_Officials"] },
  fda: { "@type": "GovernmentOrganization", name: "U.S. Food and Drug Administration - Center for Veterinary Medicine", url: "https://www.fda.gov/animal-veterinary" },
  wsava: { "@type": "Organization", name: "World Small Animal Veterinary Association", alternateName: "WSAVA", url: "https://wsava.org", sameAs: ["https://en.wikipedia.org/wiki/World_Small_Animal_Veterinary_Association"] },
  dog: { "@type": "Thing", name: "Dog", sameAs: ["https://www.wikidata.org/wiki/Q144", "https://en.wikipedia.org/wiki/Dog"] },
};

export const CITATIONS = [
  { label: "AAFCO Dog and Cat Food Nutrient Profiles", publisher: "AAFCO", href: "https://www.aafco.org/resources/consumers/" },
  { label: "WSAVA Global Nutrition Guidelines", publisher: "WSAVA", href: "https://wsava.org/global-guidelines/global-nutrition-guidelines/" },
  { label: "Get the Facts! Raw Pet Food Diets Can Be Dangerous to You and Your Pet", publisher: "FDA", href: "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet" },
  { label: "FDA Investigation into Potential Link between Certain Diets and Canine Dilated Cardiomyopathy", publisher: "FDA", href: "https://www.fda.gov/animal-veterinary/outbreaks-and-advisories/fda-investigation-potential-link-between-certain-diets-and-canine-dilated-cardiomyopathy" },
  { label: "Nutrient Requirements of Dogs and Cats (2006)", publisher: "National Research Council", href: "https://nap.nationalacademies.org/catalog/10668/nutrient-requirements-of-dogs-and-cats" },
];

export function citations() {
  return CITATIONS.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.href, publisher: { "@type": "Organization", name: s.publisher } }));
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Googlebot", "Google-Extended",
  "Bingbot",
  "Applebot", "Applebot-Extended",
  "Amazonbot", "Meta-ExternalAgent", "DuckAssistBot", "YouBot", "cohere-ai", "MistralAI-User", "CCBot",
];
