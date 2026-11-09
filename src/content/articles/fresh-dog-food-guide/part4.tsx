import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath, ingredientPath } from "@/lib/dogfood/taxonomy";
import { A, Ext, List, Part, SRC, Table } from "./ui";

// FDA CVM testing 2010-2012 (Nemser et al., 2014).
const RAW_N = 196;
const RAW_SAL = 15;
const RAW_LIS = 32;
const pct = (n: number, d: number) => `${((n / d) * 100).toFixed(1)}%`;
// FDA DCM report counts (dogs), Jan 2014 - Nov 1, 2022.
const DCM_TOTAL = 1382;

export function Part4() {
  return (
    <>
      <Part id="safety" n={4} title="Safety, storage and alternatives" />
      <H2 id="safe">Is fresh dog food safe?</H2>
      <P>
        Cooked fresh food from a reputable brand is as safe as any other complete dog food, provided you handle and store it properly. The bigger safety question is raw food, which carries a documented and much higher pathogen risk.
      </P>
      <P>
        No format is recall-proof. The FDA notes that &ldquo;both cooked and raw pet food products are recalled&rdquo; for reasons including Salmonella and Listeria, and keeps a public list of pet food recalls (<Ext href={SRC.fdaRawStudy}>FDA</Ext>). Check it if a food ever seems to make your dog unwell, and sign up for your brand&apos;s alerts.
      </P>
      <P>
        Whatever you feed, the FDA advises the same handling routine &ldquo;no matter what type of pet food you feed your pet&rdquo;: wash hands, clean and disinfect surfaces and bowls, thaw in the fridge and refrigerate or discard leftovers. We cover storage below.
      </P>

      <H2 id="raw-vs-cooked">Is raw dog food riskier than cooked fresh food?</H2>
      <P>
        Yes, measurably. Between 2010 and 2012 the FDA&apos;s Center for Veterinary Medicine tested more than 1,000 pet food samples. Raw food was far more likely to carry disease-causing bacteria than any other type (<Ext href={SRC.fdaRawStudy}>FDA</Ext>).
      </P>
      <Table
        caption="FDA pet food testing, 2010-2012"
        head={["Type of pet food", "Samples", "Salmonella positive", "Listeria monocytogenes positive"]}
        rows={[
          ["Raw pet food", String(RAW_N), `${RAW_SAL} (${pct(RAW_SAL, RAW_N)})`, `${RAW_LIS} (${pct(RAW_LIS, RAW_N)})`],
          ["Dry dog food", "120", "0", "0"],
          ["Dry cat food", "120", "1", "0"],
          ["Semi-moist dog food", "120", "0", "0"],
          ["Jerky-type treats", "190", "0", "0"],
        ]}
        note="FDA Center for Veterinary Medicine (published as Nemser et al., Foodborne Pathogens and Disease, 2014). Canned food was not tested."
      />
      <P>
        Newer research agrees. A 2018 Dutch study of 35 commercial frozen raw diets found antibiotic-resistant (ESBL) E. coli in 80% of products, Listeria monocytogenes in 54%, E. coli O157:H7 in 23% and Salmonella in 20% (<Ext href={SRC.vanBree2018}>van Bree et al., 2018</Ext>).
      </P>
      <P>
        Raw-fed dogs can also carry bacteria into the home without looking ill. In a Canadian trial, 7 of 16 dogs fed Salmonella-contaminated raw food shed Salmonella in their stool within one to seven days, with no signs of illness (<Ext href={SRC.finley2007}>Finley et al., 2007</Ext>).
      </P>
      <P>
        That&apos;s why the American Veterinary Medical Association discourages feeding raw or undercooked animal protein (<Ext href={SRC.avmaRaw}>AVMA</Ext>), and the WSAVA says there is &ldquo;no evidence that raw meat-based diets provide health benefits over commercial or balanced homemade cooked diets&rdquo; (<Ext href={SRC.wsavaRaw}>WSAVA</Ext>).
        Our full analysis is in <A href="/articles/is-raw-dog-food-safe">is raw dog food safe?</A>
      </P>
      <Callout>
        <strong>Who should avoid raw food in the home:</strong> households with small children, older adults, pregnant people or anyone with a weakened immune system, as the WSAVA lists. Puppies too, because an unbalanced diet can cause skeletal problems in growing dogs.
      </Callout>

      <H2 id="bird-flu">Can raw dog food carry bird flu?</H2>
      <P>
        Yes. On January 17, 2025, the FDA required makers of cat and dog food who use uncooked or unpasteurized poultry or cattle ingredients to treat H5N1 as a &ldquo;known or reasonably foreseeable hazard&rdquo; in their food safety plans, and reissued the reminder on September 30, 2025 (<Ext href={SRC.fdaH5n1}>FDA</Ext>).
      </P>
      <P>
        Cats have become severely ill or died after eating contaminated raw food. The FDA says dogs can contract H5N1, usually with mild signs, and that it had not been detected in dogs in the US.
        It names pasteurizing, cooking and canning as processing steps capable of inactivating the virus, which is another point in favour of cooked fresh food.
      </P>

      <H2 id="dcm">Does grain-free fresh dog food cause heart disease?</H2>
      <P>
        That hasn&apos;t been shown. The FDA investigated reports of dilated cardiomyopathy (DCM) in dogs from 2018 and received {DCM_TOTAL.toLocaleString("en-US")} dog reports between January 2014 and November 2022 (<Ext href={SRC.fdaDcmQa}>FDA Q&amp;A</Ext>).
      </P>
      <Table
        caption="What the FDA's DCM investigation found"
        head={["Finding", "Detail"]}
        rows={[
          ["Reports, Jan 2014 - Nov 2022", `${DCM_TOTAL.toLocaleString("en-US")} reports of DCM in dogs`],
          ["Reports to Apr 2019", "515 dog reports; 560 dogs affected; 119 deaths"],
          ["Diets in the reports", "More than 90% labelled grain-free; 93% contained peas and/or lentils"],
          ["Grain-containing diets", "Also reported; the common factor was pulses high in the ingredient list"],
          ["Recalls", "None; FDA has no definitive information the diets are unsafe"],
          ["Status", "No further public updates since Dec 23, 2022, pending new science"],
        ]}
        note="Sources: FDA investigation page and FDA Q&A on non-hereditary DCM."
      />
      <P>
        The FDA describes non-hereditary DCM as a complex condition that may involve genetics, underlying illness and diet, and says some dogs fully or partially recovered with a diet change and veterinary care (<Ext href={SRC.fdaDcmQa}>FDA Q&amp;A</Ext>).
        Signs to watch for are decreased energy, coughing, difficulty breathing and collapse. Our <A href="/articles/grain-free-dog-food-and-dcm">grain-free and DCM guide</A> covers what to do, and the <A href={dietPath("dcm-concerns")}>DCM concerns page</A> lists the ingredients involved.
      </P>

      <H2 id="storage">How long does fresh dog food last?</H2>
      <P>
        Frozen packs keep until their best-by date; once thawed, use them within the window printed on the pack, usually a few days in the fridge. Brands differ, so the pack is the authority, not a general rule.
      </P>
      <P>The FDA&apos;s handling steps apply to every pet food (<Ext href={SRC.fdaRawStudy}>FDA</Ext>):</P>
      <List
        ordered
        items={[
          "Keep packs frozen until you need them.",
          "Thaw in the fridge or microwave, never on the counter or in the sink.",
          "Wash your hands with soap and water for at least 20 seconds after handling food or bowls.",
          "Clean, then disinfect surfaces and bowls; the FDA's mix is 1 tablespoon of bleach per quart (4 cups) of water.",
          "Cover and refrigerate leftovers right away, or throw them out.",
        ]}
      />
      <P>
        A practical habit: move tomorrow&apos;s packs from the freezer to the fridge each evening. Keep an opened pack sealed or in a lidded container in the fridge.
      </P>

      <H2 id="formats-compared">Fresh vs freeze-dried vs air-dried vs canned: which is better?</H2>
      <P>
        None is better in every way; they trade convenience against processing and safety. The table sums up the trade-offs that matter most.
      </P>
      <Table
        caption="Fresh dog food compared with freeze-dried, air-dried, canned and kibble"
        head={["Format", "Freezer needed?", "Cooked?", "Main trade-off"]}
        rows={[
          ["Gently cooked fresh", "Yes", "Yes", "Closest to whole food; costs the most and needs freezer space"],
          ["Raw frozen", "Yes", "No", "Highest pathogen risk; strict handling needed"],
          ["Freeze-dried", "No", "Often no", "Convenient; freeze-drying doesn't kill all bacteria (WSAVA)"],
          ["Air-dried", "No", "Varies", "Convenient and dense; check whether a kill step is used"],
          ["Canned", "No (until opened)", "Yes", "Canning is a kill step (the FDA lists it as inactivating H5N1); widely available"],
          ["Kibble", "No", "Yes", "Cheapest per calorie; most processed"],
        ]}
        note="Freeze-drying statement from the WSAVA raw diet toolkit; canning as a virus-inactivating step from the FDA's H5N1 update."
      />
      <P>
        If you want fresh-style food without the freezer, look for a cooked shelf-stable format: baked, fresh-dry or canned. If a freeze-dried or air-dried product is raw, treat it with raw-meat hygiene. See <A href={dietPath("freeze-dried")}>freeze-dried</A>, <A href={dietPath("air-dried")}>air-dried</A> and <A href="/articles/fresh-vs-kibble">fresh vs kibble</A>.
      </P>

      <H2 id="vs-canned">How is fresh dog food different from canned wet food?</H2>
      <P>
        Both are cooked and high in moisture; the main differences are processing, storage and where you buy them. Canned food is sealed and heat-sterilised in the can, so it keeps in the pantry until opened. Fresh food is cooked more gently and kept frozen or chilled.
      </P>
      <P>
        Canning is a genuine kill step: the FDA lists it, alongside cooking and pasteurising, as a process capable of inactivating H5N1 in pet food ingredients (<Ext href={SRC.fdaH5n1}>FDA</Ext>). That makes canned food one of the most convenient safe options for owners who want wet food without a freezer.
      </P>
      <Table
        caption="Fresh dog food vs canned wet dog food"
        head={["", "Gently cooked fresh", "Canned wet food"]}
        rows={[
          ["Cooked", "Yes, at lower heat", "Yes, sterilised in the can"],
          ["Storage before opening", "Freezer", "Pantry"],
          ["After opening", "Fridge, use within the pack's window", "Fridge, covered, use within the label's window"],
          ["Where to buy", "Mostly delivery", "Almost every store"],
          ["Portioning", "Usually pre-portioned per dog", "You portion from the can"],
          ["Completeness", "Only if the AAFCO statement says so", "Only if the AAFCO statement says so"],
        ]}
      />
      <P>
        Nutritionally, the same rules apply to both: compare on a dry-matter or per-1,000 kcal basis and check the AAFCO statement. If a dog loves wet food and the budget won&apos;t stretch to fresh, a complete canned food, or canned mixed with kibble by calories, is a perfectly sound choice.
      </P>

      <H2 id="homemade">Is homemade fresh dog food better than delivery?</H2>
      <P>
        Only if it&apos;s properly balanced, which is harder than it looks. The WSAVA warns that home-prepared cooked and raw diets &ldquo;may have important nutrient deficiencies and excesses,&rdquo; which is especially harmful to puppies (<Ext href={SRC.wsavaRaw}>WSAVA</Ext>).
      </P>
      <P>
        Without a recipe designed for dogs, it&apos;s easy to miss minerals and vitamins that a simple meat-and-rice mix doesn&apos;t supply. If you cook at home, use a recipe formulated for dogs by a board-certified veterinary nutritionist, with the supplement it specifies, and follow it exactly.
      </P>
      <P>
        On cost, homemade can be cheaper than delivery for a small dog, but the comparison has to include the supplement, your time and the risk of getting it wrong. For most owners, a complete commercial fresh food, or a topper on a complete kibble, is the simpler way to get the same benefits.
      </P>

      <H2 id="conditions">Is fresh dog food good for dogs with health conditions?</H2>
      <P>It depends on the condition, and your vet should lead. Here&apos;s how we&apos;d think about the common ones people search for:</P>
      <Table
        caption="Fresh dog food and common health conditions"
        head={["Condition", "What to know"]}
        rows={[
          [<A key="s" href={dietPath("sensitive-stomach")}>Sensitive stomach</A>, "A consistent recipe and a slower switch are a sensible start; ask your vet if signs persist"],
          ["Pancreatitis", "The WSAVA notes high-fat, low-fiber diets can trigger diarrhoea or even pancreatitis in some dogs; ask your vet for a fat target before choosing"],
          ["Kidney disease", "Usually managed with a prescription renal diet; don't replace it with a fresh plan without your vet"],
          [<A key="a" href={dietPath("allergies")}>Food allergies</A>, "An elimination diet under your vet's guidance is the way to identify the trigger; single-protein fresh recipes can help afterwards"],
          [<A key="w" href={dietPath("weight-management")}>Overweight</A>, "Portioned plans help; feed for the target weight and count treats"],
          ["Heart disease or DCM", "Discuss diet with your vet or cardiologist; see the DCM section above"],
        ]}
        note="General information, not veterinary advice. Conditions that need prescription diets should stay on them unless your vet says otherwise."
      />

      <H2 id="teeth">Does fresh dog food clean teeth as well as kibble?</H2>
      <P>
        Neither cleans teeth much. Most kibble shatters as soon as a dog bites it, so there&apos;s little scraping action. Only specific dental diets and chews with tested claims have shown a reduction in plaque or tartar; the Veterinary Oral Health Council lists the ones that met its standard (<Ext href={SRC.vohc}>VOHC</Ext>).
      </P>
      <P>
        Brushing and regular dental checks do the real work on any diet. If your dog is on soft fresh food, it&apos;s worth adding a VOHC-accepted chew and a brushing routine.
      </P>

      <H2 id="choose">How do you choose a fresh dog food?</H2>
      <P>Work through these eight questions, in order:</P>
      <List
        ordered
        items={[
          "Is it complete and balanced for my dog's life stage (and large-size growth, for a big-breed puppy)?",
          "Is it cooked? If not, can my household manage raw-meat hygiene?",
          "Do I have freezer space, or do I need a pantry format?",
          "What does it cost per day at my dog's calories, on the ongoing price, not the trial?",
          "Where do peas, lentils and potatoes sit in the ingredient list?",
          "Can I pause, skip and cancel online, and when is the charge cut-off?",
          "Does the brand publish calories, guaranteed analysis and full ingredients per recipe?",
          "What do recent reviews say about delivery and customer service?",
        ]}
      />
      <P>
        Our brand reviews answer most of these for each brand, and our <A href="/">2026 ranking</A> scores all seven with a <A href="/how-we-rank">published method</A>. For specific dogs, start with our guides to <A href={bestForPath("picky-eater")}>picky eaters</A>, <A href={bestForPath("puppy")}>puppies</A> and <A href={bestForPath("senior-dog")}>senior dogs</A>, or browse ingredients like <A href={ingredientPath("peas")}>peas</A>.
      </P>

      <H2 id="method">How did we research this guide?</H2>
      <P>
        We started from the questions people actually ask. We collected more than 2,200 real search queries about fresh dog food from Google&apos;s autocomplete suggestions in November 2026, grouped them by intent, and built a section for each major group: cost, brands, reviews, safety, feeding, formats, storage and buying.
      </P>
      <P>
        We read every primary source cited here directly: FDA pages and recall notices, AVMA and WSAVA policy documents, AAHA guidance, and peer-reviewed studies where they were accessible. Where a study was only available as an abstract or a press summary, we say so in the source list.
      </P>
      <P>
        Customer data comes from 282 Trustpilot reviews we read and published on our brand pages, and product prices from listings captured on November 5, 2026. Calorie figures use the standard veterinary formula. Brand prices, calorie densities and AAFCO statements are being verified brand by brand, and we show &ldquo;Verifying&rdquo; until they are.
      </P>
    </>
  );
}
