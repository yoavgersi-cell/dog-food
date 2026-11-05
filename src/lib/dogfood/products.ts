// ─────────────────────────────────────────────────────────────────────────────
// Product catalogue shown in the product carousels (brand review pages and the
// homepage). Every row comes from a Google Shopping listing captured by the
// site owner; prices are as listed on `checked` and change often. No star
// ratings are stored: those were retailer ratings, not ours.
// Images: cropped from the listings (public/products/<brand>/).
// ─────────────────────────────────────────────────────────────────────────────

export type ProductType = "fresh" | "raw" | "shelf-stable" | "kibble" | "rolls" | "treats";

export const PRODUCT_TYPES: Record<ProductType, { label: string; blurb: string }> = {
  fresh: { label: "Fresh & frozen meals", blurb: "Gently cooked meals and trial boxes, shipped frozen." },
  raw: { label: "Raw meals", blurb: "Frozen raw patties and meal boxes: thaw in the fridge and handle like raw meat." },
  "shelf-stable": { label: "Shelf-stable meals", blurb: "Baked, air-dried, freeze-dried and just-add-water food: no freezer needed." },
  kibble: { label: "Dry kibble", blurb: "Traditional and raw-coated kibble from the same brands, for full meals or mixing." },
  rolls: { label: "Rolled food", blurb: "Sliceable food rolls: refrigerate once opened." },
  treats: { label: "Treats & chews", blurb: "Single-ingredient and training treats from the same brands." },
};
export const PRODUCT_TYPE_ORDER: ProductType[] = ["fresh", "raw", "shelf-stable", "kibble", "rolls", "treats"];

export interface ProductListing {
  id: string; // unique, url-safe
  brand: string; // brand slug in brands.ts
  name: string;
  type: ProductType;
  format?: string; // e.g. "Air-dried", "Baked", "Freeze-dried"
  image: string;
  price: number; // USD, as listed
  listPrice?: number; // struck-through "was" price shown on the listing
  unitPrice?: string; // as shown on the listing, e.g. "$3.12/oz"
  size?: string; // only when printed on the listing or pack
  seller: string; // who sells it in the listing
  sellerKind: "brand" | "retailer" | "marketplace";
  freeShipping?: boolean;
  note?: string; // one honest caveat or detail
  checked: string; // ISO date captured
}

const CHECKED = "2026-11-05";
const img = (brand: string, file: string) => `/products/${brand}/${file}.webp`;

export const PRODUCTS: ProductListing[] = [
  // ── The Farmer's Dog ──────────────────────────────────────────────────────
  { id: "tfd-fresh-food-trial-box", brand: "the-farmers-dog", name: "Fresh Food Trial Box", type: "fresh", image: img("the-farmers-dog", "fresh-food-trial-box"), price: 14, seller: "The Farmer's Dog", sellerKind: "brand", freeShipping: true, note: "Trial box; your ongoing plan is priced to your dog's calories.", checked: CHECKED },
  { id: "tfd-small-dog-trial-box", brand: "the-farmers-dog", name: "Small Dog Trial Box", type: "fresh", image: img("the-farmers-dog", "small-dog-trial-box"), price: 2, seller: "The Farmer's Dog", sellerKind: "brand", freeShipping: true, note: "Trial box for small dogs; ongoing plan priced separately.", checked: CHECKED },
  { id: "tfd-turkey-plan", brand: "the-farmers-dog", name: "Fresh Food Plan, Turkey Recipe", type: "fresh", image: img("the-farmers-dog", "turkey-plan"), price: 14, seller: "The Farmer's Dog", sellerKind: "brand", freeShipping: true, note: "Listed plan price; your ongoing price depends on your dog.", checked: CHECKED },
  { id: "tfd-fresh-food-plan", brand: "the-farmers-dog", name: "Fresh Food Plan (all recipes)", type: "fresh", image: img("the-farmers-dog", "fresh-food-plan"), price: 14, seller: "The Farmer's Dog", sellerKind: "brand", freeShipping: true, note: "Listed plan price; your ongoing price depends on your dog.", checked: CHECKED },
  { id: "tfd-instant-fresh-2lb", brand: "the-farmers-dog", name: "Instant Fresh, Chicken & Grain Recipe", type: "shelf-stable", format: "Just add water", image: img("the-farmers-dog", "instant-fresh-2lb"), price: 58.98, unitPrice: "$29/lb", size: "2 lb bag", seller: "Walmart and other retailers", sellerKind: "retailer", freeShipping: true, note: "Gently cooked, dried; add water to serve.", checked: CHECKED },
  { id: "tfd-instant-fresh-chicken", brand: "the-farmers-dog", name: "Instant Fresh, Chicken & Grain Recipe (bulk)", type: "shelf-stable", format: "Just add water", image: img("the-farmers-dog", "instant-fresh-chicken"), price: 144.98, unitPrice: "$1.51/oz", seller: "Walmart Marketplace seller", sellerKind: "marketplace", freeShipping: true, note: "Third-party seller; compare the per-ounce price with the 2 lb bag.", checked: CHECKED },
  { id: "tfd-snap-sticks", brand: "the-farmers-dog", name: "Snap Sticks, Chicken & Apple Recipe", type: "treats", image: img("the-farmers-dog", "snap-sticks"), price: 24.98, unitPrice: "$3.12/oz", seller: "Walmart Marketplace seller", sellerKind: "marketplace", note: "Third-party seller price.", checked: CHECKED },

  // ── Ollie ─────────────────────────────────────────────────────────────────
  { id: "ollie-fresh-chicken-dish", brand: "ollie", name: "Fresh Chicken Dish with Carrots", type: "fresh", image: img("ollie", "fresh-chicken-dish"), price: 14, seller: "Ollie", sellerKind: "brand", freeShipping: true, note: "Listed starter price; ongoing plan priced to your dog.", checked: CHECKED },
  { id: "ollie-fresh-turkey-dish", brand: "ollie", name: "Fresh Turkey Dish with Blueberries", type: "fresh", image: img("ollie", "fresh-turkey-dish"), price: 14, seller: "Ollie", sellerKind: "brand", freeShipping: true, note: "Listed starter price; ongoing plan priced to your dog.", checked: CHECKED },
  { id: "ollie-fresh-pork-dish", brand: "ollie", name: "Fresh Pork Dish with Apples", type: "fresh", image: img("ollie", "fresh-pork-dish"), price: 14, seller: "Ollie", sellerKind: "brand", freeShipping: true, note: "Listed starter price; ongoing plan priced to your dog.", checked: CHECKED },
  { id: "ollie-holiday-feast", brand: "ollie", name: "Holiday Feast (limited-time recipe)", type: "fresh", image: img("ollie", "holiday-feast"), price: 14, seller: "Ollie", sellerKind: "brand", freeShipping: true, note: "Seasonal recipe; availability is limited.", checked: CHECKED },
  { id: "ollie-baked-chicken-2lb", brand: "ollie", name: "Baked Chicken Dish with Carrots", type: "shelf-stable", format: "Baked", image: img("ollie", "baked-chicken-dish-2lb"), price: 18.99, size: "2 lb bag", seller: "Petco", sellerKind: "retailer", note: "Small bag: a low-cost way to test the baked line.", checked: CHECKED },
  { id: "ollie-baked-chicken", brand: "ollie", name: "Baked Chicken Dish with Carrots (large bag)", type: "shelf-stable", format: "Baked", image: img("ollie", "baked-chicken-dish"), price: 119.99, seller: "Petco", sellerKind: "retailer", checked: CHECKED },
  { id: "ollie-baked-beef", brand: "ollie", name: "Baked Beef Dish with Sweet Potatoes (large bag)", type: "shelf-stable", format: "Baked", image: img("ollie", "baked-beef-dish"), price: 119.99, seller: "Petco", sellerKind: "retailer", checked: CHECKED },
  { id: "ollie-chicken-apple-jerky", brand: "ollie", name: "Chicken & Apple Jerky Strips", type: "treats", image: img("ollie", "chicken-apple-jerky"), price: 15.99, seller: "Petco", sellerKind: "retailer", checked: CHECKED },
  { id: "ollie-beef-sweet-potato-jerky", brand: "ollie", name: "Beef & Sweet Potato Jerky Strips", type: "treats", image: img("ollie", "beef-sweet-potato-jerky"), price: 15.99, seller: "Petco", sellerKind: "retailer", checked: CHECKED },

  // ── Spot & Tango ──────────────────────────────────────────────────────────
  { id: "st-unkibble-beef-barley", brand: "spot-and-tango", name: "UnKibble, Beef + Barley", type: "shelf-stable", format: "Freeze-dried", image: img("spot-and-tango", "unkibble-beef-barley"), price: 15.34, listPrice: 31, seller: "Spot & Tango", sellerKind: "brand", freeShipping: true, note: "Sale price on the listing (about 50% off).", checked: CHECKED },
  { id: "st-chicken-bites", brand: "spot-and-tango", name: "Snacks: Chicken Bites", type: "treats", image: img("spot-and-tango", "chicken-bites"), price: 20.02, unitPrice: "$111/lb", seller: "eBay seller", sellerKind: "marketplace", note: "Third-party reseller; check the brand's own price first.", checked: CHECKED },
  { id: "st-beef-liver-trainers", brand: "spot-and-tango", name: "Snacks: Beef Liver Trainers", type: "treats", image: img("spot-and-tango", "beef-liver-trainers"), price: 21.39, listPrice: 27, seller: "eBay seller", sellerKind: "marketplace", freeShipping: true, note: "Third-party reseller; check the brand's own price first.", checked: CHECKED },

  // ── The Pets Table ────────────────────────────────────────────────────────
  { id: "tpt-fresh-chicken-casserole", brand: "the-pets-table", name: "Freshly-Made Frozen Chicken Casserole with Green Beans", type: "fresh", image: img("the-pets-table", "fresh-chicken-casserole"), price: 169.99, listPrice: 207, seller: "Chewy", sellerKind: "retailer", freeShipping: true, note: "Multi-pack; labelled for use as a meal or a topper.", checked: CHECKED },
  { id: "tpt-fresh-beef-stew", brand: "the-pets-table", name: "Freshly-Made Frozen Beef Stew with Carrots", type: "fresh", image: img("the-pets-table", "fresh-beef-stew"), price: 194.99, listPrice: 246, seller: "Chewy", sellerKind: "retailer", freeShipping: true, note: "Multi-pack; labelled for use as a meal or a topper.", checked: CHECKED },
  { id: "tpt-air-dried-chicken", brand: "the-pets-table", name: "Air-Dried Chicken & Sweet Potato Recipe", type: "shelf-stable", format: "Air-dried", image: img("the-pets-table", "air-dried-chicken-sweet-potato"), price: 64, listPrice: 80, size: "72 oz (2.04 kg)", seller: "Chewy and other retailers", sellerKind: "retailer", freeShipping: true, checked: CHECKED },
  { id: "tpt-air-dried-salmon", brand: "the-pets-table", name: "Air-Dried Salmon & Whitefish with Pumpkin", type: "shelf-stable", format: "Air-dried", image: img("the-pets-table", "air-dried-salmon-whitefish-pumpkin"), price: 69.18, listPrice: 80, size: "72 oz (2.04 kg)", seller: "Chewy and other retailers", sellerKind: "retailer", freeShipping: true, checked: CHECKED },
  { id: "tpt-air-dried-beef-berries", brand: "the-pets-table", name: "Air-Dried Beef & Berries Recipe", type: "shelf-stable", format: "Air-dried", image: img("the-pets-table", "air-dried-beef-berries"), price: 68.99, listPrice: 80, size: "72 oz (2.04 kg)", seller: "Chewy and other retailers", sellerKind: "retailer", freeShipping: true, checked: CHECKED },
  { id: "tpt-air-dried-lamb-beef", brand: "the-pets-table", name: "Air-Dried Lamb & Beef with Brown Rice", type: "shelf-stable", format: "Air-dried", image: img("the-pets-table", "air-dried-lamb-beef-brown-rice"), price: 17.97, listPrice: 20, size: "16 oz (454 g)", seller: "Walmart and other retailers", sellerKind: "retailer", note: "Smallest bag: an easy way to test air-dried food.", checked: CHECKED },

  // ── We Feed Raw ───────────────────────────────────────────────────────────
  { id: "wfr-raw-meal-box", brand: "we-feed-raw", name: "Raw Meal Box: Turkey, Beef & Lamb Frozen Patties", type: "raw", format: "Frozen raw", image: img("we-feed-raw", "raw-meal-box"), price: 99, listPrice: 132, seller: "We Feed Raw", sellerKind: "brand", freeShipping: true, note: "30-day returns on the listing. Keep frozen; thaw in the fridge.", checked: CHECKED },
  { id: "wfr-freeze-dried-raw", brand: "we-feed-raw", name: "Freeze-Dried Raw, Chicken & Beef", type: "shelf-stable", format: "Freeze-dried raw", image: img("we-feed-raw", "freeze-dried-raw"), price: 89, listPrice: 99, seller: "We Feed Raw", sellerKind: "brand", freeShipping: true, note: "Raw food with no freezer needed; 30-day returns on the listing.", checked: CHECKED },

  // ── Maxbone ───────────────────────────────────────────────────────────────
  { id: "mb-raw-coated-terrain", brand: "maxbone", name: "Raw Coated Kibble, Terrain (grass-fed beef & lamb)", type: "kibble", format: "Raw-coated", image: img("maxbone", "raw-coated-terrain"), price: 79.99, size: "21 lb", seller: "Maxbone", sellerKind: "brand", freeShipping: true, note: "Kibble coated in freeze-dried raw; 14-day free returns on the listing.", checked: CHECKED },
  { id: "mb-raw-coated-ocean", brand: "maxbone", name: "Raw Coated Kibble, Ocean (salmon & whitefish)", type: "kibble", format: "Raw-coated", image: img("maxbone", "raw-coated-ocean"), price: 79.99, size: "21 lb", seller: "Maxbone", sellerKind: "brand", freeShipping: true, note: "Kibble coated in freeze-dried raw; 14-day free returns on the listing.", checked: CHECKED },
  { id: "mb-muscle-up-beef", brand: "maxbone", name: "Muscle Up, Beef Freeze-Dried Recipe", type: "shelf-stable", format: "Freeze-dried", image: img("maxbone", "muscle-up-beef"), price: 34, seller: "Chewy and other retailers", sellerKind: "retailer", note: "Beef with spinach, sweet potatoes and blueberries.", checked: CHECKED },
  { id: "mb-glow-up-turkey", brand: "maxbone", name: "Glow Up, Turkey Freeze-Dried Recipe", type: "shelf-stable", format: "Freeze-dried", image: img("maxbone", "glow-up-turkey"), price: 39, seller: "Chewy and other retailers", sellerKind: "retailer", note: "Turkey with carrots, blueberries and chia seeds.", checked: CHECKED },

  // ── Redbarn ───────────────────────────────────────────────────────────────
  { id: "rb-powerfood-beef", brand: "redbarn", name: "Air-Dried Powerfood, High-Protein Beef Recipe", type: "shelf-stable", format: "Air-dried", image: img("redbarn", "powerfood-beef"), price: 53.89, listPrice: 60, seller: "Redbarn", sellerKind: "brand", freeShipping: true, note: "Listing shows a 2.5 oz trial bag; confirm the pack size before you buy.", checked: CHECKED },
  { id: "rb-powerfood-puppy", brand: "redbarn", name: "Air-Dried Powerfood, Healthy Puppy (Chicken)", type: "shelf-stable", format: "Air-dried", image: img("redbarn", "powerfood-puppy"), price: 53.89, listPrice: 60, seller: "Redbarn", sellerKind: "brand", freeShipping: true, note: "Puppy recipe. Listing shows a 2.5 oz trial bag; confirm the pack size.", checked: CHECKED },
  { id: "rb-powerfood-gut-health", brand: "redbarn", name: "Air-Dried Powerfood, Gut Health & Digestion (Chicken & Turkey)", type: "shelf-stable", format: "Air-dried", image: img("redbarn", "powerfood-gut-health"), price: 53.89, listPrice: 60, seller: "Redbarn and other retailers", sellerKind: "brand", freeShipping: true, note: "Listing shows a 2.5 oz trial bag; confirm the pack size.", checked: CHECKED },
  { id: "rb-grain-free-large-breed", brand: "redbarn", name: "Grain-Free Large Breed Dry Dog Food", type: "kibble", image: img("redbarn", "grain-free-large-breed"), price: 58.49, unitPrice: "$3.90/lb", seller: "Chewy and other retailers", sellerKind: "retailer", freeShipping: true, checked: CHECKED },
  { id: "rb-grain-free-sky-4lb", brand: "redbarn", name: "Grain-Free Sky Recipe (poultry)", type: "kibble", image: img("redbarn", "grain-free-sky-4lb"), price: 21.99, listPrice: 24, size: "4 lb", seller: "Pets Are People Too and other retailers", sellerKind: "retailer", checked: CHECKED },
  { id: "rb-whole-grain-land-4lb", brand: "redbarn", name: "Whole Grain Land Recipe", type: "kibble", image: img("redbarn", "whole-grain-land-4lb"), price: 18.99, listPrice: 24, size: "4 lb", seller: "Brothers Country Store and other retailers", sellerKind: "retailer", checked: CHECKED },
  { id: "rb-grain-free-roll-chicken", brand: "redbarn", name: "Grain-Free Dog Food Roll, Chicken Recipe", type: "rolls", image: img("redbarn", "grain-free-roll-chicken"), price: 18.34, seller: "PetSupplyWarehouse and other retailers", sellerKind: "retailer", checked: CHECKED },
  { id: "rb-rolled-variety-pack", brand: "redbarn", name: "Grain-Free Rolled Food Variety Pack (beef & chicken)", type: "rolls", image: img("redbarn", "rolled-variety-pack"), price: 29.95, listPrice: 33, seller: "Redbarn", sellerKind: "brand", note: "Free shipping on Redbarn orders over $50.", checked: CHECKED },
  { id: "rb-jr-bully-slices", brand: "redbarn", name: "Jr. Bully Slices, Peanut Butter (case of 36)", type: "treats", image: img("redbarn", "jr-bully-slices"), price: 242.67, listPrice: 270, size: "36 x 4 oz bags", seller: "Redbarn", sellerKind: "brand", freeShipping: true, note: "Bulk case; beef-hide chews.", checked: CHECKED },
];

export const productsFor = (brandSlug: string) => PRODUCTS.filter((p) => p.brand === brandSlug);

/** Group products by type, in display order, skipping empty types. */
export function groupByType(list: ProductListing[]) {
  return PRODUCT_TYPE_ORDER.map((type) => ({ type, ...PRODUCT_TYPES[type], items: list.filter((p) => p.type === type) })).filter((g) => g.items.length > 0);
}

export const fmtPrice = (n: number) => `$${n.toFixed(2)}`;

/** "Where can I buy X?" answer built from the listings (AEO). Null when we track no products. */
export function whereToBuyFaq(brandSlug: string, brandName: string) {
  const list = productsFor(brandSlug);
  if (list.length === 0) return null;
  const retailers = [...new Set(list.filter((p) => p.sellerKind === "retailer").map((p) => p.seller.replace(/ and other retailers$/, "")))];
  const lo = Math.min(...list.map((p) => p.price));
  const hi = Math.max(...list.map((p) => p.price));
  const types = groupByType(list).map((g) => g.label.toLowerCase());
  return {
    question: `Where can I buy ${brandName}, and what does it cost?`,
    answer:
      `${brandName} sells direct on its own site` +
      (retailers.length ? `, and we also found listings at ${retailers.join(", ")}` : "") +
      `. The ${list.length} products we track (${types.join(", ")}) were listed from ${fmtPrice(lo)} to ${fmtPrice(hi)} on ${new Date(`${list[0].checked}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}. Subscription plans are priced to your dog, so get the brand's own quote before comparing.`,
  };
}
