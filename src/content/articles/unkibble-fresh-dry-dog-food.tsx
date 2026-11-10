import { H2, P, Callout } from "@/components/page-shell";
import { ComparisonCard } from "@/components/comparison-card";
import { getBrand } from "@/lib/dogfood/brands";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-10).
const ST_UNKIBBLE = "https://www.spotandtango.com/unkibble";
const ST_FAQ = "https://www.spotandtango.com/faq";
const ST_BEEF = "https://www.spotandtango.com/recipes/beef-and-barley";
const ST_TURKEY = "https://www.spotandtango.com/recipes/turkey-and-sweet-potato";
const ST_COD = "https://www.spotandtango.com/recipes/cod-and-salmon";
const SUNDAYS_BEEF = "https://sundaysfordogs.com/food/beef";
const SUNDAYS_CHICKEN = "https://sundaysfordogs.com/food/chicken";
const APOP_2022 = "https://www.petobesityprevention.org/2022";

// Spot & Tango UnKibble recipe pages, read 2026-11-10. Guaranteed analysis is as-fed (protein/fat min, moisture max 6%).
interface Recipe { name: string; href: string; first3: string; protein: number; fat: number; kcalPerKg: number }
const RECIPES: Recipe[] = [
  { name: "Beef + Barley", href: ST_BEEF, first3: "Beef, barley, flax seeds", protein: 27, fat: 27, kcalPerKg: 4792 },
  { name: "Turkey + Sweet Potato", href: ST_TURKEY, first3: "Turkey, brown rice, sweet potatoes", protein: 25, fat: 20, kcalPerKg: 4367 },
  { name: "Cod + Salmon", href: ST_COD, first3: "Cod, sweet potatoes, sunflower seeds", protein: 27, fat: 15, kcalPerKg: 4193 },
];
const per1000 = (pct: number, kcalPerKg: number) => (pct * 10000) / kcalPerKg;
const gramsPerDay = (kcal: number, kcalPerKg: number) => (kcal / kcalPerKg) * 1000;

// Sundays Beef: 650 kcal per 120 g cup (brand's calculated value) -> kcal/kg.
const SUNDAYS_BEEF_KCAL_PER_KG = (650 / 120) * 1000;
// Illustrative densities for formats we don't tie to one brand.
const FRESH_KCAL_PER_KG = 1300;
const KIBBLE_KCAL_PER_KG = 3600;

const [BEEF, , COD] = RECIPES;
const k25 = kcalPerDayForLb(25);
const k50 = kcalPerDayForLb(50);

function SpotAndTangoCard() {
  const b = getBrand("spot-and-tango");
  if (!b) return null;
  return (
    <div className="my-8">
      <ComparisonCard brand={b} hideRank pageType="article" sourceFlow="article_inline" />
    </div>
  );
}

export const meta: ArticleMeta = {
  slug: "unkibble-fresh-dry-dog-food",
  title: "UnKibble Dog Food Review (2026): Is Spot & Tango's Fresh-Dry Food Good, and What Does It Cost?",
  seoTitle: "UnKibble Dog Food Review: Cost, Calories and Is It Good?",
  description:
    "Is UnKibble good for dogs? We read all three recipes: calories, fat, AAFCO status, cost, storage, puppies and allergies, and how it compares to air-dried food.",
  publishedAt: "2026-11-10",
  updatedAt: "2026-11-10",
  readMinutes: 7,
  category: "Buying guide",
  answer: {
    question: "Is UnKibble good dog food?",
    text: `For most healthy dogs, yes. All three UnKibble recipes are human-grade and labelled complete and balanced for all life stages, and plans start at about $1 a day. The catch is calorie density: at up to ${fmt(BEEF.kcalPerKg)} kcal/kg it is richer than typical kibble, so portions must be exact.`,
  },
  keyTakeaways: [
    "UnKibble is Spot & Tango's shelf-stable \"fresh-dry\" food: gently cooked, then dried. It isn't raw, and it keeps in the pantry for up to 12 months unopened.",
    `It's calorie-dense. Beef + Barley is ${fmt(BEEF.kcalPerKg)} kcal/kg with 27% fat, so a 25 lb dog needs only about ${fmt(gramsPerDay(k25, BEEF.kcalPerKg))} g a day.`,
    "All three recipes are complete and balanced for all life stages, including large-breed puppies. Cod + Salmon is grain-free and poultry-free.",
    "Plans start at $0.85 to $2.46 per meal (discounted), by dog size.",
  ],
  faqs: [
    {
      question: "Is UnKibble raw?",
      answer: "No. Spot & Tango says the ingredients are gently cooked at low temperatures and then dried, a process it calls FreshDry. It isn't a raw food.",
    },
    {
      question: "Does UnKibble need to be refrigerated?",
      answer: "No. Store it in a cool, dry pantry. Unopened bags keep for up to 12 months; once open, reseal the bag and finish it within eight weeks, according to Spot & Tango.",
    },
    {
      question: "Is UnKibble good for puppies?",
      answer: "All three recipes carry an AAFCO statement for all life stages, including growth of large-size dogs (70 lb or more as adults). Adjust portions often as a puppy grows.",
    },
    {
      question: "Is UnKibble grain-free?",
      answer: "Only Cod + Salmon. Beef + Barley contains barley and Turkey + Sweet Potato contains brown rice. None of the three lists peas or lentils.",
    },
    {
      question: "How much does UnKibble cost?",
      answer: "Spot & Tango lists plans from $0.85 per meal for small dogs, $1.59 for medium dogs and $2.46 for large dogs at the discounted price. Your exact price depends on your dog's calories.",
    },
  ],
  sources: [
    { label: "UnKibble product page (process, recipes, prices)", publisher: "Spot & Tango", year: 2026, href: ST_UNKIBBLE },
    { label: "Help Center FAQ (process, AAFCO, storage and shelf life, pricing)", publisher: "Spot & Tango", year: 2026, href: ST_FAQ },
    { label: "Beef + Barley UnKibble: guaranteed analysis, calories, AAFCO statement", publisher: "Spot & Tango", year: 2026, href: ST_BEEF },
    { label: "Turkey + Sweet Potato UnKibble: guaranteed analysis, calories, AAFCO statement", publisher: "Spot & Tango", year: 2026, href: ST_TURKEY },
    { label: "Cod + Salmon UnKibble: guaranteed analysis, calories, AAFCO statement", publisher: "Spot & Tango", year: 2026, href: ST_COD },
    { label: "Air-dried Beef recipe: guaranteed analysis and calories per cup", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_BEEF },
    { label: "Air-dried Chicken recipe: plan prices per day", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_CHICKEN },
    { label: "2022 Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: APOP_2022 },
  ],
  relatedPaths: ["/diets/fresh-dry", "/reviews/spot-and-tango", "/brands/spot-and-tango", "/diets/air-dried", "/diets/freeze-dried", "/diets/dehydrated"],
};

export function Body() {
  return (
    <>
      <H2 id="what-is-unkibble">What is UnKibble, and is it raw?</H2>
      <P>
        UnKibble is Spot &amp; Tango&apos;s dry, pantry-stable dog food made from human-grade meat, a starch, fruit and vegetables. It&apos;s cooked, not raw: the brand says ingredients are &ldquo;slow-cooked at low temperatures&rdquo; and then dried, a process it calls FreshDry (<Ext href={ST_UNKIBBLE}>Spot &amp; Tango</Ext>).
      </P>
      <P>
        You feed it by the scoop like kibble, but it skips the high-heat extrusion used for standard kibble. We file it under <A href={dietPath("fresh-dry")}>fresh-dry dog food</A>. Spot &amp; Tango doesn&apos;t publish its cooking or drying temperatures.
      </P>

      <H2 id="recipes">What&apos;s in each UnKibble recipe?</H2>
      <P>
        Three recipes, each with a named meat or fish first. All three are labelled complete and balanced for all life stages, including large-breed puppies, and contain no soy, corn or wheat (<Ext href={ST_FAQ}>Spot &amp; Tango</Ext>).
      </P>
      <Table
        caption="UnKibble recipes at a glance"
        head={["Recipe", "First ingredients", "Protein / fat (min)", "Calories"]}
        rows={RECIPES.map((r) => [
          <Ext key={r.name} href={r.href}>{r.name}</Ext>,
          r.first3,
          `${r.protein}% / ${r.fat}%`,
          `${fmt(r.kcalPerKg)} kcal/kg`,
        ])}
        note="As-fed guaranteed analysis from each recipe page; moisture 6% max. Read November 10, 2026."
      />
      <P>
        Beef + Barley is the richest, with as much fat as protein. Cod + Salmon is the leanest and the only grain-free, poultry-free option. Per 1,000 kcal, protein ranges from {`${per1000(BEEF.protein, BEEF.kcalPerKg).toFixed(0)} g to ${per1000(COD.protein, COD.kcalPerKg).toFixed(0)} g`}, comfortably above AAFCO&apos;s adult minimum of 45 g.
      </P>

      <SpotAndTangoCard />

      <H2 id="calories">Why does UnKibble&apos;s calorie density matter?</H2>
      <P>
        Because a small portion carries a lot of energy, so small scoop mistakes add up. Beef + Barley has about {(BEEF.kcalPerKg / FRESH_KCAL_PER_KG).toFixed(1)} times the calories per gram of a typical fresh food (our {fmt(FRESH_KCAL_PER_KG)} kcal/kg example).
      </P>
      <Table
        caption="Daily grams by dog weight: UnKibble vs fresh food and kibble"
        head={["Dog's weight", "Beef + Barley", "Cod + Salmon", "Fresh (example)", "Kibble (example)"]}
        rows={[10, 25, 50, 75].map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [
            `${lb} lb (${fmt(k)} kcal)`,
            `${fmt(gramsPerDay(k, BEEF.kcalPerKg))} g`,
            `${fmt(gramsPerDay(k, COD.kcalPerKg))} g`,
            `${fmt(gramsPerDay(k, FRESH_KCAL_PER_KG))} g`,
            `${fmt(gramsPerDay(k, KIBBLE_KCAL_PER_KG))} g`,
          ];
        })}
        note={`Neutered adults, 70 x kg^0.75 x 1.6. Fresh and kibble use illustrative labels (${fmt(FRESH_KCAL_PER_KG)} and ${fmt(KIBBLE_KCAL_PER_KG)} kcal/kg).`}
      />
      <P>
        Overfeeding is already common: 59% of dogs were overweight or obese in the 2022 APOP survey (<Ext href={APOP_2022}>APOP</Ext>). A heaped scoop that adds 10% to a 50 lb dog&apos;s Beef + Barley ration is about {fmt(k50 * 0.1)} extra kcal a day. Use the personalised scoop Spot &amp; Tango sends, and weigh your dog every couple of weeks at first.
      </P>

      <H2 id="cost">How much does UnKibble cost?</H2>
      <P>
        From $0.85 to $2.46 per meal at the discounted price, depending on your dog&apos;s size, with free shipping (<Ext href={ST_UNKIBBLE}>Spot &amp; Tango</Ext>). It&apos;s sold by subscription, which you can pause or reschedule online.
      </P>
      <Table
        caption="UnKibble starting prices by dog size"
        head={["Dog size", "From (discounted)", "Before discount"]}
        rows={[
          ["Small (up to 20 lb)", "$0.85 per meal", "$1.06"],
          ["Medium (21-40 lb)", "$1.59 per meal", "$1.99"],
          ["Large (40+ lb)", "$2.46 per meal", "$3.08"],
        ]}
        note="Listed on the UnKibble page, November 10, 2026. Your quote depends on your dog's calories and recipe."
      />
      <P>
        Spot &amp; Tango also says UnKibble costs &ldquo;40% less than frozen&rdquo;. That&apos;s its own comparison with its Fresh line, which its FAQ prices from $2 a day; we haven&apos;t verified it plan by plan.
      </P>

      <H2 id="is-it-good">Is UnKibble good for dogs?</H2>
      <P>
        For most healthy dogs, yes: it&apos;s a complete food made from human-grade ingredients that stores like kibble. The caveats are its richness and that its health claims rest on unpublished brand research.
      </P>
      <List
        items={[
          <><strong>Puppies:</strong> labelled for all life stages, including <A key="lp" href={bestForPath("large-breed-puppy")}>large-breed growth</A>, by formulation.</>,
          <><strong>Allergies:</strong> Cod + Salmon is grain- and poultry-free, but every recipe contains fish or fish oil. See <A key="fa" href={dietPath("food-allergies")}>food allergies</A>.</>,
          <><strong>Weight or pancreatitis:</strong> it isn&apos;t a low-fat food. Pick Cod + Salmon (15% fat) over Beef (27%), and ask your vet first after pancreatitis.</>,
          <><strong>Evidence:</strong> the &ldquo;50% more digestible than kibble&rdquo; claim cites an unpublished 2024 lab study, so we treat it as marketing.</>,
        ]}
      />
      <P>
        Storage is the big practical win: no fridge, 12 months unopened and eight weeks once open (<Ext href={ST_FAQ}>FAQ</Ext>). That&apos;s why we recommend it for <A href={bestForPath("apartment-dog")}>apartment dogs</A> and anyone short on freezer space.
      </P>

      <H2 id="comparisons">How does UnKibble compare with air-dried food, fresh food and kibble?</H2>
      <P>
        It sits between kibble and fresh food: kibble&apos;s convenience with ingredients closer to fresh. The air-dried brand Sundays, a common comparison, is higher in protein but costs more.
      </P>
      <Table
        caption="UnKibble vs air-dried, fresh frozen and kibble"
        head={["", "UnKibble (Beef)", "Air-dried (Sundays Beef)", "Fresh frozen", "Kibble"]}
        rows={[
          ["Protein per 1,000 kcal", `${per1000(BEEF.protein, BEEF.kcalPerKg).toFixed(0)} g`, `${per1000(35, SUNDAYS_BEEF_KCAL_PER_KG).toFixed(0)} g`, "Varies", "Varies"],
          ["Storage", "Pantry", "Pantry", "Freezer and fridge", "Pantry"],
          ["Starting price", "$0.85-$2.46 per meal", "$2.82-$9.15 a day (Chicken)", "S&T Fresh from $2 a day", "Lowest"],
        ]}
        note="Sundays figures from its Beef and Chicken recipe pages (kcal/kg calculated from its 650 kcal per 120 g cup). We don't rank Sundays."
      />
      <P>
        Among the brands we rank, compare <A href="/compare/the-farmers-dog-vs-spot-and-tango">The Farmer&apos;s Dog vs Spot &amp; Tango</A>, <A href="/compare/ollie-vs-spot-and-tango">Ollie vs Spot &amp; Tango</A>, or the shelf-stable options in <A href="/compare/spot-and-tango-vs-maxbone">Spot &amp; Tango vs Maxbone</A>. Mixing UnKibble with fresh food? Split by calories, as in our <A href="/articles/fresh-dog-food-topper-vs-full-meal">topper guide</A>.
      </P>

      <Callout>
        <strong>Our take:</strong> UnKibble is the strongest option we&apos;ve found for whole-food ingredients without a freezer. Choose Cod + Salmon or Turkey if fat is a concern, use the scoop exactly, and switch over 7-10 days.
      </Callout>

      <SpotAndTangoCard />

      <P>
        Read our full <A href="/reviews/spot-and-tango">Spot &amp; Tango review</A>, or see how it ranks against six other brands in our <A href="/">2026 ranking</A>. Switching from kibble? Follow our <A href="/articles/how-to-switch-dog-to-fresh-food">10-day plan</A>.
      </P>
    </>
  );
}
