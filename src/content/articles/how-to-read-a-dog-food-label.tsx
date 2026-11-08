import Link from "next/link";
import { H2, P, Callout } from "@/components/page-shell";
import { comparePath } from "@/lib/dogfood/pairs";
import { bestForPath, dietPath, ingredientPath } from "@/lib/dogfood/taxonomy";
import { AAFCO, dryMatter, gramsPer1000kcal } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";

// Illustrative labels used for the worked examples. They are clearly labelled
// as examples on the page - not any brand's real analysis.
const FRESH = { protein: 11, fat: 7, fiber: 1, moisture: 72, kcalPerKg: 1300 };
const KIBBLE = { protein: 26, fat: 15, fiber: 4, moisture: 10, kcalPerKg: 3600 };

const dm = (v: number, m: number) => dryMatter(v, m).toFixed(1);
const per1000 = (v: number, kcal: number) => gramsPer1000kcal(v, kcal).toFixed(1);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-semibold text-[#A16207] hover:underline">{children}</Link>
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
  slug: "how-to-read-a-dog-food-label",
  title: "How to Read a Dog Food Label: Dry Matter, AAFCO Statements and Ingredient Names",
  seoTitle: "How to Read a Dog Food Label (Dry Matter Explained)",
  description:
    "Fresh food at 11% protein can beat kibble at 26%. Learn to convert any label to dry matter, check the AAFCO statement and decode names like 'beef dinner'.",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
  readMinutes: 9,
  category: "Nutrition",
  answer: {
    question: "How do you read a dog food label?",
    text: `Check four things: the AAFCO statement (is it complete and balanced for your dog's life stage?), the guaranteed analysis converted to a dry matter basis, the calorie statement, and the first few ingredients. Never compare as-fed percentages across fresh and dry food: an 11% protein fresh food is ${dm(FRESH.protein, FRESH.moisture)}% protein on a dry matter basis.`,
  },
  keyTakeaways: [
    "Start with the AAFCO statement. A food that isn't \"complete and balanced\" for your dog's life stage is a topper, not a diet.",
    `Guaranteed analysis is as-fed. Divide by (100 - moisture) to get dry matter: ${FRESH.protein}% protein at ${FRESH.moisture}% moisture is ${dm(FRESH.protein, FRESH.moisture)}% DM.`,
    `Protein per 1,000 kcal is the fairest comparison. AAFCO's adult minimum is ${AAFCO.adult.proteinPer1000} g; growth is ${AAFCO.growth.proteinPer1000} g.`,
    "The product name is regulated: \"Beef Dog Food\" means at least 95% beef (excluding water), \"Beef Dinner\" at least 25%, \"with Beef\" only 3%.",
  ],
  faqs: [
    {
      question: "What does \"dry matter basis\" mean on dog food?",
      answer: `It is the nutrient level after removing water. Divide the as-fed percentage by (100 - moisture %) and multiply by 100. A fresh food with ${FRESH.protein}% protein and ${FRESH.moisture}% moisture is ${dm(FRESH.protein, FRESH.moisture)}% protein on a dry matter basis.`,
    },
    {
      question: "How much protein should dog food have?",
      answer: `AAFCO's minimum for adult maintenance is ${AAFCO.adult.proteinDM}% on a dry matter basis (${AAFCO.adult.proteinPer1000} g per 1,000 kcal). For puppies and pregnant or nursing dogs it is ${AAFCO.growth.proteinDM}% DM (${AAFCO.growth.proteinPer1000} g per 1,000 kcal). Most fresh foods sit well above both.`,
    },
    {
      question: "Does the first ingredient matter?",
      answer: "It matters less than people think. Ingredients are listed by weight before cooking, so fresh meat, which is about 70% water, ranks high even when it contributes less protein than a dry ingredient lower down the list.",
    },
    {
      question: "Why don't dog food labels list carbohydrates?",
      answer: "Carbohydrate is not required on the guaranteed analysis. You can estimate it by difference (100 minus protein, fat, fiber, moisture and ash) if the brand publishes ash. Without ash, the estimate is unreliable.",
    },
  ],
  relatedPaths: ["/how-we-rank", "/diets/high-protein", "/diets/human-grade", "/diets/grain-free", "/brands"],
};

export function Body() {
  return (
    <>
      <H2 id="what-must-a-label-say">What does a dog food label have to tell you?</H2>
      <P>
        A complete dog food label must show five things: the product name, a guaranteed analysis, an ingredient list, a nutritional adequacy (AAFCO) statement and a calorie statement.
        US pet food labels follow FDA rules and the AAFCO model regulations most states adopt. Read them in this order: adequacy statement first, ingredients last.
      </P>
      <Table
        caption="What each part of a dog food label tells you"
        head={["Label section", "What it tells you", "What it doesn't"]}
        rows={[
          ["AAFCO statement", "Whether the food is complete and balanced, and for which life stage", "How well it is made or how much it costs"],
          ["Guaranteed analysis", "Minimum protein and fat, maximum fiber and moisture, as-fed", "Exact values, carbohydrates, or a fair comparison across formats"],
          ["Calorie statement", "kcal per kg (and per cup or pack) - the number portions are built on", "Whether the calories come from protein, fat or carbs"],
          ["Ingredient list", "Every ingredient, in descending order by weight before cooking", "How much of each ingredient there is"],
          ["Product name", "A regulated minimum share of the named ingredient", "Ingredient quality or sourcing"],
        ]}
      />

      <H2 id="aafco-statement">Which AAFCO statement should you look for?</H2>
      <P>
        Look for the words &quot;complete and balanced&quot; plus a life stage that matches your dog. Anything labelled &quot;for intermittent or supplemental feeding only&quot; is a topper or treat, not a full diet.
      </P>
      <P>The statement also tells you <strong>how</strong> the claim was earned, and the two routes are not equal:</P>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li><strong>&quot;Formulated to meet the nutrient levels established by the AAFCO Dog Food Nutrient Profiles&quot;</strong> means the recipe was checked on paper (and usually by lab analysis) against the minimums.</li>
        <li><strong>&quot;Animal feeding tests using AAFCO procedures substantiate…&quot;</strong> means the food was also fed to dogs under a standard protocol. This is the stronger claim.</li>
        <li><strong>Life stage:</strong> &quot;adult maintenance&quot;, &quot;growth and reproduction&quot; or &quot;all life stages&quot;. Puppies need growth or all life stages.</li>
        <li><strong>Large-breed puppies</strong> (expected adult weight 70 lb / 32 kg or more) need the extra wording &quot;including growth of large size dogs&quot;, which caps calcium at {AAFCO.largeBreedGrowthCaMaxDM}% DM.</li>
      </ul>
      <P>
        Puppy owners can go straight to <A href={bestForPath("puppy")}>best fresh food for puppies</A> or <A href={bestForPath("large-breed-puppy")}>large-breed puppies</A>.
      </P>

      <H2 id="guaranteed-analysis">Why is the guaranteed analysis misleading?</H2>
      <P>
        The guaranteed analysis is reported &quot;as fed&quot;, water included. Fresh food is about 70% water and kibble about 10%, so their protein percentages are not comparable as printed.
      </P>
      <P>
        The figures are also minimums and maximums, not exact values. &quot;Crude protein (min) 11%&quot; means at least 11%. The true value can be higher, and two foods with the same guarantee can differ.
      </P>

      <H2 id="dry-matter">How do you convert a label to a dry matter basis?</H2>
      <P>
        Divide each nutrient by the share of the food that isn&apos;t water: <strong>DM % = as-fed % / (100 - moisture %) x 100</strong>. It takes 10 seconds and removes the water from the comparison.
      </P>
      <P>Worked example, using two illustrative labels (not any specific brand):</P>
      <Table
        caption="Dry matter conversion example: fresh food vs kibble"
        head={["", "Fresh (example)", "Kibble (example)"]}
        rows={[
          ["Protein, as-fed", `${FRESH.protein}%`, `${KIBBLE.protein}%`],
          ["Fat, as-fed", `${FRESH.fat}%`, `${KIBBLE.fat}%`],
          ["Moisture", `${FRESH.moisture}%`, `${KIBBLE.moisture}%`],
          [<strong key="p">Protein, dry matter</strong>, <strong key="pf">{dm(FRESH.protein, FRESH.moisture)}% DM</strong>, <strong key="pk">{dm(KIBBLE.protein, KIBBLE.moisture)}% DM</strong>],
          ["Fat, dry matter", `${dm(FRESH.fat, FRESH.moisture)}% DM`, `${dm(KIBBLE.fat, KIBBLE.moisture)}% DM`],
        ]}
      />
      <P>
        The fresh food looks like it has less than half the protein of the kibble. Once the water is removed it has {(dryMatter(FRESH.protein, FRESH.moisture) - dryMatter(KIBBLE.protein, KIBBLE.moisture)).toFixed(1)} percentage points <em>more</em>.
        We run this conversion on every brand&apos;s spec sheet, for example <A href="/brands/the-farmers-dog">The Farmer&apos;s Dog</A> and <A href="/brands/we-feed-raw">We Feed Raw</A>.
      </P>

      <H2 id="per-1000-kcal">What does protein per 1,000 kcal tell you that dry matter doesn&apos;t?</H2>
      <P>
        It tells you how much protein your dog actually gets for the calories it eats. That is the number vets use, and it is the basis of the AAFCO minimums. Formula: <strong>g per 1,000 kcal = as-fed % x 10,000 / kcal per kg</strong>.
      </P>
      <P>
        Using the same examples with illustrative calorie densities ({FRESH.kcalPerKg.toLocaleString("en-US")} kcal/kg fresh, {KIBBLE.kcalPerKg.toLocaleString("en-US")} kcal/kg kibble): the fresh food gives {per1000(FRESH.protein, FRESH.kcalPerKg)} g of protein per 1,000 kcal and the kibble {per1000(KIBBLE.protein, KIBBLE.kcalPerKg)} g.
        Both clear the adult minimum of {AAFCO.adult.proteinPer1000} g and the growth minimum of {AAFCO.growth.proteinPer1000} g.
      </P>
      <Table
        caption="AAFCO minimums for dogs"
        head={["Nutrient", "Adult maintenance", "Growth & reproduction"]}
        rows={[
          ["Protein", `${AAFCO.adult.proteinDM}% DM · ${AAFCO.adult.proteinPer1000} g/1,000 kcal`, `${AAFCO.growth.proteinDM}% DM · ${AAFCO.growth.proteinPer1000} g/1,000 kcal`],
          ["Fat", `${AAFCO.adult.fatDM}% DM · ${AAFCO.adult.fatPer1000} g/1,000 kcal`, `${AAFCO.growth.fatDM}% DM · ${AAFCO.growth.fatPer1000} g/1,000 kcal`],
          ["Calcium : phosphorus", `${AAFCO.caToPRatio.min}:1 to ${AAFCO.caToPRatio.max}:1`, `${AAFCO.caToPRatio.min}:1 to ${AAFCO.caToPRatio.max}:1 (large-breed growth: Ca max ${AAFCO.largeBreedGrowthCaMaxDM}% DM)`],
        ]}
      />
      <P>
        If you want the most protein per calorie, see <A href={dietPath("high-protein")}>high-protein dog food</A>. If your vet has asked you to limit fat, see <A href={dietPath("low-fat")}>low-fat dog food</A>.
      </P>

      <H2 id="product-names">What do names like &quot;beef dinner&quot; or &quot;with chicken&quot; mean?</H2>
      <P>
        The product name follows fixed percentage rules, so a single word changes how much of the named meat you get. These are the FDA and AAFCO naming rules:
      </P>
      <Table
        caption="Dog food naming rules"
        head={["Name on the bag", "Rule", "Minimum named ingredient"]}
        rows={[
          ["\"Beef Dog Food\"", "95% rule", "95% of the product excluding water (70% counting added water)"],
          ["\"Beef Dinner\", \"Platter\", \"Entrée\", \"Recipe\"", "25% rule", "25% excluding water"],
          ["\"Dog Food with Beef\"", "3% rule", "3% of the product"],
          ["\"Beef Flavor\"", "Flavor rule", "No minimum - only enough to be detectable"],
        ]}
      />
      <Callout>
        Two foods with almost identical names can differ hugely: &quot;Beef Dog Food&quot; needs about 30 times more beef than &quot;Dog Food with Beef&quot;.
      </Callout>

      <H2 id="ingredient-list">How do you read the ingredient list?</H2>
      <P>
        Ingredients are listed in descending order by weight <em>before</em> cooking. Fresh meat is about 70% water, so it ranks higher than its protein contribution, while dry ingredients rank lower.
      </P>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li><strong>Look at the first five ingredients.</strong> They usually make up most of the recipe by weight.</li>
        <li><strong>Check for named proteins.</strong> &quot;Beef&quot; or &quot;chicken liver&quot; tells you the species; &quot;meat by-products&quot; does not.</li>
        <li>
          <strong>Watch for ingredient splitting.</strong> Peas, pea protein and pea fiber listed separately can add up to more than the meat. Legume-heavy recipes are the ones flagged in the FDA&apos;s DCM investigation. See <A href={ingredientPath("peas")}>peas</A>, <A href={ingredientPath("lentils")}>lentils</A> and <A href={dietPath("dcm-concerns")}>DCM concerns</A>, or read <A href="/articles/grain-free-dog-food-and-dcm">what the FDA&apos;s DCM investigation found</A>.
        </li>
        <li><strong>Find the vitamin and mineral premix.</strong> Near the end of the list in almost every complete fresh recipe. Its absence in a &quot;complete&quot; food is a red flag.</li>
      </ul>

      <H2 id="carbohydrates">How do you estimate carbohydrates?</H2>
      <P>
        Subtract everything else from 100: <strong>carbs % = 100 - protein - fat - fiber - moisture - ash</strong>. Then convert to dry matter like any other nutrient.
      </P>
      <P>
        The catch is ash. It is not required on the label, and without it the estimate can be off by several percentage points. If a brand doesn&apos;t publish ash, ask for it before relying on a &quot;low-carb&quot; claim. More in <A href={dietPath("low-carb")}>low-carb dog food</A>.
      </P>

      <H2 id="human-grade">What does &quot;human-grade&quot; mean on a dog food label?</H2>
      <P>
        &quot;Human-grade&quot; is only allowed when every ingredient <em>and</em> the finished food are edible for people and are made, stored and transported under human-food rules. A single non-human-grade ingredient or facility disqualifies the claim.
      </P>
      <P>
        It is a safety and handling standard, not a nutrition score. A human-grade food can still be poorly balanced. See <A href={dietPath("human-grade")}>human-grade dog food</A> for the brands that make the claim.
      </P>

      <H2 id="how-we-use-labels">How do we use labels to score brands?</H2>
      <P>
        Every number in our rankings starts from the brand&apos;s own label: we convert the guaranteed analysis to dry matter and grams per 1,000 kcal, check the AAFCO statement, and price the food per day by body weight.
        The full method is on <A href="/how-we-rank">How We Rank</A>.
      </P>
      <P>
        To see the method applied, start with <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A> or <A href={comparePath("the-farmers-dog-vs-we-feed-raw")}>The Farmer&apos;s Dog vs We Feed Raw</A>.
        Once you know your dog&apos;s calorie needs, our guide to <A href="/articles/how-much-fresh-food-to-feed-a-dog">how much fresh food to feed</A> turns the label&apos;s kcal/kg into grams per day.
      </P>
    </>
  );
}
