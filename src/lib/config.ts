// Site-wide constants for dogfoodscout.com. Brand data lives in
// src/lib/dogfood/brands.ts; taxonomy in src/lib/dogfood/taxonomy.ts.

export const SITE_URL = "https://www.dogfoodscout.com";
export const SITE_NAME = "Dog Food Scout";
export const SITE_DOMAIN = "dogfoodscout.com";
export const BRAND_SUFFIX = ` | ${SITE_NAME}`;

// Stable "last updated" date for schema/sitemaps (never "today" on every
// request - that is fake freshness). Bump when content actually changes.
export const CONTENT_LAST_UPDATED = "2026-11-01";
export const LAUNCH_DATE = "2026-11-01";

// Month the brand data (offers, formats, nutrition, prices) was last checked
// against each brand's own site. A claim, not a render timestamp.
export const BRAND_DATA_CHECKED = "November 2026";

export const latestUpdate = (updatedAt?: string) =>
  updatedAt && updatedAt > CONTENT_LAST_UPDATED ? updatedAt : CONTENT_LAST_UPDATED;

export const DISCLOSURE_TEXT =
  "Some brands featured on this site may pay us a commission when you buy through our links. It never changes our scores, which follow our published rubric.";

export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_HERO = {
  updatedLabel: "Updated November 2026",
  h1: "Best Fresh & Raw Dog Food Delivery of 2026",
  h2: "7 brands, scored on nutrition data - not marketing",
  description:
    "We compare The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, Maxbone, The Pet Table and Redbarn on dry-matter nutrients, cost per day at your dog's weight, AAFCO compliance and plan flexibility.",
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: "What is the best fresh dog food delivery service in 2026?",
    answer:
      "The Farmer's Dog is our top pick overall (9.7/10) for its calorie-targeted, pre-portioned gently cooked meals. Ollie (9.4) is best if you want to mix fresh and baked food, Spot & Tango (9.0) is best without freezer space, and We Feed Raw (8.8) is the best raw subscription.",
  },
  {
    question: "Is fresh dog food worth the cost?",
    answer:
      "It depends on your dog's weight more than the brand: fresh food costs the least per day for small dogs. For large dogs, a mixed or topper plan gets most of the palatability benefit at a fraction of the cost. Our cost tables show the daily cost at 10, 25, 50, 75 and 100 lb once each brand's prices are verified.",
  },
  {
    question: "How do you compare protein across fresh, raw and dry foods?",
    answer:
      "On a dry-matter basis or per 1,000 kcal. Fresh food is about 70% water, so its as-fed protein (around 10%) looks low next to kibble (around 25%) until you remove the water. We convert every guaranteed analysis with DM% = as-fed% / (100 - moisture%) x 100.",
  },
  {
    question: "Do these brands meet AAFCO standards?",
    answer:
      "We record each recipe's exact AAFCO statement - which life stage it covers, and whether it was formulated to meet the nutrient profiles or tested in feeding trials. Puppies and pregnant dogs need a growth or all-life-stages recipe.",
  },
  {
    question: "Is raw dog food safe?",
    answer:
      "Raw diets carry a documented risk of Salmonella and Listeria for dogs and the people handling the food (FDA, CDC). If you feed raw, follow strict handling rules; households with infants, elderly or immunocompromised people should prefer cooked food.",
  },
  {
    question: "How do you make money, and does it affect rankings?",
    answer:
      "We may earn a commission when you buy through our links. Scores come from the published rubric on our How We Rank page, and a brand with a lower score is never placed above one with a higher score.",
  },
];
