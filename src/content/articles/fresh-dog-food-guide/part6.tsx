import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { kcalPerDayForLb } from "@/lib/nutrition";
import { A, Ext, List, Part, SRC, Table, fmt } from "./ui";

export function Part6() {
  const k10 = kcalPerDayForLb(10);
  const k25 = kcalPerDayForLb(25);
  const k50 = kcalPerDayForLb(50);
  const k75 = kcalPerDayForLb(75);
  return (
    <>
      <Part id="decide" n={6} title="Deciding and buying well" />
      <H2 id="worth-it-for-you">Is fresh dog food worth it for your dog?</H2>
      <P>
        It&apos;s most worth it for small, picky or overweight dogs, and least worth it for large dogs on a tight budget or dogs on a prescription diet. Here&apos;s how we&apos;d call it for the most common situations.
      </P>
      <Table
        caption="Is fresh dog food worth it? By situation"
        head={["Your dog or situation", "Our call", "Why"]}
        rows={[
          [<A key="s" href={bestForPath("small-breed")}>Small dog (under 20 lb)</A>, "Yes", `Needs only around ${fmt(k10)}-${fmt(kcalPerDayForLb(20))} kcal a day, so the premium is smallest`],
          [<A key="p" href={bestForPath("picky-eater")}>Picky eater</A>, "Yes", "Palatability is where fresh food is strongest; 14% of the reviews we read mention picky eaters"],
          [<A key="w" href={dietPath("weight-management")}>Needs to lose weight</A>, "Yes", "Portioned packs remove the scoop-and-guess problem"],
          [<A key="sn" href={bestForPath("senior-dog")}>Senior that&apos;s gone off food</A>, "Often", "Softer, more aromatic food can restart appetite; adjust calories down"],
          [<A key="l" href={bestForPath("large-breed")}>Large dog on a budget</A>, "Partly", `At ${fmt(k75)} kcal a day for 75 lb, a topper is usually the realistic option`],
          ["No freezer space", "Partly", "Choose a cooked shelf-stable format instead of frozen"],
          ["Prescription diet", "No", "Keep the vet diet; none of the brands we cover sells one"],
          ["Home with small children or immunocompromised people", "Cooked only", "Avoid raw food; cooked fresh is fine"],
        ]}
      />
      <P>
        Our dedicated <A href="/articles/is-fresh-dog-food-worth-it">is fresh dog food worth it?</A> guide works through the same question with the cost math for each dog size.
      </P>

      <H2 id="thawed-box">What should you do if a fresh dog food box arrives thawed?</H2>
      <P>
        Don&apos;t feed food that arrived warm, photograph the box and packs, and contact the brand straight away. In the reviews we read, brands usually replaced or refunded thawed or late deliveries.
      </P>
      <P>
        The pattern was consistent across brands. Ollie customers described replacement boxes after defrosted or late deliveries; a Farmer&apos;s Dog customer whose box sat at the carrier for five days was refunded; and several reviewers praised fast resends after missed deliveries. Delivery problems were among the most common complaints, but also among the most commonly resolved.
      </P>
      <List
        items={[
          "Check the box as soon as it arrives; most use coolant that keeps packs frozen for a limited time.",
          "Packs that are still frozen or fridge-cold can go straight into the freezer.",
          "Packs that are warm, or a box that sat out for a long time, should not be fed; contact the brand.",
          "Leave delivery instructions if your door is exposed to sun or wildlife; one reviewer in bear country asked for daytime deliveries for exactly that reason.",
        ]}
      />
      <Callout>
        <strong>Handle it like any perishable food.</strong> The FDA&apos;s pet food guidance is to keep food frozen until use, thaw it in the fridge and refrigerate or discard leftovers (<Ext href={SRC.fdaRawStudy}>FDA</Ext>). When in doubt, throw it out and ask for a replacement.
      </Callout>

      <H2 id="multiple-dogs">How does fresh dog food work for more than one dog?</H2>
      <P>
        Each dog gets its own calorie target and its own packs, and the cost is simply the sum of the dogs&apos; calories. That per-dog portioning is one of the real advantages of fresh plans in multi-dog homes, where shared bowls make it hard to see who eats what.
      </P>
      <Table
        caption="Example: combined daily calories in a two-dog home"
        head={["Dogs", "Daily calories", "Combined"]}
        rows={[
          [`10 lb + 25 lb`, `${fmt(k10)} + ${fmt(k25)} kcal`, `${fmt(k10 + k25)} kcal`],
          [`25 lb + 50 lb`, `${fmt(k25)} + ${fmt(k50)} kcal`, `${fmt(k25 + k50)} kcal`],
          [`50 lb + 75 lb`, `${fmt(k50)} + ${fmt(k75)} kcal`, `${fmt(k50 + k75)} kcal`],
        ]}
        note="Neutered adults, RER x 1.6. Feed each dog separately so each gets its own portion."
      />
      <P>
        A practical middle ground in mixed-size homes is full fresh for the small dog and a topper for the big one. Feed the dogs apart, at least at first, so the faster eater doesn&apos;t finish both bowls. See <A href={bestForPath("multi-dog-household")}>multi-dog households</A>.
      </P>

      <H2 id="freshpet">Is Freshpet fresh dog food, and is it cooked?</H2>
      <P>
        Freshpet is a refrigerated dog food sold in grocery and pet stores rather than by delivery, and its products are cooked. The 2018 University of Illinois digestibility study, funded by Freshpet, tested two of its &ldquo;roasted, refrigerated&rdquo; diets against kibble and a raw diet (<Ext href={SRC.algya2018}>Algya et al., 2018</Ext>).
      </P>
      <P>
        In that study the mildly cooked diets had higher protein and fat digestibility than the kibble. As with every study in this field, the sample was small and the funder&apos;s products were the ones tested, so read it as evidence about digestibility, not about long-term health.
      </P>
      <P>
        Freshpet isn&apos;t one of the seven brands we currently review, so we don&apos;t score it. The checks in this guide apply to it like any other food: an AAFCO statement for your dog&apos;s life stage, the calories per pack, where pulses sit in the ingredient list, and storage. Refrigerated food needs to stay cold and be used within the window on the pack once opened.
      </P>

      <H2 id="regulation">Who regulates fresh dog food?</H2>
      <P>
        In the US, the FDA regulates pet food, including fresh food, alongside state feed regulators that typically apply AAFCO&apos;s model rules for labels and nutrient profiles. There is no separate category or approval process for &ldquo;fresh&rdquo; food.
      </P>
      <P>
        One FDA rule matters a lot for fresh and raw brands. Under the Food Safety Modernization Act&apos;s Preventive Controls for Animal Food (PCAF) rule, certain animal food businesses must have a written food safety plan that identifies &ldquo;known or reasonably foreseeable hazards&rdquo; and the controls for them (<Ext href={SRC.fdaH5n1}>FDA</Ext>).
        In January 2025 the FDA used that rule to require cat and dog food makers using uncooked poultry or cattle ingredients to add H5N1 to their plans.
      </P>
      <Table
        caption="Who does what in US pet food regulation"
        head={["Body", "Role relevant to fresh dog food"]}
        rows={[
          ["FDA (Center for Veterinary Medicine)", "Regulates pet food safety; enforces food safety plans under PCAF; publishes recalls and investigations such as DCM"],
          ["State feed control officials", "Register products and enforce labelling, usually based on AAFCO's model regulations"],
          ["AAFCO", "Sets the model label rules and the nutrient profiles behind \"complete and balanced\" claims; it doesn't approve products"],
          ["Brands", "Must label accurately, meet the nutrient profile they claim, and run their own food safety plans"],
        ]}
        note="Simplified overview. AAFCO and state rules are what make a 'complete and balanced' statement meaningful; check for it on every food."
      />
      <P>
        For you, the practical upshot is that the AAFCO statement and the brand&apos;s own transparency do most of the work. A brand that publishes its formulator, its feeding-trial status and its calorie data is easier to trust than one that leans on words like &ldquo;fresh&rdquo; and &ldquo;natural&rdquo;, which have no nutritional meaning on their own.
      </P>

      <H2 id="questions-for-brands">What should you ask a fresh dog food brand before buying?</H2>
      <P>
        Eight questions separate the brands that publish their homework from those that don&apos;t. A good brand answers all of them on its site or by email.
      </P>
      <List
        ordered
        items={[
          "Is every recipe complete and balanced, and for which life stages (including large-size growth)?",
          "Was it proven by AAFCO feeding trials or formulated to meet the profile?",
          "Who formulates the recipes? Look for a board-certified veterinary nutritionist.",
          "What are the calories per kg or per pack for each recipe?",
          "Where do pulses like peas and lentils sit in each ingredient list?",
          "For raw or freeze-dried raw: is there a validated kill step, and how has the brand addressed H5N1 under the FDA's 2025 requirement?",
          "What's the ongoing price after the trial, and when is the charge cut-off for each delivery?",
          "What happens if a box arrives thawed or late?",
        ]}
      />
      <P>
        We ask the same questions in every brand review and score the answers in our <A href="/how-we-rank">rubric</A>. Where a brand hasn&apos;t published something yet, our pages say &ldquo;Verifying&rdquo; rather than guessing. Our <A href="/articles/how-to-read-a-dog-food-label">label guide</A> shows where to find most of these answers on the pack.
      </P>
    </>
  );
}
