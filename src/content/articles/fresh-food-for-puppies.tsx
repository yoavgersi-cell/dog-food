import Link from "next/link";
import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, LIFE_STAGE_FACTORS, kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";

// Sources (each opened and read during the 2026-11-09 run). AAFCO nutrient
// minimums and the large-breed calcium cap come from src/lib/nutrition.ts.
const WSAVA_SELECT = "https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf";
const WSAVA_FAQ = "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf";
const WSAVA_RAW = "https://wsava.org/wp-content/uploads/2021/04/Raw-Meat-Based-Diets-for-Pets_WSAVA-Global-Nutrition-Toolkit.pdf";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const young = LIFE_STAGE_FACTORS["puppy-young"].factor; // 3.0
const older = LIFE_STAGE_FACTORS["puppy-older"].factor; // 2.0
const adult = LIFE_STAGE_FACTORS["neutered-adult"].factor; // 1.6

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-semibold text-[#A16207] hover:underline">{children}</Link>
);
const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} rel="noopener" className="font-semibold text-[#A16207] hover:underline">{children}</a>
);

function Table({ caption, head, rows, note }: { caption: string; head: string[]; rows: React.ReactNode[][]; note?: React.ReactNode }) {
  return (
    <div className="my-5">
      <div className="overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
        <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[#FEF3C7] text-[12px] uppercase tracking-wide text-[#713F12]">
            <tr>{head.map((h) => <th key={h} scope="col" className="px-3 py-2.5 font-bold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-[#FEF3C7] align-top">
                {r.map((c, j) =>
                  j === 0 ? <th key={j} scope="row" className="px-3 py-2.5 font-semibold text-[#191919]">{c}</th> : <td key={j} className="px-3 py-2.5 text-gray-700">{c}</td>,
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{note}</p>}
    </div>
  );
}

export const meta: ArticleMeta = {
  slug: "fresh-food-for-puppies",
  title: "Fresh Food for Puppies: AAFCO Growth Rules, Calorie Needs and Safe Feeding (2026)",
  seoTitle: "Fresh Food for Puppies: Growth Rules & Calories (2026)",
  description:
    "Can puppies eat fresh dog food? How to check a recipe is complete for growth, how many calories a puppy needs by age and weight, and why large breeds differ.",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  readMinutes: 9,
  category: "Feeding",
  answer: {
    question: "Can puppies eat fresh dog food?",
    text: "Yes, if the recipe is complete for growth. Its AAFCO statement must say \"growth\" or \"all life stages\" (and include large-size dogs if yours will be 70 lb or more as an adult). Adult-maintenance recipes don't meet a puppy's higher protein, fat and mineral needs.",
  },
  keyTakeaways: [
    `AAFCO's growth profile asks for more than the adult one: at least ${AAFCO.growth.proteinDM}% protein and ${AAFCO.growth.fatDM}% fat on a dry-matter basis, against ${AAFCO.adult.proteinDM}% and ${AAFCO.adult.fatDM}% for adults.`,
    `Puppies need about ${young}x their resting energy under 4 months and ${older}x from 4 to 12 months, against ${adult}x for a neutered adult.`,
    `Large-breed puppies (70 lb or more as adults) need calcium capped at ${AAFCO.largeBreedGrowthCaMaxDM}% DM and measured portions: the WSAVA advises slow weight gain and a body condition of 4 out of 9.`,
    "Avoid raw food for puppies: the WSAVA warns unbalanced diets can cause painful skeletal disorders in growing dogs, on top of the pathogen risk.",
  ],
  faqs: [
    {
      question: "At what age can a puppy eat fresh dog food?",
      answer: "Once it's weaned onto solid food, as long as the recipe is complete for growth or all life stages. Switch gradually from whatever the breeder or shelter fed, and check with your vet for very young puppies.",
    },
    {
      question: "Is adult fresh dog food OK for puppies?",
      answer: "No, unless it is also labelled for growth or all life stages. Adult-maintenance recipes meet lower minimums for protein, fat and minerals and are not complete for a growing dog.",
    },
    {
      question: "How much fresh food should a puppy eat?",
      answer: "Work from calories: roughly 3 times resting energy under 4 months and 2 times from 4 to 12 months, then adjust to body condition. Divide the day's calories by the food's calories per gram to get the portion.",
    },
    {
      question: "Should I free-feed my puppy?",
      answer: "Not a large-breed puppy. The WSAVA advises portion-controlled feeding for large-breed puppies to keep weight gain slow and avoid joint and skeletal problems. For other puppies, measured meals still make it easier to track growth.",
    },
    {
      question: "When should a puppy switch to adult food?",
      answer: "When growth slows as your dog nears adult size. Large and giant breeds keep growing for longer than small breeds, so ask your vet about timing. An all-life-stages recipe can carry on through the change.",
    },
  ],
  sources: [
    { label: "Selecting the best food for your pet (Global Nutrition Toolkit, updated 2021)", publisher: "World Small Animal Veterinary Association", year: 2021, href: WSAVA_SELECT },
    { label: "Frequently Asked Questions and Myths (Global Nutrition Committee)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_FAQ },
    { label: "Raw Meat Based Diets for Pets (Global Nutrition Toolkit)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_RAW },
  ],
  relatedPaths: ["/best-for/puppy-dog-food", "/best-for/large-breed-puppy-dog-food", "/best-for/small-breed-puppy-dog-food"],
};

export function Body() {
  const weights = [5, 10, 20, 40];
  return (
    <>
      <H2 id="can-puppies">Is fresh food a good choice for a puppy?</H2>
      <P>
        Yes, as long as the recipe is complete for growth. That&apos;s the one rule that matters more than any brand or format: a growing dog needs more protein, fat and minerals than an adult, and a recipe built only for adult maintenance won&apos;t supply them.
      </P>
      <P>
        Fresh food has the same advantages for puppies as for adults, chiefly taste and pre-measured portions. But puppies have less margin for error, so check the label first and the price second.
      </P>

      <H2 id="label">How do you know a fresh recipe is complete for a puppy?</H2>
      <P>
        Read the AAFCO nutritional adequacy statement, usually near the ingredient list or on the brand&apos;s recipe page. The WSAVA notes that diets labelled &ldquo;for all life-stages&rdquo; are formulated for reproduction and growth (<Ext href={WSAVA_SELECT}>WSAVA, 2021</Ext>).
      </P>
      <Table
        caption="What each AAFCO statement means for a puppy"
        head={["The statement says", "OK for a puppy?", "Notes"]}
        rows={[
          ["Formulated for growth", "Yes", "Check large-size dogs are included if yours will be 70 lb or more"],
          ["All life stages", "Yes", "Covers growth; check the large-size wording for big breeds"],
          ["All life stages, including growth of large size dogs (70 lb or more as an adult)", "Yes, including large breeds", "The statement to look for with a big-breed puppy"],
          ["Adult maintenance", "No", "Meets adult minimums only"],
          ["Intermittent or supplemental feeding only", "No, as a meal", "Toppers and treats; the WSAVA suggests 10% of the diet or less"],
        ]}
        note={<>A statement can also say whether it was proven by feeding trials or formulated to meet the profile. Our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> explains the difference.</>}
      />

      <H2 id="nutrients">How are a puppy&apos;s nutrient needs different from an adult&apos;s?</H2>
      <P>
        Higher across the board. AAFCO sets separate minimums for growth and for adult maintenance, and the growth profile is stricter on protein, fat and minerals.
      </P>
      <Table
        caption="AAFCO minimums: growth vs adult maintenance (dogs)"
        head={["Nutrient", "Growth & reproduction", "Adult maintenance"]}
        rows={[
          ["Protein, dry-matter basis", `${AAFCO.growth.proteinDM}%`, `${AAFCO.adult.proteinDM}%`],
          ["Fat, dry-matter basis", `${AAFCO.growth.fatDM}%`, `${AAFCO.adult.fatDM}%`],
          ["Protein per 1,000 kcal", `${AAFCO.growth.proteinPer1000} g`, `${AAFCO.adult.proteinPer1000} g`],
          ["Fat per 1,000 kcal", `${AAFCO.growth.fatPer1000} g`, `${AAFCO.adult.fatPer1000} g`],
          ["Calcium : phosphorus ratio", `${AAFCO.caToPRatio.min}:1 to ${AAFCO.caToPRatio.max}:1`, `${AAFCO.caToPRatio.min}:1 to ${AAFCO.caToPRatio.max}:1`],
          ["Calcium, large-size growth", `No more than ${AAFCO.largeBreedGrowthCaMaxDM}% DM`, "n/a"],
        ]}
        note="AAFCO Dog Food Nutrient Profiles. Dry-matter values assume 4,000 kcal/kg; per-1,000 kcal values are the fairer comparison across fresh and dry foods."
      />
      <P>
        Fresh labels look low on protein because fresh food is mostly water. Convert to dry matter or per 1,000 kcal before you compare; <A href="/articles/fresh-vs-kibble">fresh vs kibble</A> shows the math.
      </P>

      <H2 id="calories">How many calories does a puppy need?</H2>
      <P>
        Far more per pound than an adult. A common starting point is resting energy (70 x body weight in kg to the power of 0.75) multiplied by {young} for puppies under 4 months and by {older} from 4 to 12 months, compared with {adult} for a neutered adult.
      </P>
      <Table
        caption="Starting calorie estimates for puppies by current weight and age"
        head={["Puppy's current weight", "Under 4 months", "4-12 months", "Neutered adult, same weight"]}
        rows={weights.map((lb) => [
          `${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`,
          `${fmt(kcalPerDayForLb(lb, "puppy-young"))} kcal/day`,
          `${fmt(kcalPerDayForLb(lb, "puppy-older"))} kcal/day`,
          `${fmt(kcalPerDayForLb(lb))} kcal/day`,
        ])}
        note="Estimates from 70 x kg^0.75 x a life-stage factor, using the puppy's current weight. They are starting points: adjust every couple of weeks to body condition, not to the chart."
      />
      <P>
        Puppies change weight fast, so recalculate as they grow. Divide the day&apos;s calories by the food&apos;s calories per gram to get the portion; our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A> walks through it.
      </P>

      <H2 id="large-breed">Why do large-breed puppies need special care?</H2>
      <P>
        Because growing too fast is a real risk for them. The WSAVA advises that large-breed growing puppies should be fed &ldquo;in a portion controlled manner to ensure a slow rate of weight gain and a body condition score of 4 out of 9,&rdquo; to avoid joint and skeletal problems linked to fast growth, and should not be free-fed (<Ext href={WSAVA_FAQ}>WSAVA</Ext>).
      </P>
      <P>
        Calcium matters too. AAFCO&apos;s growth profile for dogs expected to reach 70 lb or more caps calcium at {AAFCO.largeBreedGrowthCaMaxDM}% on a dry-matter basis. So for a Lab, German Shepherd or Great Dane puppy, look for &ldquo;including growth of large size dogs&rdquo; on the label, measure every meal, and don&apos;t add calcium supplements.
      </P>
      <Callout>
        <strong>Large-breed checklist:</strong> a statement that covers large-size growth, measured meals rather than a full bowl, a lean body condition (4 out of 9), and no added calcium. See our <A href={bestForPath("large-breed-puppy")}>large-breed puppy guide</A>.
      </Callout>

      <H2 id="small-breed">What about small-breed and toy puppies?</H2>
      <P>
        They eat tiny amounts in absolute terms but burn more energy per pound, so meals need to be regular and the food needs enough calories per bite. Feed several small meals a day rather than one or two, and keep the schedule consistent.
      </P>
      <P>
        Small dogs are also where fresh food costs the least per day, because total calories are low. Our <A href={bestForPath("small-breed-puppy")}>small-breed puppy guide</A> has the numbers.
      </P>

      <H2 id="raw">Is raw food safe for puppies?</H2>
      <P>
        We don&apos;t recommend it. The WSAVA warns that unbalanced diets are &ldquo;especially detrimental for puppies and kittens, that may suffer from painful skeletal disorders and pathological fractures,&rdquo; and that raw diets carry a high risk of bacterial contamination (<Ext href={WSAVA_RAW}>WSAVA</Ext>).
      </P>
      <P>
        Puppies also live close to the floor, the bowl and young children. Gently cooked fresh food that is complete for growth avoids both problems; <A href="/articles/is-raw-dog-food-safe">is raw dog food safe?</A> covers the evidence.
      </P>

      <H2 id="switch">How should you switch a puppy to fresh food?</H2>
      <P>
        Gradually. The WSAVA advises a slow transition over at least 3 days in healthy pets, longer in animals with health problems (<Ext href={WSAVA_FAQ}>WSAVA</Ext>). We prefer about 10 days for a move to fresh food, mixing by calories rather than by cups.
      </P>
      <P>
        Keep the total calories at the puppy level throughout, and see our <A href="/articles/how-to-switch-dog-to-fresh-food">10-day switching plan</A> for the day-by-day split. A puppy with diarrhoea that lasts, vomiting or lethargy needs a vet, not a slower schedule.
      </P>

      <H2 id="treats">How many treats can a puppy have?</H2>
      <P>
        Keep treats and toppers small. The WSAVA says foods meant for intermittent or complementary feeding should make up 10% of the diet or less (<Ext href={WSAVA_SELECT}>WSAVA, 2021</Ext>). Training treats add up quickly, so count them in the day&apos;s calories.
      </P>

      <H2 id="brands">Which fresh dog food brands work for puppies?</H2>
      <P>
        Any brand whose recipe carries a growth or all-life-stages statement that fits your puppy&apos;s adult size. We&apos;re verifying each brand&apos;s statements recipe by recipe, so always confirm on the pack or the brand&apos;s recipe page before you order.
      </P>
      <P>
        Start with our <A href={bestForPath("puppy")}>best food for puppies</A> guide and the brand reviews for <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A>, <A href="/reviews/ollie">Ollie</A> and <A href="/reviews/spot-and-tango">Spot &amp; Tango</A>.
        Every brand is scored the same way in our <A href="/">2026 ranking</A> (<A href="/how-we-rank">how we rank</A>), and <A href={dietPath("fresh")}>fresh dog food explained</A> covers the format itself.
      </P>
    </>
  );
}
