import Link from "next/link";
import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import type { ArticleMeta } from "./types";

// Sources (each opened and read during the 2026-11-05 run unless noted).
const FDA_STUDY = "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet";
const FDA_H5N1 = "https://www.fda.gov/animal-veterinary/cvm-updates/cat-and-dog-food-manufacturers-required-consider-h5n1-food-safety-plans";
const FDA_WILD_COAST = "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/voluntary-recall-wild-coast-raw-boneless-free-range-chicken-formula-raw-pet-food-because-possible";
const FDA_SAVAGE = "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/savage-pet-recalls-savage-cat-food-chicken-large-and-small-boxes-because-possible-bird-flu-health";
const AVMA = "https://www.avma.org/resources-tools/avma-policies/raw-or-undercooked-animal-source-protein-cat-and-dog-diets";
const WSAVA = "https://wsava.org/wp-content/uploads/2021/04/Raw-Meat-Based-Diets-for-Pets_WSAVA-Global-Nutrition-Toolkit.pdf";
const FINLEY = "https://pmc.ncbi.nlm.nih.gov/articles/PMC1716752/";
const VAN_BREE = "https://pubmed.ncbi.nlm.nih.gov/29326391/";

const pct = (n: number, d: number) => `${((n / d) * 100).toFixed(1)}%`;
// FDA CVM study, 2010-2012 (Nemser et al., 2014): raw samples tested and positives.
const RAW_N = 196;
const RAW_SALMONELLA = 15;
const RAW_LISTERIA = 32;
// van Bree et al., 2018: 35 frozen commercial raw diets, 8 brands.
const VB_N = 35;

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
  slug: "is-raw-dog-food-safe",
  title: "Is Raw Dog Food Safe? Bacteria, Bird Flu and What the FDA Found (2026)",
  seoTitle: "Is Raw Dog Food Safe? Bacteria, Bird Flu & FDA Data (2026)",
  description:
    "What FDA testing, peer-reviewed studies and the 2025 bird flu recalls show about raw dog food: the real risks, who should avoid it, and how to lower them.",
  publishedAt: "2026-11-05",
  updatedAt: "2026-11-05",
  readMinutes: 10,
  category: "Health",
  answer: {
    question: "Is raw dog food safe?",
    text: `It carries a documented, higher risk than cooked food. In FDA testing, ${pct(RAW_LISTERIA, RAW_N)} of raw pet food samples had Listeria and ${pct(RAW_SALMONELLA, RAW_N)} had Salmonella, against almost none in dry food. The AVMA discourages raw feeding, and the WSAVA warns it is riskiest in homes with small children, older adults, pregnant or immunocompromised people.`,
  },
  keyTakeaways: [
    `FDA testing (2010-2012): ${RAW_LISTERIA} of ${RAW_N} raw pet food samples carried Listeria monocytogenes and ${RAW_SALMONELLA} carried Salmonella. Of 120 dry dog food samples, none carried either.`,
    "Dogs can carry it home: in a controlled study, 7 of 16 dogs fed Salmonella-contaminated raw food shed Salmonella in their stool within 1-7 days, with no signs of illness.",
    "Bird flu changed the rules in 2025: the FDA now requires makers of raw cat and dog food using poultry or cattle to treat H5N1 as a foreseeable hazard. Cats have died; H5N1 has not been detected in US dogs.",
    "Freezing and freeze-drying don't make raw food safe. Cooking, pasteurisation or another validated kill step does.",
  ],
  faqs: [
    {
      question: "Can dogs get sick from raw dog food?",
      answer: "Yes, although many carry bacteria without showing signs. Raw diets can contain Salmonella, Listeria, E. coli and Campylobacter, and the WSAVA notes that high-fat raw diets can cause diarrhoea or even pancreatitis in some dogs.",
    },
    {
      question: "Can raw dog food make people sick?",
      answer: "Yes. People can be infected by handling the food or the dog's stool, and dogs can shed Salmonella without looking ill. Young children, older adults, pregnant people and anyone with a weakened immune system are most at risk.",
    },
    {
      question: "Can dogs get bird flu from raw food?",
      answer: "It is possible but has not been seen in the US so far. The FDA says dogs can contract H5N1, usually with mild signs, and that it had not been detected in US dogs. Cats are far more vulnerable, and several have died after eating contaminated raw food.",
    },
    {
      question: "Is freeze-dried raw dog food safer than frozen raw?",
      answer: "Not by default. The WSAVA states that freezing, dehydration and freeze-drying do not kill all bacteria. Freeze-dried raw is easier to store, but it is still raw unless the maker uses a validated kill step such as high-pressure processing.",
    },
    {
      question: "Do vets recommend raw dog food?",
      answer: "The major veterinary bodies don't. The AVMA discourages feeding raw or undercooked animal protein to dogs and cats, and the WSAVA says there is no evidence that raw diets offer health benefits over cooked diets.",
    },
  ],
  sources: [
    { label: "Get the Facts! Raw Pet Food Diets can be Dangerous to You and Your Pet (FDA CVM study, Oct 2010 - Jul 2012)", publisher: "U.S. Food and Drug Administration", year: 2018, href: FDA_STUDY },
    { label: "Nemser S, Doran T, et al. Investigation of Listeria, Salmonella, and toxigenic Escherichia coli in various pet foods. Foodborne Pathog Dis 2014;11:706-709 (as reported by the FDA)", publisher: "Foodborne Pathogens and Disease", year: 2014, href: FDA_STUDY },
    { label: "Cat and Dog Food Manufacturers Required to Consider H5N1 in Food Safety Plans (Jan 17, 2025; reissued Sep 30, 2025)", publisher: "U.S. Food and Drug Administration", year: 2025, href: FDA_H5N1 },
    { label: "Wild Coast Raw recall: frozen chicken formula raw cat food, possible H5N1 (Mar 1, 2025)", publisher: "U.S. Food and Drug Administration", year: 2025, href: FDA_WILD_COAST },
    { label: "Savage Pet recall: Savage Cat Food Chicken, possible H5N1 (Mar 15, 2025)", publisher: "U.S. Food and Drug Administration", year: 2025, href: FDA_SAVAGE },
    { label: "Policy: Raw diets for dogs and cats (current policy, accessed November 2026)", publisher: "American Veterinary Medical Association", year: 2026, href: AVMA },
    { label: "Raw Meat Based Diets for Pets (Global Nutrition Toolkit)", publisher: "World Small Animal Veterinary Association", year: 2020, href: WSAVA },
    { label: "Finley R et al. The risk of salmonellae shedding by dogs fed Salmonella-contaminated commercial raw food diets. Can Vet J 2007;48(1):69-75", publisher: "Canadian Veterinary Journal", year: 2007, href: FINLEY },
    { label: "van Bree FPJ et al. Zoonotic bacteria and parasites found in raw meat-based diets for cats and dogs. Vet Rec 2018;182(2):50", publisher: "Veterinary Record", year: 2018, href: VAN_BREE },
  ],
  relatedPaths: ["/diets/raw", "/diets/freeze-dried", "/reviews/we-feed-raw"],
};

export function Body() {
  return (
    <>
      <H2 id="safe">Is raw dog food safe to feed?</H2>
      <P>
        Raw dog food is not safe in the way cooked food is: it carries a measurably higher risk of disease-causing bacteria, for your dog and for the people around it.
        That doesn&apos;t mean every raw-fed dog gets sick. It means you are accepting a risk that cooking would remove.
      </P>
      <P>
        Both major veterinary bodies say so plainly. The American Veterinary Medical Association &ldquo;discourages feeding any raw or undercooked animal-sourced proteins&rdquo; to dogs and cats (<Ext href={AVMA}>AVMA</Ext>).
        The World Small Animal Veterinary Association adds that there is &ldquo;no evidence that raw meat-based diets provide health benefits over commercial or balanced homemade cooked diets&rdquo; (<Ext href={WSAVA}>WSAVA</Ext>).
      </P>
      <P>
        We cover raw brands on this site, including <A href="/reviews/we-feed-raw">We Feed Raw</A>, and we&apos;ll tell you how to lower the risk if you choose raw. But we won&apos;t pretend the risk isn&apos;t there. Here is what the testing shows.
      </P>

      <H2 id="fda-testing">What did the FDA find when it tested raw pet food?</H2>
      <P>
        The FDA found raw pet food far more likely to carry Salmonella and Listeria than any other type it tested. Between October 2010 and July 2012, its Center for Veterinary Medicine screened more than 1,000 pet food samples bought at retail and online (<Ext href={FDA_STUDY}>FDA</Ext>).
      </P>
      <Table
        caption="FDA pet food testing, 2010-2012: samples positive for Salmonella and Listeria monocytogenes"
        head={["Type of pet food", "Samples tested", "Salmonella positive", "Listeria monocytogenes positive"]}
        rows={[
          ["Raw pet food", "196", `${RAW_SALMONELLA} (${pct(RAW_SALMONELLA, RAW_N)})`, `${RAW_LISTERIA} (${pct(RAW_LISTERIA, RAW_N)})`],
          ["Dry dog food", "120", "0", "0"],
          ["Dry cat food", "120", "1", "0"],
          ["Semi-moist dog food", "120", "0", "0"],
          ["Jerky-type treats", "190", "0", "0"],
        ]}
        note={<>Source: FDA Center for Veterinary Medicine (published as Nemser et al., <em>Foodborne Pathogens and Disease</em>, 2014). Canned food was not tested. Raw food was added in the study&apos;s second year.</>}
      />
      <P>
        The study&apos;s co-lead, FDA veterinarian Renate Reimschuessel, said &ldquo;quite a large percentage&rdquo; of the raw foods tested positive for Listeria monocytogenes, a bacterium the agency had not previously screened pet food for.
        Her conclusion: the results showed &ldquo;a potential health risk for the pets eating the raw food, and for the owners handling the product.&rdquo;
      </P>

      <H2 id="other-studies">Do newer studies show the same thing?</H2>
      <P>
        Yes. A 2018 study from Utrecht University and the Dutch public health institute (RIVM) tested {VB_N} frozen commercial raw diets from eight brands and found disease-causing organisms in most of them (<Ext href={VAN_BREE}>van Bree et al., 2018</Ext>).
      </P>
      <Table
        caption="Pathogens found in 35 commercial frozen raw diets (van Bree et al., Veterinary Record, 2018)"
        head={["Organism", "Products positive", "Share of products"]}
        rows={[
          ["ESBL-producing E. coli (antibiotic-resistant)", "28 of 35", "80%"],
          ["Listeria monocytogenes", "19 of 35", "54%"],
          ["E. coli O157:H7", "8 of 35", "23%"],
          ["Salmonella", "7 of 35", "20%"],
          ["Sarcocystis cruzi (parasite)", "4 of 35", "11%"],
          ["Toxoplasma gondii (parasite)", "2 of 35", "6%"],
        ]}
        note="Products were bought in the Netherlands; US products may differ, but the organisms are the same ones the FDA screens for."
      />
      <P>
        The antibiotic-resistant E. coli result matters beyond your own home. The WSAVA notes that studies link raw feeding to resistant bacteria in dogs&apos; stool, and that raw-fed pets can carry pathogens into vet clinics (<Ext href={WSAVA}>WSAVA</Ext>).
      </P>

      <H2 id="people">Can a raw-fed dog make your family sick?</H2>
      <P>
        Yes, and usually without looking ill itself. In a Canadian trial, 16 dogs ate one meal of commercial raw food that contained Salmonella. Seven of them (44%) shed Salmonella in their stool one to seven days later, and none showed any signs of illness (<Ext href={FINLEY}>Finley et al., 2007</Ext>).
      </P>
      <P>
        Five of those seven dogs shed the same Salmonella type found in the food. None of the 12 dogs fed Salmonella-free raw food shed it. The authors concluded raw-fed dogs &ldquo;may be a source of environmental contamination potentially leading to human or animal illness.&rdquo;
      </P>
      <P>
        That is why the risk depends on your household as much as your dog. People can be infected by handling the food or the dog&apos;s stool, even if they never feed it themselves (<Ext href={WSAVA}>WSAVA</Ext>).
      </P>
      <Table
        caption="Who is most at risk from raw pet food in the home"
        head={["Who lives with the dog", "Our risk rating", "Why"]}
        rows={[
          ["Small children", "High", "More at risk of infection (WSAVA); they touch bowls, dogs and floors, then their mouths"],
          ["Pregnant people", "High", "More at risk (WSAVA); Toxoplasma, found in some raw diets, can affect the fetus"],
          ["Older adults", "High", "More at risk of infection (WSAVA)"],
          ["Anyone with a weakened immune system or on certain medications", "High", "More at risk (WSAVA); food-borne infections can be serious or fatal"],
          ["Healthy adults only", "Lower, not zero", "Strict handling hygiene still needed"],
        ]}
        note="Risk groups as listed by the WSAVA Global Nutrition Committee; the ratings are ours. If anyone in your home is in the top four rows, we recommend cooked food."
      />

      <H2 id="bird-flu">Can raw dog food carry bird flu (H5N1)?</H2>
      <P>
        Yes. Raw food made from infected poultry or cattle can carry H5N1, and cats have died from it. On January 17, 2025, the FDA required makers of cat and dog food who use uncooked or unpasteurized poultry or cattle ingredients to add H5N1 to their food safety plans as a &ldquo;known or reasonably foreseeable hazard&rdquo; (<Ext href={FDA_H5N1}>FDA</Ext>).
      </P>
      <P>
        The FDA reissued that requirement on September 30, 2025, ahead of the fall bird migration, when detections usually rise. It said cases in domestic and wild cats in California, Colorado, Oregon and Washington were linked to contaminated food.
      </P>
      <Table
        caption="Examples of 2025 raw pet food recalls for possible H5N1, from FDA notices"
        head={["Date", "Product", "What happened"]}
        rows={[
          [<Ext key="w" href={FDA_WILD_COAST}>Mar 1, 2025</Ext>, "Wild Coast Raw, frozen Boneless Free Range Chicken Formula (cat food)", "Recalled for possible H5N1; sold in Washington and Oregon"],
          [<Ext key="s" href={FDA_SAVAGE}>Mar 15, 2025</Ext>, "Savage Pet, Savage Cat Food Chicken (66 large + 74 small boxes)", "Recalled for possible H5N1; sold in 15 states and DC"],
        ]}
        note="These were cat foods, but the risk comes from the raw poultry or dairy, not the species on the label. Check the FDA's recall list for current notices."
      />
      <P>
        What about dogs? The FDA says dogs &ldquo;can also contract H5N1, although they usually exhibit mild clinical signs and low mortality compared to cats,&rdquo; and that H5N1 had not been detected in dogs in the United States, though fatal cases have occurred elsewhere.
      </P>
      <Callout>
        <strong>Signs to watch for after feeding a recalled product</strong> (from the FDA recall notices): fever, lethargy, low appetite, red or inflamed eyes, eye or nose discharge, trouble breathing, and neurological signs such as tremors, stiff movements, seizures, poor coordination or blindness. Call your vet.
      </Callout>

      <H2 id="freezing">Does freezing or freeze-drying make raw food safe?</H2>
      <P>
        No. The WSAVA states that &ldquo;freezing, dehydration or freeze-drying do not kill all bacteria in food&rdquo; (<Ext href={WSAVA}>WSAVA</Ext>). Freezing mostly pauses bacteria; they can grow again as the food thaws.
      </P>
      <P>
        What does reduce the risk is a step that actually kills pathogens. The AVMA names cooking and pasteurisation, and recognises that &ldquo;other scientifically validated technologies&rdquo; can work too (<Ext href={AVMA}>AVMA</Ext>).
        Some raw brands use high-pressure processing (HPP) for this. If you buy raw, ask the brand directly whether every batch goes through a validated kill step, and for what pathogens.
      </P>
      <P>
        This applies to <A href={dietPath("freeze-dried")}>freeze-dried raw</A> as much as frozen. It&apos;s more convenient, not automatically safer.
      </P>

      <H2 id="benefits">Is raw food healthier than cooked food?</H2>
      <P>
        There&apos;s no good evidence that it is. The WSAVA&apos;s nutrition committee says raw diets &ldquo;can be highly digestible&rdquo; but that no evidence shows they provide health benefits over cooked diets (<Ext href={WSAVA}>WSAVA</Ext>).
        It also warns that high-fat, low-fiber diets, raw or cooked, can cause diarrhoea or even pancreatitis in some dogs.
      </P>
      <P>
        Gently cooked fresh food gives you most of what draws people to raw (real meat, little processing, high digestibility and taste) without the pathogen risk.
        Our <A href="/articles/fresh-vs-kibble">fresh vs kibble guide</A> covers what the digestibility studies found.
      </P>

      <H2 id="who-should-avoid">Which dogs and homes should avoid raw food?</H2>
      <P>Skip raw food in any of these situations:</P>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li>Anyone in the home is a small child, an older adult, pregnant or immunocompromised (see the table above).</li>
        <li>Your dog is a puppy: an unbalanced raw diet can cause painful skeletal problems in growing dogs, the WSAVA warns. See <A href={bestForPath("puppy")}>food for puppies</A>.</li>
        <li>Your dog has a history of pancreatitis or a <A href={dietPath("sensitive-stomach")}>sensitive stomach</A>, given the high fat content of many raw diets.</li>
        <li>Your dog visits hospitals, schools or care homes as a therapy dog, or lives with cats who might share bowls.</li>
        <li>Your dog is on immune-suppressing medication. Ask your vet first.</li>
      </ul>

      <H2 id="lower-risk">If you feed raw, how do you lower the risk?</H2>
      <P>
        Handle it exactly like raw meat for people. These steps come from the FDA&apos;s own guidance for raw pet food (<Ext href={FDA_STUDY}>FDA</Ext>):
      </P>
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700">
        <li>Keep it frozen until use, and thaw it in the fridge or microwave, never on the counter or in the sink.</li>
        <li>Wash your hands with soap and water for at least 20 seconds after handling the food, bowls or surfaces.</li>
        <li>Clean, then disinfect, every surface and object it touches. The FDA&apos;s mix: 1 tablespoon of bleach per quart (4 cups) of water.</li>
        <li>Don&apos;t rinse raw meat; the splashes spread bacteria.</li>
        <li>Cover and refrigerate leftovers right away, or throw them out.</li>
        <li>Don&apos;t let your dog lick your face, especially right after a meal, and wash your hands after touching it.</li>
        <li>Pick up and bag stool promptly, and keep raw-fed dogs away from children&apos;s play areas.</li>
      </ol>
      <P>
        Before you buy, ask three questions: does every batch go through a validated kill step such as HPP, does the brand test finished product for Salmonella and Listeria, and how has it addressed H5N1 under the FDA&apos;s 2025 requirement? We ask the same questions in our <A href="/reviews/we-feed-raw">We Feed Raw review</A> and on the <A href={dietPath("raw")}>raw dog food</A> guide.
      </P>

      <H2 id="alternatives">What&apos;s the safer alternative to raw?</H2>
      <P>
        Gently cooked fresh food. It&apos;s minimally processed and made from whole meat, but cooking removes the pathogen risk the FDA, AVMA and WSAVA warn about.
        It is what we recommend for homes with children, older adults or anyone immunocompromised.
      </P>
      <P>
        Our top-rated cooked options are <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A> and <A href="/reviews/ollie">Ollie</A>; the <A href="/compare/the-farmers-dog-vs-ollie">head-to-head</A> covers the differences.
        If freezer space is the issue, <A href="/reviews/spot-and-tango">Spot &amp; Tango</A> makes a shelf-stable cooked option. Every brand is scored in our <A href="/">2026 ranking</A> using our <A href="/how-we-rank">published method</A>, and our <A href={dietPath("transitioning-to-fresh")}>transition plan</A> covers the switch.
      </P>
    </>
  );
}
