import { H2, P, Callout } from "@/components/page-shell";
import { A, Ext, Table } from "@/content/articles/fresh-dog-food-guide/ui";
import { comparePath } from "@/lib/dogfood/pairs";
import { PRODUCTS, fmtPrice } from "@/lib/dogfood/products";
import type { ReviewContent } from "./types";

// Sources (each opened and read on 2026-11-12).
const SRC = {
  about: "https://www.redbarn.com/pages/about-us",
  why: "https://www.redbarn.com/pages/why-redbarn",
  faqs: "https://www.redbarn.com/pages/faqs",
  recall1: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/redbarn-pet-products-issues-voluntary-recall-dog-chews",
  recall2: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/redbarn-pet-products-expands-voluntary-recall-dog-chews",
};

// Listed prices captured November 2026 (src/lib/dogfood/products.ts).
const p = (id: string) => PRODUCTS.find((x) => x.id === id)!;
const perLb = (price: number, lb: number) => `$${(price / lb).toFixed(2)}/lb`;
const SKY = p("rb-grain-free-sky-4lb");
const LAND = p("rb-whole-grain-land-4lb");
const LARGE = p("rb-grain-free-large-breed");
const ROLL = p("rb-grain-free-roll-chicken");
const BULLY = p("rb-jr-bully-slices");

function Body() {
  return (
    <>
      <H2 id="trusted">Is Redbarn a trusted brand?</H2>
      <P>
        Yes, on the evidence we can check. Redbarn is a family-owned company founded in 1996, runs its own plants in Long Beach, California and Kansas, and has held SQF Food Safety Code for Manufacturing certification since 2021 (<Ext href={SRC.about}>Redbarn</Ext>).
      </P>
      <P>
        SQF certification isn&apos;t required in the pet industry, which is why it&apos;s a meaningful signal. Redbarn also says its quality team runs over 3,500 physical, chemical and microbiological tests a week and tests every finished batch (<Ext href={SRC.about}>Redbarn</Ext>, <Ext href={SRC.why}>Why Redbarn</Ext>).
      </P>
      <Table
        caption="Redbarn trust checklist"
        head={["What we checked", "What we found"]}
        rows={[
          ["Ownership and history", "Family-owned, founded 1996"],
          ["Where it's made", "Own plants in Long Beach, CA (since 1998) and Kansas (since 2010)"],
          ["Food safety certification", "SQF Food Safety Code for Manufacturing, since 2021"],
          ["Complete and balanced?", "Yes: foods meet AAFCO all life stages incl. large-breed growth, except Beef Recipes (adult maintenance)"],
          ["Country of origin", "Rolled, dry and air-dried food made in the USA with globally sourced ingredients; canned stews made in Thailand"],
          ["Recalls (FDA)", "Two in 2018, both for bully sticks (Salmonella risk); both completed and terminated"],
        ]}
      />
      <P>
        The recall record is worth knowing. In February 2018 Redbarn recalled one lot of 7-inch bully sticks after a Colorado state sample tested positive for Salmonella, and in March 2018 it expanded the recall to all chews made from that raw-material supplier. No illnesses were reported, and the FDA lists both recalls as completed and terminated (<Ext href={SRC.recall1}>FDA</Ext>, <Ext href={SRC.recall2}>FDA</Ext>).
      </P>

      <H2 id="price">Are Redbarn products more expensive than similar brands?</H2>
      <P>
        In the listings we captured, Redbarn dry food ran from {LARGE.unitPrice} to {perLb(SKY.price, 4)}, and its chews cost far more per pound than its food. We don&apos;t yet track rival treat brands&apos; prices, so we can&apos;t say whether Redbarn chews cost more than comparable ones.
      </P>
      <Table
        caption="Redbarn listed prices, November 2026"
        head={["Product", "Format", "Listed price", "Per pound"]}
        rows={[
          [LARGE.name, "Dry food", fmtPrice(LARGE.price), LARGE.unitPrice ?? ""],
          [SKY.name, "Dry food, 4 lb", fmtPrice(SKY.price), perLb(SKY.price, 4)],
          [LAND.name, "Dry food, 4 lb", fmtPrice(LAND.price), perLb(LAND.price, 4)],
          [ROLL.name, "Rolled food", fmtPrice(ROLL.price), "Check roll size"],
          [BULLY.name, "Chews", fmtPrice(BULLY.price), perLb(BULLY.price, (36 * 4) / 16)],
        ]}
      />
      <P>
        Prices vary by seller and pack size; see every listing in the products section below. To compare any two foods fairly, use cost per 1,000 kcal rather than per bag.
      </P>
      <Callout>
        <strong>Comparing with fresh food?</strong> Price per pound misleads here: fresh food is about 70% water, so a pound carries far fewer calories than a pound of dry food. Compare cost per 1,000 kcal instead.
      </Callout>

      <H2 id="alternatives">What are the best Redbarn alternatives?</H2>
      <P>
        It depends on why you buy Redbarn. If you want pantry food with no subscription, the closest options among the brands we review are Maxbone and The Pets Table; if you want complete fresh meals, The Farmer&apos;s Dog or Ollie.
      </P>
      <Table
        caption="Redbarn alternatives by reason"
        head={["If you want", "Consider", "Compare"]}
        rows={[
          ["Shelf-stable food, no subscription", <A key="m" href="/reviews/maxbone">Maxbone</A>, <A key="mc" href={comparePath("maxbone-vs-redbarn")}>Maxbone vs Redbarn</A>],
          ["Air-dried food from a retailer", <A key="t" href="/reviews/the-pets-table">The Pets Table</A>, <A key="tc" href={comparePath("the-pets-table-vs-redbarn")}>The Pets Table vs Redbarn</A>],
          ["Whole-food dry food that stores like kibble", <A key="s" href="/reviews/spot-and-tango">Spot &amp; Tango (UnKibble)</A>, <A key="sc" href={comparePath("spot-and-tango-vs-redbarn")}>Spot &amp; Tango vs Redbarn</A>],
          ["Complete fresh meals, portioned for you", <A key="f" href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A>, <A key="fc" href={comparePath("the-farmers-dog-vs-redbarn")}>The Farmer&apos;s Dog vs Redbarn</A>],
        ]}
      />
    </>
  );
}

export const content: ReviewContent = {
  updatedAt: "2026-11-12",
  Body,
  ownAlternatives: true,
  faqs: [
    {
      question: "Is Redbarn a trusted brand for dog treats and chews?",
      answer: "Yes, on the evidence we can check: family-owned since 1996, its own manufacturing plants in California and Kansas, and SQF food safety certification since 2021. It had two bully stick recalls in 2018 (Salmonella risk, no illnesses reported), both completed.",
    },
    {
      question: "Are Redbarn products more expensive than similar brands?",
      answer: `Redbarn dry food listings we captured in November 2026 ran from ${LARGE.unitPrice} to ${perLb(SKY.price, 4)}; its chews cost more per pound. We don't yet track rival treat prices, so compare foods by cost per 1,000 kcal on each brand's label.`,
    },
    {
      question: "What are good Redbarn alternatives?",
      answer: "For shelf-stable food without a subscription, Maxbone or The Pets Table's air-dried line. For complete fresh meals portioned to your dog, The Farmer's Dog or Ollie.",
    },
    {
      question: "Is Redbarn dog food complete and balanced?",
      answer: "Redbarn says all its foods meet AAFCO profiles for all life stages, including large-breed growth, except its Beef Recipes, which are complete for adult dogs.",
    },
    {
      question: "Where is Redbarn made?",
      answer: "Redbarn says its rolled, dry and air-dried foods are made in the USA with globally sourced ingredients, and its canned stews are made in Thailand.",
    },
  ],
  sources: [
    { label: "About Us (history, facilities, SQF certification, testing)", publisher: "Redbarn Pet Products", year: 2026, href: SRC.about },
    { label: "Why Redbarn (quality assurance and SQF)", publisher: "Redbarn Pet Products", year: 2026, href: SRC.why },
    { label: "FAQs (AAFCO statements, sourcing and country of origin)", publisher: "Redbarn Pet Products", year: 2026, href: SRC.faqs },
    { label: "Redbarn Pet Products Issues Voluntary Recall of Dog Chews (Feb 8, 2018)", publisher: "U.S. Food and Drug Administration", year: 2018, href: SRC.recall1 },
    { label: "Redbarn Pet Products Expands Voluntary Recall of Dog Chews (Mar 5, 2018)", publisher: "U.S. Food and Drug Administration", year: 2018, href: SRC.recall2 },
  ],
};
