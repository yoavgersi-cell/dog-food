import Link from "next/link";
import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";

// Sources (each opened and read during the 2026-11-07 run).
const AAHA = "https://www.aaha.org/wp-content/uploads/globalassets/05-pet-health-resources/nutritionalresources/petparent/aaha-tips-and-timelines.pdf";
const LIN_2022 = "https://pmc.ncbi.nlm.nih.gov/articles/PMC9341101/";
const FDA_HANDLING = "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

// Illustrative calorie densities (not specific brands); check your own labels.
const KIBBLE_KCAL_PER_KG = 3600;
const FRESH_KCAL_PER_KG = 1300;

const k25 = kcalPerDayForLb(25);
const PHASES: { days: string; fresh: number }[] = [
  { days: "Days 1-3", fresh: 0.25 },
  { days: "Days 4-6", fresh: 0.5 },
  { days: "Days 7-9", fresh: 0.75 },
  { days: "Day 10 onward", fresh: 1 },
];
const gramsFor = (kcal: number, kcalPerKg: number) => (kcal / kcalPerKg) * 1000;

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
  slug: "how-to-switch-dog-to-fresh-food",
  title: "How to Switch Your Dog to Fresh Food: A 10-Day Plan That Works (2026)",
  seoTitle: "How to Switch Your Dog to Fresh Food: 10-Day Plan (2026)",
  description:
    "A day-by-day plan for switching your dog from kibble to fresh food, mixed by calories, not cups. What's normal, when to slow down, and what the research shows.",
  publishedAt: "2026-11-07",
  updatedAt: "2026-11-07",
  readMinutes: 8,
  category: "Feeding",
  answer: {
    question: "How do you switch a dog to fresh food?",
    text: "Over about 10 days: 25% fresh for days 1-3, 50% for days 4-6, 75% for days 7-9, then 100%. Swap by calories, not by cups, because fresh food is mostly water. Slow down if stools stay loose for more than a day or two.",
  },
  keyTakeaways: [
    "The American Animal Hospital Association advises switching a dog over seven days, starting by replacing 25% of the old food. We stretch it to 10 for fresh food because the format changes so much.",
    "An abrupt change works fast on the gut: in a 2022 study, dogs' stools loosened right after a sudden switch, metabolites shifted within 2 days and gut bacteria within about 6.",
    `Mix by calories. For a 25 lb dog on ${fmt(k25)} kcal a day, a quarter of the calories is about ${fmt(gramsFor(k25 * 0.25, FRESH_KCAL_PER_KG))} g of fresh food but only ${fmt(gramsFor(k25 * 0.25, KIBBLE_KCAL_PER_KG))} g of kibble (illustrative labels).`,
    "Expect smaller, firmer stools and a bit less drinking once the switch settles. Vomiting, blood or diarrhoea that lasts are reasons to stop and call your vet.",
  ],
  faqs: [
    {
      question: "Can I switch my dog to fresh food cold turkey?",
      answer: "You can, and many dogs cope, but it raises the chance of loose stools. In a 2022 study, an abrupt diet change loosened dogs' stools quickly. A gradual 7 to 10 day switch is the standard veterinary advice.",
    },
    {
      question: "How much fresh food do I mix with kibble during the switch?",
      answer: "Split your dog's daily calories, not its cups. On days 1-3, a quarter of the calories come from fresh food and three quarters from kibble; then half and half, then three quarters fresh, then all fresh.",
    },
    {
      question: "Is diarrhea normal when switching to fresh food?",
      answer: "Slightly softer stools for a day or two are common. Go back a step and hold there for a few days. Diarrhoea that lasts, vomiting, blood or lethargy are reasons to stop and call your vet.",
    },
    {
      question: "Why is my dog pooping less on fresh food?",
      answer: "Fresh food is more digestible in the studies we have, so less of it comes out the other end. Smaller, firmer stools are an expected sign the switch is working.",
    },
    {
      question: "Should I warm fresh dog food after thawing?",
      answer: "It isn't necessary. Thaw it in the fridge, not on the counter, and serve it straight from the fridge or let it sit briefly. Cover and refrigerate anything your dog leaves, or throw it away.",
    },
  ],
  sources: [
    { label: "Tips and Timelines for Transitioning Your Pet to a New Food", publisher: "American Animal Hospital Association", year: 2021, href: AAHA },
    { label: "Lin CY et al. Longitudinal fecal microbiome and metabolite data demonstrate rapid shifts and subsequent stabilization after an abrupt dietary change in healthy adult dogs. Animal Microbiome 2022", publisher: "Animal Microbiome (via PMC)", year: 2022, href: LIN_2022 },
    { label: "Safe handling tips for pet food (thawing, storage, leftovers)", publisher: "U.S. Food and Drug Administration", year: 2018, href: FDA_HANDLING },
  ],
  relatedPaths: ["/diets/transitioning-to-fresh", "/diets/fresh", "/diets/sensitive-stomach", "/diets/mixed-feeding"],
};

export function Body() {
  return (
    <>
      <H2 id="how-long">How long should it take to switch a dog to fresh food?</H2>
      <P>
        Plan on about 10 days. The American Animal Hospital Association (AAHA) advises moving dogs to any new food &ldquo;over seven days,&rdquo; starting by replacing 25% of the old food and increasing it based on how your dog takes it (<Ext href={AAHA}>AAHA, 2021</Ext>).
      </P>
      <P>
        We add three days for fresh food because the jump is bigger than a switch between two kibbles. The water content, fat level and texture all change at once. Ten days costs you little and gives a sensitive gut more time.
      </P>

      <H2 id="why-slowly">Why not switch your dog&apos;s food overnight?</H2>
      <P>
        Because a dog&apos;s gut reacts to a new diet within days, and stools often loosen first. In a 2022 University of Illinois study, 12 adult beagles were switched abruptly from kibble to a new diet (<Ext href={LIN_2022}>Lin et al., 2022</Ext>).
      </P>
      <P>
        Their fecal scores rose quickly, meaning looser stools, after both diet changes. The chemical products of their gut bacteria shifted within about 2 days, and the bacterial community itself took about 6 days to settle.
        The study didn&apos;t test a gradual switch, so it can&apos;t tell us how much stepping down helps. But it shows the gut needs most of a week to adjust, which is exactly the window a gradual switch covers.
      </P>
      <Callout>
        <strong>The short version:</strong> a gut needs about a week to re-settle after a diet change. Spreading the change over 10 days means it never has to absorb the whole jump at once.
      </Callout>

      <H2 id="plan">What does a 10-day switch to fresh food look like?</H2>
      <P>
        Four steps of roughly three days each, with the fresh share measured in calories. The second column is the one that matters; the grams are an example for a 25 lb (11.3 kg) neutered adult on {fmt(k25)} kcal a day.
      </P>
      <Table
        caption="10-day plan for switching a dog from kibble to fresh food"
        head={["When", "Share of daily calories from fresh food", "Fresh food (example)", "Kibble (example)"]}
        rows={PHASES.map((ph) => [
          ph.days,
          `${ph.fresh * 100}% fresh, ${(1 - ph.fresh) * 100}% old food`,
          `${fmt(gramsFor(k25 * ph.fresh, FRESH_KCAL_PER_KG))} g`,
          ph.fresh === 1 ? "None" : `${fmt(gramsFor(k25 * (1 - ph.fresh), KIBBLE_KCAL_PER_KG))} g`,
        ])}
        note={`Example uses illustrative labels: kibble at ${fmt(KIBBLE_KCAL_PER_KG)} kcal/kg and fresh food at ${fmt(FRESH_KCAL_PER_KG)} kcal/kg. Use the calorie figures on your own bag and packs.`}
      />
      <P>
        If stools are firm and your dog is eating well at the end of a step, move on. If they&apos;re soft, stay where you are for two or three more days. AAHA&apos;s advice is the same: increase the new food &ldquo;based on your pet&apos;s acceptance&rdquo;, not the calendar.
      </P>

      <H2 id="calories">Why should you mix by calories, not cups?</H2>
      <P>
        Because fresh food is mostly water, a cup of it carries far fewer calories than a cup of kibble. Swap cup for cup and your dog ends up underfed on fresh food; swap by weight in the other direction and you overfeed the kibble.
      </P>
      <P>
        In our example, the same 25% of calories is about {fmt(gramsFor(k25 * 0.25, KIBBLE_KCAL_PER_KG))} g of kibble but {fmt(gramsFor(k25 * 0.25, FRESH_KCAL_PER_KG))} g of fresh food. That&apos;s why the fresh portion looks so big, and why a pre-portioned plan helps.
        Our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A> shows how to set the daily total, and <A href="/articles/fresh-vs-kibble">fresh vs kibble</A> explains the water difference.
      </P>
      <Table
        caption="Daily calories by body weight, neutered adult dogs"
        head={["Dog's weight", "Daily calories", "25% fresh (calories)", "Fresh food for that 25% (example)"]}
        rows={[10, 25, 50, 75].map((lb) => {
          const k = kcalPerDayForLb(lb);
          return [`${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`, `${fmt(k)} kcal`, `${fmt(k * 0.25)} kcal`, `${fmt(gramsFor(k * 0.25, FRESH_KCAL_PER_KG))} g`];
        })}
        note="Calories from 70 x kg^0.75 x 1.6 (neutered adult). Active dogs need more; less active and senior dogs usually need less."
      />

      <H2 id="normal">What&apos;s normal during the switch, and what isn&apos;t?</H2>
      <P>Most changes during a switch are expected. Here&apos;s how we&apos;d read them:</P>
      <Table
        caption="Normal changes vs warning signs when switching to fresh food"
        head={["What you see", "What it usually means", "What to do"]}
        rows={[
          ["Slightly softer stool for a day or two", "The gut is adjusting", "Hold the current step for 2-3 more days"],
          ["Smaller, firmer stools after a week", "More of the food is being digested", "Nothing; this is the goal"],
          ["Drinking a little less water", "Fresh food carries much of the day's water", "Keep fresh water out as usual"],
          ["Picking out the fresh food first", "A preference, not a problem", "Keep to the plan's calorie split"],
          ["Diarrhoea that lasts, vomiting, blood, lethargy", "More than an adjustment", "Stop the switch and call your vet"],
        ]}
      />

      <H2 id="slower">When should you switch more slowly?</H2>
      <P>
        Take two weeks or more, and talk to your vet first, if your dog has a history of stomach trouble or pancreatitis, is on a prescription diet, or is a senior with health problems.
        Never swap out a prescription diet without your vet&apos;s agreement.
      </P>
      <P>
        For dogs with delicate digestion, see <A href={dietPath("sensitive-stomach")}>fresh food for sensitive stomachs</A>. For older dogs, our <A href={bestForPath("senior-dog")}>senior dog guide</A> covers lower calorie needs.
      </P>

      <H2 id="puppies">How should puppies switch to fresh food?</H2>
      <P>
        The same gradual pattern works, with two extra checks. First, the fresh food must be complete for growth: its AAFCO statement should say &ldquo;growth&rdquo; or &ldquo;all life stages&rdquo;, not adult maintenance only (<A href="/articles/how-to-read-a-dog-food-label">how to read the label</A>).
      </P>
      <P>
        Second, puppies need far more calories per pound than adults, so total daily calories must stay at the puppy level throughout. See our <A href={bestForPath("puppy")}>puppy food guide</A> for the numbers.
      </P>

      <H2 id="picky">What if your dog won&apos;t eat the fresh food?</H2>
      <P>
        Picky eating is one of the most common reasons owners try fresh food in the first place. If yours hesitates, keep the share of new food small for longer and let acceptance set the pace.
      </P>
      <P>
        AAHA suggests simple flavour helpers for dogs during a switch, such as a little low-salt chicken or beef broth (<Ext href={AAHA}>AAHA, 2021</Ext>). Our <A href={bestForPath("picky-eater")}>picky eater guide</A> covers which brands fussy dogs tend to prefer.
      </P>

      <H2 id="handling">How should you thaw and store fresh food during the switch?</H2>
      <P>
        Keep packs frozen until you need them, and thaw the next day&apos;s portions in the fridge, not on the counter. Cover and refrigerate anything your dog leaves, or throw it out.
        Those are the FDA&apos;s standard pet food handling steps, and it advises following them &ldquo;no matter what type of pet food you feed&rdquo; (<Ext href={FDA_HANDLING}>FDA</Ext>).
      </P>
      <P>
        Wash bowls after each meal and your hands after handling the food. If you&apos;re considering raw rather than cooked fresh food, read <A href="/articles/is-raw-dog-food-safe">is raw dog food safe?</A> first.
      </P>

      <H2 id="after">What happens after the switch?</H2>
      <P>
        Weigh your dog and check its body condition two to four weeks in. If it&apos;s gaining or losing, adjust the daily calories in small steps and re-check after a couple of weeks. Fresh plans portion to a starting estimate, not a guarantee.
      </P>
      <P>
        You don&apos;t have to go 100% fresh. Many owners stop at a <A href={dietPath("fresh-topper")}>fresh topper</A> or a <A href={dietPath("mixed-feeding")}>mixed plan</A> to control cost; <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A> covers the trade-off.
        To choose a brand, start with our <A href="/">2026 ranking</A> or <A href="/compare/the-farmers-dog-vs-ollie">The Farmer&apos;s Dog vs Ollie</A>.
      </P>
    </>
  );
}
