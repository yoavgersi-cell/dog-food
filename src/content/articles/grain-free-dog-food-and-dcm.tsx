import Link from "next/link";
import { ArticleBrandCard } from "@/components/article-brand-card";
import { H2, P, Callout } from "@/components/page-shell";
import { bestForPath, dietPath, ingredientPath } from "@/lib/dogfood/taxonomy";
import type { ArticleMeta } from "./types";

// Sources (each opened and read during the 2026-11-08 run).
const FDA_INVESTIGATION = "https://www.fda.gov/animal-veterinary/outbreaks-and-advisories/fda-investigation-potential-link-between-certain-diets-and-canine-dilated-cardiomyopathy";
const FDA_QA = "https://www.fda.gov/animal-veterinary/animal-health-literacy/questions-answers-fdas-work-potential-causes-non-hereditary-dcm-dogs";

// FDA report counts (dogs), from the FDA Q&A table compiled for Congress, Dec 2022.
const REPORTS = [
  { period: "Jan 1, 2014 - Nov 30, 2018", n: 329 },
  { period: "Dec 1, 2018 - Apr 30, 2019", n: 190 },
  { period: "May 1, 2019 - Jul 31, 2020", n: 608 },
  { period: "Aug 1, 2020 - Nov 1, 2022", n: 255 },
];
const TOTAL = REPORTS.reduce((s, r) => s + r.n, 0); // 1,382

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
  slug: "grain-free-dog-food-and-dcm",
  title: "Grain-Free Dog Food and DCM: What the FDA Investigation Actually Found (2026)",
  seoTitle: "Grain-Free Dog Food and DCM: What the FDA Found (2026)",
  description:
    "Does grain-free dog food cause heart disease? What the FDA's DCM investigation found, why peas and lentils matter more than grain, and what to do now.",
  publishedAt: "2026-11-08",
  updatedAt: "2026-11-08",
  readMinutes: 9,
  category: "Health",
  answer: {
    question: "Does grain-free dog food cause DCM?",
    text: `It hasn't been proven. The FDA found a pattern: most dogs reported with DCM ate diets high in peas, lentils or other pulses, usually labelled grain-free. But it found no definitive evidence these diets are unsafe, recalled none, and has received ${TOTAL.toLocaleString("en-US")} dog reports since 2014.`,
  },
  keyTakeaways: [
    `The FDA received ${TOTAL.toLocaleString("en-US")} reports of DCM in dogs between January 2014 and November 2022. Reports alone, it says, can't establish cause.`,
    "In the cases it analysed, more than 90% of the foods were labelled grain-free and 93% contained peas and/or lentils. Animal protein sources varied widely.",
    "The common thread is pulses high in the ingredient list, not the absence of grain: the FDA has DCM reports on grain-containing diets too.",
    "No recalls: the FDA says it has no definitive information that these diets are unsafe. It advises talking to your vet before changing diet.",
  ],
  faqs: [
    {
      question: "Did the FDA ban or recall grain-free dog food?",
      answer: "No. The FDA says it has no definitive information that the diets are inherently unsafe and need to be removed from the market. It hasn't requested any recalls tied to DCM.",
    },
    {
      question: "Are peas and lentils bad for dogs?",
      answer: "Not inherently. The FDA notes legumes and pulses have been used in pet food for many years with no evidence they are dangerous. The concern is diets where they make up a large share, high in the ingredient list.",
    },
    {
      question: "Should I add taurine to my dog's food?",
      answer: "Don't supplement without your vet. Dogs normally make taurine from the amino acids methionine and cysteine, and the FDA found nearly all tested grain-free foods met the AAFCO minimum for those. Your vet can test taurine levels if there's a concern.",
    },
    {
      question: "Can a dog recover from diet-associated DCM?",
      answer: "Some do. The FDA says veterinary cardiologists have reported improved heart function in non-hereditary DCM, unlike the genetic form, and that some dogs recovered fully or partly with a diet change and veterinary care.",
    },
    {
      question: "What are the signs of DCM in dogs?",
      answer: "The FDA lists decreased energy, coughing, difficulty breathing and episodes of collapse. If you see them, contact your vet promptly, and go to an emergency clinic if the signs are severe.",
    },
  ],
  sources: [
    { label: "FDA Investigation into Potential Link between Certain Diets and Canine Dilated Cardiomyopathy (updated Jun 27, 2019; final note Dec 23, 2022)", publisher: "U.S. Food and Drug Administration", year: 2022, href: FDA_INVESTIGATION },
    { label: "Questions & Answers: FDA's Work on Potential Causes of Non-Hereditary DCM in Dogs (report counts to Nov 1, 2022)", publisher: "U.S. Food and Drug Administration", year: 2022, href: FDA_QA },
  ],
  relatedPaths: ["/diets/grain-free", "/diets/grain-inclusive", "/diets/heart-health", "/ingredients/peas", "/ingredients/lentils"],
};

export function Body() {
  return (
    <>
      <H2 id="cause">Does grain-free dog food cause heart disease?</H2>
      <P>
        Nobody has shown that it does. What the FDA found is a pattern worth taking seriously: most dogs reported with dilated cardiomyopathy (DCM) were eating diets high in peas, lentils or other pulses, and most of those diets were labelled grain-free (<Ext href={FDA_INVESTIGATION}>FDA</Ext>).
      </P>
      <P>
        But a pattern in reports is not proof of cause, and the FDA says so itself. It describes the link as &ldquo;a complex scientific issue that may involve multiple factors,&rdquo; has requested no recalls, and in December 2022 said it would not publish further updates until there is &ldquo;meaningful new scientific information&rdquo; (<Ext href={FDA_INVESTIGATION}>FDA</Ext>).
      </P>
      <P>
        Here is what the investigation actually found, what it didn&apos;t, and what we&apos;d do if your dog eats a grain-free diet.
      </P>

      <H2 id="what-is-dcm">What is DCM in dogs?</H2>
      <P>
        DCM is a disease of the heart muscle. The heart enlarges, its chambers dilate and it pumps less effectively; valves can leak and fluid can build up in the chest and abdomen, leading to congestive heart failure (<Ext href={FDA_QA}>FDA Q&amp;A</Ext>).
      </P>
      <P>
        DCM is known as a genetic condition in some large and giant breeds, such as the Doberman Pinscher, Great Dane and Irish Wolfhound, and it is seen with taurine deficiency in Cocker Spaniels.
        What stood out in the reports after 2018 was that many involved breeds not previously known to have a genetic predisposition, which pointed to something else, possibly diet.
      </P>

      <H2 id="timeline">What did the FDA investigation find, and when?</H2>
      <P>The investigation ran in public from 2018 to 2022. These are the milestones the FDA has published:</P>
      <Table
        caption="Timeline of the FDA investigation into diet and canine DCM"
        head={["Date", "What happened"]}
        rows={[
          ["July 2018", "FDA announces it is investigating DCM reports in dogs eating certain foods, many labelled grain-free and high in peas, lentils, other pulses or potatoes"],
          ["February 2019", "Second public update, covering reports through November 30, 2018"],
          ["June 27, 2019", "Third update: 524 DCM reports (515 dogs, 9 cats) from Jan 2014 to Apr 2019; analysis of the reported diets"],
          ["September 2020", "FDA joins a scientific forum at Kansas State University on non-hereditary DCM"],
          ["December 23, 2022", `Report count updated (${TOTAL.toLocaleString("en-US")} dog reports to Nov 1, 2022); FDA stops routine public updates`],
        ]}
        note="Source: FDA investigation page and FDA Q&A on non-hereditary DCM."
      />

      <H2 id="how-many">How many dogs were affected?</H2>
      <P>
        The FDA received {TOTAL.toLocaleString("en-US")} reports of DCM in dogs between January 1, 2014 and November 1, 2022 (<Ext href={FDA_QA}>FDA Q&amp;A</Ext>). Some reports covered more than one dog from the same household.
      </P>
      <Table
        caption="Reports of DCM in dogs submitted to the FDA, by period"
        head={["Period", "Reports of DCM in dogs"]}
        rows={[...REPORTS.map((r) => [r.period, r.n.toLocaleString("en-US")]), ["Total, Jan 2014 - Nov 2022", TOTAL.toLocaleString("en-US")]]}
        note="Counts include every report stating a DCM diagnosis; the FDA followed up on only a subset and could not verify every report."
      />
      <P>
        For the 515 dog reports received up to April 30, 2019, the FDA counted 560 affected dogs and 119 deaths (<Ext href={FDA_INVESTIGATION}>FDA</Ext>).
        Reports surged after the July 2018 announcement and slowed after 2020.
      </P>
      <Callout>
        <strong>Read these numbers in context.</strong> The FDA itself notes there are an estimated 77 million pet dogs in the US, most eating commercial food without developing DCM. It also saw reporting bias, for example among Golden Retriever owners after breed groups raised awareness, and it believes cases are underreported overall. A rising report count is a signal, not a rate.
      </Callout>

      <H2 id="diets">What did the reported diets have in common?</H2>
      <P>
        Pulses, not missing grain. In the FDA&apos;s 2019 analysis, more than 90% of the reported products were labelled grain-free, and 93% contained peas and/or lentils. A far smaller share contained potatoes (<Ext href={FDA_INVESTIGATION}>FDA</Ext>).
      </P>
      <Table
        caption="What the FDA found in diets linked to DCM reports"
        head={["Factor", "FDA finding"]}
        rows={[
          ["Labelled grain-free", "More than 90% of reported products"],
          [<A key="p" href={ingredientPath("peas")}>Peas</A>, "93% of reported products had peas and/or lentils"],
          [<A key="l" href={ingredientPath("lentils")}>Lentils and other pulses</A>, "Usually within the first 10 ingredients, before vitamins and minerals"],
          ["Potatoes", "A far smaller proportion of products"],
          ["Soy", "No signal, although soy is a legume"],
          ["Animal protein", "Varied widely; chicken, lamb and fish most common; no single protein predominant"],
          ["Grain-containing diets", "Also present in reports, with pulses high in the ingredient list"],
        ]}
        note="Sources: FDA investigation update (June 2019) and FDA Q&A."
      />
      <P>
        That last row matters. The FDA states plainly that it has DCM reports on both grain-free and grain-containing diets. What most had in common were non-soy pulses high in the ingredient list, which tend to make up a larger share of grain-free recipes (<Ext href={FDA_QA}>FDA Q&amp;A</Ext>).
      </P>

      <H2 id="taurine">Is the problem taurine?</H2>
      <P>
        Not in any simple way. Taurine is &ldquo;generally not considered an essential amino acid for dogs&rdquo; because they make it from two other amino acids, methionine and cysteine (<Ext href={FDA_INVESTIGATION}>FDA</Ext>).
      </P>
      <P>
        When the FDA&apos;s lab network tested grain-free and grain-containing foods, average protein, fat, taurine, methionine and cystine on a dry-matter basis were similar between the two groups.
        Nearly all the grain-free products also exceeded AAFCO&apos;s 0.65% minimum for methionine plus cystine in adult dog food. Our <A href={ingredientPath("taurine")}>taurine guide</A> covers why many brands now add it anyway.
      </P>
      <P>
        The FDA&apos;s current view is that non-hereditary DCM is &ldquo;a complex medical condition&rdquo; that may involve genetics, underlying illness and diet, including how ingredients are digested, sourced, processed and formulated (<Ext href={FDA_QA}>FDA Q&amp;A</Ext>).
      </P>

      <H2 id="recovery">Can dogs recover from diet-associated DCM?</H2>
      <P>
        Some can, which is one of the more hopeful findings. Unlike the genetic form, cardiologists have reported &ldquo;some good results in improving heart function&rdquo; in non-hereditary DCM, and FDA scientists have presented on dogs that &ldquo;fully or partially recovered from DCM with diet change and veterinary care&rdquo; (<Ext href={FDA_QA}>FDA Q&amp;A</Ext>).
      </P>
      <P>
        That only works with a diagnosis. If your dog shows signs, the order is: vet first, echocardiogram if advised, then diet changes under your vet&apos;s or a board-certified veterinary nutritionist&apos;s guidance.
      </P>

      <H2 id="stop">Should you stop feeding grain-free dog food?</H2>
      <P>
        Not in a panic, but you should look at the label and talk to your vet. The FDA has &ldquo;no definitive information indicating that the diets are inherently unsafe,&rdquo; and it encourages owners to work with their vet, who may consult a board-certified veterinary nutritionist, before changing diets (<Ext href={FDA_QA}>FDA Q&amp;A</Ext>).
      </P>
      <P>Here&apos;s how we&apos;d approach it:</P>
      <Table
        caption="What to do about grain-free food and DCM"
        head={["Your situation", "What we'd do"]}
        rows={[
          ["Healthy dog, food has no pulses near the top of the ingredient list", "Nothing urgent; mention the diet at the next checkup"],
          ["Healthy dog, peas, lentils or chickpeas among the first ingredients", "Ask your vet whether to switch; there is no proven need for grain-free unless your vet says so"],
          [<A key="b" href={bestForPath("doberman-pinscher")}>Breed at genetic risk of DCM</A>, "Ask your vet about heart screening whatever the diet"],
          ["Any signs: low energy, cough, hard breathing, collapse", "See your vet promptly; emergency care if severe"],
          ["Dog already diagnosed with DCM", "Diet changes only with your vet or cardiologist"],
        ]}
      />
      <P>
        If you do switch, do it gradually; our <A href="/articles/how-to-switch-dog-to-fresh-food">10-day switching plan</A> works for any food change.
      </P>
      <ArticleBrandCard slug="spot-and-tango" />


      <H2 id="signs">What signs of DCM should you watch for?</H2>
      <P>
        The FDA lists decreased energy, coughing, difficulty breathing and episodes of collapse. If you see them, contact your vet as soon as possible, and seek emergency care if the signs are severe and your vet isn&apos;t available (<Ext href={FDA_INVESTIGATION}>FDA</Ext>).
      </P>
      <P>
        Your vet will ask for a full diet history, so note every food and treat your dog eats. See our <A href={dietPath("heart-health")}>heart health guide</A> and <A href={dietPath("dcm-concerns")}>DCM concerns page</A> for diet considerations.
      </P>

      <H2 id="fresh-food">What does this mean if you feed fresh food?</H2>
      <P>
        The same label check applies. The FDA&apos;s concern is about formulation, especially pulses high in the ingredient list, not about format. A fresh recipe can be grain-free or grain-inclusive, with or without legumes.
      </P>
      <P>
        Read the ingredient list on whatever you feed, and check its AAFCO statement and whether it passed feeding trials (<A href="/articles/how-to-read-a-dog-food-label">how to read a dog food label</A>). If you&apos;d rather avoid the question altogether, look at <A href={dietPath("grain-inclusive")}>grain-inclusive recipes</A>.
      </P>
      <P>
        We list each brand&apos;s recipes and formats in our reviews, including <A href="/reviews/the-farmers-dog">The Farmer&apos;s Dog</A>, <A href="/reviews/ollie">Ollie</A> and <A href="/reviews/spot-and-tango">Spot &amp; Tango</A>, and score every brand with the same <A href="/how-we-rank">published method</A> in our <A href="/">2026 ranking</A>.
      </P>

      <ArticleBrandCard slug="the-farmers-dog" />
    </>
  );
}
