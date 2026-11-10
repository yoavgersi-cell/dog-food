import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read during the 2026-11-10 run).
const WSAVA_SELECT = "https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf";
const WSAVA_FAQ = "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf";
const AAHA = "https://www.aaha.org/wp-content/uploads/globalassets/05-pet-health-resources/nutritionalresources/petparent/aaha-tips-and-timelines.pdf";
const TANPRASERTSUK_2021 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC8279163/";

// Illustrative calorie densities (not specific brands); use the figures on your own labels.
const KIBBLE_KCAL_PER_KG = 3600;
const FRESH_KCAL_PER_KG = 1300;
const grams = (kcal: number, kcalPerKg: number) => (kcal / kcalPerKg) * 1000;

const k25 = kcalPerDayForLb(25);
const WEIGHTS = [10, 25, 50, 75, 100];
const SPLITS: { share: number; name: string; what: string }[] = [
  { share: 0.1, name: "Garnish", what: "A spoonful for taste; fits inside the treat allowance" },
  { share: 0.25, name: "Topper", what: "The most common split; kibble still does most of the work" },
  { share: 0.5, name: "Half and half", what: "A true mixed diet; both foods should be complete" },
  { share: 1, name: "Full fresh", what: "Fresh food is the whole diet; must be complete for the life stage" },
];

export const meta: ArticleMeta = {
  slug: "fresh-dog-food-topper-vs-full-meal",
  title: "Fresh Food Topper vs Full Fresh Meals: How to Split Your Dog's Calories (2026)",
  seoTitle: "Fresh Topper vs Full Fresh Meals: How to Split Calories",
  description:
    "How to split your dog's calories between fresh food and kibble: 10%, 25%, 50% or full fresh, with grams by weight, the 10% rule and how to avoid weight gain.",
  publishedAt: "2026-11-10",
  updatedAt: "2026-11-10",
  readMinutes: 9,
  category: "Feeding",
  answer: {
    question: "How much fresh food should you add as a topper?",
    text: "Start with about 25% of your dog's daily calories as fresh food and cut the kibble by the same number of calories. If the fresh food isn't labelled complete and balanced, keep it to 10% or less. Weigh your dog every two weeks and adjust.",
  },
  keyTakeaways: [
    `Split by calories, not scoops. For a 25 lb neutered adult on about ${fmt(k25)} kcal a day, a 25% topper is about ${fmt(k25 * 0.25)} kcal: roughly ${fmt(grams(k25 * 0.25, FRESH_KCAL_PER_KG))} g of fresh food, with ${fmt(grams(k25 * 0.25, KIBBLE_KCAL_PER_KG))} g less kibble (illustrative labels).`,
    "The label decides the ceiling. The WSAVA says foods for intermittent or complementary feeding should be 10% of the diet or less; above that, both foods should be complete and balanced.",
    `Adding a topper without cutting the kibble is how dogs gain weight: a 25% topper on top of a full bowl adds about ${fmt(k25 * 0.25)} kcal a day for a 25 lb dog.`,
    "Studies have compared full fresh diets with kibble, not toppers. We found no published trial of a fresh topper, so the benefits of a partial split are an informed guess, not a measured result.",
  ],
  faqs: [
    {
      question: "Is a fresh dog food topper worth it?",
      answer: "For picky eaters and owners who want some fresh food on a budget, usually yes. A 25% topper costs about a quarter of a full fresh plan for the same dog. The digestibility gains seen in studies were measured on full fresh diets, not toppers.",
    },
    {
      question: "How much fresh food do I add to kibble?",
      answer: `Decide the share of daily calories first, usually 25%. For a 25 lb adult on about ${fmt(k25)} kcal, that's about ${fmt(k25 * 0.25)} kcal of fresh food. Then reduce the kibble by the same number of calories, using the kcal figures on both labels.`,
    },
    {
      question: "Can I feed half fresh food and half kibble?",
      answer: "Yes, as long as both foods are complete and balanced for your dog's life stage and the total calories stay the same. Split the day's calories in two, not the cups, because fresh food has far fewer calories per cup.",
    },
    {
      question: "Do fresh dog food toppers make dogs gain weight?",
      answer: "Only if they're added on top of a full portion. A topper replaces calories; it doesn't add to them. Cut the base food by the topper's calories and check your dog's weight and body condition every two weeks at first.",
    },
    {
      question: "Can I use a fresh topper with a prescription diet?",
      answer: "Not without your vet's agreement. Adding another food dilutes the therapeutic diet, and none of the brands we review sells a prescription diet. Ask your vet whether any topper fits the plan.",
    },
  ],
  sources: [
    { label: "Selecting the best food for your pet (updated 2021)", publisher: "World Small Animal Veterinary Association", year: 2021, href: WSAVA_SELECT },
    { label: "Frequently Asked Questions and Myths (treats, feeding amounts, switching)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_FAQ },
    { label: "Tips and Timelines for Transitioning Your Pet to a New Food", publisher: "American Animal Hospital Association", year: 2021, href: AAHA },
    { label: "Tanprasertsuk J, et al. Apparent total tract nutrient digestibility and metabolizable energy estimation in commercial fresh and extruded dry kibble dog foods. Transl Anim Sci 2021;5(3):txab071", publisher: "Translational Animal Science (via PMC)", year: 2021, href: TANPRASERTSUK_2021 },
  ],
  relatedPaths: ["/diets/fresh-topper", "/diets/mixed-feeding", "/diets/fresh", "/diets/weight-management"],
};

export function Body() {
  return (
    <>
      <H2 id="difference">What&apos;s the difference between a fresh topper and a full fresh meal?</H2>
      <P>
        The share of your dog&apos;s daily calories that comes from fresh food. A topper supplies a slice of the day&apos;s energy and the base food supplies the rest; a full fresh diet supplies all of it.
      </P>
      <P>
        There&apos;s no official cut-off between &ldquo;topper&rdquo; and &ldquo;mixed&rdquo;, so we use four practical splits. What changes between them is cost, how much the label matters and how much of the fresh-food effect your dog is likely to get.
      </P>
      <Table
        caption="Four ways to split a dog's calories between fresh food and kibble"
        head={["Split", "Fresh share of calories", "What it means"]}
        rows={SPLITS.map((s) => [s.name, `${s.share * 100}%`, s.what])}
        note="Shares are of total daily calories. Cost of the fresh part scales with the share: a 25% topper costs about a quarter of a full fresh plan for the same dog, plus the kibble."
      />

      <H2 id="how-to-split">How do you split calories between fresh food and kibble?</H2>
      <P>
        Work out your dog&apos;s daily calories, take your chosen share as fresh food, and give the rest as kibble. Then convert each part to grams with its own label&apos;s calorie figure.
      </P>
      <List
        ordered
        items={[
          <>Estimate daily calories: 70 x (weight in kg to the power 0.75), times 1.6 for a typical neutered adult. A 25 lb (11.3 kg) dog comes to about {fmt(k25)} kcal. Our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A> covers other life stages.</>,
          <>Pick the fresh share: 10%, 25%, 50% or 100%. At 25%, that&apos;s {fmt(k25 * 0.25)} kcal of fresh food and {fmt(k25 * 0.75)} kcal of kibble.</>,
          <>Convert to grams: kcal divided by the label&apos;s kcal per kg, times 1,000. At {fmt(FRESH_KCAL_PER_KG)} kcal/kg, {fmt(k25 * 0.25)} kcal of fresh food is about {fmt(grams(k25 * 0.25, FRESH_KCAL_PER_KG))} g.</>,
          <>Cut the kibble by the same calories. At {fmt(KIBBLE_KCAL_PER_KG)} kcal/kg, the remaining {fmt(k25 * 0.75)} kcal is about {fmt(grams(k25 * 0.75, KIBBLE_KCAL_PER_KG))} g, down from {fmt(grams(k25, KIBBLE_KCAL_PER_KG))} g.</>,
        ]}
      />
      <P>
        The WSAVA describes the same method for any food: divide the energy need by the food&apos;s calorie density (<Ext href={WSAVA_FAQ}>WSAVA</Ext>). The only change for a split is doing it twice, once per food.
      </P>
      <Table
        caption="A 25% fresh topper by body weight: calories and grams"
        head={["Dog's weight", "Daily calories", "Fresh food (25%)", "Kibble (75%)"]}
        rows={WEIGHTS.map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [
            `${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`,
            `${fmt(k)} kcal`,
            `${fmt(k * 0.25)} kcal = ${fmt(grams(k * 0.25, FRESH_KCAL_PER_KG))} g`,
            `${fmt(k * 0.75)} kcal = ${fmt(grams(k * 0.75, KIBBLE_KCAL_PER_KG))} g`,
          ];
        })}
        note={`Neutered adults, 70 x kg^0.75 x 1.6. Grams use illustrative labels: fresh food at ${fmt(FRESH_KCAL_PER_KG)} kcal/kg and kibble at ${fmt(KIBBLE_KCAL_PER_KG)} kcal/kg. Swap in the numbers printed on your own bag and packs.`}
      />

      <H2 id="cups">Why can&apos;t you just swap a scoop of kibble for a scoop of fresh food?</H2>
      <P>
        Because fresh food is mostly water, so the same volume carries far fewer calories. With our example labels, a gram of kibble has about {(KIBBLE_KCAL_PER_KG / FRESH_KCAL_PER_KG).toFixed(1)} times the calories of a gram of fresh food.
      </P>
      <P>
        Replace a scoop of kibble with a scoop of fresh food and the bowl looks just as full but holds fewer calories, so your dog ends up underfed. By weight, 100 g of fresh food stands in for only about {fmt(100 * FRESH_KCAL_PER_KG / KIBBLE_KCAL_PER_KG)} g of kibble. Our <A href="/articles/fresh-vs-kibble">fresh vs kibble guide</A> explains the water difference.
      </P>

      <H2 id="ten-percent">When does the 10% rule apply to a topper?</H2>
      <P>
        When the topper isn&apos;t complete and balanced. The WSAVA says foods labelled for &ldquo;short-term&rdquo;, &ldquo;intermittent&rdquo; or &ldquo;complementary&rdquo; feeding should be &ldquo;a small portion of the diet (10% or less)&rdquo; (<Ext href={WSAVA_SELECT}>WSAVA, 2021</Ext>).
      </P>
      <P>
        In the US, that&apos;s the AAFCO statement reading &ldquo;for intermittent or supplemental feeding only&rdquo;. Many topper-only products, broths and mix-ins carry it. Our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> shows where to find the statement.
      </P>
      <P>
        The reason is dilution. A complete kibble is formulated to deliver its vitamins and minerals at the calories it was designed to be fed at. Replace part of those calories with an incomplete food and the base delivers proportionally less.
      </P>
      <Table
        caption="How an incomplete topper dilutes a complete base food"
        head={["Incomplete topper share", "Complete food's share of calories", "Its vitamins and minerals delivered, vs feeding it alone"]}
        rows={[0.1, 0.25, 0.5].map((s) => [`${s * 100}%`, `${(1 - s) * 100}%`, `About ${(1 - s) * 100}%`])}
        note="Simplified illustration: assumes the topper adds no meaningful vitamins or minerals and total calories stay the same. A complete and balanced topper doesn't dilute the diet in this way."
      />
      <Callout>
        <strong>The rule of thumb:</strong> if the fresh food says &ldquo;complete and balanced&rdquo; for your dog&apos;s life stage, any split works as long as total calories are right. If it doesn&apos;t, keep it at 10% or less and count it with treats.
      </Callout>
      <P>
        Treats share the same 10% budget. The WSAVA says treats should be &ldquo;no more than about 10%&rdquo; of a dog&apos;s daily calories (<Ext href={WSAVA_FAQ}>WSAVA</Ext>). An incomplete topper plus a handful of training treats can pass that line quickly.
      </P>

      <H2 id="weight-gain">What happens if you add a topper without cutting the kibble?</H2>
      <P>
        Your dog eats more calories every day. A 25% topper added on top of a full bowl is a 25% calorie surplus: about {fmt(k25 * 0.25)} kcal a day for a 25 lb dog, or about {fmt(k25 * 0.25 * 30)} kcal a month.
      </P>
      <Table
        caption="Extra daily calories when a topper is added without reducing the base food"
        head={["Dog's weight", "10% topper added on top", "25% topper added on top"]}
        rows={WEIGHTS.slice(0, 4).map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [`${lb} lb`, `+${fmt(k * 0.1)} kcal a day`, `+${fmt(k * 0.25)} kcal a day`];
        })}
        note="Neutered adults, 70 x kg^0.75 x 1.6. Surplus calories are the topper's own calories when nothing is taken away."
      />
      <P>
        Calorie formulas are only a starting point anyway. The WSAVA notes individual dogs can need up to 50% more or less than the estimate, and advises adjusting amounts every 2 weeks at first to reach an ideal weight and body condition (<Ext href={WSAVA_FAQ}>WSAVA</Ext>). If weight is already a concern, see <A href={dietPath("weight-management")}>weight management</A>.
      </P>

      <H2 id="labels">How accurate are the calorie numbers on fresh dog food?</H2>
      <P>
        They&apos;re estimates, and the estimating method matters. In a 2021 study, the calculation methods commonly used for pet food misjudged the measured energy of both kibble and fresh food (<Ext href={TANPRASERTSUK_2021}>Tanprasertsuk et al., 2021</Ext>).
      </P>
      <P>
        For the kibble, the modified Atwater method underestimated its energy. For the fresh recipes, no single method fitted all four: the best formula depended on the recipe&apos;s fat and protein levels. The authors were employees of, or held stock in, the fresh food company NomNomNow.
      </P>
      <P>
        In practice, that&apos;s one more reason to treat any split as a first guess. Feed it for two weeks, check weight and body condition, and move the calories by small steps.
      </P>

      <H2 id="benefits">Does a topper give your dog the benefits of fresh food?</H2>
      <P>
        We don&apos;t know how much, because the research tested full fresh diets, not toppers. We searched for a published trial of a fresh topper on kibble and found none.
      </P>
      <P>
        The full-diet results are clear enough. In the 2021 study above, dogs eating a chicken-based fresh diet produced 24 g of fecal dry matter a day against 47 g on a chicken-based kibble, and defecated 1.2 vs 1.7 times a day (<Ext href={TANPRASERTSUK_2021}>Tanprasertsuk et al., 2021</Ext>). The groups were small, with 6 to 12 dogs per diet, fed for 10 days.
      </P>
      <Table
        caption="What one 2021 study measured: chicken fresh diet vs chicken kibble"
        head={["Measure (per dog, per day)", "Fresh diet", "Kibble"]}
        rows={[
          ["Defecations", "1.2", "1.7"],
          ["Fecal dry matter", "24 g", "47 g"],
          ["Calories lost in feces", "92 kcal", "189 kcal"],
        ]}
        note="Tanprasertsuk et al., Translational Animal Science, 2021. 12 dogs per chicken diet, 10 days, comparable calorie intakes. Industry-funded (NomNomNow). Toppers were not tested."
      />
      <P>
        It&apos;s reasonable to expect a 25% topper to move these numbers less than a full switch, but that&apos;s our inference, not a finding. What a topper reliably delivers is taste and moisture, which is often the point for a <A href={bestForPath("picky-eater")}>picky eater</A>.
      </P>

      <H2 id="which-split">Which split is right for your dog?</H2>
      <P>
        There&apos;s no single right split; it depends on budget, your dog&apos;s size and why you&apos;re adding fresh food at all. Here&apos;s how we&apos;d call common situations.
      </P>
      <Table
        caption="Choosing a fresh food split by situation"
        head={["Your dog or goal", "Split we'd start with", "Why"]}
        rows={[
          [<A key="p" href={bestForPath("picky-eater")}>Picky eater on kibble</A>, "10-25%", "Taste is the goal; a small share may be all it takes"],
          [<A key="l" href={bestForPath("large-breed")}>Large dog on a budget</A>, "25%", `At ${fmt(kcalPerDayForLb(75))} kcal a day for 75 lb, a full fresh diet is a major cost`],
          [<A key="s" href={bestForPath("small-breed")}>Small dog</A>, "50-100%", `Needs only about ${fmt(kcalPerDayForLb(10))}-${fmt(kcalPerDayForLb(20))} kcal a day, so full fresh costs least here`],
          [<A key="w" href={dietPath("weight-loss")}>Needs to lose weight</A>, "100% (portioned)", "Pre-portioned packs make the calorie target easier to hit"],
          [<A key="pu" href={bestForPath("puppy")}>Growing puppy</A>, "Any, if both are complete for growth", "Both foods must meet AAFCO growth or all-life-stages"],
          ["Prescription diet", "None without your vet", "Adding food dilutes a therapeutic diet"],
        ]}
      />
      <P>
        Puppies need extra care with any split, because an incomplete topper dilutes the calcium and phosphorus a growth formula is built around. See <A href="/articles/fresh-food-for-puppies">fresh food for puppies</A>, and our <A href={bestForPath("budget")}>budget guide</A> for the cost side.
      </P>

      <H2 id="start">How do you start a topper or mixed plan?</H2>
      <P>
        Introduce the fresh food gradually, even at 25%. The AAHA advises switching a dog over seven days, starting by replacing 25% of the old food (<Ext href={AAHA}>AAHA, 2021</Ext>), and the WSAVA says at least 3 days for healthy pets, longer for dogs with disease (<Ext href={WSAVA_FAQ}>WSAVA</Ext>).
      </P>
      <P>
        For a 25% topper, that means building up to the full fresh share over about a week. The WSAVA notes that in dogs the two foods can usually be mixed in the same bowl. For a full switch, follow our <A href="/articles/how-to-switch-dog-to-fresh-food">10-day plan</A>.
      </P>

      <H2 id="brands">Which fresh dog food brands sell topper or mixed plans?</H2>
      <P>
        Among the seven brands we review, plan menus differ more than recipes do. <A href="/reviews/the-pets-table">The Pets Table</A> sells an explicit topper plan alongside fresh, air-dried and mixed plans.
      </P>
      <P>
        <A href="/reviews/ollie">Ollie</A> mixes fresh and baked food in one subscription, and <A href="/reviews/spot-and-tango">Spot &amp; Tango</A> pairs fresh with its fresh-dry format. <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A> is full-meal fresh only, though you can still feed part of a plan and cut the kibble yourself.
      </P>
      <P>
        Compare plan menus head to head in <A href="/compare/the-farmers-dog-vs-the-pets-table">The Farmer&apos;s Dog vs The Pets Table</A> and <A href="/compare/ollie-vs-the-pets-table">Ollie vs The Pets Table</A>. Our hubs on <A href={dietPath("fresh-topper")}>fresh toppers</A> and <A href={dietPath("mixed-feeding")}>mixed feeding</A> list the options, and <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A> covers the cost decision.
      </P>
    </>
  );
}
