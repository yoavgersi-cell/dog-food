import { H2, P, Callout } from "@/components/page-shell";
import { FORMAT_LABEL, RANKED_BRANDS, type Brand } from "@/lib/dogfood/brands";
import { PRODUCTS, PRODUCT_TYPES, fmtPrice, groupByType } from "@/lib/dogfood/products";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, kcalPerDayForLb } from "@/lib/nutrition";
import { A, Ext, List, Part, SRC, Table, fmt } from "./ui";

function BrandProfile({ b }: { b: Brand }) {
  const products = PRODUCTS.filter((p) => p.brand === b.slug);
  const groups = groupByType(products);
  const lo = products.length ? Math.min(...products.map((p) => p.price)) : null;
  const hi = products.length ? Math.max(...products.map((p) => p.price)) : null;
  const tp = b.trustpilot;
  return (
    <section aria-labelledby={`profile-${b.slug}`} className="mb-7">
      <h3 id={`profile-${b.slug}`} className="mb-2 mt-6 text-[19px] font-bold text-[#191919]">
        {b.rank}. {b.name}: {b.verdict.charAt(0).toLowerCase() + b.verdict.slice(1)} ({b.score.toFixed(1)}/10)
      </h3>
      <P>{b.summary}</P>
      <Table
        caption={`${b.name} at a glance`}
        head={["", b.name]}
        rows={[
          ["Formats", b.formats.map((f) => FORMAT_LABEL[f]).join(", ")],
          ["Storage", b.storage],
          ["Products we track", products.length ? `${products.length} (${groups.map((g) => `${g.items.length} ${g.label.toLowerCase()}`).join(", ")})` : "None yet"],
          ["Listed prices (Nov 5, 2026)", lo !== null && hi !== null ? `${fmtPrice(lo)} to ${fmtPrice(hi)} per product` : "Not captured"],
          ["Trustpilot", tp ? `${tp.rating.toFixed(1)}/5 from ${tp.reviewCount ? fmt(tp.reviewCount) : tp.reviewCountLabel} reviews` : "No Trustpilot profile in our data"],
          ["Best for", b.bestFor.join("; ")],
          ["Not ideal for", b.notIdealFor.join("; ")],
        ]}
      />
      <P>
        <strong>Pros:</strong> {b.pros.join("; ")}. <strong>Cons:</strong> {b.cons.join("; ")}. Read the <A href={`/reviews/${b.slug}`}>full {b.name} review</A>
        {tp ? <>, including every Trustpilot review we captured</> : null}.
      </P>
    </section>
  );
}

const MISTAKES: [string, React.ReactNode][] = [
  ["Swapping cups for cups", "Fresh food carries far fewer calories per cup than kibble. Convert by calories, or your dog ends up underfed on fresh food."],
  ["Adding a topper without cutting the kibble", "A 25% topper on top of a full kibble ration is 25% more calories every day. Reduce the kibble by the calories you add."],
  ["Switching overnight", <>Stools loosen fast after an abrupt change (<Ext key="l" href={SRC.lin2022}>Lin et al., 2022</Ext>). Switch over 7-10 days.</>],
  ["Feeding an adult-only recipe to a puppy", "Check the AAFCO statement says growth or all life stages, and large-size growth for big breeds."],
  ["Judging the price on the trial box", "Trial prices apply to the first order. Compare the ongoing price per 1,000 kcal."],
  ["Missing the renewal date", "Many trials roll into a full-price subscription. Note the charge date or pause the plan."],
  ["Thawing on the counter", "The FDA advises thawing pet food in the fridge or microwave, never on the counter or in the sink."],
  ["Treating raw like cooked", "Raw food needs raw-meat hygiene, and it's a poor fit for homes with small children, older adults, pregnant or immunocompromised people."],
  ["Never weighing the dog", "The plan's calorie target is an estimate. Weigh and check body condition every few weeks and adjust."],
  ["Replacing a prescription diet", "If your vet prescribed a therapeutic diet, don't swap it for a fresh plan without their agreement."],
];

const GLOSSARY: [string, string][] = [
  ["AAFCO statement", "The nutritional adequacy statement on a label saying whether a food is complete and balanced, and for which life stage."],
  ["All life stages", "A food formulated to meet growth and reproduction minimums as well as adult ones, so it suits puppies too."],
  ["As fed", "Nutrient values as they appear in the food, water included. Fresh food looks low on protein as fed because it's mostly water."],
  ["Dry matter (DM)", "Nutrient values with the water removed: as-fed % / (100 - moisture %) x 100. Lets you compare fresh food and kibble fairly."],
  ["Per 1,000 kcal", "Grams of a nutrient per 1,000 calories. The fairest comparison across foods with different water and fat levels."],
  ["kcal/kg", "Calories per kilogram of food. You need it to portion by calories and to compare cost."],
  ["RER", "Resting energy requirement: 70 x (body weight in kg to the power of 0.75)."],
  ["MER", "Maintenance energy requirement: RER multiplied by a life-stage factor, such as 1.6 for a neutered adult."],
  ["Gently cooked", "Cooked at lower temperatures in batches rather than extruded; the most common fresh format."],
  ["Extrusion", "The high-heat, high-pressure process that makes kibble; research describes 110-150 °C."],
  ["Human-grade", "Every ingredient and the finished food are edible for people and made, stored and transported under human-food rules."],
  ["Feeding trial", "An AAFCO protocol in which dogs eat the food for a set period to show it supports them, as opposed to formulation alone."],
  ["Topper", "A small amount of fresh food added to another complete food; usually around 25% of calories or less."],
  ["Pulses", "Legume seeds such as peas, lentils and chickpeas; common in grain-free recipes and in the FDA's DCM reports."],
  ["DCM", "Dilated cardiomyopathy, a heart muscle disease investigated by the FDA for a possible link to pulse-heavy diets."],
  ["HPP", "High-pressure processing, a non-heat method some raw brands use to reduce pathogens; ask brands whether theirs is validated."],
  ["Body condition score (BCS)", "A 9-point scale vets use to judge fat cover; 4-5 out of 9 is ideal for most dogs, 4 for large-breed puppies per the WSAVA."],
];

export function Part5() {
  const k25 = kcalPerDayForLb(25);
  return (
    <>
      <Part id="brands" n={7} title="Brands, mistakes and quick reference" />
      <H2 id="brand-profiles">Which fresh dog food brands should you know?</H2>
      <P>
        These are the seven brands we review, in ranking order. Each profile pulls from our brand data, our product listings and the Trustpilot reviews we captured, so the numbers match what you&apos;ll see on each brand&apos;s page.
      </P>
      {RANKED_BRANDS.map((b) => (
        <BrandProfile key={b.slug} b={b} />
      ))}
      <P>
        Can&apos;t decide between two? We have a head-to-head page for every pairing, from <A href="/compare/the-farmers-dog-vs-ollie">The Farmer&apos;s Dog vs Ollie</A> to <A href="/compare/maxbone-vs-redbarn">Maxbone vs Redbarn</A>; see <A href="/compare">all comparisons</A>.
      </P>

      <H2 id="subscription">How does a fresh dog food subscription work?</H2>
      <P>
        You answer a short questionnaire, the brand sets a daily calorie target, and frozen packs arrive on a schedule. Most work the same way, with small differences in how much you can customise.
      </P>
      <List
        ordered
        items={[
          "Tell the brand your dog's weight, age, breed, activity, body shape and any health issues.",
          "The brand calculates daily calories and suggests recipes and a plan (full fresh, mixed or topper).",
          "A trial or first box arrives frozen in an insulated box, with feeding instructions per pack.",
          "Later boxes ship on a schedule, usually every few weeks, sized to your freezer and your dog's intake.",
          "You can typically change recipes, pause, skip or cancel online before each charge cut-off.",
        ]}
      />
      <P>
        Two things to set up on day one: a reminder before the first renewal charge, and a delivery interval that matches your freezer space. If deliveries are a problem where you live, reviews often mention leaving instructions for the courier; the brands&apos; customer service teams handle most delivery issues.
      </P>

      <H2 id="picky-eaters">Is fresh dog food good for picky eaters?</H2>
      <P>
        It&apos;s one of the strongest reasons owners switch. Of the 282 Trustpilot reviews we read across four brands, 39 (14%) mention a picky, finicky or fussy eater, more than mention price.
        That&apos;s owner testimony, not a trial, but it matches what owners and vets see: taste and smell drive appetite.
      </P>
      <P>
        If your picky dog hesitates at first, keep the share of new food small for longer and let acceptance set the pace. AAHA suggests simple flavour helpers during a switch, such as a little low-salt chicken or beef broth (<Ext href={SRC.aaha}>AAHA, 2021</Ext>).
        Rotating recipes within a brand can also help dogs that get bored. See our <A href={bestForPath("picky-eater")}>picky eater guide</A>.
      </P>

      <H2 id="mistakes">What are the most common fresh dog food mistakes?</H2>
      <P>Most problems with fresh food come from the same ten habits, and all of them are easy to fix:</P>
      <Table caption="Ten common fresh dog food mistakes and the fix" head={["Mistake", "The fix"]} rows={MISTAKES.map(([m, f]) => [m, f])} />

      <H2 id="numbers">What are the key fresh dog food numbers?</H2>
      <P>Here are the figures in this guide in one place, each with its source:</P>
      <Table
        caption="Fresh dog food by the numbers"
        head={["Figure", "Value", "Source"]}
        rows={[
          ["Cost per day, The Farmer's Dog (small to giant dog)", "About $2.31 to $26.77", "Petful, 2026"],
          ["Extra stool on kibble vs fresh diets", "1.5-2.9x", "University of Illinois, 2021"],
          ["US dogs overweight or obese", "59%", "APOP, 2022"],
          ["Raw pet food samples with Listeria / Salmonella", "16.3% / 7.7% (of 196)", "FDA CVM, 2010-2012"],
          ["Dry dog food samples with either", "0 of 120", "FDA CVM, 2010-2012"],
          ["Raw diets with antibiotic-resistant E. coli", "80% (of 35)", "van Bree et al., 2018"],
          ["Dogs shedding Salmonella after a contaminated raw meal", "7 of 16", "Finley et al., 2007"],
          ["DCM reports in dogs, 2014-2022", "1,382", "FDA"],
          ["Grain-free share of DCM-reported diets", "More than 90%", "FDA"],
          ["Recommended switch period", "7 days, starting at 25%", "AAHA, 2021"],
          ["Gut bacteria settling after an abrupt switch", "About 6 days", "Lin et al., 2022"],
          ["Treats and complementary foods", "10% of the diet or less", "WSAVA, 2021"],
          ["AAFCO protein minimum, growth vs adult (DM)", `${AAFCO.growth.proteinDM}% vs ${AAFCO.adult.proteinDM}%`, "AAFCO"],
          ["Large-breed puppy calcium cap (DM)", `${AAFCO.largeBreedGrowthCaMaxDM}%`, "AAFCO"],
          ["Daily calories, 25 lb neutered adult", `About ${fmt(k25)} kcal`, "Standard RER x 1.6 formula"],
          ["Products we track, 7 brands", `${PRODUCTS.length} across ${Object.keys(PRODUCT_TYPES).length} types`, "Dog Food Scout listings, Nov 5, 2026"],
        ]}
      />

      <H2 id="glossary">What do fresh dog food terms mean?</H2>
      <P>Labels and brand pages use a lot of jargon. Here&apos;s what the common terms mean, in plain English:</P>
      <dl className="mb-6 space-y-3">
        {GLOSSARY.map(([term, def]) => (
          <div key={term} className="rounded-lg border border-[#F3E3A3] bg-white p-3.5">
            <dt className="text-[15.5px] font-bold text-[#191919]">{term}</dt>
            <dd className="mt-1 text-[15px] leading-relaxed text-gray-700">{def}</dd>
          </div>
        ))}
      </dl>

      <H2 id="bottom-line">Should you switch to fresh dog food?</H2>
      <P>
        Switch if your dog is picky, needs strict portion control, or you want the digestibility and taste benefits and the cost fits your budget. A topper gets you much of the way for a quarter of the price.
      </P>
      <P>
        Stay with a complete kibble if money or freezer space rules fresh out; your dog isn&apos;t missing a proven health benefit. Avoid raw food if anyone in your home is very young, old, pregnant or immunocompromised. And whatever you choose, feed by calories, weigh your dog, and keep your vet in the loop.
      </P>
      <Callout>
        <strong>Next steps:</strong> check your dog&apos;s calories in the <A href="#how-much">feeding table</A>, compare the <A href="#best">top three brands</A>, then follow the <A href="/articles/how-to-switch-dog-to-fresh-food">10-day switching plan</A>. If you&apos;re unsure about cost, start with a <A href={dietPath("fresh-topper")}>topper</A>.
      </Callout>
    </>
  );
}
