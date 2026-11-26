import { H2, P, Callout } from "@/components/page-shell";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { comparePath } from "@/lib/dogfood/pairs";
import { dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { A, Ext, List, Table, fmt } from "./fresh-dog-food-guide/ui";

// Sources (each opened and read on 2026-11-26).
const CAT1 = "https://link.springer.com/article/10.1186/s12917-015-0541-3"; // duration of elimination diets
const CAT2 = "https://link.springer.com/article/10.1186/s12917-016-0633-8"; // common food allergens
const CAT3 = "https://link.springer.com/article/10.1186/s12917-017-0973-z"; // prevalence
const CAT5 = "https://link.springer.com/article/10.1186/s12917-018-1346-y"; // label discrepancies
const CAT9 = "https://link.springer.com/article/10.1186/s12917-020-02379-3"; // time to flare
const TUFTS = "https://sites.tufts.edu/petfoodology/files/2022/04/Elimination-diet-handout-final.pdf";
const TFD_ELIM = "https://www.thefarmersdog.com/digest/elimination-diet-for-dogs/";

// Olivry & Mueller, CAT (2): 297 dogs with at least one confirmed food allergen.
const ALLERGENS: [string, number, string][] = [
  ["Beef", 102, "34%"],
  ["Dairy products", 51, "17%"],
  ["Chicken", 45, "15%"],
  ["Wheat", 38, "13%"],
  ["Soy", 18, "6%"],
  ["Lamb", 14, "5%"],
  ["Corn", 13, "4%"],
  ["Egg", 11, "4%"],
  ["Pork", 7, "2%"],
  ["Fish", 5, "2%"],
  ["Rice", 5, "2%"],
];

// Recipes in our product listings (src/lib/dogfood/products.ts) whose NAME leads with
// a protein other than beef or chicken. Names only: not a full ingredient check.
const RECIPES: [string, string, string][] = [
  ["Ollie", "Fresh Turkey Dish with Blueberries", "/reviews/ollie"],
  ["Ollie", "Fresh Pork Dish with Apples", "/reviews/ollie"],
  ["The Farmer's Dog", "Fresh Food Plan, Turkey Recipe", "/reviews/the-farmers-dog"],
  ["Maxbone", "Glow Up, Turkey Freeze-Dried Recipe", "/reviews/maxbone"],
  ["Maxbone", "Raw Coated Kibble, Ocean (salmon & whitefish)", "/reviews/maxbone"],
  ["The Pets Table", "Air-Dried Salmon & Whitefish with Pumpkin", "/reviews/the-pets-table"],
];

const TRIAL_WEIGHTS = [10, 25, 50, 75];

export const meta: ArticleMeta = {
  slug: "dog-food-allergy-elimination-diet",
  title: "Food Allergies in Dogs: How an Elimination Diet Works (2026)",
  seoTitle: "Dog Elimination Diet: How Long, What to Feed, What Next",
  description:
    "How a dog elimination diet works: why 8 weeks, the foods dogs react to most (beef 34%), why 'limited' foods often fail, and how to reintroduce foods safely.",
  publishedAt: "2026-11-26",
  updatedAt: "2026-11-26",
  readMinutes: 10,
  category: "Health",
  answer: {
    question: "How long should a dog's elimination diet last?",
    text: "At least 8 weeks. In a review of 209 food-allergic dogs, more than 85% were back to normal from 5 weeks and over 95% by 8 weeks. Feed only the vet-chosen diet, with no treats or flavored medicines, then reintroduce old foods one at a time and watch for up to 14 days each.",
  },
  keyTakeaways: [
    "An elimination diet of at least 8 weeks, followed by food challenges, is the standard way to diagnose food allergy that shows in a dog's skin.",
    "In 297 food-allergic dogs, the most common triggers were beef (34%), dairy (17%), chicken (15%) and wheat (13%).",
    "Commercial pet foods contained ingredients not on the label in a median 45% of tested diets, and 33-83% of 'novel' or 'limited' foods, so let your vet choose the trial diet.",
    "After a food challenge, half of food-allergic dogs flared within 5 days and 90% within 14 days.",
  ],
  faqs: [
    {
      question: "How long does an elimination diet take for dogs?",
      answer: "Plan on at least 8 weeks of the trial diet. In a review of 209 dogs, about half improved markedly by 3 weeks, more than 85% were normal by 5 weeks and over 95% by 8 weeks. Fewer than 5% needed up to 13 weeks.",
    },
    {
      question: "What are dogs most commonly allergic to in food?",
      answer: "In a review of 297 dogs with confirmed food allergies: beef (34%), dairy products (17%), chicken (15%) and wheat (13%), then soy, lamb, corn and egg. Many dogs react to more than one food.",
    },
    {
      question: "Can I use a limited-ingredient food from the pet store for an elimination diet?",
      answer: "It's risky. Testing found unlisted ingredients in 33-83% of 'novel' or 'limited' ingredient pet foods across studies. Your vet may recommend a prescription diet or a home-cooked recipe instead.",
    },
    {
      question: "Can my dog have treats during an elimination diet?",
      answer: "No, unless your vet approves a treat made from the trial diet. Tufts' checklist also rules out rawhides, dental chews, flavored toys, table food, flavored medicines and pet toothpaste during the trial.",
    },
    {
      question: "How do I know which food my dog is allergic to?",
      answer: "After the trial, reintroduce one old food at a time and watch for up to 14 days. In dogs, half of flares appeared within 5 days and 90% within 14. A flare means that food is a trigger; no flare after 14 days means it's likely safe.",
    },
  ],
  sources: [
    { label: "Critically appraised topic on adverse food reactions of companion animals (1): duration of elimination diets", publisher: "BMC Veterinary Research (Olivry, Mueller, Prélaud)", year: 2015, href: CAT1 },
    { label: "Critically appraised topic on adverse food reactions of companion animals (2): common food allergen sources in dogs and cats", publisher: "BMC Veterinary Research (Mueller, Olivry, Prélaud)", year: 2016, href: CAT2 },
    { label: "Critically appraised topic on adverse food reactions of companion animals (3): prevalence of cutaneous adverse food reactions in dogs and cats", publisher: "BMC Veterinary Research (Olivry, Mueller)", year: 2017, href: CAT3 },
    { label: "Critically appraised topic on adverse food reactions of companion animals (5): discrepancies between ingredients and labeling in commercial pet foods", publisher: "BMC Veterinary Research (Olivry, Mueller)", year: 2018, href: CAT5 },
    { label: "Critically appraised topic on adverse food reactions of companion animals (9): time to flare of cutaneous signs after a dietary challenge", publisher: "BMC Veterinary Research (Olivry, Mueller)", year: 2020, href: CAT9 },
    { label: "Elimination Diet Trial Plan and checklist", publisher: "Tufts Cummings School, Petfoodology", year: 2022, href: TUFTS },
    { label: "Elimination diet for dogs: what it is and when to use it (brand content)", publisher: "The Farmer's Dog", year: 2022, href: TFD_ELIM },
  ],
  relatedPaths: [dietPath("food-allergies"), dietPath("elimination-diet"), dietPath("novel-protein"), dietPath("limited-ingredient"), dietPath("itchy-skin")],
};

export function Body() {
  return (
    <>
      <H2 id="what-is-it">What is an elimination diet for dogs?</H2>
      <P>
        It&apos;s a test, not a long-term diet. Your dog eats only one vet-chosen diet until allergy signs settle, then old foods go back in one at a time to see which one causes a flare. Veterinary dermatologists call this a restriction-provocation trial, and it remains the standard of care for diagnosing food allergy that shows in the skin (<Ext href={CAT1}>Olivry et al., 2015</Ext>).
      </P>
      <P>
        There are two phases, and both matter. The elimination phase shows whether food is involved at all; the challenge phase shows which food. Skipping the challenge leaves you avoiding foods your dog may tolerate.
      </P>
      <Table
        caption="The two phases of an elimination diet trial"
        head={["Phase", "What you do", "How long", "What it tells you"]}
        rows={[
          ["1. Elimination", "Feed only the trial diet, nothing else", "At least 8 weeks", "Whether signs improve when usual foods are removed"],
          ["2. Challenge", "Add back one old food at a time", "Up to 14 days per food", "Which food (if any) makes signs return"],
          ["3. Long-term diet", "Avoid confirmed triggers", "Ongoing", "A complete diet without the trigger"],
        ]}
        note="Durations from Olivry et al. (2015, 2020), BMC Veterinary Research. Your vet sets the plan."
      />

      <H2 id="how-common">How common are food allergies in dogs?</H2>
      <P>
        Less common than pet food marketing suggests. In a systematic review, food allergy affected 1-2% of dogs seen by vets for any reason, but far more among itchy dogs (<Ext href={CAT3}>Olivry &amp; Mueller, 2017</Ext>).
      </P>
      <Table
        caption="Prevalence of food allergy with skin signs in dogs, by group"
        head={["Dogs studied", "Share with food allergy"]}
        rows={[
          ["Seen by a vet for any reason", "1-2%"],
          ["With any skin disease", "0-24%"],
          ["With itching (pruritus)", "9-40%"],
          ["With any allergic skin disease", "8-62%"],
          ["Diagnosed with atopic dermatitis", "9-50%"],
        ]}
        note="Ranges across studies in Olivry & Mueller (2017), BMC Veterinary Research."
      />
      <P>
        So an itchy dog has a real chance of a food allergy, but environmental allergy is often in the mix. That&apos;s why the trial is a diagnostic step your vet plans alongside other causes. See <A href={dietPath("itchy-skin")}>itchy skin</A>, <A href={dietPath("ear-infections")}>ear infections</A> and <A href={dietPath("environmental-allergies")}>environmental allergies</A>.
      </P>

      <H2 id="common-allergens">Which foods are dogs most often allergic to?</H2>
      <P>
        Mostly common proteins, not grains. A review of 297 dogs with at least one food allergen confirmed by rechallenge found beef was the most frequent trigger (<Ext href={CAT2}>Mueller et al., 2016</Ext>).
      </P>
      <Table
        caption="Food allergens confirmed in 297 dogs"
        head={["Food", "Dogs", "Share of dogs"]}
        rows={ALLERGENS.map(([f, n, p]) => [f, String(n), p])}
        note="Mueller, Olivry & Prélaud (2016). Dogs can react to more than one food, so shares add to more than 100%. Barley, rabbit, chocolate, kidney bean and tomato were each reported in single dogs."
      />
      <P>
        Two practical points follow. Wheat caused 13% of cases, so &ldquo;grain-free&rdquo; alone is a weak fix (see <A href="/articles/grain-free-dog-food-and-dcm">grain-free food and DCM</A>). And the top four are in a large share of dog foods, which is why the trial diet usually avoids all of them.
      </P>

      <H2 id="how-long">How long should an elimination diet last?</H2>
      <P>
        At least 8 weeks. Past advice ranged from 3 to 12 weeks, so researchers pooled data on 209 food-allergic dogs to see when signs actually resolved (<Ext href={CAT1}>Olivry et al., 2015</Ext>).
      </P>
      <Table
        caption="When signs resolved on an elimination diet (209 dogs)"
        head={["Weeks on the trial diet", "Dogs improved"]}
        rows={[
          ["3 weeks", "About half markedly improved"],
          ["5 weeks", "More than 85% back to normal"],
          ["8 weeks", "More than 95% back to normal"],
          ["Up to 13 weeks", "Needed by fewer than 5%"],
        ]}
        note="Olivry, Mueller & Prélaud (2015), BMC Veterinary Research. The authors recommend at least 8 weeks to diagnose more than 90% of cases."
      />
      <P>
        Stopping at 4 weeks risks a false &ldquo;not food&rdquo; answer. Count the 8 weeks from when your dog is fully on the new diet, after any transition. Tufts&apos; plan template starts the clock the same way (<Ext href={TUFTS}>Tufts</Ext>).
      </P>

      <ArticleBrandCard slug="ollie" />

      <H2 id="store-bought">Can you use a store-bought limited-ingredient food?</H2>
      <P>
        Be careful: labels often miss ingredients. A review of 17 studies found ingredients not listed on the label in 0-83% of tested pet foods (median 45%), and in 33-83% of foods sold as &ldquo;novel&rdquo; or &ldquo;limited&rdquo; ingredient diets (<Ext href={CAT5}>Olivry &amp; Mueller, 2018</Ext>).
      </P>
      <Table
        caption="Unlisted ingredients found in commercial pet foods"
        head={["Foods tested", "Share with an unlisted ingredient"]}
        rows={[
          ["All tested pet foods (range across studies)", "0-83%"],
          ["All tested pet foods (median)", "45%"],
          ["'Novel' or 'limited' ingredient foods", "33-83%"],
        ]}
        note="Olivry & Mueller (2018): 17 articles and one abstract; methods were mainly PCR (DNA) or ELISA (protein)."
      />
      <P>
        A trace of chicken in a &ldquo;duck&rdquo; food can keep an allergic dog itching and wreck eight weeks of effort. That&apos;s why vets often choose a prescription diet or a home-cooked recipe for the trial. Our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> explains what a label can and can&apos;t tell you.
      </P>
      <Callout>
        <strong>Home-cooked needs a recipe.</strong> The Farmer&apos;s Dog&apos;s guide notes a trial diet usually pairs one protein with one carbohydrate, and warns it shouldn&apos;t continue long term because of deficiency risk (<Ext href={TFD_ELIM}>The Farmer&apos;s Dog</Ext>). Ask your vet for a balanced recipe if the trial runs longer.
      </Callout>

      <H2 id="cut-out">What must you cut out during the trial?</H2>
      <P>
        Everything that isn&apos;t the trial diet. Tufts&apos; checklist covers the leaks that most often spoil a trial (<Ext href={TUFTS}>Tufts</Ext>):
      </P>
      <Table
        caption="Elimination diet checklist: what to stop and what to do instead"
        head={["Stop", "Why", "Instead"]}
        rows={[
          ["Commercial treats", "Contain other proteins", "No treats, or ones your vet approves"],
          ["Rawhides, pig ears, bully sticks", "Dried animal parts", "Remove from the home"],
          ["Dental chews, flavored toys", "Hidden flavors", "Unflavored toys"],
          ["Table food (even fruit, gelatin)", "Any food can be a trigger", "Keep the dog out at mealtimes"],
          ["Supplements", "May contain allergens", "Only if your vet approves"],
          ["Pet toothpaste", "Flavored", "Brush without toothpaste"],
          ["Flavored heartworm or flea products", "Flavored chews", "Unflavored or topical options"],
          ["Pills in food or pill pockets", "Food wraps", "Ask your vet for another way"],
        ]}
        note="Summarized from Tufts Cummings School's Elimination Diet Trial Plan (Petfoodology, 2022). Never stop heartworm or other preventatives."
      />
      <List
        items={[
          <><strong>Brief the whole household.</strong> Tufts suggests a note on the fridge, and warning dog walkers and visitors.</>,
          <><strong>Block other pets&apos; bowls.</strong> Feed pets apart so your dog can&apos;t steal food.</>,
          <><strong>Keep a symptom diary.</strong> Rate itch weekly so you can see the trend, not just bad days.</>,
        ]}
      />

      <H2 id="choose-protein">How do you choose a protein for the trial?</H2>
      <P>
        Pick one your dog has never eaten, or use a vet diet designed for trials. Start with a full list of everything your dog has eaten, including treats; The Farmer&apos;s Dog&apos;s guide makes this step one (<Ext href={TFD_ELIM}>The Farmer&apos;s Dog</Ext>). Then rule out every protein on it.
      </P>
      <P>
        For the long-term diet after a confirmed trigger, single-protein recipes help. These recipes in our product listings lead with a protein other than beef or chicken:
      </P>
      <Table
        caption="Recipes in our listings named for a protein other than beef or chicken"
        head={["Brand", "Recipe (as listed)"]}
        rows={RECIPES.map(([b, r, href]) => [<A key={r} href={href}>{b}</A>, r])}
        note="From product names in our November 2026 listings only. A name is not a full ingredient check: read the complete ingredient list, and use a vet-chosen diet for the trial itself."
      />
      <P>
        Compare more options on <A href={dietPath("novel-protein")}>novel-protein</A>, <A href={dietPath("single-protein")}>single-protein</A> and <A href={dietPath("limited-ingredient")}>limited-ingredient</A> diets, and <A href={comparePath("the-farmers-dog-vs-ollie")}>The Farmer&apos;s Dog vs Ollie</A>.
      </P>

      <H2 id="calories">How much should you feed during the trial?</H2>
      <P>
        Enough to hold your dog&apos;s weight. A new diet often has a different calorie density, so work from calories, not cups. These are starting points from our calculator (neutered adult, 1.6 x resting energy):
      </P>
      <Table
        caption="Starting calories for a neutered adult during the trial"
        head={["Body weight", "Calories per day"]}
        rows={TRIAL_WEIGHTS.map((lb) => [`${lb} lb (${(lb / 2.20462).toFixed(1)} kg)`, `${fmt(kcalPerDayForLb(lb))} kcal`])}
        note="Estimates only; weigh your dog every 2 weeks and adjust. See our feeding guide for converting calories to portions."
      />
      <P>
        Use our <A href="/articles/how-much-fresh-food-to-feed-a-dog">feeding guide</A> to turn calories into portions, and switch gradually with our <A href="/articles/how-to-switch-dog-to-fresh-food">10-day plan</A>. If the trial diet is home-cooked, check protein per 1,000 kcal too (<A href="/articles/how-much-protein-does-a-dog-need">protein guide</A>).
      </P>

      <H2 id="rechallenge">How do you reintroduce foods after the trial?</H2>
      <P>
        One food at a time, watching for up to 14 days each. Across 315 challenges in 234 dogs, about 9% flared on day one and 21% by day two; half had flared by day 5 and 90% by day 14 (<Ext href={CAT9}>Olivry &amp; Mueller, 2020</Ext>).
      </P>
      <Table
        caption="Time to flare after a food challenge in food-allergic dogs"
        head={["Days after reintroducing a food", "Share of flares seen"]}
        rows={[
          ["1 day", "About 9%"],
          ["2 days", "About 21%"],
          ["5 days", "50%"],
          ["14 days", "90%"],
        ]}
        note="Olivry & Mueller (2020), BMC Veterinary Research: 315 food challenges in 234 dogs. Flares were likely under-reported."
      />
      <P>
        Which food first? The 2016 review suggests starting with beef and dairy, the most common triggers (<Ext href={CAT2}>Mueller et al., 2016</Ext>). If signs return, stop that food and wait for them to settle before the next challenge.
      </P>

      <H2 id="timeline">How long does the whole process take?</H2>
      <P>
        Usually three to four months. Here is an illustrative plan for a dog challenged with four foods:
      </P>
      <Table
        caption="Illustrative elimination and challenge timeline"
        head={["Stage", "Weeks", "Running total"]}
        rows={[
          ["Switch to the trial diet", "About 1", "1"],
          ["Elimination phase", "8", "9"],
          ["Challenge: beef", "Up to 2", "11"],
          ["Challenge: dairy", "Up to 2", "13"],
          ["Challenge: chicken", "Up to 2", "15"],
          ["Challenge: wheat", "Up to 2", "17"],
        ]}
        note="Illustrative. Challenges stop early if a flare appears, and a flare adds recovery time before the next one."
      />
      <P>
        It&apos;s slow, but it ends with a list of safe foods instead of a guess. If you&apos;re choosing a fresh food afterwards, compare recipes in our <A href="/">2026 ranking</A> and see our <A href={dietPath("food-allergies")}>food allergies</A> hub.
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />

      <P>
        Considering raw for the long-term diet? Read <A href="/articles/is-raw-dog-food-safe">is raw dog food safe</A> first.
      </P>
    </>
  );
}
