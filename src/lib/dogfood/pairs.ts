// ─────────────────────────────────────────────────────────────────────────────
// The 21 head-to-head comparisons (7 brands, n(n-1)/2).
//
// Canonical slug order follows search demand (PRIORITY): the higher-demand
// brand always comes first ("the-farmers-dog-vs-ollie"). The reverse order
// ("ollie-vs-the-farmers-dog") 301s to the canonical page - see
// next.config.ts. Each pair carries an editorial `angle` (the single decisive
// difference) and a `winner` per decision; both are editorial calls that must
// be re-checked when brand data is verified.
// ─────────────────────────────────────────────────────────────────────────────

import { BRANDS, getBrand, type Brand } from "./brands";

export const PRIORITY = [
  "the-farmers-dog",
  "ollie",
  "spot-and-tango",
  "we-feed-raw",
  "the-pets-table",
  "maxbone",
  "redbarn",
] as const;

export interface PairDecision {
  question: string; // phrased as the searcher asks it
  winner: string; // brand slug, or "tie"
  why: string;
}

export interface Pair {
  slug: string;
  a: string;
  b: string;
  angle: string; // the decisive difference, one sentence
  overall: string; // overall pick slug
  decisions: PairDecision[];
}

const p = (a: string, b: string, angle: string, overall: string, decisions: PairDecision[]): Pair => ({
  slug: `${a}-vs-${b}`,
  a,
  b,
  angle,
  overall,
  decisions,
});

const d = (question: string, winner: string, why: string): PairDecision => ({ question, winner, why });

export const PAIRS: Pair[] = [
  p("the-farmers-dog", "ollie", "Both are gently cooked subscriptions; Ollie adds a baked line you can mix in, The Farmer's Dog keeps one simpler format.", "the-farmers-dog", [
    d("Which is simpler to run day to day?", "the-farmers-dog", "One format, pre-portioned packs, nothing to mix."),
    d("Which offers more plan flexibility?", "ollie", "Fresh, baked or a mix in the same subscription."),
    d("Which has more protein choices?", "ollie", "Ollie's line-up includes lamb; TFD's does not."),
  ]),
  p("the-farmers-dog", "spot-and-tango", "Spot & Tango's UnKibble needs no fridge; The Farmer's Dog is fresh-frozen only.", "the-farmers-dog", [
    d("Which is better without freezer space?", "spot-and-tango", "UnKibble stores in the pantry."),
    d("Which is the stronger pure fresh-cooked plan?", "the-farmers-dog", "Higher on formulation transparency and portion accuracy in our rubric."),
    d("Which has grain-free and grain-inclusive options?", "spot-and-tango", "Both options are offered (brand claim)."),
  ]),
  p("the-farmers-dog", "we-feed-raw", "Cooked vs. raw: the real decision is whether you accept raw-meat handling, not which brand is better.", "the-farmers-dog", [
    d("Which is safer to handle at home?", "the-farmers-dog", "Cooking removes the pathogen-handling burden the FDA and CDC flag for raw."),
    d("Which suits a committed raw feeder?", "we-feed-raw", "It is the only complete raw subscription in our set."),
    d("Which is lower in carbohydrate?", "we-feed-raw", "Raw formulations typically carry less carbohydrate - confirmed per recipe once analyses are verified."),
  ]),
  p("the-farmers-dog", "the-pets-table", "The Pets Table sells topper and air-dried plans for smaller budgets; The Farmer's Dog is full-meal fresh only.", "the-farmers-dog", [
    d("Which is easier on a fixed budget?", "the-pets-table", "Topper and mixed plans cut the fresh share of the bowl."),
    d("Which has the longer track record?", "the-farmers-dog", "Longer-established brand with more published formulation detail."),
    d("Which is better as a full daily diet?", "the-farmers-dog", "Single-format, calorie-targeted full meals."),
  ]),
  p("the-farmers-dog", "maxbone", "Fresh-frozen delivered meals vs. freeze-dried pantry food with no subscription lock-in.", "the-farmers-dog", [
    d("Which works for travel and small kitchens?", "maxbone", "Freeze-dried stores in the pantry and packs light."),
    d("Which does the portion math for you?", "the-farmers-dog", "Packs are pre-portioned to your dog's calorie target."),
    d("Which avoids a subscription?", "maxbone", "Buy once or subscribe."),
  ]),
  p("the-farmers-dog", "redbarn", "A personalized fresh subscription vs. retail air-dried and rolled food you can buy in a store.", "the-farmers-dog", [
    d("Which can I buy in a store today?", "redbarn", "Sold at pet retail."),
    d("Which is personalized to my dog?", "the-farmers-dog", "Calorie-targeted packs per dog."),
    d("Which stores without a freezer?", "redbarn", "Air-dried and rolled foods are pantry-stable."),
  ]),
  p("ollie", "spot-and-tango", "Both offer a shelf-stable option alongside fresh: Ollie's is baked, Spot & Tango's is fresh-dry UnKibble.", "ollie", [
    d("Which shelf-stable option is closer to fresh?", "spot-and-tango", "UnKibble is a fresh-dry whole-food format."),
    d("Which has the broader protein range?", "ollie", "Includes pork and lamb."),
    d("Which has a first-box guarantee?", "ollie", "100% satisfaction or money-back guarantee (brand claim)."),
  ]),
  p("ollie", "we-feed-raw", "Cooked fresh with optional baked vs. raw frozen with optional freeze-dried.", "ollie", [
    d("Which is better for a first move off kibble?", "ollie", "Cooked fresh avoids raw handling and is an easier transition."),
    d("Which is the raw pick?", "we-feed-raw", "Complete raw diet delivered."),
    d("Which has a shelf-stable backup?", "tie", "Ollie (baked) and We Feed Raw (freeze-dried) both do."),
  ]),
  p("ollie", "the-pets-table", "The two most flexible plan menus: Ollie mixes fresh + baked, The Pets Table mixes fresh + air-dried or toppers.", "ollie", [
    d("Which is cheaper to start with?", "the-pets-table", "Topper plans and a two-box intro offer."),
    d("Which is the better full fresh diet?", "ollie", "Ranks higher on formulation and portioning."),
    d("Which offers a topper-only plan?", "the-pets-table", "Explicit topper plan."),
  ]),
  p("ollie", "maxbone", "Personalized fresh-and-baked subscription vs. pantry freeze-dried without lock-in.", "ollie", [
    d("Which personalizes portions?", "ollie", "Portions set per dog."),
    d("Which needs no freezer at all?", "maxbone", "Freeze-dried only."),
    d("Which avoids a subscription?", "maxbone", "Buy once or subscribe."),
  ]),
  p("ollie", "redbarn", "Delivered personalized fresh food vs. off-the-shelf air-dried and rolled food.", "ollie", [
    d("Which can I buy in a store?", "redbarn", "Retail distribution."),
    d("Which is personalized?", "ollie", "Per-dog portioning."),
    d("Which has more chews and treats?", "redbarn", "Redbarn's chew range is its core business."),
  ]),
  p("spot-and-tango", "we-feed-raw", "Fresh-dry UnKibble or fresh-cooked vs. complete raw - two very different answers to \"not kibble\".", "spot-and-tango", [
    d("Which stores in the pantry?", "tie", "UnKibble and We Feed Raw's freeze-dried line both do."),
    d("Which is the raw choice?", "we-feed-raw", "Only raw option of the two."),
    d("Which is easier for households with vulnerable people?", "spot-and-tango", "No raw-meat handling."),
  ]),
  p("spot-and-tango", "the-pets-table", "Both sell two formats; Spot & Tango's second format is fresh-dry, The Pets Table's is air-dried plus toppers.", "spot-and-tango", [
    d("Which shelf-stable format is closer to fresh?", "spot-and-tango", "Fresh-dry UnKibble."),
    d("Which has a topper-only plan?", "the-pets-table", "Explicit topper plan."),
    d("Which ranks higher overall?", "spot-and-tango", "Higher on formulation transparency in our rubric."),
  ]),
  p("spot-and-tango", "maxbone", "Two pantry-stable premium formats: fresh-dry UnKibble vs. freeze-dried.", "spot-and-tango", [
    d("Which is personalized per dog?", "spot-and-tango", "Portions set per dog."),
    d("Which avoids a subscription?", "maxbone", "Buy once or subscribe."),
    d("Which is closer to a complete daily diet out of the bag?", "spot-and-tango", "UnKibble is fed by the cup; freeze-dried needs rehydration."),
  ]),
  p("spot-and-tango", "redbarn", "Personalized fresh / fresh-dry subscription vs. retail air-dried and rolled.", "spot-and-tango", [
    d("Which can I buy in a store?", "redbarn", "Retail distribution."),
    d("Which is personalized?", "spot-and-tango", "Per-dog plans."),
    d("Which is pantry-stable?", "tie", "UnKibble and Redbarn's air-dried/rolled foods both are."),
  ]),
  p("we-feed-raw", "the-pets-table", "Complete raw vs. a flexible cooked menu with toppers.", "we-feed-raw", [
    d("Which is the raw choice?", "we-feed-raw", "Only raw option of the two."),
    d("Which is cheaper to try?", "the-pets-table", "Topper plans and a two-box offer."),
    d("Which is easier for raw-cautious households?", "the-pets-table", "Cooked and air-dried formats only."),
  ]),
  p("we-feed-raw", "maxbone", "Raw frozen (plus freeze-dried) subscription vs. freeze-dried pantry food without lock-in.", "we-feed-raw", [
    d("Which is personalized per dog?", "we-feed-raw", "Plans portioned to the dog."),
    d("Which avoids a subscription?", "maxbone", "Buy once or subscribe."),
    d("Which needs no freezer?", "maxbone", "Freeze-dried only."),
  ]),
  p("we-feed-raw", "redbarn", "Raw delivery vs. retail air-dried and rolled food.", "we-feed-raw", [
    d("Which is the raw choice?", "we-feed-raw", "Complete raw diet."),
    d("Which can I buy in a store?", "redbarn", "Retail distribution."),
    d("Which is personalized?", "we-feed-raw", "Per-dog portions."),
  ]),
  p("the-pets-table", "maxbone", "Flexible fresh / air-dried / topper subscription vs. freeze-dried without lock-in.", "maxbone", [
    d("Which has the most plan types?", "the-pets-table", "Fresh, air-dried, mixed and topper."),
    d("Which avoids a subscription?", "maxbone", "Buy once or subscribe."),
    d("Which is better for travel?", "maxbone", "Light, pantry-stable freeze-dried."),
  ]),
  p("the-pets-table", "redbarn", "The air-dried head-to-head: a subscription with portioning vs. retail bags.", "the-pets-table", [
    d("Which personalizes portions?", "the-pets-table", "Per-dog plans."),
    d("Which can I buy in a store?", "redbarn", "Retail distribution."),
    d("Which also offers fresh-cooked?", "the-pets-table", "Fresh and mixed plans."),
  ]),
  p("maxbone", "redbarn", "The two shelf-stable, no-subscription brands: freeze-dried vs. air-dried and rolled.", "maxbone", [
    d("Which is easier to find in stores?", "redbarn", "Wider retail distribution."),
    d("Which is closer to raw nutrition?", "maxbone", "Freeze-dried without cooking."),
    d("Which has the bigger treat and chew range?", "redbarn", "Chews are Redbarn's core line."),
  ]),
];

export const PAIR_BY_SLUG = new Map(PAIRS.map((x) => [x.slug, x]));

/** Reverse-order slugs that permanently redirect to the canonical pair. */
export const PAIR_ALIASES: Record<string, string> = Object.fromEntries(
  PAIRS.map((x) => [`${x.b}-vs-${x.a}`, x.slug]),
);

export const comparePath = (slug: string) => `/compare/${slug}`;

export function pairBrands(pair: Pair): [Brand, Brand] {
  return [getBrand(pair.a)!, getBrand(pair.b)!];
}

/** Every pair a brand appears in (for brand hubs, reviews and cross-links). */
export function pairsForBrand(slug: string): Pair[] {
  return PAIRS.filter((x) => x.a === slug || x.b === slug);
}

/** Pairs whose two brands both have a format in `formats` (diet-page linking). */
export function pairsMatching(pred: (b: Brand) => boolean): Pair[] {
  return PAIRS.filter((x) => pred(getBrand(x.a)!) && pred(getBrand(x.b)!));
}

// Sanity: every pair uses known brands and PRIORITY order; 21 unique pairs.
if (process.env.NODE_ENV !== "production") {
  const idx = (s: string) => PRIORITY.indexOf(s as (typeof PRIORITY)[number]);
  for (const x of PAIRS) {
    if (!getBrand(x.a) || !getBrand(x.b)) throw new Error(`Unknown brand in pair ${x.slug}`);
    if (idx(x.a) > idx(x.b)) throw new Error(`Pair ${x.slug} is not in PRIORITY order`);
  }
  if (new Set(PAIRS.map((x) => x.slug)).size !== (BRANDS.length * (BRANDS.length - 1)) / 2) {
    throw new Error("PAIRS must contain every brand pair exactly once");
  }
}
