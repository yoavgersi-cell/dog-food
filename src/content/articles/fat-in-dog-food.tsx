import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, gramsPer1000kcal, kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-16).
const ST_BEEF = "https://www.spotandtango.com/recipes/beef-and-barley";
const ST_TURKEY = "https://www.spotandtango.com/recipes/turkey-and-sweet-potato";
const ST_COD = "https://www.spotandtango.com/recipes/cod-and-salmon";
const SUN_BEEF = "https://sundaysfordogs.com/food/beef";
const SUN_CHICKEN = "https://sundaysfordogs.com/food/chicken";
const SUN_TURKEY = "https://sundaysfordogs.com/food/turkey";
const APOP_2022 = "https://www.petobesityprevention.org/2022";
const WSAVA_FAQ = "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf";

// Label figures read 2026-11-16 (as-fed fat minimum; kcal/kg or kcal per cup and cup weight).
const FOODS = [
  { name: "Spot & Tango UnKibble Beef + Barley", href: ST_BEEF, fat: 27, kcalPerKg: 4792 },
  { name: "Spot & Tango UnKibble Turkey + Sweet Potato", href: ST_TURKEY, fat: 20, kcalPerKg: 4367 },
  { name: "Spot & Tango UnKibble Cod + Salmon", href: ST_COD, fat: 15, kcalPerKg: 4193 },
  { name: "Sundays Beef (air-dried)", href: SUN_BEEF, fat: 25, kcalPerKg: (650 / 120) * 1000 },
  { name: "Sundays Turkey (air-dried)", href: SUN_TURKEY, fat: 22, kcalPerKg: (640 / 120) * 1000 },
  { name: "Sundays Chicken (air-dried)", href: SUN_CHICKEN, fat: 18, kcalPerKg: (620 / 121) * 1000 },
];
// Sundays publishes calories per cup by source (its "calculated value").
const SUNDAYS_SPLIT = [
  { name: "Beef", href: SUN_BEEF, total: 650, protein: 191, fat: 400, carb: 59 },
  { name: "Turkey", href: SUN_TURKEY, total: 640, protein: 207, fat: 330, carb: 103 },
  { name: "Chicken", href: SUN_CHICKEN, total: 620, protein: 241, fat: 245, carb: 134 },
];
const pct = (n: number, d: number) => `${Math.round((n / d) * 100)}%`;
const per1000 = (p: number, k: number) => gramsPer1000kcal(p, k);
const k50 = kcalPerDayForLb(50);

export const meta: ArticleMeta = {
  slug: "fat-in-dog-food",
  title: "Fat in Dog Food: How Much Is Too Much? (Per 1,000 kcal, 2026)",
  seoTitle: "Fat in Dog Food: How Much Is Too Much?",
  description:
    "How much fat a dog needs (AAFCO minimums per 1,000 kcal), why fat drives calories and weight, how real foods compare, and when to choose a lower-fat recipe.",
  publishedAt: "2026-11-16",
  updatedAt: "2026-11-16",
  readMinutes: 6,
  category: "Nutrition",
  answer: {
    question: "How much fat does a dog need?",
    text: `At least ${AAFCO.adult.fatPer1000} g of fat per 1,000 kcal for an adult and ${AAFCO.growth.fatPer1000} g for a puppy, the AAFCO minimums. Most premium foods supply two to four times that. Fat isn't a problem in itself; the risk is the extra calories, so judge a food by fat per 1,000 kcal and feed to your dog's calorie needs.`,
  },
  keyTakeaways: [
    `AAFCO's minimums are ${AAFCO.adult.fatPer1000} g of fat per 1,000 kcal for adults (${AAFCO.adult.fatDM}% dry matter) and ${AAFCO.growth.fatPer1000} g for growth (${AAFCO.growth.fatDM}%).`,
    "Fat carries about 2.4 times the calories of protein or carbohydrate per gram, so it drives a food's calorie density.",
    "In the foods we checked, fat ranged from about 35 to 56 g per 1,000 kcal; in Sundays Beef it supplies 62% of the calories.",
    "59% of dogs were overweight or obese in the 2022 APOP survey. Measure portions and pick a lower-fat recipe if weight creeps up.",
  ],
  faqs: [
    {
      question: "What percentage of fat should be in dog food?",
      answer: `There's no single right number, because the label % includes water. AAFCO's minimum is ${AAFCO.adult.fatDM}% fat on a dry-matter basis for adults (${AAFCO.adult.fatPer1000} g per 1,000 kcal). Compare foods per 1,000 kcal: fat % x 10,000 / kcal per kg.`,
    },
    {
      question: "Is high-fat dog food bad for dogs?",
      answer: "Not for a healthy, active dog fed the right amount. The main risk is calories: fat is the densest nutrient, so it's easy to overfeed. Dogs with pancreatitis or some other conditions may need a vet-set fat limit.",
    },
    {
      question: "What is a low-fat dog food?",
      answer: "Compare fat per 1,000 kcal rather than the label's %, because water content varies by format. In the foods we checked, the leanest supplied about 35 g per 1,000 kcal and the richest about 56 g.",
    },
    {
      question: "Should I choose a low-fat food for my dog?",
      answer: "Only if there's a reason: weight gain, low activity, or a vet's advice for a condition such as pancreatitis. Otherwise feed a complete food at the right calories and keep treats under about 10% of the day.",
    },
  ],
  sources: [
    { label: "Beef + Barley, Turkey + Sweet Potato and Cod + Salmon UnKibble: guaranteed analysis and calories", publisher: "Spot & Tango", year: 2026, href: ST_BEEF },
    { label: "Beef, Turkey and Chicken recipes: fat, calories per cup and calories by source", publisher: "Sundays for Dogs", year: 2026, href: SUN_BEEF },
    { label: "2022 Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: APOP_2022 },
    { label: "Frequently Asked Questions and Myths (treats, feeding amounts)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_FAQ },
  ],
  relatedPaths: ["/diets/low-fat", "/diets/weight-management", "/diets/high-protein", "/how-we-rank"],
};

export function Body() {
  return (
    <>
      <H2 id="how-much">How much fat does a dog need?</H2>
      <P>
        At least {AAFCO.adult.fatPer1000} g per 1,000 kcal for adults and {AAFCO.growth.fatPer1000} g for puppies. These are AAFCO&apos;s minimums behind every &ldquo;complete and balanced&rdquo; claim; AAFCO sets a floor for fat, not a ceiling, for healthy dogs.
      </P>
      <Table
        caption="AAFCO fat minimums for dog food"
        head={["Life stage", "Per 1,000 kcal", "Dry-matter basis"]}
        rows={[
          ["Adult maintenance", `${AAFCO.adult.fatPer1000} g`, `${AAFCO.adult.fatDM}%`],
          ["Growth and reproduction (and all life stages)", `${AAFCO.growth.fatPer1000} g`, `${AAFCO.growth.fatDM}%`],
        ]}
        note="Dry-matter percentages assume 4,000 kcal per kg of dry matter. Fat also carries the essential fatty acids dogs can't make."
      />

      <H2 id="calories">Why does fat matter so much for calories?</H2>
      <P>
        Because a gram of fat carries about 8.5 kcal, against about 3.5 kcal for protein or carbohydrate, using the modified Atwater factors standard for pet food. A small change in fat moves a food&apos;s calories a lot.
      </P>
      <P>
        Sundays shows this on its own labels, listing calories per cup by source (<Ext href={SUN_BEEF}>Sundays</Ext>):
      </P>
      <Table
        caption="Where the calories come from: Sundays air-dried recipes, per cup"
        head={["Recipe", "Calories per cup", "From fat", "From protein", "From carbs"]}
        rows={SUNDAYS_SPLIT.map((s) => [
          <Ext key={s.name} href={s.href}>{s.name}</Ext>,
          `${s.total} kcal`,
          `${s.fat} kcal (${pct(s.fat, s.total)})`,
          `${s.protein} kcal (${pct(s.protein, s.total)})`,
          `${s.carb} kcal (${pct(s.carb, s.total)})`,
        ])}
        note="Brand's calculated values, read November 16, 2026. Sundays' fish recipe isn't shown: its listed parts don't add up to its total."
      />
      <P>
        The beef recipe gets 62% of its calories from fat; the chicken recipe 40%. Same brand, same format, a big difference in how energy-dense each scoop is.
      </P>

      <H2 id="per-1000">How do you compare fat between foods?</H2>
      <P>
        Convert the label to grams per 1,000 kcal: fat % x 10,000 / kcal per kg. That removes the effect of water, so fresh, dried and kibble foods compare fairly. Our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> covers the method, and <A href="/articles/how-much-protein-does-a-dog-need">protein per 1,000 kcal</A> uses the same formula.
      </P>

      <H2 id="real-foods">How much fat is in real dog foods?</H2>
      <Table
        caption="Fat per 1,000 kcal in foods we checked"
        head={["Food", "Fat (min, as fed)", "Calories", "Fat per 1,000 kcal", "x AAFCO adult minimum"]}
        rows={FOODS.map((f) => [
          <Ext key={f.name} href={f.href}>{f.name}</Ext>,
          `${f.fat}%`,
          `${fmt(f.kcalPerKg)} kcal/kg`,
          `${per1000(f.fat, f.kcalPerKg).toFixed(1)} g`,
          `${(per1000(f.fat, f.kcalPerKg) / AAFCO.adult.fatPer1000).toFixed(1)}x`,
        ])}
        note="From each brand's recipe page, November 16, 2026. Sundays kcal/kg calculated from its kcal per cup and cup weight. Guaranteed analysis is a minimum, so true fat can be higher."
      />
      <P>
        Every food clears the minimum by a wide margin. Within one brand the spread is large: Spot &amp; Tango&apos;s Beef + Barley carries {per1000(27, 4792).toFixed(0)} g per 1,000 kcal against {per1000(15, 4193).toFixed(0)} g for Cod + Salmon.
      </P>

      <ArticleBrandCard slug="spot-and-tango" />

      <H2 id="too-much">When is fat too much for a dog?</H2>
      <P>
        When it adds calories your dog doesn&apos;t burn. Overfeeding is already the norm: 59% of dogs were classified as overweight or obese in the 2022 APOP survey (<Ext href={APOP_2022}>APOP</Ext>). Rich food makes small portion errors costlier.
      </P>
      <P>
        For a 50 lb adult on about {fmt(k50)} kcal a day, a scoop just 10% too big adds about {fmt(k50 * 0.1)} kcal daily. The WSAVA notes real needs vary by up to 50% either side of formula estimates, and advises adjusting every 2 weeks at first (<Ext href={WSAVA_FAQ}>WSAVA</Ext>).
      </P>
      <Callout>
        <strong>Medical conditions are different.</strong> If your dog has had pancreatitis or has another condition affecting fat digestion, your vet will set a fat limit. Follow it, and don&apos;t switch away from a prescribed diet without your vet.
      </Callout>

      <H2 id="lower-fat">How do you lower the fat in your dog&apos;s diet?</H2>
      <List
        items={[
          <><strong>Pick a leaner recipe in the same brand.</strong> Compare fat per 1,000 kcal; poultry and fish recipes were leaner than beef in the foods above.</>,
          <><strong>Measure every meal.</strong> Use the brand&apos;s scoop or a kitchen scale; see <A key="h" href="/articles/how-much-fresh-food-to-feed-a-dog">how much to feed</A>.</>,
          <><strong>Count treats and toppers.</strong> The WSAVA says treats should stay under about 10% of daily calories (<Ext key="w" href={WSAVA_FAQ}>WSAVA</Ext>).</>,
          <><strong>Skip fatty table scraps.</strong> Fatty leftovers are the easiest way to add fat and calories without noticing.</>,
        ]}
      />
      <P>
        For weight goals, see <A href={dietPath("weight-management")}>weight management</A> and our <A href={bestForPath("senior-dog")}>senior dog guide</A>, as older dogs often need fewer calories.
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />

      <P>
        Pre-portioned fresh plans take the guesswork out of fat and calories. Compare them in our <A href="/">2026 ranking</A>.
      </P>
    </>
  );
}
