import { H2, P } from "@/components/page-shell";
import { A, Table } from "@/content/articles/fresh-dog-food-guide/ui";
import { comparePath } from "@/lib/dogfood/pairs";
import { PRODUCTS, fmtPrice } from "@/lib/dogfood/products";
import type { ReviewContent } from "./types";

// Built only from product listings captured in November 2026 (src/lib/dogfood/products.ts):
// Ollie's own site and Petco.com. Anything not in those listings is not claimed.
const ollie = PRODUCTS.filter((x) => x.brand === "ollie");
const fresh = ollie.filter((x) => x.type === "fresh");
// One row per baked recipe (the chicken recipe is listed in two bag sizes).
const baked = ollie.filter((x) => x.type === "shelf-stable" && !/\(large bag\)/.test(x.name) || x.id === "ollie-baked-beef");
const treats = ollie.filter((x) => x.type === "treats");
const BAKED_SMALL = PRODUCTS.find((x) => x.id === "ollie-baked-chicken-2lb")!;

function Body() {
  return (
    <>
      <H2 id="recipes">What Ollie recipes are available?</H2>
      <P>
        In the listings we captured in November 2026, Ollie sold {fresh.length} fresh recipes (one of them seasonal), {baked.length} baked recipes and {treats.length} jerky treats. Fresh recipes come by subscription; the baked food and jerky were also listed at Petco.com.
      </P>
      <Table
        caption="Ollie recipes in our November 2026 listings"
        head={["Recipe", "Line", "Where listed"]}
        rows={[...fresh, ...baked, ...treats].map((x) => [
          x.name,
          x.type === "fresh" ? "Fresh (frozen)" : x.type === "treats" ? "Treats" : "Baked",
          x.seller,
        ])}
      />
      <P>
        We didn&apos;t find a duck recipe in these listings, so check Ollie&apos;s current menu if you need one. Ollie rotates seasonal recipes, so the line-up can change.
      </P>

      <H2 id="baked">Does Ollie offer baked dog food as well as fresh?</H2>
      <P>
        Yes. Ollie sells baked dog food alongside its fresh recipes, and you can mix both in one plan. In our listings, Petco.com sold the baked chicken recipe in a 2 lb bag for {fmtPrice(BAKED_SMALL.price)}, a low-cost way to try it without a subscription.
      </P>
      <Table
        caption="Ollie fresh vs baked"
        head={["", "Fresh", "Baked"]}
        rows={[
          ["Storage", "Freezer, then fridge", "Pantry"],
          ["How you buy it", "Subscription", "Subscription, or Petco.com without one"],
          ["Recipes in our listings", fresh.map((x) => x.name.replace(/^Fresh /, "")).join(", "), "Chicken with Carrots; Beef with Sweet Potatoes"],
        ]}
      />
      <P>
        Mixing fresh and baked is a practical way to cut cost while keeping some fresh food in the bowl; split by calories, as in our <A href="/articles/fresh-dog-food-topper-vs-full-meal">topper guide</A>. Comparing brands? See <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A> and <A href={comparePath("ollie-vs-spot-and-tango")}>Ollie vs Spot &amp; Tango</A>.
      </P>
    </>
  );
}

export const content: ReviewContent = {
  updatedAt: "2026-11-12",
  Body,
  faqs: [
    {
      question: "What fresh Ollie recipes are available?",
      answer: `In the listings we captured in November 2026: ${fresh.map((x) => x.name).join("; ")}. Ollie rotates seasonal recipes, so check its current menu.`,
    },
    {
      question: "Does Ollie offer baked dog food as well as fresh?",
      answer: `Yes. Ollie sells baked recipes (chicken and beef in our listings) alongside fresh, and you can mix both in one plan. Petco.com listed the 2 lb baked chicken bag at ${fmtPrice(BAKED_SMALL.price)}, no subscription needed.`,
    },
    {
      question: "Does Ollie have a duck recipe?",
      answer: "We didn't find one in the Ollie listings we captured in November 2026. Recipes change, so check Ollie's current menu if your dog needs a specific protein.",
    },
  ],
  sources: [],
};
