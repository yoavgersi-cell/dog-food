import Link from "next/link";
import { CalorieTable } from "@/components/data-tables";
import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath, BREEDS, breedMidLb } from "@/lib/dogfood/taxonomy";
import { comparePath } from "@/lib/dogfood/pairs";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";

const k25 = kcalPerDayForLb(25);
const k50 = kcalPerDayForLb(50);
const fmt = (n: number) => n.toLocaleString("en-US");

export const meta: ArticleMeta = {
  slug: "how-much-fresh-food-to-feed-a-dog",
  title: "How Much Fresh Food Should I Feed My Dog? Calories by Weight (2026 Chart)",
  seoTitle: "How Much Fresh Food to Feed a Dog (Calorie Chart)",
  description: `Feed fresh food by calories, not cups. A 25 lb adult needs about ${fmt(k25)} kcal a day. Use our chart by weight and life stage, then convert to grams in one step.`,
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  readMinutes: 7,
  category: "Feeding",
  answer: {
    question: "How much fresh food should I feed my dog?",
    text: `Feed by calories, not by cups. A neutered adult dog needs roughly 70 x (weight in kg)^0.75 x 1.6 kcal a day - about ${fmt(k25)} kcal at 25 lb and ${fmt(k50)} kcal at 50 lb. Divide that by the recipe's calories per kg (printed on the pack) and multiply by 1,000 to get grams per day, then adjust every 2-4 weeks by body condition.`,
  },
  keyTakeaways: [
    `Daily calories = 70 x kg^0.75 x a life-stage factor (1.6 for a neutered adult). A 25 lb adult needs about ${fmt(k25)} kcal.`,
    "Grams per day = daily kcal / the recipe's kcal per kg x 1,000. Fresh recipes vary a lot in calorie density, so always use the number on the pack.",
    "Check body condition every 2-4 weeks and change portions by about 10% at a time.",
    "Treats should stay under 10% of daily calories; when mixing with kibble, subtract the fresh calories from the kibble portion.",
  ],
  faqs: [
    {
      question: "How many calories does a 50 lb dog need per day?",
      answer: `About ${fmt(k50)} kcal for a neutered adult at a normal activity level (RER x 1.6). An intact adult needs about ${fmt(kcalPerDayForLb(50, "intact-adult"))} kcal and a less active senior about ${fmt(kcalPerDayForLb(50, "senior"))} kcal.`,
    },
    {
      question: "Is fresh food more filling than kibble?",
      answer: "Fresh food is roughly 70% water, so the same calories come in a much larger, heavier portion. Many owners find their dog seems more satisfied, but portion by calories either way.",
    },
    {
      question: "How do I feed fresh food to a dog that needs to lose weight?",
      answer: "Feed the resting energy requirement (70 x kg^0.75) for your dog's target weight, not its current weight, and keep protein high. Weigh every 2 weeks and talk to your vet if weight loss is faster than about 1-2% of body weight per week.",
    },
    {
      question: "Do fresh dog food subscriptions calculate portions for you?",
      answer: "The main fresh subscriptions, including The Farmer's Dog, Ollie and Spot & Tango, portion packs to a daily calorie target from your dog's profile. It is still worth checking body condition and adjusting.",
    },
  ],
  relatedPaths: ["/best-for", "/diets/weight-loss", "/diets/mixed-feeding", "/best-for/puppy-dog-food"],
};

const BREED_EXAMPLES = ["chihuahua", "french-bulldog", "beagle", "border-collie", "labrador-retriever", "golden-retriever", "german-shepherd", "great-dane"];

export function Body() {
  const breeds = BREED_EXAMPLES.map((s) => BREEDS.find((b) => b.slug === s)!).filter(Boolean);
  return (
    <>
      <H2 id="step-1">Step 1: Work out your dog&apos;s daily calories</H2>
      <P>
        Cups and scoops are a poor guide for fresh food because recipes differ so much in water and fat. Vets and the WSAVA nutrition guidelines start from energy instead.
        First the <strong>resting energy requirement (RER)</strong>, the calories a dog burns at rest: <strong>RER = 70 x (body weight in kg)^0.75</strong>.
        Then multiply by a life-stage factor to get the <strong>maintenance energy requirement (MER)</strong>, what your dog actually needs in a day.
      </P>
      <P>
        Because the formula uses weight to the power of 0.75, calories don&apos;t double when weight doubles. A 50 lb dog needs about {fmt(k50)} kcal, not twice the {fmt(k25)} kcal of a 25 lb dog.
      </P>
      <CalorieTable weights={[10, 25, 50, 75, 100]} stages={["neutered-adult", "intact-adult", "senior", "active", "weight-loss"]} />
      <Callout>
        These are starting points. Individual dogs can differ from the formula by 20-30% or more, which is why step 3 matters.
      </Callout>

      <H2 id="step-2">Step 2: Convert calories into grams of fresh food</H2>
      <P>
        Every complete dog food must state its calorie content, usually as <strong>kcal per kg</strong> (and sometimes per cup or per pack). Then:
        <strong> grams per day = daily kcal / kcal per kg x 1,000</strong>.
      </P>
      <P>
        Worked example, for illustration only: a 25 lb neutered adult needing {fmt(k25)} kcal, fed a recipe labelled 1,300 kcal/kg, needs {fmt(Math.round((k25 / 1300) * 1000))} g a day. Split over two meals, that is about {fmt(Math.round((k25 / 1300) * 500))} g per meal.
        Your recipe&apos;s number will differ, so use the one on your pack.
      </P>
      <P>
        Pre-portioned subscriptions do this conversion for you: <Link href="/reviews/the-farmers-dog" className="font-semibold text-[#A16207] hover:underline">The Farmer&apos;s Dog</Link>,{" "}
        <Link href="/reviews/ollie" className="font-semibold text-[#A16207] hover:underline">Ollie</Link> and{" "}
        <Link href="/reviews/spot-and-tango" className="font-semibold text-[#A16207] hover:underline">Spot &amp; Tango</Link> portion packs to a daily calorie target from your dog&apos;s profile.
        See <Link href={comparePath("the-farmers-dog-vs-ollie")} className="font-semibold text-[#A16207] hover:underline">The Farmer&apos;s Dog vs Ollie</Link> for how their plans differ.
      </P>

      <H2 id="step-3">Step 3: Adjust with body condition, not the bag</H2>
      <P>
        Score your dog every 2-4 weeks on the 9-point body condition scale used by the WSAVA: at an ideal 4-5 out of 9 you can feel the ribs easily under a thin fat layer and see a waist from above.
        If your dog drifts above 5, reduce portions by about 10%; if it drifts below 4, increase by about 10%. Weigh monthly on the same scale.
      </P>

      <H2 id="special-cases">Special cases</H2>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li>
          <strong>Puppies</strong> need about 3x RER until 4 months and 2x RER until adulthood, and a recipe that meets AAFCO&apos;s growth or all-life-stages profile.
          Large breeds need controlled calcium. See <Link href={bestForPath("puppy")} className="font-semibold text-[#A16207] hover:underline">best food for puppies</Link> and{" "}
          <Link href={bestForPath("large-breed-puppy")} className="font-semibold text-[#A16207] hover:underline">large-breed puppies</Link>.
        </li>
        <li>
          <strong>Seniors</strong> often need fewer calories but not less protein. See <Link href={bestForPath("senior-dog")} className="font-semibold text-[#A16207] hover:underline">senior dogs</Link>.
        </li>
        <li>
          <strong>Weight loss:</strong> feed RER for the <em>target</em> weight and keep protein high. See <Link href={dietPath("weight-loss")} className="font-semibold text-[#A16207] hover:underline">fresh food for weight loss</Link>.
        </li>
        <li>
          <strong>Mixing fresh with kibble:</strong> subtract the fresh calories from the kibble portion, or your dog will gain weight. See <Link href={dietPath("mixed-feeding")} className="font-semibold text-[#A16207] hover:underline">mixed feeding</Link> and{" "}
          <Link href={dietPath("fresh-topper")} className="font-semibold text-[#A16207] hover:underline">fresh toppers</Link>.
        </li>
        <li>
          <strong>Treats</strong> should stay under about 10% of daily calories.
        </li>
      </ul>

      <H2 id="by-breed">Daily calories for popular breeds</H2>
      <P>For a neutered adult at a normal activity level, across each breed&apos;s typical adult weight range:</P>
      <ul className="mb-4 grid gap-2 sm:grid-cols-2">
        {breeds.map((b) => (
          <li key={b.slug}>
            <Link href={bestForPath(b.slug)} className="block rounded-lg border border-[#F3E3A3] bg-white px-3.5 py-2.5 hover:border-[#EAB308] hover:bg-[#FEFCE8]">
              <span className="text-[14.5px] font-semibold text-[#191919]">{b.name}s</span>
              <span className="block text-[13px] text-gray-500">
                {b.minLb}-{b.maxLb} lb · {fmt(kcalPerDayForLb(b.minLb))}-{fmt(kcalPerDayForLb(b.maxLb))} kcal/day (about {fmt(kcalPerDayForLb(breedMidLb(b)))} at {breedMidLb(b)} lb)
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <P>
        Every breed guide has its own calorie table and cost per day: <Link href="/best-for" className="font-semibold text-[#A16207] hover:underline">browse all {BREEDS.length} breeds</Link>.
      </P>

      <H2 id="switching">Switching to fresh food</H2>
      <P>
        Move over about 10 days: 25% fresh for days 1-3, 50% for days 4-6, 75% for days 7-9, then 100%. Keep the total calories the same throughout.
        More in our <Link href={dietPath("transitioning-to-fresh")} className="font-semibold text-[#A16207] hover:underline">transition guide</Link>, and for a sensitive dog see{" "}
        <Link href={dietPath("sensitive-stomach")} className="font-semibold text-[#A16207] hover:underline">fresh food for sensitive stomachs</Link>.
      </P>
    </>
  );
}
