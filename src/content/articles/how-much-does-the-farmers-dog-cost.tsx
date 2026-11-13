import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { comparePath } from "@/lib/dogfood/pairs";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-13).
const PETFUL = "https://www.petful.com/food/the-farmers-dog-cost/"; // survey testing, published Feb 24 2026, updated Aug 4 2026
const TFD_COST = "https://www.thefarmersdog.com/digest/the-farmers-dog-cost-and-value/"; // customer examples, updated Apr 1 2026
const TFD_FAQ = "https://www.thefarmersdog.com/faq";
const TFD_WHERE = "https://www.thefarmersdog.com/digest/where-to-buy-the-farmers-dog-food/";
const ST_FAQ = "https://www.spotandtango.com/faq";
const SUNDAYS_CHICKEN = "https://sundaysfordogs.com/food/chicken";

const WEEK = 7;
const MONTH = 365 / 12; // average days per month
const YEAR = 365;
const usd = (n: number) => `$${n.toFixed(2)}`;
const usd0 = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

// Petful's survey-tested daily price bands by weight (adult dogs).
const BANDS: { weight: string; low: number; high: number }[] = [
  { weight: "1-10 lb", low: 2.31, high: 4.12 },
  { weight: "10-25 lb", low: 5.24, high: 5.75 },
  { weight: "25-60 lb", low: 7.98, high: 8.67 },
  { weight: "60-100 lb", low: 9.99, high: 16.77 },
  { weight: "100+ lb", low: 15.73, high: 26.77 },
];

// The Farmer's Dog's own published customer plan examples.
const EXAMPLES: { dog: string; perDay: number }[] = [
  { dog: "11 lb Yorkshire terrier, age 3", perDay: 2.8 },
  { dog: "Two 25 lb seniors (Shih Tzu and border terrier), one plan", perDay: 5.5 },
  { dog: "75 lb Labrador retriever mix, age 7", perDay: 10.39 },
];

export const meta: ArticleMeta = {
  slug: "how-much-does-the-farmers-dog-cost",
  title: "How Much Does The Farmer's Dog Cost? Per Day, Week and Month (2026)",
  seoTitle: "How Much Does The Farmer's Dog Cost? (Day, Week, Month)",
  description:
    "The Farmer's Dog costs about $2.31 to $26.77 a day by dog size. See the price per week, month and year, puppy costs, how billing works and how to pay less.",
  publishedAt: "2026-11-13",
  updatedAt: "2026-11-13",
  readMinutes: 6,
  category: "Buying guide",
  answer: {
    question: "How much does The Farmer's Dog cost?",
    text: "About $2.31 to $26.77 a day, depending on your dog's size and calorie needs, in Petful's 2026 survey testing. That's roughly $16 to $187 a week. The brand itself says plans start at about $2 a day with free shipping, and publishes examples from $2.80 a day for an 11 lb dog to $10.39 for a 75 lb dog.",
  },
  keyTakeaways: [
    "Price follows calories: about $2.31-$4.12 a day for dogs up to 10 lb and $7.98-$8.67 for 25-60 lb dogs, rising to $26.77 for giant breeds (Petful, 2026).",
    `The Farmer's Dog's own examples: ${usd(2.8)} a day for an 11 lb Yorkie (about ${usd0(2.8 * MONTH)} a month) and ${usd(10.39)} for a 75 lb Lab mix (about ${usd0(10.39 * MONTH)} a month).`,
    "You're billed per shipment, not per month: deliveries cover 1 week to 2 months of food, with free shipping and pause or cancel anytime.",
    "The cheapest ways in are the first-box discount and feeding fresh as a topper; the brand also sells through Walmart.com and Amazon.",
  ],
  faqs: [
    {
      question: "How much is The Farmer's Dog per week?",
      answer: "About $16 to $187 a week, depending on your dog's size, in Petful's 2026 testing. Using the brand's own examples, an 11 lb dog costs about $19.60 a week and a 75 lb dog about $72.73.",
    },
    {
      question: "How much is The Farmer's Dog per month?",
      answer: "About $70 to $800 a month in Petful's testing. A 50 lb dog lands around $240-$260 a month. The brand's own 11 lb example works out to about $85 a month, and its 75 lb example to about $316.",
    },
    {
      question: "Is shipping included in The Farmer's Dog price?",
      answer: "Yes. The Farmer's Dog says all plans include free shipping to the 48 contiguous states.",
    },
    {
      question: "Can you buy The Farmer's Dog at Walmart or Amazon?",
      answer: "Yes. The brand says its food is available on Walmart.com and Amazon.com, still portioned to your dog. Petful found Walmart.com pricing matched the direct subscription and that the fresh food isn't stocked in Walmart stores.",
    },
    {
      question: "Why is The Farmer's Dog so expensive?",
      answer: "You pay for human-grade ingredients, per-dog portioning and frozen delivery, and fresh food is mostly water, so a day's calories weigh far more than kibble. Price scales with your dog's calories, so small dogs pay the least.",
    },
  ],
  sources: [
    { label: "How much does The Farmer's Dog cost? (survey testing of 100+ quotes; updated Aug 4, 2026)", publisher: "Petful", year: 2026, href: PETFUL },
    { label: "The Farmer's Dog Cost - and Value (customer plan examples; updated Apr 2026)", publisher: "The Farmer's Dog", year: 2026, href: TFD_COST },
    { label: "Frequently Asked Questions (pricing, delivery, shipping, subscription)", publisher: "The Farmer's Dog", year: 2026, href: TFD_FAQ },
    { label: "Where to Buy The Farmer's Dog Food (Aug 26, 2026)", publisher: "The Farmer's Dog", year: 2026, href: TFD_WHERE },
    { label: "Help Center FAQ (UnKibble and Fresh starting prices)", publisher: "Spot & Tango", year: 2026, href: ST_FAQ },
    { label: "Chicken recipe page (plan prices per day)", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_CHICKEN },
  ],
  relatedPaths: ["/reviews/the-farmers-dog", "/brands/the-farmers-dog", "/diets/fresh", "/best-for/budget-dog-food"],
};

export function Body() {
  return (
    <>
      <H2 id="per-day">How much does The Farmer&apos;s Dog cost per day?</H2>
      <P>
        About $2.31 to $26.77 a day, and your dog&apos;s weight decides where you land. Petful ran The Farmer&apos;s Dog sign-up survey more than 100 times in 2026, changing one detail at a time, and found price follows calorie needs (<Ext href={PETFUL}>Petful, 2026</Ext>).
      </P>
      <Table
        caption="The Farmer's Dog cost by dog weight: per day, week, month and year"
        head={["Adult dog's weight", "Per day", "Per week", "Per month", "Per year"]}
        rows={BANDS.map((b) => [
          b.weight,
          `${usd(b.low)}-${usd(b.high)}`,
          `${usd0(b.low * WEEK)}-${usd0(b.high * WEEK)}`,
          `${usd0(b.low * MONTH)}-${usd0(b.high * MONTH)}`,
          `${usd0(b.low * YEAR)}-${usd0(b.high * YEAR)}`,
        ])}
        note="Per-day bands from Petful's 2026 survey testing (shipping included). Week, month and year are our arithmetic: per day x 7, x 30.4 and x 365. Petful notes lightly active small dogs can quote below its tested minimums."
      />

      <H2 id="examples">What do real customers pay?</H2>
      <P>
        The Farmer&apos;s Dog publishes three customer plans with their daily price (<Ext href={TFD_COST}>The Farmer&apos;s Dog</Ext>). We converted each to a weekly, monthly and yearly figure.
      </P>
      <Table
        caption="The Farmer's Dog published customer plans, converted to week, month and year"
        head={["Dog", "Per day", "Per week", "Per month", "Per year"]}
        rows={EXAMPLES.map((e) => [e.dog, usd(e.perDay), usd(e.perDay * WEEK), usd0(e.perDay * MONTH), usd0(e.perDay * YEAR)])}
        note="Daily prices as published by The Farmer's Dog (page updated April 2026). Your quote depends on your dog's age, weight, activity and recipes."
      />
      <P>
        Note the two-dog plan: $5.50 a day covers both 25 lb seniors, so it&apos;s $2.75 per dog. Older, smaller dogs need fewer calories, and cost follows calories.
      </P>

      <H2 id="puppies">How much does The Farmer&apos;s Dog cost for a puppy?</H2>
      <P>
        More than for an adult of the same size, because growing dogs need more calories. Petful&apos;s testing found about $4 to $11 a day for small-breed puppies, with medium puppies reaching $18.54 a day at peak growth, before prices settle toward adult levels at around 6 to 8 months (<Ext href={PETFUL}>Petful</Ext>).
      </P>
      <P>
        The brand says its fresh recipes suit all life stages, from puppies to seniors (<Ext href={TFD_FAQ}>The Farmer&apos;s Dog FAQ</Ext>). See <A href="/articles/fresh-food-for-puppies">fresh food for puppies</A> for growth calories.
      </P>

      <H2 id="billing">How is The Farmer&apos;s Dog billed?</H2>
      <P>
        Per shipment, not per calendar month. Plans start at about $2 a day, deliveries cover 1 week to 2 months of food, and shipping is free; you can change, delay or cancel online (<Ext href={TFD_FAQ}>The Farmer&apos;s Dog FAQ</Ext>).
      </P>
      <Callout>
        <strong>Why a charge can look high:</strong> a small dog&apos;s box can hold weeks of food, so one charge may cover more than a month. Divide by the days of food in the box to see your real daily cost.
      </Callout>

      <ArticleBrandCard slug="the-farmers-dog" />

      <H2 id="vs-others">Is The Farmer&apos;s Dog more expensive than other fresh dog food?</H2>
      <P>
        At the low end it&apos;s in line with rivals: several brands start at $1-$3 a day. Brands quote these differently and only for the smallest dogs, so get a quote for your own dog before deciding.
      </P>
      <Table
        caption="Starting prices: The Farmer's Dog vs other fresh and fresh-dry brands"
        head={["Brand and line", "Starting price (brand-stated)", "Format"]}
        rows={[
          ["The Farmer's Dog", "About $2/day", "Fresh, frozen"],
          ["Spot & Tango Fresh", "$2/day", "Fresh, frozen"],
          ["Spot & Tango UnKibble", "$1/day", "Fresh-dry, pantry"],
          ["Sundays (Chicken)", "$2.82-$9.15/day", "Air-dried, pantry"],
        ]}
        note="Read from each brand's own pages on November 13, 2026. Starting prices are for the smallest dogs; your quote depends on your dog."
      />
      <P>
        For head-to-head detail, see <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A>, <A href={comparePath("the-farmers-dog-vs-spot-and-tango")}>vs Spot &amp; Tango</A> and <A href={comparePath("the-farmers-dog-vs-the-pets-table")}>vs The Pets Table</A>.
      </P>

      <H2 id="save">How can you make The Farmer&apos;s Dog cheaper?</H2>
      <List
        items={[
          <><strong>Use the first-box discount.</strong> The brand&apos;s site advertised 50% off the first box when we checked; Petful saw the same discount on Walmart.com.</>,
          <><strong>Feed it as a topper.</strong> Replace about 25% of your dog&apos;s calories with fresh food and the fresh bill drops to about a quarter. See <A key="t" href="/articles/fresh-dog-food-topper-vs-full-meal">topper vs full fresh</A>.</>,
          <><strong>Consider Instant Fresh.</strong> It&apos;s the brand&apos;s shelf-stable, add-water line for adult and senior dogs (<Ext key="w" href={TFD_FAQ}>The Farmer&apos;s Dog FAQ</Ext>); we&apos;ve found it listed at Walmart. Compare its cost per day with your fresh quote before switching.</>,
          <><strong>Keep portions exact.</strong> The plan is priced to your dog&apos;s calories, so an overweight dog brought to a healthy weight may need a smaller plan.</>,
        ]}
      />

      <H2 id="worth-it">Is The Farmer&apos;s Dog worth the price?</H2>
      <P>
        For small dogs, picky eaters and owners who want exact portions, usually yes: it&apos;s our top-ranked brand at 9.7/10. For a large dog on a budget, a topper or a cheaper format may make more sense. Read our full <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog review</A> and <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A>
      </P>

      <ArticleBrandCard slug="spot-and-tango" />

      <P>
        See every brand ranked in our <A href="/">2026 ranking</A>, or the <A href="/brands/the-farmers-dog">recipes and nutrition</A> behind The Farmer&apos;s Dog.
      </P>
    </>
  );
}
