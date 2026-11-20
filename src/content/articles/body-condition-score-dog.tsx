import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-18).
const WSAVA_BCS = "https://wsava.org/wp-content/uploads/2020/01/Body-Condition-Score-Dog.pdf";
const WSAVA_MCS = "https://wsava.org/wp-content/uploads/2020/01/Muscle-Condition-Score-Chart-for-Dogs.pdf";
const WSAVA_ASSESS = "https://wsava.org/wp-content/uploads/2020/01/WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf";
const WSAVA_FAQ = "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf";
const APOP_2022 = "https://www.petobesityprevention.org/2022";

// WSAVA 9-point chart, paraphrased.
const SCALE: [string, string, string][] = [
  ["1", "Too thin", "Ribs, spine and hip bones visible from a distance; no body fat; obvious muscle loss"],
  ["2", "Too thin", "Ribs, spine and hip bones easily visible; no fat you can feel; some muscle loss"],
  ["3", "Too thin", "Ribs easily felt and may be visible; tops of the spine visible; obvious waist"],
  ["4", "Ideal", "Ribs easily felt under minimal fat; waist easily seen from above; belly tucked up"],
  ["5", "Ideal", "Ribs felt without excess fat; waist seen behind the ribs; belly tucked up from the side"],
  ["6", "Overweight", "Ribs felt under slight excess fat; waist visible but not prominent"],
  ["7", "Overweight", "Ribs hard to feel under heavy fat; fat over the lower back and tail base; waist barely visible"],
  ["8", "Obese", "Ribs not felt, or only with firm pressure; no waist; no belly tuck"],
  ["9", "Obese", "Heavy fat over chest, spine and tail base; fat on neck and limbs; belly distended"],
];

// APOP 2022 veterinary-assessed prevalence, dogs.
const APOP: [string, string, string][] = [
  ["Thin", "1-3", "<1%"],
  ["Ideal", "4-5", "40%"],
  ["Overweight", "6-7", "37%"],
  ["Obese", "8-9", "22%"],
];

const TARGETS = [20, 40, 60];

export const meta: ArticleMeta = {
  slug: "body-condition-score-dog",
  title: "Dog Body Condition Score: How to Tell if Your Dog Is Overweight (2026)",
  seoTitle: "Dog Body Condition Score: Is Your Dog Overweight?",
  description:
    "How to check your dog's body condition score at home on the 9-point scale, what each score means, why 59% of dogs are overweight, and what to do above a 5.",
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-18",
  readMinutes: 6,
  category: "Nutrition",
  answer: {
    question: "How can I tell if my dog is overweight?",
    text: "Feel the ribs, then look from above and from the side. On the WSAVA 9-point scale, an ideal dog (4-5) has ribs you can feel easily under a thin layer of fat, a visible waist and a tucked-up belly. If you struggle to feel the ribs or the waist has gone, your dog scores 6 or more: overweight.",
  },
  keyTakeaways: [
    "The WSAVA scale runs from 1 (emaciated) to 9 (obese); the goal for most dogs is 4 to 5.",
    "In the 2022 APOP survey, vets rated 59% of dogs overweight (37%) or obese (22%); only 40% were ideal.",
    "36% of owners of dogs scored 6-9 called their dog's body condition normal, so feel, don't just look.",
    "Score muscle too: an overweight dog can still be losing muscle (WSAVA).",
  ],
  faqs: [
    {
      question: "What is a good body condition score for a dog?",
      answer: "4 or 5 out of 9 on the WSAVA scale. The WSAVA notes this can look too thin to some owners. Its guidelines report that disease risk associations appear to increase above 6 of 9 in adult dogs.",
    },
    {
      question: "How do I check my dog's body condition at home?",
      answer: "Run your flat hands along the ribs: you should feel them easily without pressing. Then look from above for a waist behind the ribs, and from the side for a belly that tucks up. Long or thick coats hide shape, so rely on touch.",
    },
    {
      question: "Is body condition score better than weighing my dog?",
      answer: "They do different jobs. The scale tracks change over time; the body condition score tells you whether that weight is right for your dog's frame. The WSAVA recommends recording both, plus a muscle score.",
    },
    {
      question: "What should I do if my dog is a 6 or higher?",
      answer: "Check how many calories your dog really gets, including treats, and ask your vet for a target weight and a calorie plan. Measure every meal and re-check often; the WSAVA advises adjusting amounts every 2 weeks at first.",
    },
  ],
  sources: [
    { label: "Body Condition Score chart for dogs (9-point scale)", publisher: "World Small Animal Veterinary Association", year: 2013, href: WSAVA_BCS },
    { label: "Muscle Condition Score chart for dogs", publisher: "World Small Animal Veterinary Association / Tufts University", year: 2013, href: WSAVA_MCS },
    { label: "WSAVA Nutritional Assessment Guidelines (BCS goals, palpation)", publisher: "World Small Animal Veterinary Association", year: 2011, href: WSAVA_ASSESS },
    { label: "Frequently Asked Questions and Myths (treats, feeding amounts)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA_FAQ },
    { label: "2022 Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: APOP_2022 },
  ],
  relatedPaths: [dietPath("weight-management"), dietPath("low-fat"), bestForPath("senior-dog"), "/how-we-rank"],
};

export function Body() {
  return (
    <>
      <H2 id="what-is-bcs">What is a dog body condition score?</H2>
      <P>
        A hands-on rating of body fat, usually on a 9-point scale from 1 (emaciated) to 9 (obese). The WSAVA uses the 9-point scale and sets the goal for most dogs at 4 to 5 (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>).
      </P>
      <P>
        Unlike a number on the scale, the score tells you whether the weight suits your dog&apos;s frame. A 60 lb (27.2 kg) dog can be lean or obese depending on breed and build.
      </P>

      <H2 id="check-at-home">How do you check your dog&apos;s body condition at home?</H2>
      <P>
        Use your hands first, then your eyes. The three checks below match the WSAVA chart (<Ext href={WSAVA_BCS}>WSAVA BCS chart</Ext>).
      </P>
      <List
        items={[
          <><strong>Ribs (touch).</strong> Lay your flat hands on your dog&apos;s sides. At an ideal score you feel the ribs easily, under only a thin layer of fat.</>,
          <><strong>Waist (look from above).</strong> Stand over your dog. You should see a waist narrowing behind the ribs.</>,
          <><strong>Belly tuck (look from the side).</strong> The belly should rise from the chest toward the hind legs, not hang level or sag.</>,
        ]}
      />
      <P>
        The WSAVA notes that palpation is needed to score accurately, especially in dogs with medium to long coats (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>). A fluffy coat can hide a missing waist.
      </P>

      <H2 id="scores">What does each body condition score mean?</H2>
      <Table
        caption="The WSAVA 9-point body condition scale for dogs"
        head={["Score", "What you see and feel"]}
        rows={SCALE.map(([s, c, d]) => [`${s} (${c.toLowerCase()})`, d])}
        note="Paraphrased from the WSAVA Body Condition Score chart (2013)."
      />
      <P>
        Scores 4 and 5 are the target. The WSAVA guidelines add that disease risk associations in adult dogs appear to increase above 6 of 9 (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>).
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />

      <H2 id="how-many">How many dogs are overweight?</H2>
      <P>
        Most of them. In the 2022 APOP survey, veterinary teams scored 59% of dogs as overweight or obese, up from 56% in 2018 (<Ext href={APOP_2022}>APOP</Ext>).
      </P>
      <Table
        caption="Body condition of US dogs scored by vets, 2022"
        head={["Category", "Score (of 9)", "Share of dogs"]}
        rows={APOP.map(([c, s, p]) => [c, s, p])}
        note="Association for Pet Obesity Prevention, 2022 veterinary-assessed prevalence survey."
      />

      <H2 id="owners-miss">Why do owners miss extra weight?</H2>
      <P>
        Because a healthy dog can look thin to us. The WSAVA warns that a score of 4 to 5 &ldquo;may appear &lsquo;too thin&rsquo; to some pet owners&rdquo; (<Ext href={WSAVA_ASSESS}>WSAVA, 2011</Ext>).
      </P>
      <P>
        APOP measured the gap. Before being told the score, 36% of owners whose dogs were rated 6 to 9 described their dog&apos;s body condition as normal (<Ext href={APOP_2022}>APOP</Ext>). Score your dog by touch every few weeks, and ask your vet for a score at each visit.
      </P>

      <H2 id="muscle">Does body condition score show muscle loss?</H2>
      <P>
        No. Body condition measures fat; the muscle condition score measures muscle. The WSAVA notes the two aren&apos;t directly related, and an overweight dog can still have significant muscle loss (<Ext href={WSAVA_MCS}>WSAVA MCS chart</Ext>).
      </P>
      <Callout>
        <strong>Where to feel for muscle:</strong> loss is usually first noticed along the spine; vets also check the shoulder blades, skull and hips. For older dogs, see our <A href="/articles/senior-dog-nutrition">senior dog nutrition guide</A>.
      </Callout>

      <H2 id="next-steps">What should you do if your dog scores 6 or more?</H2>
      <P>
        Start by counting everything your dog eats, then agree a target weight with your vet. Calories should be based on the target weight, not the current one.
      </P>
      <Table
        caption="Starting calories our calculator uses, by target weight"
        head={["Target weight", "Maintenance (neutered adult)", "Weight-loss starting point"]}
        rows={TARGETS.map((lb) => [
          `${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`,
          `${fmt(kcalPerDayForLb(lb))} kcal/day`,
          `${fmt(kcalPerDayForLb(lb, "weight-loss"))} kcal/day`,
        ])}
        note="Resting energy = 70 x kg^0.75; maintenance x1.6, weight loss x1.0 at target weight. Estimates only: the WSAVA notes dogs' needs can vary by 30% either way. Agree a plan with your vet."
      />
      <List
        items={[
          <><strong>Measure every meal</strong> with a scale or pre-portioned packs; see <A key="f" href="/articles/how-much-fresh-food-to-feed-a-dog">how much to feed</A>.</>,
          <><strong>Keep treats under about 10%</strong> of daily calories, the WSAVA limit (<Ext key="w" href={WSAVA_FAQ}>WSAVA</Ext>).</>,
          <><strong>Pick a leaner recipe</strong> if needed; fat drives calories (see <A key="fat" href="/articles/fat-in-dog-food">fat in dog food</A>).</>,
          <><strong>Re-check every 2 weeks at first.</strong> The WSAVA advises adjusting amounts every 2 weeks initially (<Ext key="w2" href={WSAVA_FAQ}>WSAVA</Ext>).</>,
        ]}
      />
      <P>
        Our <A href="/articles/dog-food-for-weight-loss">weight-loss calorie guide</A> works through the math step by step. For food options, see <A href={dietPath("weight-management")}>weight management</A> and <A href={dietPath("low-fat")}>low-fat</A> diets.
      </P>

      <ArticleBrandCard slug="spot-and-tango" />

      <P>
        Comparing fresh plans with portioning built in? See our <A href="/">2026 ranking</A> and <A href="/how-we-rank">how we rank</A>.
      </P>
    </>
  );
}
