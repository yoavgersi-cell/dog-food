// ─────────────────────────────────────────────────────────────────────────────
// Dog Food Scout - brand dataset (single source of truth)
//
// Every page (homepage cards + matrix, brand hubs, reviews, the 21 compare
// pages, breed / diet / ingredient pages, llms.txt, JSON-LD) reads from here.
//
// HOUSE RULE (inherited from the toponlinetherapy.io template): never invent
// prices, ratings or nutrient numbers. Fields we have not verified against the
// brand's own published guaranteed analysis / calorie statement / checkout
// quote are `null` and render as "Verifying". The data gate in
// `isBrandDataComplete()` keeps number-dependent pages noindex until filled.
//
// Sources used so far:
//  - `offer`, `highlights`: the offers and claims the brands themselves run on
//    competitor comparison pages, captured Nov 1 2026 (screenshots supplied by
//    the operator). Re-verify on the brand site before publishing.
//  - formats / proteins: well-known product lines; marked in `toVerify`.
//
// OPERATOR TO DO before launch (per brand):
//  1. nutrition: guaranteed analysis + kcal/kg (ME) for the representative
//     recipe, with the URL you read it from and the date.
//  2. price: run the quote flow for a 25 lb and 50 lb neutered adult, convert
//     to USD per 1,000 kcal on the standard (non-intro) price.
//  3. affiliateUrl: tracked links.
//  4. score: re-score with the /how-we-rank rubric once 1-2 are filled.
// ─────────────────────────────────────────────────────────────────────────────
import { OLLIE_TRUSTPILOT_REVIEWS } from "./trustpilot-ollie";
import { TFD_TRUSTPILOT_REVIEWS } from "./trustpilot-the-farmers-dog";
import { SPOT_AND_TANGO_TRUSTPILOT_REVIEWS } from "./trustpilot-spot-and-tango";
import { PETS_TABLE_TRUSTPILOT_REVIEWS } from "./trustpilot-the-pets-table";

export type Format =
  | "gently-cooked"
  | "raw-frozen"
  | "freeze-dried"
  | "air-dried"
  | "baked"
  | "fresh-dry"
  | "rolled"
  | "topper";

export const FORMAT_LABEL: Record<Format, string> = {
  "gently-cooked": "Gently cooked",
  "raw-frozen": "Raw (frozen)",
  "freeze-dried": "Freeze-dried",
  "air-dried": "Air-dried",
  baked: "Baked",
  "fresh-dry": "Fresh-dry (no fridge)",
  rolled: "Rolled",
  topper: "Topper",
};

/** Broad processing family used by the homepage filter. */
export type ProcessFamily = "cooked" | "raw" | "shelf-stable";
export const FORMAT_FAMILY: Record<Format, ProcessFamily> = {
  "gently-cooked": "cooked",
  baked: "cooked",
  "raw-frozen": "raw",
  "freeze-dried": "shelf-stable",
  "air-dried": "shelf-stable",
  "fresh-dry": "shelf-stable",
  rolled: "shelf-stable",
  topper: "cooked",
};

/** As-fed guaranteed analysis for one representative recipe. */
export interface NutritionFacts {
  recipe: string;
  proteinMinPct: number;
  fatMinPct: number;
  fiberMaxPct: number;
  moistureMaxPct: number;
  ashPct?: number;
  calciumPct?: number;
  phosphorusPct?: number;
  kcalPerKg: number;
  source: string; // URL of the brand page the numbers were read from
  checked: string; // ISO date
}

export interface PriceFacts {
  usdPer1000kcal: number;
  basis: string; // e.g. "25 lb neutered adult, full-meal plan, standard price"
  source: string;
  checked: string;
}

/**
 * Trustpilot data - only ever real figures captured from the brand's public
 * Trustpilot profile (rating, count and reviews verbatim, with the capture
 * date). Leave undefined until captured; the review page hides the section.
 */
export interface TrustpilotReview {
  name: string; // shortened: first name + last initial
  country?: string | null;
  date: string; // ISO
  title: string;
  text: string;
  rating?: number; // only when the star rating itself was captured
  issue?: boolean; // editorial flag: the review describes a problem
  invited?: boolean; // Trustpilot labels the review "Invited" (the company asked for it)
}

export interface TrustpilotData {
  rating: number; // TrustScore, e.g. 4.4
  reviewCount?: number; // exact count, when the profile page itself was captured
  reviewCountLabel?: string; // rounded count as Trustpilot shows it elsewhere, e.g. "2K"
  url: string; // the brand's Trustpilot profile URL
  checked: string; // ISO date captured
  /** % of reviews by stars, 5-star first. */
  breakdown?: [number, number, number, number, number];
  negativeReplyRate?: number; // % of negative reviews the company replied to
  /** Shown in the footer, e.g. why some captured reviews were left out. */
  note?: string;
  /** Every review we captured, verbatim. Empty when only the headline score was captured. */
  reviews: TrustpilotReview[];
}

export interface Brand {
  slug: string;
  name: string;
  officialSite: string;
  logo: string;
  /** Optional max logo height (px) on cards, for visually heavy wordmarks. Default 80. */
  logoMaxH?: number;
  affiliateUrl: string;
  rank: number;
  score: number;
  scoreLabel: string;
  stars: number;
  badge?: string;
  verdict: string; // "Best for ..." one-liner (decisive)
  tagline: string;
  offer: string;
  highlights: string[];
  formats: Format[];
  proteins: string[];
  subscriptionRequired: boolean | null;
  pauseSkipOnline: boolean | null;
  customPortions: boolean | null;
  humanGrade: boolean | null;
  storage: "freezer + fridge" | "pantry" | "freezer + fridge or pantry";
  aafcoStatement: string | null; // exact wording from the bag/site once verified
  feedingTrials: boolean | null;
  delivery: string | null;
  nutrition: NutritionFacts | null;
  price: PriceFacts | null;
  bestFor: string[];
  notIdealFor: string[];
  pros: string[];
  cons: string[];
  summary: string;
  toVerify: string[];
  trustpilot?: TrustpilotData;
}

const NOT_VERIFIED_YET: Pick<Brand, "nutrition" | "price" | "aafcoStatement" | "feedingTrials"> = {
  nutrition: null,
  price: null,
  aafcoStatement: null,
  feedingTrials: null,
};

export const BRANDS: Brand[] = [
  {
    slug: "the-farmers-dog",
    name: "The Farmer's Dog",
    officialSite: "https://www.thefarmersdog.com",
    logo: "/logos/the-farmers-dog.webp",
    affiliateUrl: "https://www.thefarmersdog.com",
    rank: 1,
    score: 9.7,
    scoreLabel: "Outstanding",
    stars: 5,
    badge: "Our Top Choice",
    verdict: "Best overall fresh dog food",
    tagline: "Gently cooked, pre-portioned fresh food with calorie targets set per dog",
    offer: "50% off first box + free treats", // thefarmersdog.com homepage, checked 2026-11-13
    highlights: [
      "Personalized meal plans for your dog's needs",
      "Gently cooked fresh food",
      "Formulated by board-certified nutritionists",
      "Pause or cancel anytime",
    ],
    formats: ["gently-cooked"],
    proteins: ["beef", "chicken", "turkey", "pork"],
    subscriptionRequired: true,
    pauseSkipOnline: true,
    customPortions: true,
    humanGrade: true,
    storage: "freezer + fridge",
    delivery: "Contiguous US",
    nutrition: null, // guaranteed analysis and kcal are not published on public pages (behind sign-up)
    price: null,
    aafcoStatement: "The fresh recipes on your puppy's plan are formulated to be AAFCO complete and balanced for dogs of all life stages. We met AAFCO feeding trial requirements, then exceeded them.", // thefarmersdog.com/puppy (checked 2026-11-16)
    feedingTrials: true,
    bestFor: ["Owners who want a fully portioned, no-math fresh diet", "Weight management (calorie-targeted packs)", "Picky eaters moving off kibble"],
    notIdealFor: ["Raw feeders", "Owners with no freezer space", "Pantry-only storage"],
    pros: ["Portions are pre-calculated to a daily calorie target", "Single, simple format - no plan-mixing decisions", "Formulated by board-certified veterinary nutritionists (brand claim)"],
    cons: ["Subscription only - not sold in stores", "Needs freezer and fridge space", "No raw or shelf-stable option"],
    summary:
      "The Farmer's Dog is the reference point for gently cooked subscription food: one format, recipes portioned to each dog's calorie target, and a pause/cancel-anytime plan. It ranks #1 because it scores highest on our formulation-transparency and portion-accuracy criteria; the trade-off is storage and the lack of any shelf-stable option.",
    trustpilot: { rating: 3.9, reviewCount: 1740, url: "https://www.trustpilot.com/review/thefarmersdog.com", checked: "2026-11-04", reviews: TFD_TRUSTPILOT_REVIEWS, note: "We left out 3 reviews on this profile that are clearly about unrelated UK businesses with the same name (a pub and a raw-food brand)." },
    toVerify: ["proteins", "delivery", "nutrition", "price"],
  },
  {
    slug: "ollie",
    name: "Ollie",
    officialSite: "https://www.ollie.com",
    logo: "/logos/ollie.svg",
    logoMaxH: 42,
    affiliateUrl: "https://www.ollie.com",
    rank: 2,
    score: 9.4,
    scoreLabel: "Excellent",
    stars: 4.5,
    verdict: "Best for mixing fresh and baked",
    tagline: "Fresh and baked recipes you can mix, with vet-formulated personalized portions",
    offer: "70% off 1st box + free gift",
    highlights: [
      "Made with human-grade ingredients",
      "Vet-formulated & personalized meals",
      "100% satisfied or money-back guarantee",
    ],
    formats: ["gently-cooked", "baked"],
    proteins: ["beef", "chicken", "turkey", "lamb", "pork"],
    subscriptionRequired: true,
    pauseSkipOnline: true,
    customPortions: true,
    humanGrade: true,
    storage: "freezer + fridge or pantry",
    delivery: "Contiguous US",
    nutrition: null, // guaranteed analysis and kcal are not published on Ollie's public pages
    price: null,
    aafcoStatement: "Formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles for All Life Stages, including the growth of large size dogs (70 lb or more as an adult).", // quoted for all Ollie meals at blog.ollie.com (checked 2026-11-16)
    feedingTrials: null,
    bestFor: ["Owners who want to blend fresh with a shelf-stable baked option", "Budget-flexible plans (part fresh, part baked)", "Multi-protein rotation"],
    notIdealFor: ["Raw feeders", "Owners who want fresh food without a subscription"],
    pros: ["Fresh, baked and mixed plans in one subscription", "Baked food and jerky treats also sold at Petco.com, no subscription needed", "Satisfaction guarantee on the first box (brand claim)", "Broad protein range including lamb"],
    cons: ["Fresh plans are subscription-only", "Fresh recipes need freezer space", "Plan options add decision complexity"],
    summary:
      "Ollie is the closest rival to The Farmer's Dog, with one structural difference: a baked line that lets you mix fresh and shelf-stable food in the same plan. Choose Ollie over TFD when you want that flexibility or a lamb recipe; choose TFD when you want the simplest single-format plan.",
    trustpilot: {
      rating: 4.7,
      reviewCount: 11319,
      url: "https://www.trustpilot.com/review/ollie.com",
      checked: "2026-11-04",
      breakdown: [84, 7, 3, 2, 4],
      negativeReplyRate: 96,
      reviews: OLLIE_TRUSTPILOT_REVIEWS,
    },
    toVerify: ["offer", "formats", "delivery", "nutrition", "price"],
  },
  {
    slug: "spot-and-tango",
    name: "Spot & Tango",
    officialSite: "https://www.spotandtango.com",
    logo: "/logos/spot-and-tango.webp",
    affiliateUrl: "https://www.spotandtango.com",
    rank: 3,
    score: 9.0,
    scoreLabel: "Very Good",
    stars: 4.5,
    verdict: "Best fridge-free fresh option",
    tagline: "Fresh-frozen recipes plus UnKibble™ fresh-dry meals that need no fridge",
    offer: "50% off your first order",
    highlights: [
      "Personalized plans by vet nutritionists",
      "UnKibble™ Fresh Dry meals: no fridge required",
      "100% whole food, human-grade ingredients",
    ],
    formats: ["gently-cooked", "fresh-dry"],
    proteins: ["beef", "chicken", "turkey", "lamb"],
    subscriptionRequired: true,
    pauseSkipOnline: true,
    customPortions: true,
    humanGrade: true,
    storage: "freezer + fridge or pantry",
    delivery: "Contiguous US",
    nutrition: {
      recipe: "UnKibble Beef + Barley",
      proteinMinPct: 27,
      fatMinPct: 27,
      fiberMaxPct: 5,
      moistureMaxPct: 6,
      kcalPerKg: 4792,
      source: "https://www.spotandtango.com/recipes/beef-and-barley",
      checked: "2026-11-16",
    },
    price: null, // brand publishes price per meal only (no kcal per meal); needs a quote with stated calories
    aafcoStatement: "Spot & Tango's Beef & Barley UnKibble Recipe is formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles for all life stages including growth of large size dogs (70 lbs or more as an adult).",
    feedingTrials: false, // brand FAQ: meets AAFCO "by formulation and by analysis of the finished product"
    bestFor: ["Owners without freezer space (UnKibble)", "Travel and small kitchens", "Kibble-to-fresh transitions"],
    notIdealFor: ["Raw feeders", "Owners who want retail availability"],
    pros: ["Fresh-dry UnKibble stores in the pantry", "Grain-free and grain-inclusive options (brand claim)", "Personalized portions"],
    cons: ["Subscription only", "Two very different formats to compare per recipe"],
    summary:
      "Spot & Tango's edge is UnKibble: a fresh-dry format that keeps whole-food ingredients but stores like kibble. That makes it the pick when freezer space is the constraint; on fresh-frozen alone it competes directly with Ollie and The Farmer's Dog.",
    trustpilot: { rating: 4.6, reviewCount: 2878, url: "https://www.trustpilot.com/review/spotandtango.com", checked: "2026-11-04", reviews: SPOT_AND_TANGO_TRUSTPILOT_REVIEWS },
    toVerify: ["offer", "proteins", "delivery", "price"],
  },
  {
    slug: "we-feed-raw",
    name: "We Feed Raw",
    officialSite: "https://wefeedraw.com",
    logo: "/logos/we-feed-raw.webp",
    affiliateUrl: "https://wefeedraw.com",
    rank: 4,
    score: 8.8,
    scoreLabel: "Very Good",
    stars: 4.5,
    verdict: "Best raw subscription",
    tagline: "Raw frozen and freeze-dried meals built from USDA meats",
    offer: "50% off first box + free shipping",
    highlights: [
      "Frozen & freeze-dried from USDA meats",
      "Formulated by a PhD animal nutritionist",
      "Personalized plans built for your dog's needs",
    ],
    formats: ["raw-frozen", "freeze-dried"],
    proteins: ["beef", "chicken", "turkey", "lamb"],
    subscriptionRequired: true,
    pauseSkipOnline: true,
    customPortions: true,
    humanGrade: null,
    storage: "freezer + fridge or pantry",
    delivery: null,
    nutrition: {
      recipe: "Raw Beef (frozen)",
      proteinMinPct: 12.2,
      fatMinPct: 10,
      fiberMaxPct: 1,
      moistureMaxPct: 68.8,
      kcalPerKg: 1800,
      source: "https://wefeedraw.com/recipes/beef",
      checked: "2026-11-16",
    },
    price: {
      usdPer1000kcal: 10.89,
      basis: "Brand's plan starting price, $8.89 per pound (beef/chicken/turkey recipes), at 1,800 kcal/kg (816 kcal/lb)",
      source: "https://wefeedraw.com/recipes/beef",
      checked: "2026-11-16",
    },
    aafcoStatement: "This raw beef recipe is nutritionally complete and balanced, and complies with AAFCO recommendations for all of your dog's life stages.",
    feedingTrials: null,
    bestFor: ["Committed raw feeders who want delivery", "High-protein, low-carbohydrate diets", "Owners rotating raw and freeze-dried"],
    notIdealFor: ["Homes with infants, elderly or immunocompromised people (raw-meat handling)", "Owners who want a cooked diet"],
    pros: ["Complete raw diet delivered, portioned to the dog", "Freeze-dried option for travel", "Formulated by a PhD animal nutritionist (brand claim)"],
    cons: ["Raw meat carries pathogen-handling requirements (FDA/CDC guidance)", "Freezer space required for the frozen line"],
    summary:
      "We Feed Raw is the only true raw subscription in our launch set. Pick it when you have already decided on raw; if you have not, read our cooked-vs-raw comparisons first, because the handling burden and pathogen risk are real and documented by the FDA and CDC.",
    toVerify: ["offer", "proteins", "humanGrade", "delivery"],
  },
  {
    slug: "maxbone",
    name: "Maxbone",
    officialSite: "https://maxbone.com",
    logo: "/logos/maxbone.webp",
    affiliateUrl: "https://maxbone.com",
    rank: 5,
    score: 8.6,
    scoreLabel: "Very Good",
    stars: 4,
    verdict: "Best shelf-stable premium",
    tagline: "Freeze-dried real-meat food - pantry storage, no thawing",
    offer: "65% off your first order + free shipping",
    highlights: [
      "Real dog food made simple, freeze-dried for freshness",
      "Made from 100% real meat & organs",
      "Supports healthy digestion",
    ],
    formats: ["freeze-dried"],
    proteins: ["beef", "chicken"],
    subscriptionRequired: false,
    pauseSkipOnline: null,
    customPortions: null,
    humanGrade: null,
    storage: "pantry",
    delivery: null,
    nutrition: {
      recipe: "Freeze-dried Raw Beef",
      proteinMinPct: 43,
      fatMinPct: 30,
      fiberMaxPct: 5,
      moistureMaxPct: 8,
      kcalPerKg: 4200,
      source: "https://maxbone.com/products/freeze-dried-raw-beef-recipe",
      checked: "2026-11-16",
    },
    price: null, // $34 per bag, but the bag weight is inconsistent on the brand's own pages (1 lb vs 590 g)
    aafcoStatement: "Our recipes are complete and balanced for all life stages according to the nutritional levels established by AAFCO.",
    feedingTrials: null,
    bestFor: ["Pantry-only storage", "Travel", "Toppers on top of kibble"],
    notIdealFor: ["Owners who want per-dog portioned packs", "Tight budgets (freeze-dried costs more per calorie in general)"],
    pros: ["No freezer or fridge needed", "Buy once - no subscription required", "Meat-and-organ first formulation (brand claim)"],
    cons: ["Rehydration step for full meals", "Fewer personalization tools than the fresh subscriptions"],
    summary:
      "Maxbone sells freeze-dried food that stores in the pantry and doesn't lock you into a subscription. It's the pick for travel, small kitchens and topping kibble; for a fully portioned daily diet, the fresh subscriptions above it do more of the work for you.",
    toVerify: ["offer", "proteins", "subscriptionRequired", "humanGrade", "delivery", "price"],
  },
  {
    slug: "the-pets-table",
    name: "The Pets Table",
    officialSite: "https://www.thepetstable.com",
    logo: "/logos/the-pets-table.webp",
    affiliateUrl: "https://www.thepetstable.com",
    rank: 6,
    score: 8.5,
    scoreLabel: "Very Good",
    stars: 4,
    verdict: "Best flexible plan mix",
    tagline: "Fresh, air-dried, mixed and topper plans - from the HelloFresh group",
    offer: "50% off 1st box + 20% off 2nd box",
    highlights: [
      "Fresh, air-dried, mixed & topper plans",
      "Formulated with board-certified vet nutritionists",
      "Multiple recipes to rotate",
    ],
    formats: ["gently-cooked", "air-dried", "topper"],
    proteins: ["beef", "chicken", "turkey"],
    subscriptionRequired: true,
    pauseSkipOnline: true,
    customPortions: true,
    humanGrade: null,
    storage: "freezer + fridge or pantry",
    delivery: null,
    nutrition: {
      recipe: "Fresh Chicken Casserole With Green Beans",
      proteinMinPct: 12,
      fatMinPct: 7.5,
      fiberMaxPct: 1,
      moistureMaxPct: 74,
      kcalPerKg: 1457,
      source: "https://www.thepetstable.com/recipes/fresh-chicken-63d3b49655ffed09cb0fe43b",
      checked: "2026-11-16",
    },
    price: null, // plan catalog doesn't state its units; price per meal is given without calories per meal
    aafcoStatement: "Formulated to meet the nutritional levels established by the AAFCO (Association of American Feed Control Officials) Dog Food Nutrient Profiles for All Life Stages, including growth of large size dogs (70 lbs. or more as an adult).",
    feedingTrials: false,
    bestFor: ["Topper-only or part-fresh budgets", "Owners already using HelloFresh", "Mixed fresh + air-dried feeding"],
    notIdealFor: ["Raw feeders"],
    pros: ["Four plan types, including topper-only", "Two-box intro discount (brand offer)", "Large logistics backer (HelloFresh)"],
    cons: ["Subscription only", "Newer brand - shorter track record"],
    summary:
      "The Pets Table is the most flexible plan menu in the set: full fresh, air-dried, a mix, or toppers only. That makes it the easiest way to add fresh food on a fixed budget. It ranks below the specialists because it's newer and has a shorter public formulation record.",
    trustpilot: { rating: 4.4, reviewCount: 3194, url: "https://www.trustpilot.com/review/thepetstable.com", checked: "2026-11-04", reviews: PETS_TABLE_TRUSTPILOT_REVIEWS, note: "54 of these 60 reviews are marked \u201cInvited\u201d on Trustpilot, meaning The Pets Table asked the customer to write one." },
    toVerify: ["officialSite", "offer", "proteins", "humanGrade", "delivery", "price"],
  },
  {
    slug: "redbarn",
    name: "Redbarn",
    officialSite: "https://redbarn.com",
    logo: "/logos/redbarn.webp",
    affiliateUrl: "https://redbarn.com",
    rank: 7,
    score: 8.2,
    scoreLabel: "Very Good",
    stars: 4,
    verdict: "Best retail air-dried and rolled",
    tagline: "Air-dried, dry and rolled foods plus chews - sold in pet stores",
    offer: "Free shipping on orders over $49.99",
    highlights: [
      "Meat-first air-dried foods plus chews & treats",
      "Made in SQF-certified U.S. kitchens",
      "Dry, air-dried and rolled meal options",
    ],
    formats: ["air-dried", "rolled"],
    proteins: ["beef", "chicken", "lamb"],
    subscriptionRequired: false,
    pauseSkipOnline: null,
    customPortions: false,
    humanGrade: null,
    storage: "pantry",
    delivery: "US retail + online",
    nutrition: {
      recipe: "Air Dried Powerfood High Protein Beef",
      proteinMinPct: 35,
      fatMinPct: 25,
      fiberMaxPct: 6,
      moistureMaxPct: 12,
      kcalPerKg: 4702,
      source: "https://redbarn.com/products/air-dried-beef-recipe-dog-food",
      checked: "2026-11-16",
    },
    price: {
      usdPer1000kcal: 7.59,
      basis: "Air Dried Powerfood Beef, 5 lb bag at $80.99 one-time price on redbarn.com, at 4,702 kcal/kg (10,664 kcal per bag)",
      source: "https://redbarn.com/products/air-dried-beef-recipe-dog-food",
      checked: "2026-11-16",
    },
    aafcoStatement: "Redbarn Gently Air Dried Powerfood Beef Recipe is formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles for All Life Stages except for growth of large size dogs (70 lb. or more as an adult).",
    feedingTrials: false,
    bestFor: ["Buying in a store with no subscription", "Air-dried feeding", "Rotating food with chews and treats from one brand"],
    notIdealFor: ["Owners who want pre-portioned daily packs", "Fresh-cooked diets"],
    pros: ["Available at retail - no subscription", "SQF-certified kitchens (brand claim)", "Pantry storage"],
    cons: ["No personalized portions", "Better known for chews than complete meals"],
    summary:
      "Redbarn is the retail option: air-dried, dry and rolled foods you can buy off the shelf, made in SQF-certified kitchens. It ranks last for this list because it's not a personalized delivery service. That isn't a quality judgment; for shoppers who don't want a subscription, it's the one to pick.",
    toVerify: ["offer", "proteins"],
  },
];

/** Score label thresholds (published on /how-we-rank). */
export function scoreLabelFor(score: number): string {
  if (score >= 9.5) return "Outstanding";
  if (score >= 9.0) return "Excellent";
  if (score >= 8.5) return "Very Good";
  if (score >= 8.0) return "Good";
  return "Fair";
}

// Labels and stars are always derived from the score (stars = score / 2,
// rounded to the nearest half), so they can never drift from it.
for (const b of BRANDS) {
  b.scoreLabel = scoreLabelFor(b.score);
  b.stars = Math.round(b.score) / 2;
}

export const BRAND_BY_SLUG = new Map(BRANDS.map((b) => [b.slug, b]));
export const getBrand = (slug: string) => BRAND_BY_SLUG.get(slug);

/** Homepage rank order (score-descending - a lower score can never rank higher). */
export const RANKED_BRANDS = [...BRANDS].sort((a, b) => a.rank - b.rank);

/** True when a brand has the verified numbers that cost/nutrient pages depend on. */
export function isBrandDataComplete(b: Brand): boolean {
  return !!b.nutrition && !!b.price;
}

/** Data gate for number-heavy programmatic pages: every brand shown must be complete. */
export function isDataGatePassed(brands: Brand[] = BRANDS): boolean {
  return brands.every(isBrandDataComplete);
}

export const processFamilies = (b: Brand): ProcessFamily[] =>
  Array.from(new Set(b.formats.map((f) => FORMAT_FAMILY[f])));
