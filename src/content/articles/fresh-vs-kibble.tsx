import Link from "next/link";
import { H2, P, Callout } from "@/components/page-shell";
import { comparePath } from "@/lib/dogfood/pairs";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, dryMatter, gramsPer1000kcal, kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const one = (n: number) => n.toFixed(1);

// Illustrative labels only (not any specific brand): typical guaranteed-analysis
// values for a dry extruded kibble and a gently cooked fresh food.
const KIBBLE = { protein: 26, fat: 16, moisture: 10, kcalPerKg: 3600 };
const FRESH = { protein: 11, fat: 7, moisture: 72, kcalPerKg: 1300 };

const k50 = kcalPerDayForLb(50);
const gramsKibble = (k50 / KIBBLE.kcalPerKg) * 1000;
const gramsFresh = (k50 / FRESH.kcalPerKg) * 1000;
const waterKibble = (gramsKibble * KIBBLE.moisture) / 100;
const waterFresh = (gramsFresh * FRESH.moisture) / 100;

// Sources (each read during the 2026-11-05 run).
const ILLINOIS_2021 = "https://www.eurekalert.org/news-releases/786753";
const ILLINOIS_2021_FUNDING = "https://www.veterinarypracticenews.com/human-grade-dog-chow-might-aid-digestion/";
const ALGYA_2018 = "https://experts.illinois.edu/en/publications/apparent-total-tract-macronutrient-digestibility-of-mildly-cooked/";
const EXTRUSION_THESIS = "https://edepot.wur.nl/121964";
const VOHC = "https://vohc.org/";
const APOP = "https://petobesityprevention.org/2022";

// Our own dataset: every Trustpilot review captured for our brand reviews (Nov 4, 2026).
const TP_TOTAL = 282;
const TP_PICKY = 39;
const TP_PRICE = 33;

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-semibold text-[#A16207] hover:underline">{children}</Link>
);
const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} rel="noopener" className="font-semibold text-[#A16207] hover:underline">{children}</a>
);

function Table({ caption, head, rows, note }: { caption: string; head: string[]; rows: React.ReactNode[][]; note?: string }) {
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
  slug: "fresh-vs-kibble",
  title: "Fresh Dog Food vs Kibble: What Actually Changes for Your Dog (2026)",
  seoTitle: "Fresh Dog Food vs Kibble: What Actually Changes (2026)",
  description:
    "Fresh food vs kibble, without the hype: what changes in digestion, stool, water intake, portion size and teeth, what stays the same, and what the studies show.",
  publishedAt: "2026-11-05",
  updatedAt: "2026-11-05",
  readMinutes: 8,
  category: "Nutrition",
  answer: {
    question: "What changes when you switch a dog from kibble to fresh food?",
    text: "Mostly digestion, water and volume. Fresh food is less processed, about 70% water and more digestible in small studies, so dogs eat a bigger bowl, drink less and produce less stool. Completeness and calories still decide health.",
  },
  keyTakeaways: [
    "In a 2021 University of Illinois trial, dogs on kibble produced 1.5-2.9x more stool than on fresh diets and had to eat more to hold their weight. It was 12 beagles and industry-funded.",
    `Water is the biggest visible change: at the same ${fmt(k50)} kcal a day, a 50 lb dog gets roughly ${fmt(waterFresh)} g of water from a typical fresh food versus ${fmt(waterKibble)} g from kibble (illustrative labels).`,
    "Ordinary kibble does little for teeth. It shatters when bitten; only diets with tested claims, such as VOHC-accepted ones, have shown a plaque or tartar benefit.",
    "What doesn't change: a food is only complete if its AAFCO statement covers your dog's life stage, and calories decide weight in either format.",
  ],
  faqs: [
    {
      question: "Is fresh dog food better than kibble?",
      answer: "It is more digestible and much higher in moisture in the studies we have, and many picky dogs prefer it. It is not proven to make dogs live longer. A complete kibble fed at the right calories is still a sound diet.",
    },
    {
      question: "Why does my dog poop less on fresh food?",
      answer: "More of the food is absorbed. In the 2021 Illinois trial, dogs on kibble produced 1.5 to 2.9 times as much stool as on fresh diets. Fresh food also contains less of the fiber and starch that add bulk.",
    },
    {
      question: "Will my dog drink less water on fresh food?",
      answer: "Usually, yes. Fresh food is around 70% water, so much of your dog's daily water arrives in the bowl. That's normal. Keep fresh water available and ask your vet if drinking suddenly drops or rises a lot.",
    },
    {
      question: "Does kibble clean dogs' teeth?",
      answer: "Not in any meaningful way. Typical kibble shatters when bitten, so it does little mechanical cleaning. Brushing works best, and only foods with tested claims, such as VOHC-accepted dental diets, have shown a measurable effect.",
    },
    {
      question: "Can I mix fresh food and kibble?",
      answer: "Yes. Replace part of your dog's daily calories with fresh food and cut the kibble by the same number of calories, not the same number of cups. A 25% fresh topper is the most common split.",
    },
  ],
  sources: [
    {
      label: "Do S, Phungviwatnikul T, de Godoy MRC, Swanson KS. Nutrient digestibility and fecal characteristics, microbiota, and metabolites in dogs fed human-grade foods. Journal of Animal Science (University of Illinois news release)",
      publisher: "University of Illinois / Journal of Animal Science",
      year: 2021,
      href: ILLINOIS_2021,
    },
    {
      label: "Human-grade dog chow might aid digestion (study design and funding)",
      publisher: "Veterinary Practice News",
      year: 2021,
      href: ILLINOIS_2021_FUNDING,
    },
    {
      label: "Algya KM et al. Apparent total-tract macronutrient digestibility of mildly cooked human-grade and extruded dog diets. Journal of Animal Science",
      publisher: "University of Illinois / Journal of Animal Science",
      year: 2018,
      href: ALGYA_2018,
    },
    {
      label: "Tran QD. Extrusion processing: effects on dry canine diets (PhD thesis; extrusion temperatures of 110-150 °C)",
      publisher: "Wageningen University",
      year: 2008,
      href: EXTRUSION_THESIS,
    },
    {
      label: "VOHC Accepted Products for Dogs (list checked November 2026)",
      publisher: "Veterinary Oral Health Council",
      year: 2026,
      href: VOHC,
    },
    {
      label: "2022 U.S. Pet Obesity Prevalence Survey",
      publisher: "Association for Pet Obesity Prevention",
      year: 2022,
      href: APOP,
    },
  ],
  relatedPaths: ["/diets/fresh", "/diets/transitioning-to-fresh", "/diets/mixed-feeding", "/diets/fresh-topper"],
};

export function Body() {
  return (
    <>
      <H2 id="difference">What is the real difference between fresh dog food and kibble?</H2>
      <P>
        The real difference is processing and water: kibble is extruded and dried to about 10% moisture, while fresh food is gently cooked, frozen or chilled, and around 70% water.
        Almost everything else you notice after a switch follows from those two facts.
      </P>
      <P>
        Kibble is made by forcing a cooked dough through an extruder, then drying and coating it. Research on canine diets describes extrusion temperatures of
        110-150 °C (230-300 °F) (<Ext href={EXTRUSION_THESIS}>Tran, Wageningen University, 2008</Ext>). Fresh food is cooked in batches at lower heat, portioned and frozen, so it keeps its water and looks like food you&apos;d recognize. Raw food skips cooking altogether, which brings its own risks; see <A href="/articles/is-raw-dog-food-safe">is raw dog food safe?</A>
      </P>
      <Table
        caption="Fresh dog food vs kibble at a glance"
        head={["", "Kibble", "Fresh (gently cooked)"]}
        rows={[
          ["Processing", "Extruded at high heat and pressure, then dried", "Cooked at lower heat, then frozen or chilled"],
          ["Water content", "About 10%", "About 70%"],
          ["Calories per cup", "High: small bowl", "Low: big bowl for the same calories"],
          ["Storage", "Pantry, months once sealed", "Freezer, then fridge for a few days"],
          ["Portioning", "You scoop and estimate", "Usually pre-portioned to a calorie target"],
          ["Completeness", "Only if the AAFCO statement says so", "Only if the AAFCO statement says so"],
        ]}
        note="Moisture and calorie figures are typical ranges; always check the guaranteed analysis on the food you buy."
      />

      <H2 id="digestion">Does a dog digest fresh food better than kibble?</H2>
      <P>
        Yes, in the small studies we have, fresh and mildly cooked diets were more digestible than extruded kibble. Two University of Illinois trials are the core evidence, and both have real limits.
      </P>
      <Table
        caption="What the digestibility studies found"
        head={["Study", "Dogs and diets", "Main finding", "Limits"]}
        rows={[
          [
            <Ext key="d" href={ILLINOIS_2021}>Do et al., 2021</Ext>,
            "12 beagles; kibble vs one fresh refrigerated and two fresh human-grade diets, 4 weeks each",
            "Kibble-fed dogs ate more to hold their weight and produced 1.5-2.9x more stool",
            "One breed, short trial, funded by a fresh-food company",
          ],
          [
            <Ext key="a" href={ALGYA_2018}>Algya et al., 2018</Ext>,
            "8 adult dogs; kibble vs two mildly cooked (roasted, refrigerated) diets and a raw diet",
            "Mildly cooked diets had higher protein and fat digestibility than kibble",
            "Small sample; funded by Freshpet, whose diets were tested",
          ],
        ]}
      />
      <P>
        Both studies measured what goes in and what comes out over weeks. Neither measured lifespan, disease rates or long-term health, and no study has shown fresh food changes those.
        The 2021 trial&apos;s funding is reported by <Ext href={ILLINOIS_2021_FUNDING}>Veterinary Practice News</Ext>.
      </P>
      <Callout>
        <strong>Our read:</strong> &ldquo;more digestible&rdquo; is well supported. &ldquo;Healthier&rdquo; is not yet proven. That is the standard we hold brand claims to in our <A href="/reviews/the-farmers-dog">Farmer&apos;s Dog review</A> and <A href="/reviews/ollie">Ollie review</A>.
      </Callout>

      <H2 id="volume">Why does a fresh-food bowl look so much bigger?</H2>
      <P>
        Because fresh food is mostly water, it carries far fewer calories per gram, so the same calories fill a much bigger bowl. The example below uses two illustrative labels, not specific brands.
      </P>
      <Table
        caption="Same dog, same calories: kibble vs fresh (illustrative labels)"
        head={["50 lb (22.7 kg) neutered adult", "Kibble example", "Fresh example"]}
        rows={[
          ["Label: protein / fat / moisture", `${KIBBLE.protein}% / ${KIBBLE.fat}% / ${KIBBLE.moisture}%`, `${FRESH.protein}% / ${FRESH.fat}% / ${FRESH.moisture}%`],
          ["Calories", `${fmt(KIBBLE.kcalPerKg)} kcal/kg`, `${fmt(FRESH.kcalPerKg)} kcal/kg`],
          ["Protein, dry-matter basis", `${one(dryMatter(KIBBLE.protein, KIBBLE.moisture))}% DM`, `${one(dryMatter(FRESH.protein, FRESH.moisture))}% DM`],
          ["Protein per 1,000 kcal", `${fmt(gramsPer1000kcal(KIBBLE.protein, KIBBLE.kcalPerKg))} g`, `${fmt(gramsPer1000kcal(FRESH.protein, FRESH.kcalPerKg))} g`],
          [`Food for ${fmt(k50)} kcal a day`, `${fmt(gramsKibble)} g`, `${fmt(gramsFresh)} g`],
          ["Water in that food", `${fmt(waterKibble)} g`, `${fmt(waterFresh)} g`],
        ]}
        note="Daily calories from RER x 1.6 for a neutered adult. Label values are illustrative; swap in your food's guaranteed analysis."
      />
      <P>
        Two things jump out. First, &ldquo;11% protein&rdquo; on a fresh label is not low: on a dry-matter basis it is {one(dryMatter(FRESH.protein, FRESH.moisture))}%, well above kibble&apos;s {one(dryMatter(KIBBLE.protein, KIBBLE.moisture))}% and far above AAFCO&apos;s adult minimum of {AAFCO.adult.proteinDM}% DM.
        Our guide to <A href="/articles/how-to-read-a-dog-food-label">reading a dog food label</A> walks through that conversion.
      </P>
      <P>
        Second, the fresh bowl weighs nearly {one(gramsFresh / gramsKibble)}x as much for the same energy. That is why you can&apos;t swap cups for cups. Convert by calories, using our <A href="/articles/how-much-fresh-food-to-feed-a-dog">fresh feeding guide</A>.
      </P>

      <H2 id="water">Will your dog drink less water on fresh food?</H2>
      <P>
        Probably, and that&apos;s expected. In the example above, the fresh diet delivers about {fmt(waterFresh)} g of water a day against {fmt(waterKibble)} g from kibble, so less needs to come from the water bowl.
      </P>
      <P>
        Total intake is what matters, not the bowl alone. Keep fresh water out at all times. A sudden, large change in thirst on any diet is worth a call to your vet.
      </P>

      <H2 id="stool">How will your dog&apos;s stool change after switching?</H2>
      <P>
        Expect smaller, firmer stools once your dog adjusts, and possibly a softer few days during the switch. Smaller volume is the digestibility finding above, showing up in your yard.
      </P>
      <P>
        Switch over about 10 days, moving roughly a quarter of the calories at a time; our <A href={dietPath("transitioning-to-fresh")}>transition plan</A> lays out each day.
        Dogs with a history of stomach trouble should go slower; see <A href={dietPath("sensitive-stomach")}>fresh food for sensitive stomachs</A>.
      </P>

      <H2 id="teeth">Does kibble clean a dog&apos;s teeth better than fresh food?</H2>
      <P>
        No, not in any meaningful way. Most kibble shatters as soon as your dog bites it, so there is very little scraping action on the tooth surface.
      </P>
      <P>
        Only specific dental diets and chews with tested claims have shown a reduction in plaque or tartar; the Veterinary Oral Health Council lists the ones that met its standard (<Ext href={VOHC}>VOHC</Ext>).
        Fresh food doesn&apos;t clean teeth either. Brushing and regular dental checks do the real work on either diet.
      </P>

      <H2 id="picky">Do picky dogs really eat fresh food better?</H2>
      <P>
        Owners say so often. Of the {TP_TOTAL} Trustpilot reviews we read for our brand reviews, {TP_PICKY} ({Math.round((TP_PICKY / TP_TOTAL) * 100)}%) mention a picky, finicky or fussy eater, more than mention price ({TP_PRICE}).
        That is owner testimony, not a trial, and the reviews sit on the brands&apos; own profiles. Still, it matches what feeding trials can&apos;t easily measure: dogs choose taste and smell.
      </P>
      <P>
        You can read every one of those reviews on our <A href="/reviews/spot-and-tango">Spot &amp; Tango</A> and <A href="/reviews/the-pets-table">The Pets Table</A> review pages. For a dog that walks away from its bowl, see our <A href={bestForPath("picky-eater")}>best food for picky eaters</A>.
      </P>

      <H2 id="same">What stays the same whether you feed fresh or kibble?</H2>
      <P>
        Completeness and calories stay the same. A food is only complete and balanced if its AAFCO nutritional adequacy statement covers your dog&apos;s life stage, and that is true of a $5 bag and a $15 box alike.
      </P>
      <P>
        Calories still decide weight. Vets rated <strong>59% of US dogs overweight or obese</strong> in the Association for Pet Obesity Prevention&apos;s 2022 survey (<Ext href={APOP}>APOP, 2022</Ext>), and overfeeding fresh food adds weight as surely as overfeeding kibble.
        If weight is your goal, start with <A href={dietPath("weight-management")}>fresh food for weight management</A>.
      </P>

      <H2 id="choose">Should you switch your dog from kibble to fresh?</H2>
      <P>
        Switch if your dog is picky, needs tight portion control, or you want the digestibility and moisture benefits and the cost fits. Stay with a complete kibble if budget or freezer space rules fresh out; your dog is not missing a proven health benefit.
      </P>
      <P>
        The middle path works well: replace about 25% of calories with fresh food (<A href={dietPath("fresh-topper")}>fresh toppers</A>, <A href={dietPath("mixed-feeding")}>mixed feeding</A>).
        For the cost question, read <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A> To pick a brand, start with our <A href="/">2026 ranking</A> or the head-to-head <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A>, scored with our <A href="/how-we-rank">published rubric</A>.
      </P>
    </>
  );
}
