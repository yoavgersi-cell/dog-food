import { H2, P, Callout } from "@/components/page-shell";
import { ComparisonCard } from "@/components/comparison-card";
import { getBrand } from "@/lib/dogfood/brands";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-11).
const CDC_PAGE = "https://www.cdc.gov/healthy-pets/about/pet-food-safety.html";
const CDC_PDF = "https://www.cdc.gov/healthy-pets/media/pdfs/raw-pet-food-p.pdf";
const FDA_RAW = "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet";
const THAI_2020 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC7566254/";
const ST_BEEF = "https://www.spotandtango.com/recipes/beef-and-barley";
const ST_FAQ = "https://www.spotandtango.com/faq";
const SUNDAYS_BEEF = "https://sundaysfordogs.com/food/beef";

// Label figures read 2026-11-11.
const UNKIBBLE_KCAL_PER_KG = 4792; // Spot & Tango Beef + Barley UnKibble, moisture 6% max
const SUNDAYS_KCAL_PER_KG = (650 / 120) * 1000; // Sundays Beef: 650 kcal per 120 g cup (brand's calculated value), moisture 15% max
const FRESH_KCAL_PER_KG = 1300; // illustrative fresh-frozen label
const grams = (kcal: number, kcalPerKg: number) => (kcal / kcalPerKg) * 1000;
const pct = (n: number, d: number) => `${((n / d) * 100).toFixed(1)}%`;

function BrandCard({ slug }: { slug: string }) {
  const b = getBrand(slug);
  if (!b) return null;
  return (
    <div className="my-8">
      <ComparisonCard brand={b} hideRank pageType="article" sourceFlow="article_inline" />
    </div>
  );
}

export const meta: ArticleMeta = {
  slug: "freeze-dried-vs-air-dried-vs-fresh-frozen-dog-food",
  title: "Freeze-Dried vs Air-Dried vs Fresh-Frozen Dog Food: What's the Difference? (2026)",
  seoTitle: "Freeze-Dried vs Air-Dried vs Fresh-Frozen Dog Food",
  description:
    "Freeze-dried, air-dried or fresh-frozen dog food? How each is made, which can be raw, calories per scoop, storage, and what the CDC and FDA say about safety.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  readMinutes: 6,
  category: "Nutrition",
  answer: {
    question: "What's the difference between freeze-dried, air-dried and fresh-frozen dog food?",
    text: "How the water is handled. Freeze-dried food is frozen, then dried in a vacuum; air-dried food is dried with warm air; fresh-frozen food keeps its water and is frozen. None of these steps makes raw meat safe on its own, so check the label for \"raw\" or a cooking step.",
  },
  keyTakeaways: [
    "The drying method doesn't tell you if food is raw. The CDC says freeze-drying, dehydrating or freezing raw protein \"only reduces the amount of germs\".",
    "In the FDA's 2010-2012 testing, 7.7% of raw pet food samples had Salmonella and 16.3% had Listeria; none of the 120 dry dog food samples did.",
    `Dried foods are calorie-dense: a 25 lb dog needs about ${fmt(grams(kcalPerDayForLb(25), UNKIBBLE_KCAL_PER_KG))} g a day of one dried food we checked, versus about ${fmt(grams(kcalPerDayForLb(25), FRESH_KCAL_PER_KG))} g of a typical fresh food.`,
    "Dried formats win on storage; fresh-frozen wins on pre-portioned packs. For a home with young children or anyone immunocompromised, pick a cooked version of either.",
  ],
  faqs: [
    {
      question: "Is freeze-dried dog food raw?",
      answer: "Often, but not always. Freeze-drying removes water; it doesn't cook the food. Many freeze-dried products are raw, while some brands cook ingredients before drying. Look for the word \"raw\" on the label, as the CDC advises.",
    },
    {
      question: "Is air-dried dog food safer than freeze-dried?",
      answer: "Not automatically. The CDC lists both freeze-dried and dehydrated (warm-air dried) foods as forms of raw pet food when the protein isn't cooked. What matters is whether the maker uses a cooking or other kill step, not the drying method.",
    },
    {
      question: "Is freeze-dried dog food better than fresh-frozen?",
      answer: "It's easier to store and travel with, but not better nutritionally by default. Both can be complete and balanced. Fresh-frozen plans are usually pre-portioned to your dog's calories, which makes accurate feeding easier.",
    },
    {
      question: "Do you need to add water to freeze-dried dog food?",
      answer: "Many freeze-dried meals are meant to be rehydrated before serving, so follow the pack. Rehydrating doesn't change the calories, only the weight and texture.",
    },
  ],
  sources: [
    { label: "About Pet Food Safety (raw pet food forms; freezing and drying only reduce germs), accessed November 2026", publisher: "Centers for Disease Control and Prevention", year: 2026, href: CDC_PAGE },
    { label: "Raw Pet Food fact sheet, accessed November 2026", publisher: "Centers for Disease Control and Prevention", year: 2026, href: CDC_PDF },
    { label: "Get the Facts! Raw Pet Food Diets can be Dangerous to You and Your Pet (CVM study 2010-2012)", publisher: "U.S. Food and Drug Administration", year: 2018, href: FDA_RAW },
    { label: "Contamination factors associated with surviving bacteria in Thai commercial raw pet foods. Vet World 2020;13(9):1988-1991", publisher: "Veterinary World (via PMC)", year: 2020, href: THAI_2020 },
    { label: "Beef + Barley UnKibble: moisture and calories", publisher: "Spot & Tango", year: 2026, href: ST_BEEF },
    { label: "Help Center FAQ (UnKibble process and shelf life)", publisher: "Spot & Tango", year: 2026, href: ST_FAQ },
    { label: "Air-dried Beef recipe: moisture, calories per cup, kill-step statement", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_BEEF },
  ],
  relatedPaths: ["/diets/freeze-dried", "/diets/air-dried", "/diets/frozen", "/diets/dehydrated", "/diets/fresh-dry"],
};

export function Body() {
  const k25 = kcalPerDayForLb(25);
  const k50 = kcalPerDayForLb(50);
  return (
    <>
      <H2 id="difference">What&apos;s the difference between freeze-dried, air-dried and fresh-frozen dog food?</H2>
      <P>
        How the water is handled. The CDC defines freeze-dried food as &ldquo;frozen and then dried in a vacuum&rdquo; and dehydrated food as &ldquo;dried using warm air&rdquo; (<Ext href={CDC_PDF}>CDC</Ext>). Fresh-frozen food keeps its water and is simply frozen.
      </P>
      <Table
        caption="Freeze-dried vs air-dried vs fresh-frozen dog food at a glance"
        head={["", "Freeze-dried", "Air-dried", "Fresh-frozen"]}
        rows={[
          ["How water is removed", "Frozen, then dried in a vacuum", "Dried with warm air", "Not removed; frozen"],
          ["Water left", "Low (6% max in one cooked product we checked)", "Higher (15% max in one we checked)", "About 70%"],
          ["Raw or cooked?", "Either; check the label", "Either; check the label", "Usually gently cooked; raw versions exist"],
          ["Storage", "Pantry", "Pantry", "Freezer, then fridge"],
          ["Serving", "Scoop; often rehydrated", "Scoop", "Pre-portioned packs"],
        ]}
        note="Moisture examples: Spot & Tango UnKibble Beef + Barley (6% max) and Sundays Beef (15% max), from their recipe pages, read November 11, 2026."
      />
      <P>
        Our hubs on <A href={dietPath("freeze-dried")}>freeze-dried</A>, <A href={dietPath("air-dried")}>air-dried</A> and <A href={dietPath("frozen")}>frozen</A> dog food list the brands in each format.
      </P>

      <H2 id="raw">Is freeze-dried or air-dried dog food raw?</H2>
      <P>
        It can be, and the drying method won&apos;t tell you. The CDC says freeze-drying, dehydrating or freezing raw animal protein &ldquo;only reduces the amount of germs&rdquo; and doesn&apos;t kill them all; it advises looking for the word &ldquo;raw&rdquo; on the package (<Ext href={CDC_PAGE}>CDC</Ext>).
      </P>
      <P>
        Some brands add a heat step. Spot &amp; Tango says it gently cooks its UnKibble ingredients before a low-temperature drying process (<Ext href={ST_FAQ}>Spot &amp; Tango</Ext>). Sundays says its air-drying &ldquo;includes a kill step that eliminates pathogens&rdquo; (<Ext href={SUNDAYS_BEEF}>Sundays</Ext>). Those are brand statements; ask any brand how its kill step is validated.
      </P>
      <Callout>
        <strong>Rule of thumb:</strong> &ldquo;Freeze-dried&rdquo; and &ldquo;air-dried&rdquo; describe drying, not cooking. If the pack says raw, or doesn&apos;t say cooked, handle it like raw meat.
      </Callout>

      <H2 id="safety">How risky is raw dried or frozen dog food?</H2>
      <P>
        Raw pet food tested far worse than cooked food in the FDA&apos;s largest study. From 2010 to 2012, the FDA screened over 1,000 pet food samples; the raw products were mostly frozen ground meat (<Ext href={FDA_RAW}>FDA</Ext>).
      </P>
      <Table
        caption="FDA testing of pet food for Salmonella and Listeria, 2010-2012"
        head={["Type of food", "Samples", "Salmonella", "Listeria monocytogenes"]}
        rows={[
          ["Raw pet food", "196", `15 (${pct(15, 196)})`, `32 (${pct(32, 196)})`],
          ["Jerky-type treats", "190", "0", "0"],
          ["Dry dog food", "120", "0", "0"],
          ["Semi-moist dog food", "120", "0", "0"],
        ]}
        note="FDA Center for Veterinary Medicine study, as reported on its raw pet food fact page. Freeze-dried and air-dried foods weren't reported as separate groups."
      />
      <P>
        For freeze-dried raw specifically, the evidence is thin. A 2020 study of 17 raw products in Thailand found freeze-dried samples had lower total bacteria than frozen ones, but it tested only two freeze-dried products and concluded drying &ldquo;may reduce, but not eradicate&rdquo; contamination (<Ext href={THAI_2020}>Veterinary World, 2020</Ext>). Our <A href="/articles/is-raw-dog-food-safe">raw food safety guide</A> covers handling.
      </P>

      <BrandCard slug="spot-and-tango" />

      <H2 id="calories">Which format has the most calories per scoop?</H2>
      <P>
        Dried food, by a wide margin, because removing water concentrates the calories. That means smaller portions and less room for error.
      </P>
      <Table
        caption="Daily amount by format for a 25 lb and 50 lb dog"
        head={["Food", "Calories", "25 lb dog", "50 lb dog"]}
        rows={[
          ["Spot & Tango UnKibble Beef (cooked, dried)", `${fmt(UNKIBBLE_KCAL_PER_KG)} kcal/kg`, `${fmt(grams(k25, UNKIBBLE_KCAL_PER_KG))} g`, `${fmt(grams(k50, UNKIBBLE_KCAL_PER_KG))} g`],
          ["Sundays Beef (air-dried)", `About ${fmt(SUNDAYS_KCAL_PER_KG)} kcal/kg`, `${fmt(grams(k25, SUNDAYS_KCAL_PER_KG))} g`, `${fmt(grams(k50, SUNDAYS_KCAL_PER_KG))} g`],
          ["Fresh-frozen (example)", `${fmt(FRESH_KCAL_PER_KG)} kcal/kg`, `${fmt(grams(k25, FRESH_KCAL_PER_KG))} g`, `${fmt(grams(k50, FRESH_KCAL_PER_KG))} g`],
        ]}
        note={`Neutered adults: ${fmt(k25)} kcal (25 lb) and ${fmt(k50)} kcal (50 lb) a day, from 70 x kg^0.75 x 1.6. Sundays kcal/kg calculated from its 650 kcal per 120 g cup. Fresh-frozen uses an illustrative label.`}
      />
      <P>
        Rehydrating freeze-dried food adds weight, not calories, so portion from the dry amount. See <A href="/articles/how-much-fresh-food-to-feed-a-dog">how much to feed</A> for other life stages.
      </P>

      <H2 id="storage">How should you store each type?</H2>
      <List
        items={[
          <><strong>Dried (cooked):</strong> pantry. Spot &amp; Tango, for example, says 12 months unopened and eight weeks once open (<Ext key="f" href={ST_FAQ}>FAQ</Ext>).</>,
          <><strong>Dried (raw):</strong> pantry, but handle like raw meat. Wash hands, bowls and surfaces after every meal.</>,
          <><strong>Fresh-frozen:</strong> keep frozen, thaw in the fridge, and refrigerate or discard leftovers, as the CDC advises for frozen raw too (<Ext key="c" href={CDC_PDF}>CDC</Ext>).</>,
        ]}
      />

      <H2 id="choose">Which should you choose for your dog?</H2>
      <P>
        Choose by storage, safety and how precisely you want to portion; all three can be complete and balanced. Here&apos;s how we&apos;d call it.
      </P>
      <Table
        caption="Choosing between freeze-dried, air-dried and fresh-frozen dog food"
        head={["Your situation", "Best fit"]}
        rows={[
          [<A key="a" href={bestForPath("apartment-dog")}>No freezer space or small kitchen</A>, "Cooked dried food (fresh-dry or cooked air-dried)"],
          ["Travel or camping", "Dried food; no cold chain needed"],
          [<A key="w" href={dietPath("weight-management")}>Needs tight portion control</A>, "Fresh-frozen, pre-portioned packs"],
          [<A key="p" href={bestForPath("picky-eater")}>Picky eater</A>, "Fresh-frozen, or dried as a topper"],
          ["Young children, elderly or immunocompromised people at home", "Cooked only; the CDC doesn't recommend raw pet food"],
        ]}
      />
      <P>
        Among the brands we review, <A href="/reviews/maxbone">Maxbone</A> sells freeze-dried food, <A href="/reviews/redbarn">Redbarn</A> and <A href="/reviews/the-pets-table">The Pets Table</A> sell air-dried lines, and <A href="/reviews/we-feed-raw">We Feed Raw</A> sells raw frozen and freeze-dried. For cooked dried food, see our <A href="/articles/unkibble-fresh-dry-dog-food">UnKibble review</A>; for fresh-frozen, start with the brand below.
      </P>

      <BrandCard slug="the-farmers-dog" />

      <P>
        Comparing two brands across formats? Try <A href="/compare/spot-and-tango-vs-maxbone">Spot &amp; Tango vs Maxbone</A> or <A href="/compare/the-farmers-dog-vs-we-feed-raw">The Farmer&apos;s Dog vs We Feed Raw</A>, or see all seven in our <A href="/">2026 ranking</A>.
      </P>
    </>
  );
}
