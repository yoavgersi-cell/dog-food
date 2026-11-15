import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { comparePath } from "@/lib/dogfood/pairs";
import { PRODUCTS, fmtPrice } from "@/lib/dogfood/products";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-14).
const OLLIE_COST = "https://blog.ollie.com/how-much-does-fresh-dog-food-cost/"; // Ollie's own cost guide, updated May 13, 2025
const PETFUL_JFFD = "https://www.petful.com/spotlight/justfoodfordogs-vs-ollie/"; // repeats the same weekly prices, updated Oct 30, 2026
const PETFUL_TFD = "https://www.petful.com/food/the-farmers-dog-cost/"; // The Farmer's Dog survey bands

const WEEK = 7;
const MONTH = 365 / 12;
const usd = (n: number) => `$${n.toFixed(2)}`;
const usd0 = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

// Ollie's published starting prices per week, by dog size and plan.
const PLANS: { size: string; full: number; half: number }[] = [
  { size: "Small (3-20 lb)", full: 22, half: 15 },
  { size: "Medium (20-50 lb)", full: 55, half: 38 },
  { size: "Large (50+ lb)", full: 69, half: 41 },
];
const perDay = (weekly: number) => weekly / WEEK;
const perMonth = (weekly: number) => (weekly / WEEK) * MONTH;

const BAKED_2LB = PRODUCTS.find((x) => x.id === "ollie-baked-chicken-2lb")!;

export const meta: ArticleMeta = {
  slug: "how-much-does-ollie-cost",
  title: "How Much Does Ollie Dog Food Cost? Per Day, Week and Month (2026)",
  seoTitle: "How Much Does Ollie Cost? Per Day, Week and Month",
  description:
    "Ollie starts at $22 a week for small dogs, $55 for medium and $69 for large on a full plan. See the cost per day and month, half plans and how it compares.",
  publishedAt: "2026-11-14",
  updatedAt: "2026-11-14",
  readMinutes: 6,
  category: "Buying guide",
  answer: {
    question: "How much does Ollie dog food cost per month?",
    text: `About ${usd0(perMonth(22))} a month for a small dog, ${usd0(perMonth(55))} for a medium dog and ${usd0(perMonth(69))} for a large dog at Ollie's starting full-plan prices ($22, $55 and $69 a week). A half fresh plan starts lower, at $15 to $41 a week, but you also buy your dog's other food.`,
  },
  keyTakeaways: [
    "Ollie's published starting prices for a full fresh plan are $22 a week for dogs of 3-20 lb, $55 for 20-50 lb and $69 for 50 lb and up.",
    `That's about ${usd(perDay(22))}, ${usd(perDay(55))} and ${usd(perDay(69))} a day, or ${usd0(perMonth(22))}, ${usd0(perMonth(55))} and ${usd0(perMonth(69))} a month.`,
    "Half fresh plans start at $15, $38 and $41 a week. They cost less because fresh food is only half the bowl.",
    "These are starting prices; your quote depends on your dog's calories. Ollie puts its full plans at about $8 a day on average for larger dogs.",
  ],
  faqs: [
    {
      question: "How much is Ollie dog food a month?",
      answer: `At Ollie's starting full-plan prices: about ${usd0(perMonth(22))} a month for small dogs, ${usd0(perMonth(55))} for medium and ${usd0(perMonth(69))} for large. Half plans start at about ${usd0(perMonth(15))}, ${usd0(perMonth(38))} and ${usd0(perMonth(41))}.`,
    },
    {
      question: "How much is Ollie per day?",
      answer: "Ollie says its plans start under $4 a day for small dogs, from $1.57 per meal on a full plan or $1.00 per meal on a half plan, and average around $8 a day for full plans for larger dogs.",
    },
    {
      question: "Is Ollie cheaper than The Farmer's Dog?",
      answer: "At the starting prices they're close. Ollie's starting full plans work out to about $3.14, $7.86 and $9.86 a day by size; Petful's testing put The Farmer's Dog at about $2.31-$5.75 for small dogs, $7.98-$8.67 for 25-60 lb and $9.99 and up for big dogs. Compare quotes for your own dog.",
    },
    {
      question: "What is Ollie's half plan?",
      answer: "A plan where Ollie's fresh food makes up half of each meal and your dog's existing food the rest. It starts at $15, $38 or $41 a week by dog size, plus the cost of the other food.",
    },
  ],
  sources: [
    { label: "How Much Does Fresh Dog Food Cost? (Ollie starting prices by size and plan; updated May 2025)", publisher: "Ollie", year: 2025, href: OLLIE_COST },
    { label: "JustFoodForDogs vs. Ollie: Recipes, Cost and Feeding (repeats Ollie's weekly starting prices; updated Oct 2026)", publisher: "Petful", year: 2026, href: PETFUL_JFFD },
    { label: "How much does The Farmer's Dog cost? (survey testing, updated Aug 2026)", publisher: "Petful", year: 2026, href: PETFUL_TFD },
  ],
  relatedPaths: ["/reviews/ollie", "/brands/ollie", "/diets/fresh", "/diets/mixed-feeding", "/best-for/budget-dog-food"],
};

export function Body() {
  return (
    <>
      <H2 id="per-month">How much does Ollie cost per month?</H2>
      <P>
        About {usd0(perMonth(22))} to {usd0(perMonth(69))} a month on a full fresh plan, depending on your dog&apos;s size. Ollie publishes starting weekly prices by size band (<Ext href={OLLIE_COST}>Ollie</Ext>), and Petful repeated the same figures in October 2026 (<Ext href={PETFUL_JFFD}>Petful</Ext>).
      </P>
      <Table
        caption="Ollie starting prices by dog size: full fresh plan"
        head={["Dog size", "Per week", "Per day", "Per month", "Per year"]}
        rows={PLANS.map((p) => [p.size, `$${p.full}`, usd(perDay(p.full)), usd0(perMonth(p.full)), usd0(p.full * 52.14)])}
        note="Weekly starting prices published by Ollie. Day, month and year are our arithmetic (week / 7, x 30.4, x 52.14). Your quote depends on your dog's weight, age and activity."
      />

      <H2 id="half-plan">How much does Ollie&apos;s half plan cost?</H2>
      <P>
        Less, because fresh food is only half the bowl. Ollie&apos;s half fresh plans start at $15, $38 and $41 a week by size, which works out to {usd0(perMonth(15))}, {usd0(perMonth(38))} and {usd0(perMonth(41))} a month (<Ext href={OLLIE_COST}>Ollie</Ext>).
      </P>
      <Table
        caption="Ollie full vs half fresh plan, starting price per month"
        head={["Dog size", "Full fresh", "Half fresh", "Saving on the Ollie bill"]}
        rows={PLANS.map((p) => [p.size, usd0(perMonth(p.full)), usd0(perMonth(p.half)), usd0(perMonth(p.full - p.half))])}
        note="A half plan still needs another food for the other half of each meal, so the real saving is smaller than this column."
      />
      <P>
        Notice the large-dog half plan: $41 a week against $69 for a full plan, the biggest gap of the three. For big dogs on a budget, mixing is where Ollie makes the most sense. Our <A href="/articles/fresh-dog-food-topper-vs-full-meal">topper vs full fresh guide</A> shows how to split the calories.
      </P>

      <H2 id="per-day">How much is Ollie per day and per meal?</H2>
      <P>
        Ollie says its plans start from $1.57 per meal on a full plan and $1.00 on a half plan, start under $4 a day for small dogs, and average around $8 a day for full plans for larger dogs (<Ext href={OLLIE_COST}>Ollie</Ext>).
      </P>
      <Callout>
        <strong>Starting price, not your price.</strong> These figures are entry points by size band. A very active 50 lb dog and a lazy 50 lb senior get different quotes, so run Ollie&apos;s quiz for your dog before budgeting.
      </Callout>

      <ArticleBrandCard slug="ollie" />

      <H2 id="vs-tfd">Is Ollie cheaper than The Farmer&apos;s Dog?</H2>
      <P>
        At the starting prices, they&apos;re close. The comparison isn&apos;t perfectly like-for-like: Ollie publishes starting prices by size band, while Petful&apos;s figures for The Farmer&apos;s Dog come from testing more than 100 quotes (<Ext href={PETFUL_TFD}>Petful</Ext>).
      </P>
      <Table
        caption="Ollie vs The Farmer's Dog, cost per day by dog size"
        head={["Dog size", "Ollie full plan (starting)", "The Farmer's Dog (tested range)"]}
        rows={[
          ["Small", `${usd(perDay(22))} (3-20 lb)`, "$2.31-$4.12 (1-10 lb); $5.24-$5.75 (10-25 lb)"],
          ["Medium", `${usd(perDay(55))} (20-50 lb)`, "$7.98-$8.67 (25-60 lb)"],
          ["Large", `${usd(perDay(69))} (50+ lb)`, "$9.99-$16.77 (60-100 lb)"],
        ]}
        note="Weight bands differ between the two sources. See our full breakdown of The Farmer's Dog cost for week and month figures."
      />
      <P>
        For the full picture, read <A href="/articles/how-much-does-the-farmers-dog-cost">how much The Farmer&apos;s Dog costs</A> and our head-to-head <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A>.
      </P>

      <H2 id="vs-kibble-raw">How does Ollie&apos;s cost compare with kibble and raw food?</H2>
      <P>
        Fresh food sits between kibble and raw on price. Ollie&apos;s own guide puts typical daily costs at the ranges below, and places its plans inside the fresh-food band (<Ext href={OLLIE_COST}>Ollie</Ext>).
      </P>
      <Table
        caption="Typical cost per day by type of dog food, as published by Ollie"
        head={["Type of food", "Typical cost per day", "Ollie's note"]}
        rows={[
          ["Kibble", "$1.00-$3.50", "Most affordable, but highly processed"],
          ["Fresh food", "$2.00-$10.00", "Human-grade ingredients, higher moisture"],
          ["Raw diets", "$4.00-$12.00+", "Most expensive; harder to store and handle safely"],
        ]}
        note="Ranges as published by Ollie (a fresh food seller), May 2025. Your own costs depend on your dog's calories and the products you choose."
      />
      <P>
        Ollie&apos;s price also covers things you&apos;d otherwise do yourself: portions set to your dog&apos;s calories, an app to change deliveries and plans, and what it calls Health Screenings, check-ins on stool quality and weight progress (<Ext href={OLLIE_COST}>Ollie</Ext>). If you&apos;re weighing raw instead, read <A href="/articles/is-raw-dog-food-safe">is raw dog food safe?</A> first.
      </P>

      <H2 id="cheaper">How can you make Ollie cheaper?</H2>
      <List
        items={[
          <><strong>Use a half plan or mix in baked food.</strong> Ollie lets you combine fresh with its baked line in one plan; the baked food also sells at Petco.com, where a 2 lb bag was listed at {fmtPrice(BAKED_2LB.price)} in our November 2026 check.</>,
          <><strong>Keep your dog lean.</strong> Plans are priced to your dog&apos;s calories, so a dog at a healthy weight needs a smaller plan.</>,
        ]}
      />

      <H2 id="worth-it">Is Ollie worth the price?</H2>
      <P>
        For owners who want fresh food with flexibility, usually yes: Ollie scores 9.4/10 in our ranking, second only to The Farmer&apos;s Dog, and its half and mixed plans make it the easier fresh brand to fit a budget. Ollie lists beef, chicken, turkey, pork and lamb recipes (<Ext href={OLLIE_COST}>Ollie</Ext>).
      </P>
      <P>
        Read our full <A href="/reviews/ollie">Ollie review</A>, the <A href="/brands/ollie">recipes and nutrition</A> behind it, or <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A>
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />

      <P>
        See every brand side by side in our <A href="/">2026 ranking</A>.
      </P>
    </>
  );
}
