import Link from "next/link";
import { ComparisonCard } from "@/components/comparison-card";
import { H2, P, Callout } from "@/components/page-shell";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { comparePath } from "@/lib/dogfood/pairs";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";

const fmt = (n: number) => n.toLocaleString("en-US");
const k10 = kcalPerDayForLb(10);
const k25 = kcalPerDayForLb(25);
const k50 = kcalPerDayForLb(50);
const k100 = kcalPerDayForLb(100);
const topperKcal = Math.round(k25 * 0.25);

const ILLINOIS = "https://www.eurekalert.org/news-releases/786753";
const APOP = "https://petobesityprevention.org/2022";

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-semibold text-[#A16207] hover:underline">{children}</Link>
);
const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} rel="noopener" className="font-semibold text-[#A16207] hover:underline">{children}</a>
);

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
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
  );
}

export const meta: ArticleMeta = {
  slug: "is-fresh-dog-food-worth-it",
  title: "Is Fresh Dog Food Worth It? An Honest, Numbers-First Answer (2026)",
  seoTitle: "Is Fresh Dog Food Worth It? The Honest Answer (2026)",
  description:
    "Fresh dog food costs more, so is it worth it? What the research really shows, what it costs at your dog's weight, who benefits most, and our top 3 picks.",
  publishedAt: "2026-11-04",
  updatedAt: "2026-11-04",
  readMinutes: 8,
  category: "Buying guide",
  answer: {
    question: "Is fresh dog food worth it?",
    text: "For most small and medium dogs, and for dogs that need tight portion control or are picky, yes. For large dogs on a budget, a fresh topper usually gets you most of the benefit for a fraction of the cost. Dogs on a prescription diet should stay on it.",
  },
  keyTakeaways: [
    "The best study we have (University of Illinois, 2021) found dogs on kibble produced 1.5-2.9x more stool than dogs on fresh food. It was small and industry-funded, and it measured digestibility, not long-term health.",
    "59% of US dogs are overweight or obese (APOP, 2022). Pre-portioned, calorie-targeted fresh food is a practical way to fix that.",
    `Cost scales with calories, not body weight: a 100 lb dog needs ${fmt(k100)} kcal a day, only about ${(k100 / k25).toFixed(1)}x a 25 lb dog's ${fmt(k25)} kcal.`,
    "If the price stings, feed fresh as a 25% topper. You keep most of the taste and moisture benefit for about a quarter of the cost.",
  ],
  faqs: [
    {
      question: "Is fresh dog food healthier than kibble?",
      answer: "Not automatically. Both can be complete and balanced. Fresh food is more digestible in the best available study and contains far more moisture, but no study has yet shown that it makes dogs live longer or get sick less often.",
    },
    {
      question: "Why is fresh dog food so expensive?",
      answer: "You are paying for human-grade or minimally processed ingredients, frozen shipping, and per-dog portioning. Fresh food is also about 70% water, so you buy far more weight for the same calories.",
    },
    {
      question: "Can I mix fresh dog food with kibble?",
      answer: `Yes, and it is the most cost-effective way to feed fresh. Replace about 25% of your dog's calories with fresh food (around ${fmt(topperKcal)} kcal a day for a 25 lb adult) and cut the kibble by the same number of calories.`,
    },
    {
      question: "What is the best fresh dog food?",
      answer: `${RANKED_BRANDS[0].name} is our top pick overall (${RANKED_BRANDS[0].score.toFixed(1)}/10), followed by ${RANKED_BRANDS[1].name} (${RANKED_BRANDS[1].score.toFixed(1)}/10) and ${RANKED_BRANDS[2].name} (${RANKED_BRANDS[2].score.toFixed(1)}/10). See the full ranking for how we score them.`,
    },
  ],
  sources: [
    {
      label: "Do S, Phungviwatnikul T, de Godoy MRC, Swanson KS. Nutrient digestibility and fecal characteristics, microbiota, and metabolites in dogs fed human-grade foods. Journal of Animal Science (via University of Illinois news release)",
      publisher: "University of Illinois / Journal of Animal Science",
      year: 2021,
      href: ILLINOIS,
    },
    {
      label: "2022 U.S. Pet Obesity Prevalence Survey",
      publisher: "Association for Pet Obesity Prevention",
      year: 2022,
      href: APOP,
    },
  ],
  relatedPaths: ["/", "/diets/fresh", "/diets/fresh-topper", "/diets/mixed-feeding", "/diets/weight-management"],
};

export function Body() {
  const top3 = RANKED_BRANDS.slice(0, 3);
  return (
    <>
      <H2 id="worth-it">Is fresh dog food actually worth the money?</H2>
      <P>
        It&apos;s worth it when one of three things is true: your dog is small to medium, your dog needs strict portion control, or your dog is a picky eater.
        If none of those apply and money is tight, a good complete kibble is a perfectly sound diet. We&apos;d rather tell you that than sell you a subscription you don&apos;t need.
      </P>
      <P>
        The honest answer comes down to three numbers: what the research shows, what your dog weighs, and how many calories it eats. Let&apos;s take them one at a time.
      </P>

      <H2 id="research">What does the research actually show about fresh dog food?</H2>
      <P>
        The strongest study so far found fresh food is markedly more digestible than kibble. In 2021, a University of Illinois team published a trial in the <em>Journal of Animal Science</em> that fed 12 beagles four diets for four weeks each: an extruded kibble, a fresh refrigerated food and two fresh human-grade foods.
      </P>
      <P>
        On kibble, the dogs produced <strong>1.5-1.7x more stool</strong> than on the fresh refrigerated food, and <strong>2.0-2.9x more</strong> than on the human-grade fresh diets (<Ext href={ILLINOIS}>University of Illinois, 2021</Ext>).
        More of the food was absorbed and less came out the other end. Stool quality scores didn&apos;t differ between diets, and bloodwork stayed normal on all of them.
      </P>
      <Callout>
        <strong>Read this with care.</strong> It was 12 dogs of one breed over a few weeks, and it was funded by a fresh-food company whose recipes were tested. It shows better digestibility. It does not show that fresh food makes dogs live longer or get sick less often. No study has shown that yet.
      </Callout>

      <H2 id="weight">Can fresh food help an overweight dog?</H2>
      <P>
        Yes, mainly because the portions are measured for you. In the Association for Pet Obesity Prevention&apos;s 2022 survey, vets rated <strong>59% of dogs overweight or obese</strong> (37% overweight, 22% obese) on a 9-point body condition scale (<Ext href={APOP}>APOP, 2022</Ext>).
      </P>
      <P>
        Most fresh subscriptions portion each pack to a daily calorie target set from your dog&apos;s weight and activity. That takes the guesswork out of scooping, which is where most extra calories sneak in.
        If weight is your reason for switching, read <A href={dietPath("weight-loss")}>fresh food for weight loss</A> and our guide to <A href="/articles/how-much-fresh-food-to-feed-a-dog">how much fresh food to feed</A>.
      </P>

      <H2 id="cost">How much more does fresh dog food cost?</H2>
      <P>
        The cost depends on your dog&apos;s calories, not its weight, and that works in big dogs&apos; favor. Energy needs rise with body weight to the power of 0.75, so doubling the dog doesn&apos;t double the bill.
      </P>
      <Table
        caption="Daily calorie needs by body weight, neutered adult dogs"
        head={["Dog's weight", "Calories per day", "vs a 25 lb dog"]}
        rows={[
          ["10 lb (4.5 kg)", `${fmt(k10)} kcal`, `${(k10 / k25).toFixed(2)}x`],
          ["25 lb (11.3 kg)", `${fmt(k25)} kcal`, "1.00x"],
          ["50 lb (22.7 kg)", `${fmt(k50)} kcal`, `${(k50 / k25).toFixed(2)}x`],
          ["100 lb (45.4 kg)", `${fmt(k100)} kcal`, `${(k100 / k25).toFixed(2)}x`],
        ]}
      />
      <P>
        So a 100 lb Lab mix eats about {(k100 / k25).toFixed(1)}x what a 25 lb dog eats, not 4x. The fair way to compare any two foods is <strong>price per 1,000 kcal</strong>, then multiply by your dog&apos;s daily calories.
        Box prices hide this because fresh food is around 70% water.
      </P>
      <P>
        We&apos;re verifying each brand&apos;s current non-introductory prices against their own quote flows, and every <A href="/">ranking card</A> and brand page, such as <A href="/brands/the-farmers-dog">The Farmer&apos;s Dog specs &amp; prices</A>, will show cost per day at your dog&apos;s weight as soon as they&apos;re confirmed.
        We won&apos;t publish a price we haven&apos;t checked.
      </P>

      <H2 id="top-picks">Which fresh dog food is worth paying for?</H2>
      <P>
        If you&apos;re going to pay for fresh food, these are the three we&apos;d choose first. They are the top three of our 2026 ranking, scored with the <A href="/how-we-rank">same published rubric</A> as every other brand.
      </P>
      <div className="my-5 space-y-4">
        {top3.map((b, i) => (
          <ComparisonCard key={b.slug} brand={b} rank={i + 1} />
        ))}
      </div>
      <P>
        Torn between the top two? <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A> breaks it down. No freezer space? <A href={comparePath("ollie-vs-spot-and-tango")}>Ollie vs Spot &amp; Tango</A> covers the fridge-free option. All seven brands are in the <A href="/">full ranking</A>.
      </P>

      <H2 id="who-benefits">Which dogs benefit most from fresh food?</H2>
      <P>Some dogs get a lot more out of the switch than others. Here&apos;s how we&apos;d call it:</P>
      <Table
        caption="Is fresh dog food worth it for your dog?"
        head={["Your dog", "Worth it?", "Why"]}
        rows={[
          [<A key="s" href={bestForPath("small-breed")}>Small dog (under 20 lb)</A>, "Yes", `Needs only ~${fmt(k10)}-${fmt(kcalPerDayForLb(20))} kcal a day, so the premium is smallest`],
          [<A key="p" href={bestForPath("picky-eater")}>Picky eater</A>, "Yes", "Palatability is where fresh food is strongest"],
          [<A key="w" href={dietPath("weight-management")}>Needs to lose or hold weight</A>, "Yes", "Calorie-targeted packs remove portion guesswork"],
          [<A key="g" href={bestForPath("large-breed")}>Large dog on a budget</A>, "Partly", "Use fresh as a 25% topper instead of a full diet"],
          [<A key="r" href={dietPath("kidney-support")}>On a prescription diet</A>, "No", "Keep the vet diet; ask your vet before adding anything"],
        ]}
      />

      <H2 id="not-worth-it">When is fresh dog food not worth it?</H2>
      <P>
        Skip it, or wait, in three situations. First, if your vet has prescribed a therapeutic diet for kidney, liver, urinary or allergy problems. None of the brands we cover sell one.
      </P>
      <P>
        Second, if the cost would push you to underfeed or to skip vet visits. A complete kibble plus regular checkups beats an unaffordable fresh plan. Third, if you have no freezer space: look at shelf-stable formats like <A href="/reviews/spot-and-tango">Spot &amp; Tango&apos;s UnKibble</A> or <A href={dietPath("freeze-dried")}>freeze-dried food</A> instead.
      </P>

      <H2 id="topper">Can you get most of the benefit for less?</H2>
      <P>
        Yes. Feed fresh as a topper. Replace about 25% of your dog&apos;s calories with fresh food and cut the kibble by the same amount. For a 25 lb adult that&apos;s roughly {fmt(topperKcal)} kcal of fresh food a day out of {fmt(k25)}.
      </P>
      <P>
        You keep most of the taste and some of the moisture, at about a quarter of the cost of going fully fresh. <A href="/reviews/the-pets-table">The Pets Table</A> sells a topper-only plan, and our guides to <A href={dietPath("fresh-topper")}>fresh toppers</A> and <A href={dietPath("mixed-feeding")}>mixed feeding</A> walk through the math.
      </P>

      <H2 id="decide">How do you decide in five minutes?</H2>
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li>Is your dog on a prescription diet? If yes, stop here and talk to your vet.</li>
        <li>Find your dog&apos;s daily calories in the table above, or in your <A href="/best-for">breed guide</A>.</li>
        <li>Decide full fresh or topper based on what that costs per day.</li>
        <li>Pick a brand from the top three above, and check its AAFCO statement covers your dog&apos;s life stage (<A href="/articles/how-to-read-a-dog-food-label">how to read the label</A>).</li>
        <li>Switch over 10 days with our <A href={dietPath("transitioning-to-fresh")}>transition plan</A>, then check body condition after 2-4 weeks.</li>
      </ol>
    </>
  );
}
