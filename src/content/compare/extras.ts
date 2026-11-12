// Pair-specific editorial for /compare pages: extra rows and FAQs that answer what
// people actually search for each pair (from Search Console). Data comes only from
// verified dataset fields and product listings (src/lib/dogfood/products.ts).
import type { FaqItem } from "@/lib/config";
import { PRODUCTS, fmtPrice } from "@/lib/dogfood/products";

export interface PairExtra {
  /** Heading for the extra table. */
  title: string;
  /** [label, value for pair.a, value for pair.b] */
  rows: [string, string, string][];
  faqs: FaqItem[];
}

const price = (id: string) => fmtPrice(PRODUCTS.find((x) => x.id === id)!.price);

export const PAIR_EXTRAS: Record<string, PairExtra> = {
  "the-farmers-dog-vs-the-pets-table": {
    title: "Plans and where to buy",
    rows: [
      ["Plan types", "Fresh full meals only", "Fresh, air-dried, mixed and topper plans"],
      ["Fresh food in stores", "No; fresh plans by subscription", `Frozen multipacks listed at Chewy (from ${price("tpt-fresh-chicken-casserole")})`],
      ["Shelf-stable option", `Instant Fresh at Walmart (2 lb, ${price("tfd-instant-fresh-2lb")})`, `Air-dried at Chewy and Walmart (16 oz from ${price("tpt-air-dried-lamb-beef")})`],
      ["Trial", `Trial boxes listed from ${price("tfd-small-dog-trial-box")}`, "Two-box intro discount (brand offer)"],
    ],
    faqs: [
      {
        question: "Is The Pets Table cheaper than The Farmer's Dog?",
        answer: "It can be, because The Pets Table sells topper and mixed plans that replace only part of the bowl, while The Farmer's Dog sells full fresh meals only. For a full fresh diet, compare quotes for your dog's calories; we're still verifying both brands' standard per-day prices.",
      },
      {
        question: "Can you buy The Pets Table or The Farmer's Dog in stores?",
        answer: "In our November 2026 listings, The Pets Table's frozen multipacks and air-dried food were sold at Chewy, with an air-dried recipe at Walmart. The Farmer's Dog's fresh plans are subscription-only; its shelf-stable Instant Fresh was listed at Walmart.",
      },
      {
        question: "Does The Pets Table or The Farmer's Dog have a topper plan?",
        answer: "The Pets Table does: it offers a topper-only plan alongside fresh, air-dried and mixed plans. The Farmer's Dog sells full fresh meals only, though you can feed part of a plan and reduce your dog's other food by the same calories.",
      },
    ],
  },
};
