import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, kcalPerDayForLb } from "@/lib/nutrition";
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
const WSAVA_FAQ = "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf";

// Spot & Tango UnKibble recipe pages, read 2026-11-10. Guaranteed analysis is as-fed (protein/fat min, fiber/moisture max).
interface Recipe { name: string; href: string; first5: string; grains: string; protein: number; fat: number; fiber: number; moisture: number; kcalPerKg: number }
const RECIPES: Recipe[] = [
  { name: "Beef + Barley", href: ST_BEEF, first5: "Beef, barley, flax seeds, safflower oil, beets", grains: "Barley", protein: 27, fat: 27, fiber: 5, moisture: 6, kcalPerKg: 4792 },
  { name: "Turkey + Sweet Potato", href: ST_TURKEY, first5: "Turkey, brown rice, sweet potatoes, flax seeds, nutrient blend", grains: "Brown rice", protein: 25, fat: 20, fiber: 3, moisture: 6, kcalPerKg: 4367 },
  { name: "Cod + Salmon", href: ST_COD, first5: "Cod, sweet potatoes, sunflower seeds, tapioca, salmon", grains: "None (grain-free)", protein: 27, fat: 15, fiber: 4, moisture: 6, kcalPerKg: 4193 },
];
const per1000 = (pct: number, kcalPerKg: number) => (pct * 10000) / kcalPerKg;
const dm = (pct: number, moisture: number) => (pct / (100 - moisture)) * 100;
const gramsPerDay = (kcal: number, kcalPerKg: number) => (kcal / kcalPerKg) * 1000;

// Sundays Beef: 650 kcal per 120 g cup (brand's calculated value) -> kcal/kg.
const SUNDAYS_BEEF_KCAL_PER_KG = (650 / 120) * 1000;
// Illustrative densities for formats we don't tie to one brand.
const FRESH_KCAL_PER_KG = 1300;
const KIBBLE_KCAL_PER_KG = 3600;

const [BEEF, TURKEY, COD] = RECIPES;
const k10 = kcalPerDayForLb(10);
const k25 = kcalPerDayForLb(25);
const k50 = kcalPerDayForLb(50);

export const meta: ArticleMeta = {
  slug: "unkibble-fresh-dry-dog-food",
  title: "UnKibble Dog Food Review (2026): Is Spot & Tango's Fresh-Dry Food Good, and What Does It Cost?",
  seoTitle: "UnKibble Dog Food Review: Cost, Calories and Is It Good?",
  description:
    "Is UnKibble good for dogs? We read all three recipes: calories, fat, AAFCO status, cost, storage, puppies and allergies, and how it compares to air-dried food.",
  publishedAt: "2026-11-10",
  updatedAt: "2026-11-10",
  readMinutes: 14,
  category: "Buying guide",
  answer: {
    question: "Is UnKibble good dog food?",
    text: `For most healthy dogs, yes. All three UnKibble recipes are human-grade and labelled complete and balanced for all life stages, and plans start at about $1 a day. The catch is calorie density: at up to ${fmt(BEEF.kcalPerKg)} kcal/kg it is richer than typical kibble, so portions must be exact.`,
  },
  keyTakeaways: [
    `UnKibble is Spot & Tango's shelf-stable "fresh-dry" food: gently cooked, then dried to 6% moisture or less. It isn't raw, and it stores in the pantry for up to 12 months unopened.`,
    `It's calorie-dense. Beef + Barley is ${fmt(BEEF.kcalPerKg)} kcal/kg with 27% fat, so a 25 lb dog needs only about ${fmt(gramsPerDay(k25, BEEF.kcalPerKg))} g a day. Small scoop errors add up fast.`,
    "All three recipes are labelled complete and balanced for all life stages, including large-breed puppies, by formulation. Cod + Salmon is grain-free and poultry-free, and none of the three lists peas or lentils.",
    "Plans start from $0.85 to $2.46 per meal on sale by dog size, versus a brand-stated $2 a day minimum for Spot & Tango's frozen Fresh plans.",
  ],
  faqs: [
    {
      question: "Is UnKibble raw?",
      answer: "No. Spot & Tango says the ingredients are gently cooked at low temperatures and then dried (the brand calls it FreshDry and describes it as freeze-dried on one page and low-temperature dehydration on another). It isn't a raw food.",
    },
    {
      question: "Does UnKibble need to be refrigerated?",
      answer: "No. Store it in a cool, dry pantry. Unopened bags keep for up to 12 months; once open, reseal the bag or use an airtight container and finish it within eight weeks, according to Spot & Tango.",
    },
    {
      question: "Is UnKibble good for puppies?",
      answer: "All three recipes carry an AAFCO statement for all life stages, including growth of large-size dogs (70 lb or more as adults), so they're labelled complete for puppies. Portions need adjusting often as a puppy grows.",
    },
    {
      question: "Is UnKibble grain-free?",
      answer: "Only Cod + Salmon. Beef + Barley contains barley and Turkey + Sweet Potato contains brown rice. None of the three recipes lists peas or lentils.",
    },
    {
      question: "How much does UnKibble cost?",
      answer: "Spot & Tango lists plans from $0.85 per meal for small dogs, $1.59 for medium dogs and $2.46 for large dogs at the discounted price ($1.06, $1.99 and $3.08 before discount). Your exact price depends on your dog's calories.",
    },
    {
      question: "Is UnKibble better than kibble?",
      answer: "It uses human-grade whole ingredients and gentler processing, and it's labelled complete for all life stages. Whether that makes a long-term health difference hasn't been shown in published research. It also costs more than most kibble.",
    },
  ],
  sources: [
    { label: "UnKibble product page (process, recipes, prices, storage)", publisher: "Spot & Tango", year: 2026, href: ST_UNKIBBLE },
    { label: "Help Center FAQ (UnKibble process, AAFCO, storage and shelf life, pricing, mixed plans)", publisher: "Spot & Tango", year: 2026, href: ST_FAQ },
    { label: "Beef + Barley UnKibble: ingredients, guaranteed analysis, calories, AAFCO statement", publisher: "Spot & Tango", year: 2026, href: ST_BEEF },
    { label: "Turkey + Sweet Potato UnKibble: ingredients, guaranteed analysis, calories, AAFCO statement", publisher: "Spot & Tango", year: 2026, href: ST_TURKEY },
    { label: "Cod + Salmon UnKibble: ingredients, guaranteed analysis, calories, AAFCO statement", publisher: "Spot & Tango", year: 2026, href: ST_COD },
    { label: "Air-dried Beef recipe: guaranteed analysis and calories per cup", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_BEEF },
    { label: "Air-dried Chicken recipe: plan prices per day", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_CHICKEN },
    { label: "2022 Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: APOP_2022 },
    { label: "Frequently Asked Questions and Myths (feeding amounts, switching foods)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_FAQ },
  ],
  relatedPaths: ["/diets/fresh-dry", "/reviews/spot-and-tango", "/brands/spot-and-tango", "/diets/air-dried", "/diets/freeze-dried", "/diets/dehydrated"],
};

export function Body() {
  return (
    <>
      <P>
        UnKibble has become one of the most searched names in dog food: we collected more than 1,600 autocomplete suggestions for UnKibble and related dry-food searches in November 2026. Most ask the same handful of things: is it good, is it raw, what does it cost, and how does it compare.
      </P>
      <P>
        We read every UnKibble recipe page and Spot &amp; Tango&apos;s help center, ran the numbers through the same formulas as our <A href="/how-we-rank">rankings</A>, and compared it with an air-dried rival. Every figure below links to where we read it.
      </P>

      <H2 id="what-is-unkibble">What is UnKibble?</H2>
      <P>
        UnKibble is Spot &amp; Tango&apos;s dry, shelf-stable dog food made from human-grade whole ingredients: meat, a starch, fruit and vegetables, plus a vitamin and mineral blend. It&apos;s fed by the scoop like kibble but marketed as &ldquo;fresh without the fridge&rdquo; (<Ext href={ST_UNKIBBLE}>Spot &amp; Tango</Ext>).
      </P>
      <P>
        &ldquo;UnKibble&rdquo; is a Spot &amp; Tango trademark, not a regulated category. We file it under <A href={dietPath("fresh-dry")}>fresh-dry dog food</A>, alongside air-dried and freeze-dried formats that also skip the high-heat extrusion used for standard kibble. Spot &amp; Tango, which we rank third overall, is the only brand we review that sells it.
      </P>

      <H2 id="raw-or-cooked">Is UnKibble raw, freeze-dried, air-dried or dehydrated?</H2>
      <P>
        It&apos;s cooked, then dried; it isn&apos;t raw. Spot &amp; Tango&apos;s UnKibble page describes its &ldquo;FreshDry&rdquo; process as &ldquo;Freeze Dried + Gently Cooked&rdquo;, with ingredients &ldquo;slow-cooked at low temperatures&rdquo; and then flash-frozen (<Ext href={ST_UNKIBBLE}>Spot &amp; Tango</Ext>).
      </P>
      <P>
        Its help center words it differently: the ingredients are combined into bite-size pieces and then gently dehydrated using &ldquo;a low-temperature drying technique&rdquo; (<Ext href={ST_FAQ}>Spot &amp; Tango FAQ</Ext>). The brand doesn&apos;t publish its cooking or drying temperatures, so we can&apos;t say exactly how it compares with air-drying.
      </P>
      <Table
        caption="How UnKibble's process compares with other dog food formats"
        head={["Format", "Raw or cooked", "Moisture", "Storage"]}
        rows={[
          [<A key="u" href={dietPath("fresh-dry")}>UnKibble (fresh-dry)</A>, "Gently cooked, then dried", "6% max (all three recipes)", "Pantry; 12 months unopened, 8 weeks open"],
          [<A key="a" href={dietPath("air-dried")}>Air-dried</A>, "Depends on brand", "Sundays Beef: 15% max", "Pantry"],
          [<A key="f" href={dietPath("freeze-dried")}>Freeze-dried raw</A>, "Usually raw", "Low", "Pantry; handle like raw meat"],
          [<A key="g" href={dietPath("gently-cooked")}>Fresh frozen</A>, "Gently cooked", "About 70%", "Freezer, then fridge"],
          ["Standard kibble", "Extruded at high heat", "About 10%", "Pantry"],
        ]}
        note="UnKibble and Sundays figures from the brands' recipe pages (read November 2026). Other rows are typical for the category; check each product's label."
      />

      <H2 id="ingredients">What&apos;s in each UnKibble recipe?</H2>
      <P>
        There are three recipes, each with a named meat or fish as the first ingredient. All three use mixed tocopherols (a vitamin E-based preservative) and a vitamin and mineral blend; Spot &amp; Tango says its recipes contain no soy, corn or wheat (<Ext href={ST_FAQ}>FAQ</Ext>).
      </P>
      <Table
        caption="UnKibble recipes: ingredients and guaranteed analysis"
        head={["Recipe", "First five ingredients", "Protein (min)", "Fat (min)", "Fiber (max)", "Calories"]}
        rows={RECIPES.map((r) => [
          <Ext key={r.name} href={r.href}>{r.name}</Ext>,
          r.first5,
          `${r.protein}%`,
          `${r.fat}%`,
          `${r.fiber}%`,
          `${fmt(r.kcalPerKg)} kcal/kg`,
        ])}
        note="As-fed guaranteed analysis from each recipe page; moisture is 6% max for all three. Read November 10, 2026."
      />
      <P>
        Beef + Barley is the outlier: its fat minimum (27%) matches its protein minimum, which is why it&apos;s also the most calorie-dense recipe. Cod + Salmon is the leanest, at 15% fat. Spot &amp; Tango pitches Beef for picky eaters, Turkey for easy digestion and Cod + Salmon for allergies and sensitive skin.
      </P>

      <H2 id="nutrition">How does UnKibble&apos;s nutrition compare on a fair basis?</H2>
      <P>
        Per 1,000 kcal, all three recipes clear AAFCO&apos;s adult protein minimum of {AAFCO.adult.proteinPer1000} g with room to spare. Comparing per 1,000 kcal removes the effect of water and calorie density, so it&apos;s the fairest way to line up a dry food against fresh or air-dried food.
      </P>
      <Table
        caption="UnKibble protein and fat per 1,000 kcal and on a dry-matter basis"
        head={["Recipe", "Protein per 1,000 kcal", "Fat per 1,000 kcal", "Protein, dry matter", "Fat, dry matter"]}
        rows={RECIPES.map((r) => [
          r.name,
          `${per1000(r.protein, r.kcalPerKg).toFixed(1)} g`,
          `${per1000(r.fat, r.kcalPerKg).toFixed(1)} g`,
          `${dm(r.protein, r.moisture).toFixed(1)}%`,
          `${dm(r.fat, r.moisture).toFixed(1)}%`,
        ])}
        note={`Calculated from guaranteed minimums and stated kcal/kg; actual levels can be higher. AAFCO minimums per 1,000 kcal: adult protein ${AAFCO.adult.proteinPer1000} g and fat ${AAFCO.adult.fatPer1000} g; growth protein ${AAFCO.growth.proteinPer1000} g and fat ${AAFCO.growth.fatPer1000} g. Dry matter uses the 6% maximum moisture.`}
      />
      <P>
        Because those are guaranteed minimums, the real numbers can only be equal or higher. For context, the air-dried Sundays Beef recipe works out to about {per1000(35, SUNDAYS_BEEF_KCAL_PER_KG).toFixed(0)} g of protein and {per1000(25, SUNDAYS_BEEF_KCAL_PER_KG).toFixed(0)} g of fat per 1,000 kcal from its own label figures (<Ext href={SUNDAYS_BEEF}>Sundays</Ext>). Our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> explains the conversions.
      </P>

      <H2 id="calories">Why does UnKibble&apos;s calorie density matter?</H2>
      <P>
        Because a small portion carries a lot of energy, and small mistakes compound. Beef + Barley has {fmt(BEEF.kcalPerKg)} kcal per kg, about {(BEEF.kcalPerKg / KIBBLE_KCAL_PER_KG).toFixed(1)} times the energy of an illustrative {fmt(KIBBLE_KCAL_PER_KG)} kcal/kg kibble and {(BEEF.kcalPerKg / FRESH_KCAL_PER_KG).toFixed(1)} times an illustrative {fmt(FRESH_KCAL_PER_KG)} kcal/kg fresh food.
      </P>
      <Table
        caption="Daily grams of UnKibble by dog weight, compared with fresh food and kibble"
        head={["Dog's weight", "Daily calories", "Beef + Barley", "Cod + Salmon", "Fresh food (example)", "Kibble (example)"]}
        rows={[10, 25, 50, 75].map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [
            `${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`,
            `${fmt(k)} kcal`,
            `${fmt(gramsPerDay(k, BEEF.kcalPerKg))} g`,
            `${fmt(gramsPerDay(k, COD.kcalPerKg))} g`,
            `${fmt(gramsPerDay(k, FRESH_KCAL_PER_KG))} g`,
            `${fmt(gramsPerDay(k, KIBBLE_KCAL_PER_KG))} g`,
          ];
        })}
        note={`Neutered adults, 70 x kg^0.75 x 1.6. Fresh and kibble columns use illustrative labels (${fmt(FRESH_KCAL_PER_KG)} and ${fmt(KIBBLE_KCAL_PER_KG)} kcal/kg). Spot & Tango sets your portion with a personalised scoop.`}
      />
      <P>
        Overfeeding is already the norm. In the 2022 survey by the Association for Pet Obesity Prevention, 59% of dogs were classified as overweight or obese, up from 56% in 2018 (<Ext href={APOP_2022}>APOP, 2022</Ext>). A heaped scoop that adds 10% to a 50 lb dog&apos;s Beef + Barley ration is about {fmt(k50 * 0.1)} extra kcal every day.
      </P>
      <Callout>
        <strong>Use the scoop, then check the dog.</strong> Spot &amp; Tango sends a scoop sized to your dog&apos;s plan, which helps. The WSAVA notes that individual dogs can need up to 50% more or less than calculated, and advises adjusting amounts every 2 weeks at first (<Ext href={WSAVA_FAQ}>WSAVA</Ext>).
      </Callout>

      <H2 id="cost">How much does UnKibble cost?</H2>
      <P>
        Spot &amp; Tango lists UnKibble plans from $0.85 per meal for small dogs to $2.46 for large dogs at its discounted price (<Ext href={ST_UNKIBBLE}>Spot &amp; Tango</Ext>). Its help center says UnKibble plans start at $1 a day and its frozen Fresh plans at $2 a day, with free shipping on all plans (<Ext href={ST_FAQ}>FAQ</Ext>).
      </P>
      <Table
        caption="UnKibble starting prices by dog size, as listed by Spot & Tango"
        head={["Dog size", "Starting price per meal (discounted)", "Before discount"]}
        rows={[
          ["Small (up to 20 lb)", "$0.85", "$1.06"],
          ["Medium (21-40 lb)", "$1.59", "$1.99"],
          ["Large (40+ lb)", "$2.46", "$3.08"],
        ]}
        note="Listed on the UnKibble page on November 10, 2026. Starting prices; your quote depends on your dog's calories and recipe. Spot & Tango also advertises a 14-day risk-free trial."
      />
      <P>
        Two brand claims are worth reading carefully. Spot &amp; Tango says UnKibble costs &ldquo;40% less than frozen&rdquo; and saves &ldquo;about $1,000/yr for a medium sized dog&rdquo;. Those are its own comparisons with its frozen Fresh line, and we haven&apos;t been able to reproduce them without a quote for each plan.
      </P>
      <P>
        For a category comparison, the air-dried brand Sundays lists its Chicken plans at $2.82 to $9.15 a day (<Ext href={SUNDAYS_CHICKEN}>Sundays</Ext>). Our <A href="/reviews/spot-and-tango">Spot &amp; Tango review</A> shows current listings, and the <A href={bestForPath("budget")}>budget guide</A> explains why price per 1,000 kcal beats price per bag.
      </P>

      <H2 id="is-it-good">Is UnKibble good for dogs?</H2>
      <P>
        For most healthy dogs, it&apos;s a well-made complete food, with two caveats: it&apos;s rich, and its health claims rest on the brand&apos;s own research. Here&apos;s how we weigh it.
      </P>
      <Table
        caption="UnKibble: strengths and limitations"
        head={["What we checked", "What we found"]}
        rows={[
          ["Complete and balanced", "Yes: all three recipes, for all life stages including large-breed growth, by formulation"],
          ["Ingredient quality", "Human-grade; named meat or fish first; no soy, corn or wheat (brand statements)"],
          ["Storage", "Pantry-stable: 12 months unopened, 8 weeks once open"],
          ["Calorie density", `High: ${fmt(COD.kcalPerKg)}-${fmt(BEEF.kcalPerKg)} kcal/kg, so portions must be exact`],
          ["Fat", "Beef + Barley is high-fat (27% min); Cod + Salmon is the leanest (15% min)"],
          ["Digestibility claim", "\"50% more digestible than store-bought kibble\" cites an unpublished 2024 third-party lab study"],
          ["Availability", "Subscription through Spot & Tango; no freezer space needed"],
        ]}
        note="Brand statements from spotandtango.com, read November 10, 2026."
      />
      <P>
        On evidence: Spot &amp; Tango cites a Q4 2024 digestibility study &ldquo;at 3rd-party research lab&rdquo; and a March 2024 customer survey of 195 people in which 87% reported improvements (<Ext href={ST_BEEF}>Spot &amp; Tango</Ext>). Neither is published, so we treat them as marketing, not proof.
      </P>
      <P>
        That doesn&apos;t make UnKibble a weak food; it puts it in the same position as most premium dog food. For the research that does exist on fresh and gently cooked diets, see <A href="/articles/fresh-vs-kibble">fresh vs kibble</A>.
      </P>

      <H2 id="puppies">Is UnKibble good for puppies?</H2>
      <P>
        Yes on paper. Each recipe&apos;s AAFCO statement says it&apos;s formulated for all life stages, &ldquo;including growth of large size dogs (70 lbs or more as an adult)&rdquo; (<Ext href={ST_BEEF}>Spot &amp; Tango</Ext>). That&apos;s the statement a <A href={bestForPath("large-breed-puppy")}>large-breed puppy</A> needs.
      </P>
      <P>
        Two cautions. The adequacy claim is by formulation, not by feeding trial; the FAQ adds that recipes are checked by analysis of the finished product. And calorie density matters more in puppies, whose portions change monthly. Our <A href="/articles/fresh-food-for-puppies">puppy feeding guide</A> covers growth calories.
      </P>

      <H2 id="allergies">Is UnKibble grain-free, and is it good for dogs with allergies?</H2>
      <P>
        Only Cod + Salmon is grain-free, and it&apos;s also poultry-free, which makes it the obvious choice to discuss with your vet for a dog with suspected chicken or turkey allergy. Beef + Barley contains barley; Turkey + Sweet Potato contains brown rice.
      </P>
      <P>
        Two details matter for allergy diets. Every recipe contains fish in some form: fish oil in Beef + Barley, salmon oil in Turkey + Sweet Potato, and cod and salmon in the third. And none lists peas, lentils or other pulses, which is relevant if you&apos;re following the <A href="/articles/grain-free-dog-food-and-dcm">grain-free and DCM</A> story.
      </P>
      <P>
        A true food allergy is diagnosed with an elimination diet under a vet, not by switching brands. See <A href={dietPath("food-allergies")}>food allergies</A> for how that works.
      </P>

      <H2 id="weight-pancreatitis">Is UnKibble good for weight loss or dogs with pancreatitis?</H2>
      <P>
        It can work for weight loss if portions are strict, but it isn&apos;t a low-fat food. Beef + Barley carries at least {per1000(BEEF.fat, BEEF.kcalPerKg).toFixed(0)} g of fat per 1,000 kcal; Cod + Salmon about {per1000(COD.fat, COD.kcalPerKg).toFixed(0)} g.
      </P>
      <P>
        If your dog has had pancreatitis, ask your vet about fat levels before trying any new food, UnKibble included; Beef + Barley is the highest-fat recipe. None of the brands we review sells a prescription diet. For weight loss generally, see <A href={dietPath("weight-loss")}>weight loss</A>.
      </P>

      <H2 id="storage">Does UnKibble need to be refrigerated, and does it expire?</H2>
      <P>
        No refrigeration is needed. Spot &amp; Tango says to store UnKibble in a cool, dry place such as a pantry, reseal the bag or use an airtight container once open, and use it within eight weeks of opening (<Ext href={ST_FAQ}>FAQ</Ext>).
      </P>
      <List
        items={[
          "Unopened bags: up to 12 months, according to the brand.",
          "Opened bags: within eight weeks, resealed or in an airtight container.",
          "Preservation: drying plus mixed tocopherols, a vitamin E-based natural preservative.",
          "Not sure of the date? The brand says it can look up the batch from a photo of the back of the bag.",
        ]}
      />
      <P>
        That pantry life is UnKibble&apos;s biggest practical advantage over frozen fresh food, which Spot &amp; Tango says lasts up to 6 months frozen and 4 days once in the fridge. It&apos;s why we list it for <A href={bestForPath("apartment-dog")}>apartment dogs</A> and owners short on freezer space.
      </P>

      <H2 id="comparisons">How does UnKibble compare with fresh food, air-dried food and kibble?</H2>
      <P>
        UnKibble sits between kibble and fresh food: kibble&apos;s convenience and storage, with ingredients and processing closer to fresh. Against air-dried food it&apos;s similar in convenience but lower in protein in the recipes we compared.
      </P>
      <Table
        caption="UnKibble vs fresh frozen, air-dried and kibble"
        head={["", "UnKibble (Beef + Barley)", "Air-dried (Sundays Beef)", "Fresh frozen", "Standard kibble"]}
        rows={[
          ["Calories", `${fmt(BEEF.kcalPerKg)} kcal/kg`, `About ${fmt(SUNDAYS_BEEF_KCAL_PER_KG)} kcal/kg`, `About ${fmt(FRESH_KCAL_PER_KG)} kcal/kg (example)`, `About ${fmt(KIBBLE_KCAL_PER_KG)} kcal/kg (example)`],
          ["Protein per 1,000 kcal", `${per1000(BEEF.protein, BEEF.kcalPerKg).toFixed(0)} g`, `${per1000(35, SUNDAYS_BEEF_KCAL_PER_KG).toFixed(0)} g`, "Varies by recipe", "Varies by recipe"],
          ["Storage", "Pantry", "Pantry", "Freezer and fridge", "Pantry"],
          ["Fed by", "Personalised scoop", "Cup", "Pre-portioned packs", "Cup"],
          ["Starting price", "$0.85-$2.46 per meal (discounted)", "$2.82-$9.15 a day (Chicken)", "Spot & Tango Fresh from $2 a day", "Lowest"],
        ]}
        note="UnKibble and Sundays figures from the brands' pages (Sundays kcal/kg calculated from its 650 kcal per 120 g cup). Fresh and kibble calories are illustrative examples, not specific brands."
      />
      <P>
        Sundays isn&apos;t one of the seven brands we rank, so we don&apos;t score it; it&apos;s here because &ldquo;UnKibble vs Sundays&rdquo; is one of the most common comparisons people search. Within our ranked brands, compare <A href="/compare/the-farmers-dog-vs-spot-and-tango">The Farmer&apos;s Dog vs Spot &amp; Tango</A> or <A href="/compare/ollie-vs-spot-and-tango">Ollie vs Spot &amp; Tango</A>.
      </P>

      <H2 id="where-to-buy">Where can you buy UnKibble?</H2>
      <P>
        Mainly through Spot &amp; Tango&apos;s own subscription, delivered on a schedule from one week to two months of food, with free shipping (<Ext href={ST_UNKIBBLE}>Spot &amp; Tango</Ext>). You can pause or reschedule online. The brand also runs a separate Canadian site.
      </P>
      <P>
        You can&apos;t yet pick UnKibble and Fresh in one dog&apos;s plan, but the FAQ says the team will build a bespoke mixed plan on request, for example 70% Fresh with a 30% UnKibble topper (<Ext href={ST_FAQ}>FAQ</Ext>). If you mix, split by calories: our <A href="/articles/fresh-dog-food-topper-vs-full-meal">topper vs full fresh guide</A> shows how.
      </P>

      <H2 id="reviews">What do UnKibble customers say?</H2>
      <P>
        Mostly that picky dogs eat it. Spot &amp; Tango holds a 4.6 rating from 2,878 Trustpilot reviews in our November 4, 2026 check. Of the 60 recent reviews we stored, five mention UnKibble by name, and all five are 5-star.
      </P>
      <P>
        Two themes repeat: dogs that ignored kibble eating it readily, and one owner noticing their dog picked the UnKibble out of a kibble mix first. One reviewer crushes it and adds warm water. Five reviews is a small sample, so read them as colour, not data; the full set is on our <A href="/reviews/spot-and-tango">Spot &amp; Tango review</A>.
      </P>

      <H2 id="switching">How do you switch a dog to UnKibble?</H2>
      <P>
        Gradually, over 7 to 10 days, which is what Spot &amp; Tango recommends. Hold at the current step if stools loosen, and move on once they&apos;re normal (<Ext href={ST_FAQ}>FAQ</Ext>).
      </P>
      <P>
        Because UnKibble is denser than most kibble, swap by calories rather than cups during the transition. On day one at 25%, a 25 lb dog needs only about {fmt(gramsPerDay(k25 * 0.25, TURKEY.kcalPerKg))} g of Turkey + Sweet Potato. Our <A href="/articles/how-to-switch-dog-to-fresh-food">10-day switching plan</A> has the full schedule.
      </P>

      <H2 id="alternatives">What are the alternatives to UnKibble?</H2>
      <P>
        If you want a pantry-stable food without kibble-style extrusion, the closest options among the brands we review are freeze-dried and air-dried lines. Each trades something different.
      </P>
      <Table
        caption="Shelf-stable alternatives to UnKibble among the brands we review"
        head={["Brand", "Format", "Trade-off vs UnKibble", "Compare"]}
        rows={[
          [<A key="m" href="/reviews/maxbone">Maxbone</A>, "Freeze-dried", "No subscription; check whether the recipe is raw", <A key="mc" href="/compare/spot-and-tango-vs-maxbone">Spot &amp; Tango vs Maxbone</A>],
          [<A key="p" href="/reviews/the-pets-table">The Pets Table</A>, "Air-dried, plus fresh and topper plans", "More plan types; shorter public formulation record", <A key="pc" href="/compare/spot-and-tango-vs-the-pets-table">Spot &amp; Tango vs The Pets Table</A>],
          [<A key="r" href="/reviews/redbarn">Redbarn</A>, "Air-dried and rolls", "Wide retail availability", <A key="rc" href="/compare/spot-and-tango-vs-redbarn">Spot &amp; Tango vs Redbarn</A>],
          [<A key="w" href="/reviews/we-feed-raw">We Feed Raw</A>, "Raw frozen and freeze-dried", "Raw: different safety profile", <A key="wc" href="/compare/spot-and-tango-vs-we-feed-raw">Spot &amp; Tango vs We Feed Raw</A>],
        ]}
      />
      <Callout>
        <strong>Our take:</strong> UnKibble is the strongest option we&apos;ve found for owners who want whole-food ingredients without a freezer. Choose Cod + Salmon or Turkey if fat is a concern, use the scoop exactly, and weigh your dog every two weeks for the first two months.
      </Callout>
      <P>
        Ready to compare plans? Start with our full <A href="/reviews/spot-and-tango">Spot &amp; Tango review</A>, the <A href="/brands/spot-and-tango">brand data page</A>, or our <A href="/">2026 ranking</A> of all seven brands.
      </P>
    </>
  );
}
