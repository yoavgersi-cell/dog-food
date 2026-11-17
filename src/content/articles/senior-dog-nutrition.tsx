import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, LIFE_STAGE_FACTORS, kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-17).
const WSAVA_ASSESS = "https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf";
const WSAVA_MCS = "https://wsava.org/wp-content/uploads/2020/01/Muscle-Condition-Score-Chart-for-Dogs.pdf";
const WSAVA_FAQ = "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf";
const APOP_2022 = "https://www.petobesityprevention.org/2022";
const TFD_FEED = "https://www.thefarmersdog.com/digest/how-much-to-feed-a-senior-dog/";
const TFD_BEST = "https://www.thefarmersdog.com/digest/the-best-food-for-senior-dogs/";

const ADULT = LIFE_STAGE_FACTORS["neutered-adult"].factor;
const SENIOR = LIFE_STAGE_FACTORS.senior.factor;
const DROP = Math.round((1 - SENIOR / ADULT) * 100);
const WEIGHTS = [10, 25, 50, 75];
const kg = (lb: number) => (lb / 2.20462).toFixed(1);
const k40a = kcalPerDayForLb(40);
const k40s = kcalPerDayForLb(40, "senior");

export const meta: ArticleMeta = {
  slug: "senior-dog-nutrition",
  title: "Senior Dog Nutrition: Calories, Protein and Joints (2026)",
  seoTitle: "Senior Dog Nutrition: Calories, Protein & Joints",
  description:
    "How many calories a senior dog needs by weight, why protein matters more with age, what helps joints, and why there's no official AAFCO senior food standard.",
  publishedAt: "2026-11-17",
  updatedAt: "2026-11-17",
  readMinutes: 6,
  category: "Nutrition",
  answer: {
    question: "What should I feed a senior dog?",
    text: `A complete and balanced adult food, in a smaller portion if your dog has slowed down. AAFCO has no senior nutrient profile, so "senior" on a bag isn't a standard. A less active senior may need about ${DROP}% fewer calories than a younger adult on our formula, with protein per 1,000 kcal kept at least as high. Diet changes for conditions such as kidney disease are your vet's call.`,
  },
  keyTakeaways: [
    "AAFCO sets nutrient profiles for growth, reproduction and adult maintenance, but not for senior dogs (WSAVA, 2011).",
    `On our formula a less active senior needs about ${DROP}% fewer calories than a neutered adult: about ${fmt(k40s)} vs ${fmt(k40a)} kcal a day at 40 lb.`,
    "Fewer calories means each portion must carry the same protein, so compare protein per 1,000 kcal, not the label's %.",
    "For joints, a lean body comes first: 59% of dogs were overweight or obese in the 2022 APOP survey.",
  ],
  faqs: [
    {
      question: "At what age is a dog a senior?",
      answer: "It depends on size and expected lifespan. The Farmer's Dog, citing AAHA's life-stage guidelines, puts the senior stage at roughly the last 25% of expected lifespan: about 9 to 10.5 years for a breed expected to live 12 to 14.",
    },
    {
      question: "Do senior dogs need senior dog food?",
      answer: "No. AAFCO has no senior nutrient profile, so senior formulas vary widely. A complete and balanced adult food fed at the right calories works for most healthy seniors; a vet may prescribe a specific diet for a condition.",
    },
    {
      question: "Should older dogs eat less protein?",
      answer: "Not as a rule. Healthy seniors usually need fewer calories, so protein per 1,000 kcal should stay the same or rise. Reduce protein only if your vet advises it, for example for kidney disease.",
    },
    {
      question: "How often should I feed a senior dog?",
      answer: "Two meals a day suits most. If appetite drops, smaller meals three or four times a day can help; if your dog still won't eat, see your vet.",
    },
  ],
  sources: [
    { label: "WSAVA Nutritional Assessment Guidelines (senior profiles, monitoring)", publisher: "World Small Animal Veterinary Association", year: 2011, href: WSAVA_ASSESS },
    { label: "Muscle Condition Score chart for dogs", publisher: "World Small Animal Veterinary Association / Tufts University", year: 2013, href: WSAVA_MCS },
    { label: "Frequently Asked Questions and Myths (treats, feeding amounts)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_FAQ },
    { label: "2022 Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: APOP_2022 },
    { label: "How much should you feed a senior dog? (brand content, vet-quoted)", publisher: "The Farmer's Dog", year: 2026, href: TFD_FEED },
    { label: "The best food for senior dogs (brand content, vet-quoted)", publisher: "The Farmer's Dog", year: 2026, href: TFD_BEST },
  ],
  relatedPaths: [bestForPath("senior-dog"), dietPath("joint-health"), dietPath("weight-management"), dietPath("lean-muscle"), "/how-we-rank"],
};

export function Body() {
  return (
    <>
      <H2 id="when-senior">When is a dog considered a senior?</H2>
      <P>
        There&apos;s no single age; it depends on expected lifespan. The Farmer&apos;s Dog, citing AAHA&apos;s life-stage guidelines, puts the senior stage at roughly the last 25% of lifespan (<Ext href={TFD_FEED}>The Farmer&apos;s Dog</Ext>).
      </P>
      <P>
        For a breed expected to live 12 to 14 years, that means about 9 to 10.5. The age varies by breed. Age alone isn&apos;t a reason to change food; changes in weight, muscle, appetite or health are.
      </P>

      <H2 id="senior-food">Do senior dogs need a special senior food?</H2>
      <P>
        No. AAFCO publishes nutrient profiles for growth, reproduction and adult maintenance, &ldquo;but not for senior/geriatric pets&rdquo; (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>). A bag labelled &ldquo;senior&rdquo; meets the adult profile at most, and its calories and protein can be anything.
      </P>
      <Table
        caption="What a 'senior' label does and doesn't tell you"
        head={["Label says", "What it guarantees", "What to check instead"]}
        rows={[
          ["“Senior formula”", "Nothing specific; no AAFCO senior profile exists", "The AAFCO statement (adult maintenance or all life stages)"],
          ["“Complete and balanced”", "Meets an AAFCO profile for the stated life stage", "Which life stage, and how it was proven"],
          ["Lower calories", "Only what the kcal statement shows", "kcal per kg or per cup"],
          ["High protein", "A minimum % as fed", `Protein per 1,000 kcal (adult minimum ${AAFCO.adult.proteinPer1000} g)`],
        ]}
        note="Our label guide shows how to read each line."
      />
      <P>
        See <A href="/articles/how-to-read-a-dog-food-label">how to read a dog food label</A> for the calculations.
      </P>

      <H2 id="calories">How many calories does a senior dog need?</H2>
      <P>
        Usually fewer than in middle age. Our calculator uses {SENIOR}x resting energy for a less active senior against {ADULT}x for a neutered adult, about {DROP}% less.
      </P>
      <Table
        caption="Estimated calories per day: neutered adult vs less active senior"
        head={["Body weight", "Adult (x" + ADULT + ")", "Senior (x" + SENIOR + ")", "Difference"]}
        rows={WEIGHTS.map((lb) => {
          const a = kcalPerDayForLb(lb);
          const s = kcalPerDayForLb(lb, "senior");
          return [`${lb} lb (${kg(lb)} kg)`, `${fmt(a)} kcal`, `${fmt(s)} kcal`, `-${fmt(a - s)} kcal`];
        })}
        note="Resting energy = 70 x kg^0.75 (NRC, WSAVA). Estimates only: the WSAVA notes real needs vary by up to 50% either side of formula values."
      />
      <P>
        Treat these as a starting point. The WSAVA advises adjusting the amount as needed, every 2 weeks at first (<Ext href={WSAVA_FAQ}>WSAVA</Ext>). Some seniors need more calories, not fewer, for example with a condition causing muscle loss (<Ext href={TFD_FEED}>The Farmer&apos;s Dog</Ext>). Our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A> turns calories into portions.
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />

      <H2 id="protein">Do senior dogs need more or less protein?</H2>
      <P>
        Not less, for a healthy senior. With fewer calories in the bowl, each 1,000 kcal must carry at least the same protein, so protein per 1,000 kcal matters more with age. Our <A href="/articles/how-much-protein-does-a-dog-need">protein guide</A> shows how to compare foods.
      </P>
      <Callout>
        <strong>Watch muscle as well as weight.</strong> The WSAVA chart notes muscle loss usually shows first along the spine, and that an overweight dog can still have significant muscle loss (<Ext href={WSAVA_MCS}>WSAVA MCS chart</Ext>). Ask your vet for a muscle condition score.
      </Callout>
      <P>
        Protein is reduced only for specific conditions, such as some kidney disease, and that&apos;s a vet-set plan. See <A href={dietPath("kidney-support")}>kidney support</A> and <A href={dietPath("lean-muscle")}>lean muscle</A>.
      </P>

      <H2 id="weight">Why does weight matter more as dogs age?</H2>
      <P>
        Because extra weight adds load to ageing joints. Overweight is already common: 59% of dogs were overweight or obese in the 2022 APOP survey (<Ext href={APOP_2022}>APOP</Ext>). A veterinary nutritionist quoted by The Farmer&apos;s Dog says added weight can increase the pain arthritic dogs feel (<Ext href={TFD_FEED}>The Farmer&apos;s Dog</Ext>).
      </P>
      <P>
        Fat is the densest source of calories, so a leaner recipe makes portions easier to control; see <A href="/articles/fat-in-dog-food">fat in dog food</A> and <A href={dietPath("weight-management")}>weight management</A>.
      </P>

      <H2 id="joints">What helps a senior dog&apos;s joints?</H2>
      <P>
        Keeping your dog lean is the most reliable step you control. Beyond that, several approaches are common, with different strength of evidence.
      </P>
      <Table
        caption="Joint support for senior dogs: what to know"
        head={["Approach", "What it does", "Who decides"]}
        rows={[
          ["Lean body condition", "Less load on joints; arthritis can lower calorie needs further", "You, with portion control"],
          ["Omega-3 fatty acids", "Dogs with arthritis may need more, per one brand guide; dose varies by dog", "Your vet"],
          ["Joint-health diets", "Formulated for dogs with diagnosed joint disease", "Your vet"],
        ]}
      />
      <P>
        The omega-3 point comes from The Farmer&apos;s Dog&apos;s senior guide (<Ext href={TFD_BEST}>The Farmer&apos;s Dog</Ext>). See <A href={dietPath("joint-health")}>joint-health diets</A> for what to look for on a label.
      </P>

      <H2 id="how-to-feed">How should you feed a senior dog day to day?</H2>
      <List
        items={[
          <><strong>Measure every meal.</strong> Use a scale or the brand&apos;s portions; small errors add up at lower calories.</>,
          <><strong>Keep treats under about 10%.</strong> That&apos;s the WSAVA limit for daily calories from treats (<Ext key="w" href={WSAVA_FAQ}>WSAVA</Ext>).</>,
          <><strong>Offer smaller meals if appetite drops.</strong> Three or four a day can help; if not, see your vet (<Ext key="t" href={TFD_FEED}>The Farmer&apos;s Dog</Ext>).</>,
          <><strong>Choose softer food for missing teeth.</strong> The Farmer&apos;s Dog notes fresh food is easier to chew than dry food (<Ext key="b" href={TFD_BEST}>source</Ext>); see <A key="f" href="/articles/fresh-vs-kibble">fresh vs kibble</A>.</>,
          <><strong>Keep water fresh and available.</strong> Sudden heavy drinking is worth a vet check.</>,
        ]}
      />
      <P>
        The WSAVA says senior dogs need more frequent nutritional monitoring than healthy younger adults (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>). Weigh your dog monthly and switch food gradually (<A href="/articles/how-to-switch-dog-to-fresh-food">10-day plan</A>).
      </P>

      <ArticleBrandCard slug="ollie" />

      <P>
        Comparing options for an older dog? See our <A href={bestForPath("senior-dog")}>best food for senior dogs</A> and the <A href="/">2026 ranking</A>.
      </P>
    </>
  );
}
