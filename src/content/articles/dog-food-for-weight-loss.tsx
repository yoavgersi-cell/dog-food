import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-20).
const APOP_DOGS = "https://www.petobesityprevention.org/weight-loss-dogs";
const APOP_CALC = "https://www.petobesityprevention.org/pet-caloric-calculators";
const APOP_2022 = "https://www.petobesityprevention.org/2022";
const WSAVA_ASSESS = "https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf";

const kg = (lb: number) => (lb / 2.20462).toFixed(1);
const TARGETS = [20, 40, 60, 80];
const PACE = [20, 40, 60, 80, 100];
// Illustrative example: a 60 lb dog whose vet sets a 50 lb target.
const EX_NOW = 60;
const EX_TARGET = 50;
const exMaintNow = kcalPerDayForLb(EX_NOW);
const exLoss = kcalPerDayForLb(EX_TARGET, "weight-loss");
const exMaintTarget = kcalPerDayForLb(EX_TARGET);

export const meta: ArticleMeta = {
  slug: "dog-food-for-weight-loss",
  title: "Dog Food for Weight Loss: The Calorie Math That Works (2026)",
  seoTitle: "Dog Weight Loss: How Many Calories to Feed",
  description:
    "How many calories to feed a dog to lose weight, worked by target weight, a safe pace of 3-5% a month, and how to choose and measure food so the plan works.",
  publishedAt: "2026-11-20",
  updatedAt: "2026-11-20",
  readMinutes: 6,
  category: "Nutrition",
  answer: {
    question: "How many calories should a dog eat to lose weight?",
    text: `Fewer than maintenance, worked out from the target weight your vet sets, not today's weight. Our calculator's starting point is 1.0 x resting energy at the target weight: about ${fmt(kcalPerDayForLb(40, "weight-loss"))} kcal a day for a 40 lb target. APOP's planning pace for dogs is about 3-5% of body weight a month, with weigh-ins every 2-4 weeks.`,
  },
  keyTakeaways: [
    "Base calories on the target weight, not the current weight; our starting point is 1.0 x resting energy at that target.",
    "APOP's planning pace for dogs is about 3-5% of current body weight a month; losing more than 2% a week is a reason to call your vet.",
    "Treats, chews and table food must fit inside a 10% allowance, not on top of it.",
    "Weigh food in grams and the dog every 2-4 weeks; adjust with your vet when progress stalls.",
  ],
  faqs: [
    {
      question: "How fast should a dog lose weight?",
      answer: "APOP's planning range is about 3-5% of current body weight per month. If your dog loses more than 2% of body weight in a week, confirm the weight and contact your vet. Your vet may set a different pace.",
    },
    {
      question: "Should I just feed my dog less of the same food?",
      answer: "Sometimes, but a big cut in a food designed for maintenance can short essential nutrients. APOP notes vets may recommend a therapeutic weight-management diet, especially when substantial calorie restriction is needed.",
    },
    {
      question: "Do treats count when a dog is on a diet?",
      answer: "Yes. APOP says treats, chews, table food and other extras should make up no more than 10% of the daily calorie allowance, counted inside it, not in addition to it.",
    },
    {
      question: "How often should I weigh my dog during weight loss?",
      answer: "Every 2 to 4 weeks during active weight loss, on the same scale, at about the same time of day and before a meal when possible (APOP).",
    },
  ],
  sources: [
    { label: "Dog weight loss guide (pace, steps, treats, weighing)", publisher: "Association for Pet Obesity Prevention", year: 2026, href: APOP_DOGS },
    { label: "Pet caloric calculators and FAQs", publisher: "Association for Pet Obesity Prevention", year: 2026, href: APOP_CALC },
    { label: "2022 Pet Obesity Prevalence Survey (weight-loss success, diet use)", publisher: "Association for Pet Obesity Prevention", year: 2022, href: APOP_2022 },
    { label: "WSAVA Nutritional Assessment Guidelines (energy variation)", publisher: "World Small Animal Veterinary Association", year: 2011, href: WSAVA_ASSESS },
  ],
  relatedPaths: [dietPath("weight-management"), dietPath("low-fat"), dietPath("lean-muscle"), "/how-we-rank"],
};

export function Body() {
  return (
    <>
      <H2 id="calories">How many calories does a dog need to lose weight?</H2>
      <P>
        Fewer than maintenance, calculated from the target weight. Our calculator starts weight loss at 1.0 x resting energy (RER = 70 x kg^0.75) at the target weight, against 1.6 x for a neutered adult at maintenance.
      </P>
      <Table
        caption="Starting calories by target weight"
        head={["Target weight", "Weight-loss start (x1.0)", "Maintenance at target (x1.6)"]}
        rows={TARGETS.map((lb) => [
          `${lb} lb (${kg(lb)} kg)`,
          `${fmt(kcalPerDayForLb(lb, "weight-loss"))} kcal/day`,
          `${fmt(kcalPerDayForLb(lb))} kcal/day`,
        ])}
        note="Starting estimates, not a prescription."
      />
      <P>
        APOP describes calculator results the same way: a starting estimate to adjust with your veterinary team as weight, body condition and muscle change (<Ext href={APOP_CALC}>APOP</Ext>). The WSAVA notes dogs&apos; energy needs can vary by 30% either way from formula values (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>). The target weight itself should come from a vet exam, not a breed chart.
      </P>

      <H2 id="example">What does the calorie math look like in practice?</H2>
      <P>
        Take an illustrative {EX_NOW} lb ({kg(EX_NOW)} kg) dog whose vet sets a {EX_TARGET} lb target. The plan changes the numbers at each stage.
      </P>
      <Table
        caption={`Worked example: ${EX_NOW} lb dog, ${EX_TARGET} lb target (illustrative)`}
        head={["Stage", "Calories per day", "Why"]}
        rows={[
          [`Maintenance at ${EX_NOW} lb`, `${fmt(exMaintNow)} kcal`, "Holds the current, excess weight"],
          [`Weight loss toward ${EX_TARGET} lb`, `${fmt(exLoss)} kcal`, "1.0 x RER at the target weight"],
          [`Maintenance at ${EX_TARGET} lb`, `${fmt(exMaintTarget)} kcal`, "After the target is reached"],
          ["Treat allowance during loss", `up to ${fmt(exLoss * 0.1)} kcal`, "10%, inside the daily total"],
        ]}
      />
      <P>
        Feeding the {EX_NOW} lb maintenance amount &ldquo;minus a bit&rdquo; would miss the target by about {fmt(exMaintNow - exLoss)} kcal a day. That&apos;s why the starting point is the target weight.
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />

      <H2 id="pace">How fast should a dog lose weight?</H2>
      <P>
        Gradually. APOP&apos;s planning range for dogs is about 3% to 5% of current body weight per month, and losing more than 2% a week is a reason to re-weigh and call your vet (<Ext href={APOP_DOGS}>APOP</Ext>).
      </P>
      <Table
        caption="APOP's planning pace, in pounds"
        head={["Current weight", "3-5% per month", "Check with your vet if over (2% a week)"]}
        rows={PACE.map((lb) => [
          `${lb} lb (${kg(lb)} kg)`,
          `${(lb * 0.03).toFixed(1)}-${(lb * 0.05).toFixed(1)} lb`,
          `${(lb * 0.02).toFixed(1)} lb a week`,
        ])}
        note="APOP calls this a planning range, not a safety cutoff; your vet's plan comes first."
      />
      <P>
        At that pace, our {EX_NOW} lb example would lose about 1.8 to 3 lb in the first month. APOP advises judging progress at scheduled rechecks rather than by a fixed end date (<Ext href={APOP_DOGS}>APOP</Ext>).
      </P>

      <H2 id="which-food">Which food is best for dog weight loss?</H2>
      <P>
        A complete and balanced food that still meets nutrient needs at the reduced calories. APOP notes vets may recommend a therapeutic weight-management diet, especially when substantial restriction is needed (<Ext href={APOP_DOGS}>APOP</Ext>).
      </P>
      <P>
        Few owners use one: only about one in five owners of overweight pets reported trying a therapeutic weight-loss diet, which APOP calls the primary evidence-based treatment (<Ext href={APOP_2022}>APOP, 2022</Ext>). For everyday food, compare calories per kg and fat per 1,000 kcal; see our <A href="/articles/fat-in-dog-food">fat guide</A> and <A href="/articles/how-much-protein-does-a-dog-need">protein guide</A>.
      </P>
      <Callout>
        <strong>Medical first.</strong> APOP advises a vet exam before any weight-loss plan, to check for pain, arthritis, thyroid disease and medications that change the plan (<Ext href={APOP_DOGS}>APOP</Ext>).
      </Callout>

      <H2 id="measure">How do you measure food so the plan works?</H2>
      <List
        items={[
          <><strong>Weigh food in grams.</strong> APOP says a digital kitchen scale gives the most consistent portions; scoops and cups vary (<Ext key="a" href={APOP_DOGS}>APOP</Ext>).</>,
          <><strong>Count every extra.</strong> Treats, chews, table food and pill-pockets stay within 10% of the day&apos;s calories.</>,
          <><strong>Split meals.</strong> Smaller meals can help with hunger and routine.</>,
          <><strong>Keep the household consistent.</strong> Everyone follows the same feeding and treat plan.</>,
          <><strong>Avoid free-feeding.</strong> APOP warns self-feeders work like an all-you-can-eat buffet.</>,
        ]}
      />
      <P>
        Pre-portioned fresh plans do the weighing for you; see <A href="/articles/how-much-fresh-food-to-feed-a-dog">how much fresh food to feed</A> and <A href="/articles/fresh-dog-food-topper-vs-full-meal">toppers vs full meals</A>, since toppers add calories too.
      </P>

      <H2 id="track">How do you know if the weight-loss plan is working?</H2>
      <P>
        Weigh your dog every 2 to 4 weeks on the same scale, at about the same time and before a meal (<Ext href={APOP_CALC}>APOP</Ext>). Check the <A href="/articles/body-condition-score-dog">body condition score</A> as well as the number.
      </P>
      <P>
        Expect some bumps. In APOP&apos;s 2022 survey, 34% of dog owners who tried reported success, 26% some success, 23% no success and 12% said their dog regained the weight (<Ext href={APOP_2022}>APOP, 2022</Ext>). If progress stalls, review actual intake, portions and activity with your vet before cutting further.
      </P>

      <ArticleBrandCard slug="ollie" />

      <P>
        For food options, see <A href={dietPath("weight-management")}>weight management</A>, <A href={dietPath("low-fat")}>low-fat</A> and <A href={dietPath("lean-muscle")}>lean muscle</A> diets, and our <A href="/">2026 ranking</A>.
      </P>
    </>
  );
}
