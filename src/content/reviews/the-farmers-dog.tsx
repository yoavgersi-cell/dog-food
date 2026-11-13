import Link from "next/link";
import { H2, P, Callout } from "@/components/page-shell";
import { comparePath } from "@/lib/dogfood/pairs";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ReviewContent } from "./types";

const fmt = (n: number) => n.toLocaleString("en-US");

const SRC = {
  humanGrade: "https://discover.thefarmersdog.com/human-grade-nb",
  storage: "https://www.thefarmersdog.com/digest/?p=10653",
  packaging: "https://discover.thefarmersdog.com/packaging",
  petfulCost: "https://www.petful.com/food/the-farmers-dog-cost/",
  petfulSafe: "https://www.petful.com/food/is-the-farmers-dog-safe/",
  dfa: "https://www.dogfoodadvisor.com/?p=145589",
  reviewed: "https://reviewed.com/pets/content/the-farmers-dog-food-review",
  origin: "https://thebridgebk.com/?p=1261",
};

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
                j === 0 ? <th key={j} scope="row" className="px-3 py-2.5 text-left font-semibold text-[#191919]">{c}</th> : <td key={j} className="px-3 py-2.5 text-gray-700">{c}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Body() {
  return (
    <>
      <H2 id="what-is-it">What is The Farmer&apos;s Dog?</H2>
      <P>
        The Farmer&apos;s Dog is a New York-based subscription that delivers gently cooked, pre-portioned fresh dog food. Brett Podolsky and Jonathan Regev founded it in 2014.
        The idea started with Podolsky&apos;s dog, Jada, who had chronic stomach problems. A vet suggested home-cooked meals, and he started making them himself (<Ext href={SRC.origin}>company history</Ext>).
      </P>
      <P>
        Today it is the brand most people mean when they say &quot;fresh dog food&quot;. It is also the benchmark we score every other brand against. It sells one thing, gently cooked fresh food, and nothing else: no kibble line, no raw, no treats-first catalog.
      </P>

      <H2 id="recipes">What recipes does The Farmer&apos;s Dog offer?</H2>
      <P>
        Four recipes, each built around one main protein: <strong>beef, chicken, turkey and pork</strong>. Each combines muscle meat with organ meat, vegetables and a vitamin and mineral blend.
        The brand says the recipes are formulated by board-certified veterinary nutritionists to be complete and balanced to AAFCO standards (<Ext href={SRC.humanGrade}>The Farmer&apos;s Dog</Ext>).
      </P>
      <Table
        caption="The Farmer's Dog recipes"
        head={["Recipe", "Main protein", "Good to know"]}
        rows={[
          ["Beef", "Beef", "Beef is one of the most common food allergens in dogs - skip it if your dog has reacted to beef before"],
          ["Chicken", "Chicken", "The most widely fed protein; a common choice for a first box"],
          ["Turkey", "Turkey", "Leaner poultry; often picked for weight control"],
          ["Pork", "Pork", "Less common in dog food, which makes it useful for rotation"],
        ]}
      />
      <Callout>
        <strong>Check the life stage.</strong> Sources disagree on whether every recipe is labelled for all life stages. Petful&apos;s review says they are, while its safety guide says only some are (<Ext href={SRC.petfulSafe}>Petful</Ext>).
        If you are feeding a puppy, confirm the AAFCO statement on the specific recipe says &quot;all life stages&quot; or &quot;growth&quot;. Our guide to <A href="/articles/how-to-read-a-dog-food-label">reading a dog food label</A> shows where to look.
      </Callout>

      <H2 id="how-its-made">How is The Farmer&apos;s Dog made?</H2>
      <P>
        The food is gently cooked in batches in USDA-compliant facilities that also make food for people, and the brand markets it as human-grade (<Ext href={SRC.humanGrade}>The Farmer&apos;s Dog</Ext>).
        It is then portioned into individual packs, frozen and shipped.
      </P>
      <P>
        &quot;Human-grade&quot; has a specific meaning: every ingredient and the finished food must be fit for people and handled under human-food rules. It is a safety and handling standard, not a nutrition score. More on that in <A href={dietPath("human-grade")}>human-grade dog food</A>.
      </P>

      <H2 id="ordering">How does ordering The Farmer&apos;s Dog work?</H2>
      <P>
        You fill in a short profile, and The Farmer&apos;s Dog builds a plan around your dog&apos;s calorie needs.
      </P>
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li><strong>Profile:</strong> breed, age, weight, activity level and body shape, plus any health notes.</li>
        <li><strong>Calorie target:</strong> the plan sets a daily calorie amount, and the packs are portioned to match it.</li>
        <li><strong>Recipes:</strong> pick one or more of the four recipes.</li>
        <li><strong>Delivery:</strong> boxes arrive frozen on a schedule matched to how fast your dog eats through them.</li>
        <li><strong>Changes:</strong> you can pause, skip or cancel online.</li>
      </ol>
      <P>
        The pre-portioned packs are the real product here. With 59% of US dogs overweight or obese (<Ext href="https://petobesityprevention.org/2022">APOP, 2022</Ext>), removing the guesswork from portion size matters more than any single ingredient. Our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A> shows the calorie math behind it.
      </P>

      <H2 id="cost">How much does The Farmer&apos;s Dog cost?</H2>
      <P>
        It depends almost entirely on your dog&apos;s calorie needs. Petful&apos;s February 2026 survey testing found prices from about <strong>$2.31 to $26.77 per day</strong>, from small dogs to giant breeds (<Ext href={SRC.petfulCost}>Petful, 2026</Ext>). Our <A href="/articles/how-much-does-the-farmers-dog-cost">full cost breakdown</A> converts it to per week, month and year.
        That range is wide because calories are. Here is how much more food bigger dogs need:
      </P>
      <Table
        caption="Daily calories by dog weight (neutered adult)"
        head={["Dog's weight", "Calories per day", "Food needed vs a 25 lb dog"]}
        rows={[
          ["10 lb (4.5 kg)", `${fmt(kcalPerDayForLb(10))} kcal`, `${(kcalPerDayForLb(10) / kcalPerDayForLb(25)).toFixed(2)}x`],
          ["25 lb (11.3 kg)", `${fmt(kcalPerDayForLb(25))} kcal`, "1.00x"],
          ["50 lb (22.7 kg)", `${fmt(kcalPerDayForLb(50))} kcal`, `${(kcalPerDayForLb(50) / kcalPerDayForLb(25)).toFixed(2)}x`],
          ["75 lb (34 kg)", `${fmt(kcalPerDayForLb(75))} kcal`, `${(kcalPerDayForLb(75) / kcalPerDayForLb(25)).toFixed(2)}x`],
        ]}
      />
      <P>
        The introductory offer cuts the first box substantially. After that you pay the standard price, so judge it on the standard price, not the intro discount.
        For a large dog, a full fresh plan is a real monthly expense. Feeding fresh as a topper is the usual workaround - see <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A>
      </P>

      <H2 id="storage">How do you store and serve The Farmer&apos;s Dog?</H2>
      <P>
        Keep packs frozen, move one to the fridge 12-24 hours before you need it, and use it within 4 days of thawing (<Ext href={SRC.storage}>The Farmer&apos;s Dog</Ext>; <Ext href={SRC.dfa}>Dog Food Advisor</Ext>).
        Some reviewers note the packs don&apos;t reseal, so a lidded container helps with leftovers.
      </P>
      <P>
        Plan on real freezer space, since every delivery arrives frozen. The packaging is designed to be recycled. The brand says the food packs are recyclable once rinsed, and the box is cardboard (<Ext href={SRC.packaging}>The Farmer&apos;s Dog</Ext>).
      </P>

      <H2 id="complaints">What do customers say, good and bad?</H2>
      <P>
        The Farmer&apos;s Dog has a TrustScore of <strong>3.9 from 1,740 Trustpilot reviews</strong>, lower than Ollie (4.7 from 11,319) and Spot &amp; Tango (4.6)
        (all checked Nov 4, 2026). The recent run is far kinder than that headline: of the 62 reviews posted between July 1 and November 4, 2026, 55 are five-star
        and 5 are one- or two-star. You can read every one of them <a href="#trustpilot" className="font-semibold text-[#A16207] hover:underline">further down this page</a>.
      </P>
      <P>The complaints in those reviews cluster around five things:</P>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li><strong>Price</strong>, especially for big dogs. One owner said it was simply too expensive for a 100 lb dog; another compared the bill to &ldquo;a low priced car payment.&rdquo;</li>
        <li><strong>Portion size.</strong> One owner says the plan set their active 43 lb Brittany at 462 kcal a day, and the dog lost 14% of its body weight in two months; their vet put the need at 800–900 kcal. The brand&apos;s reply says portions are a starting point and daily calories are listed in each account. Either way: weigh your dog in the first few weeks and adjust.</li>
        <li><strong>Digestion in a minority of dogs.</strong> One owner reports a vet-diagnosed pancreatitis after switching; another saw more grass-eating and now uses it only as a topper. Single cases don&apos;t prove cause, but transition slowly and check with your vet if your dog has a history of pancreatitis.</li>
        <li><strong>Delivery</strong>: a box that sat at the carrier for five days and arrived thawed, an 11:47 pm drop-off in bear country, and FedEx refusing some addresses.</li>
        <li><strong>Changing orders.</strong> One reviewer found it hard to change a recurring order; several others say pausing or moving a delivery was easy.</li>
      </ul>
      <P>
        What stands out most is customer service. It&apos;s the theme of most five-star reviews, and a striking number come from owners whose dog had just died: they describe
        refunds for food already shipped, handwritten cards and plants sent after cancelling. On the food itself, the common thread is picky or senior dogs eating eagerly again,
        and Reviewed.com&apos;s testers recommended it if you have the freezer space (<Ext href={SRC.reviewed}>Reviewed</Ext>).
      </P>

      <H2 id="alternatives">How does The Farmer&apos;s Dog compare with the alternatives?</H2>
      <Table
        caption="The Farmer's Dog vs alternatives"
        head={["If you want…", "Better pick", "Head-to-head"]}
        rows={[
          ["Fresh plus a shelf-stable baked option", "Ollie", <A key="o" href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A>],
          ["No freezer at all", "Spot & Tango (UnKibble)", <A key="s" href={comparePath("the-farmers-dog-vs-spot-and-tango")}>vs Spot &amp; Tango</A>],
          ["A raw diet", "We Feed Raw", <A key="w" href={comparePath("the-farmers-dog-vs-we-feed-raw")}>vs We Feed Raw</A>],
          ["Toppers on a budget", "The Pets Table", <A key="p" href={comparePath("the-farmers-dog-vs-the-pets-table")}>vs The Pets Table</A>],
          ["Buy without a subscription", "Maxbone or Redbarn", <A key="m" href={comparePath("the-farmers-dog-vs-maxbone")}>vs Maxbone</A>],
        ]}
      />

      <H2 id="worth-it">Is The Farmer&apos;s Dog worth it?</H2>
      <P>
        Yes, if you want a fresh diet with zero portion math. It is the most complete answer to &quot;what and how much should my dog eat&quot;, and that is why it is our #1.
        It is the right call for <A href={bestForPath("small-breed")}>small dogs</A>, <A href={bestForPath("picky-eater")}>picky eaters</A> and dogs that need <A href={dietPath("weight-management")}>steady weight control</A>.
      </P>
      <P>
        Skip it if you feed raw, have no freezer space, or have a large dog and a tight budget. For the last group, a 25% fresh topper gets most of the benefit for about a quarter of the cost.
      </P>
    </>
  );
}

export const content: ReviewContent = {
  ownAlternatives: true,
  updatedAt: "2026-11-04",
  Body,
  faqs: [
    {
      question: "Is The Farmer's Dog human-grade?",
      answer: "The brand says its food is made with human-grade ingredients in USDA-compliant facilities that also make food for people. Human-grade is a handling and safety standard, not a nutrition score.",
    },
    {
      question: "How long does The Farmer's Dog last in the fridge?",
      answer: "Up to 4 days after thawing. Keep packs frozen, and move each one to the fridge 12-24 hours before you need it.",
    },
    {
      question: "Can puppies eat The Farmer's Dog?",
      answer: "Only if the recipe's AAFCO statement covers growth or all life stages. Sources disagree on whether every recipe does, so check the label of the specific recipe before feeding a puppy.",
    },
    {
      question: "How many recipes does The Farmer's Dog have?",
      answer: "Four: beef, chicken, turkey and pork. Each pairs one main protein with organ meat, vegetables and a vitamin and mineral blend.",
    },
  ],
  sources: [
    { label: "The Farmer's Dog reviews (TrustScore 3.9, 1,740 reviews; checked Nov 4, 2026)", publisher: "Trustpilot", year: 2026, href: "https://www.trustpilot.com/review/thefarmersdog.com" },
    { label: "Ollie reviews (TrustScore 4.7, 11,319 reviews; checked Nov 4, 2026)", publisher: "Trustpilot", year: 2026, href: "https://www.trustpilot.com/review/ollie.com" },
    { label: "Human-grade fresh dog food - how it's made", publisher: "The Farmer's Dog", href: SRC.humanGrade },
    { label: "Storing and thawing your packs", publisher: "The Farmer's Dog Digest", href: SRC.storage },
    { label: "Our packaging", publisher: "The Farmer's Dog", href: SRC.packaging },
    { label: "2022 U.S. Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: "https://petobesityprevention.org/2022" },
    { label: "How much does The Farmer's Dog cost? (survey testing, Feb 2026)", publisher: "Petful", year: 2026, href: SRC.petfulCost },
    { label: "Is The Farmer's Dog safe?", publisher: "Petful", href: SRC.petfulSafe },
    { label: "The Farmer's Dog review", publisher: "Dog Food Advisor", href: SRC.dfa },
    { label: "The Farmer's Dog food review", publisher: "Reviewed", href: SRC.reviewed },
    { label: "The farm-to-table movement comes to your dog's dish", publisher: "The Bridge", href: SRC.origin },
  ],
};
