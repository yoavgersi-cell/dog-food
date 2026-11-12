import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, gramsPer1000kcal, kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-12).
const WSAVA_ASSESS = "https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf";
const ST_BEEF = "https://www.spotandtango.com/recipes/beef-and-barley";
const ST_TURKEY = "https://www.spotandtango.com/recipes/turkey-and-sweet-potato";
const ST_COD = "https://www.spotandtango.com/recipes/cod-and-salmon";
const SUNDAYS_BEEF = "https://sundaysfordogs.com/food/beef";
const SUNDAYS_CHICKEN = "https://sundaysfordogs.com/food/chicken";

// Illustrative labels (not specific brands) for the "same food, different %" example.
const EX_FRESH = { protein: 10, kcalPerKg: 1300 };
const EX_KIBBLE = { protein: 26, kcalPerKg: 3600 };

// Label figures read 2026-11-12. Sundays kcal/kg from its calculated kcal per cup and cup weight.
const FOODS = [
  { name: "Spot & Tango UnKibble Beef + Barley", href: ST_BEEF, protein: 27, kcalPerKg: 4792 },
  { name: "Spot & Tango UnKibble Turkey + Sweet Potato", href: ST_TURKEY, protein: 25, kcalPerKg: 4367 },
  { name: "Spot & Tango UnKibble Cod + Salmon", href: ST_COD, protein: 27, kcalPerKg: 4193 },
  { name: "Sundays Beef (air-dried)", href: SUNDAYS_BEEF, protein: 35, kcalPerKg: (650 / 120) * 1000 },
  { name: "Sundays Chicken (air-dried)", href: SUNDAYS_CHICKEN, protein: 36, kcalPerKg: (620 / 121) * 1000 },
];

const per1000 = (pct: number, kcalPerKg: number) => gramsPer1000kcal(pct, kcalPerKg);
const k25 = kcalPerDayForLb(25);

export const meta: ArticleMeta = {
  slug: "how-much-protein-does-a-dog-need",
  title: "How Much Protein Does a Dog Need? Per 1,000 kcal, Explained (2026)",
  seoTitle: "How Much Protein Does a Dog Need? (Per 1,000 kcal)",
  description:
    "How much protein a dog needs: AAFCO minimums per 1,000 kcal, grams per day by weight, how to work it out from any label, and how real dog foods compare.",
  publishedAt: "2026-11-12",
  updatedAt: "2026-11-12",
  readMinutes: 6,
  category: "Nutrition",
  answer: {
    question: "How much protein does a dog need?",
    text: `At least ${AAFCO.adult.proteinPer1000} g of protein per 1,000 kcal for an adult and ${AAFCO.growth.proteinPer1000} g for a growing puppy, the AAFCO minimums. For a 25 lb adult eating about ${fmt(k25)} kcal a day, that's roughly ${fmt((k25 * AAFCO.adult.proteinPer1000) / 1000)} g of protein a day. Most complete foods supply well above the minimum.`,
  },
  keyTakeaways: [
    `AAFCO's minimum is ${AAFCO.adult.proteinPer1000} g of protein per 1,000 kcal for adults (${AAFCO.adult.proteinDM}% on a dry-matter basis) and ${AAFCO.growth.proteinPer1000} g for growth and all life stages (${AAFCO.growth.proteinDM}%).`,
    "Compare foods per 1,000 kcal, not by the label's %. A fresh food at 10% protein and a kibble at 26% can deliver similar protein per calorie.",
    "Formula: protein % x 10,000 / kcal per kg = grams per 1,000 kcal.",
    "Watch muscle, not just weight: the WSAVA asks vets to score muscle condition, because muscle loss can happen even in a dog that isn't thin.",
  ],
  faqs: [
    {
      question: "How much protein should a dog have per day?",
      answer: `At minimum, ${AAFCO.adult.proteinPer1000} g for every 1,000 kcal it eats. That's about ${fmt((kcalPerDayForLb(10) * AAFCO.adult.proteinPer1000) / 1000)} g a day for a 10 lb adult and ${fmt((kcalPerDayForLb(50) * AAFCO.adult.proteinPer1000) / 1000)} g for a 50 lb adult (neutered, average activity). Complete foods usually supply more.`,
    },
    {
      question: "Is 30% protein good for a dog?",
      answer: "It depends on the food's calories and water. Convert it: protein % x 10,000 / kcal per kg. If the result is above 45 g per 1,000 kcal, it meets the adult minimum; above 56.3 g, it meets the growth minimum.",
    },
    {
      question: "Do older dogs need less protein?",
      answer: "Not as a rule. Healthy seniors often need fewer calories, so protein per 1,000 kcal matters more, not less. Reduce protein only if your vet recommends it for a medical condition.",
    },
    {
      question: "Can a dog eat too much protein?",
      answer: "AAFCO sets protein minimums, not a maximum, for healthy dogs. Extra protein still carries calories, so total calories decide weight gain. Dogs with kidney or liver disease may need a vet-prescribed diet.",
    },
  ],
  sources: [
    { label: "WSAVA Nutritional Assessment Guidelines (muscle condition score), J Small Anim Pract 2011", publisher: "World Small Animal Veterinary Association", year: 2011, href: WSAVA_ASSESS },
    { label: "Beef + Barley UnKibble: guaranteed analysis and calories", publisher: "Spot & Tango", year: 2026, href: ST_BEEF },
    { label: "Turkey + Sweet Potato UnKibble: guaranteed analysis and calories", publisher: "Spot & Tango", year: 2026, href: ST_TURKEY },
    { label: "Cod + Salmon UnKibble: guaranteed analysis and calories", publisher: "Spot & Tango", year: 2026, href: ST_COD },
    { label: "Beef recipe: protein and calories per cup", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_BEEF },
    { label: "Chicken recipe: protein and calories per cup", publisher: "Sundays for Dogs", year: 2026, href: SUNDAYS_CHICKEN },
  ],
  relatedPaths: ["/diets/high-protein", "/diets/fresh", "/how-we-rank"],
};

export function Body() {
  return (
    <>
      <H2 id="how-much">How much protein does a dog need?</H2>
      <P>
        At least {AAFCO.adult.proteinPer1000} g per 1,000 kcal for adults and {AAFCO.growth.proteinPer1000} g for puppies. These are AAFCO&apos;s minimums behind every &ldquo;complete and balanced&rdquo; claim in the US; a food can&apos;t carry that claim for a life stage without meeting them.
      </P>
      <Table
        caption="AAFCO protein minimums for dog food"
        head={["Life stage", "Per 1,000 kcal", "Dry-matter basis"]}
        rows={[
          ["Adult maintenance", `${AAFCO.adult.proteinPer1000} g`, `${AAFCO.adult.proteinDM}%`],
          ["Growth and reproduction (and all life stages)", `${AAFCO.growth.proteinPer1000} g`, `${AAFCO.growth.proteinDM}%`],
        ]}
        note="Dry-matter percentages assume a food with 4,000 kcal per kg of dry matter; the per-1,000 kcal figure works for any food."
      />
      <P>
        These are floors, not targets. Most complete foods supply more, and our <A href="/how-we-rank">ranking rubric</A> scores protein per 1,000 kcal against these minimums. See the label rules in <A href="/articles/how-to-read-a-dog-food-label">how to read a dog food label</A>.
      </P>

      <H2 id="why-per-1000">Why measure protein per 1,000 kcal?</H2>
      <P>
        Because dogs eat to their calorie needs, not to a weight of food. The printed % includes water, so a wet food always looks low and a dry food high. Per 1,000 kcal tells you how much protein arrives with each day&apos;s calories.
      </P>
      <Table
        caption="Same idea, different labels: protein % vs protein per 1,000 kcal"
        head={["Example food", "Label protein", "Calories", "Protein per 1,000 kcal"]}
        rows={[
          ["Fresh food (example)", `${EX_FRESH.protein}%`, `${fmt(EX_FRESH.kcalPerKg)} kcal/kg`, `${per1000(EX_FRESH.protein, EX_FRESH.kcalPerKg).toFixed(0)} g`],
          ["Kibble (example)", `${EX_KIBBLE.protein}%`, `${fmt(EX_KIBBLE.kcalPerKg)} kcal/kg`, `${per1000(EX_KIBBLE.protein, EX_KIBBLE.kcalPerKg).toFixed(0)} g`],
        ]}
        note="Illustrative labels, not specific brands. The fresh food looks lower on the label but delivers a similar amount of protein per calorie."
      />

      <H2 id="calculate">How do you work out protein per 1,000 kcal from a label?</H2>
      <List
        ordered
        items={[
          "Find the crude protein (min) % in the guaranteed analysis.",
          "Find the calories in kcal per kg (it's required on US labels).",
          "Multiply the protein % by 10,000, then divide by the kcal per kg.",
        ]}
      />
      <P>
        Example: Spot &amp; Tango&apos;s Turkey + Sweet Potato UnKibble lists 25% protein and 4,367 kcal/kg (<Ext href={ST_TURKEY}>Spot &amp; Tango</Ext>). 25 x 10,000 / 4,367 = {per1000(25, 4367).toFixed(1)} g per 1,000 kcal, above both AAFCO minimums.
      </P>

      <H2 id="grams-per-day">How many grams of protein a day is that?</H2>
      <P>
        Multiply your dog&apos;s daily calories by the per-1,000 kcal figure. Here&apos;s the AAFCO minimum in grams for typical neutered adults.
      </P>
      <Table
        caption="Minimum daily protein by body weight, adult dogs"
        head={["Dog's weight", "Daily calories", "Minimum protein a day"]}
        rows={[10, 25, 50, 75].map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [`${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`, `${fmt(k)} kcal`, `${fmt((k * AAFCO.adult.proteinPer1000) / 1000)} g`];
        })}
        note={`Neutered adults, 70 x kg^0.75 x 1.6, at ${AAFCO.adult.proteinPer1000} g per 1,000 kcal. Puppies need more calories per pound and ${AAFCO.growth.proteinPer1000} g per 1,000 kcal.`}
      />
      <P>
        Your dog&apos;s real calorie need can differ, so start from our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A>. For puppies, see <A href="/articles/fresh-food-for-puppies">fresh food for puppies</A>.
      </P>

      <ArticleBrandCard slug="spot-and-tango" />

      <H2 id="real-foods">How do real foods compare?</H2>
      <P>
        Every product we checked clears the growth minimum, some by a wide margin. In our sample, the two air-dried recipes sat highest.
      </P>
      <Table
        caption="Protein per 1,000 kcal in foods we checked"
        head={["Food", "Label protein (min)", "Calories", "Per 1,000 kcal"]}
        rows={FOODS.map((f) => [
          <Ext key={f.name} href={f.href}>{f.name}</Ext>,
          `${f.protein}%`,
          `${fmt(f.kcalPerKg)} kcal/kg`,
          `${per1000(f.protein, f.kcalPerKg).toFixed(1)} g`,
        ])}
        note={`Read from the brands' recipe pages, November 12, 2026. Sundays kcal/kg calculated from its stated kcal per cup and cup weight. AAFCO minimums: ${AAFCO.adult.proteinPer1000} g (adult), ${AAFCO.growth.proteinPer1000} g (growth).`}
      />
      <P>
        Guaranteed analysis is a minimum, so the true figure can be higher. For more options, see <A href={dietPath("high-protein")}>high-protein dog food</A> and our <A href="/articles/unkibble-fresh-dry-dog-food">UnKibble review</A>.
      </P>

      <H2 id="seniors">Do senior dogs need less protein?</H2>
      <P>
        Not as a rule. Seniors often need fewer calories, so protein per 1,000 kcal matters more: a smaller portion still has to cover the same protein. Cut protein only if your vet advises it for a condition such as kidney disease.
      </P>
      <Callout>
        <strong>Check muscle, not just the scale.</strong> The WSAVA asks vets to record a muscle condition score alongside body condition, noting that muscle loss is greater in sick dogs and that spotting &ldquo;mild muscle wasting&rdquo; early helps (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>). Ask for it at your dog&apos;s next check-up.
      </Callout>
      <P>
        Our <A href={bestForPath("senior-dog")}>senior dog guide</A> covers lower-calorie, higher-protein options.
      </P>

      <H2 id="too-much">Can a dog eat too much protein?</H2>
      <P>
        For a healthy dog, AAFCO sets protein minimums, not a maximum. Extra protein still carries calories, so total calories decide weight gain. Dogs with kidney or liver disease may need a vet-prescribed diet; don&apos;t switch away from one without your vet.
      </P>

      <ArticleBrandCard slug="we-feed-raw" />

      <P>
        Compare brands on protein, price and format in our <A href="/">2026 ranking</A>, or see <A href="/articles/fresh-vs-kibble">fresh vs kibble</A> for how processing differs.
      </P>
    </>
  );
}
