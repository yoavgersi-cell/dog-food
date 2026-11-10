import { P } from "@/components/page-shell";
import { kcalPerDayForLb } from "@/lib/nutrition";
import type { ArticleMeta } from "./types";
import { Part1 } from "./fresh-dog-food-guide/part1";
import { Part2 } from "./fresh-dog-food-guide/part2";
import { Part3 } from "./fresh-dog-food-guide/part3";
import { Part4 } from "./fresh-dog-food-guide/part4";
import { Part5 } from "./fresh-dog-food-guide/part5";
import { Part6 } from "./fresh-dog-food-guide/part6";
import { SRC } from "./fresh-dog-food-guide/ui";

export const meta: ArticleMeta = {
  slug: "fresh-dog-food-guide",
  title: "Fresh Dog Food: The Complete 2026 Guide to Cost, Brands, Nutrition and Safety",
  seoTitle: "Fresh Dog Food: The Complete 2026 Guide",
  description:
    "Everything about fresh dog food: what it costs per day and month, the best brands, where to buy it, how much to feed and what's safe, with every source cited.",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  readMinutes: 45,
  category: "Buying guide",
  answer: {
    question: "What is fresh dog food, and is it worth it?",
    text: "Fresh dog food is lightly cooked (or raw) food made from whole ingredients, usually frozen and delivered in portions sized to your dog's calories. It's more digestible and palatable than kibble in small studies, but costs more per calorie and isn't proven to extend life. It's most worth it for small, picky or overweight dogs.",
  },
  keyTakeaways: [
    "Cost follows calories: Petful's 2026 testing put The Farmer's Dog at about $2.31 to $26.77 a day, small dog to giant breed. A 25% topper costs about a quarter of a full fresh plan.",
    "In the best study so far (Illinois, 2021), dogs on kibble produced 1.5-2.9x more stool than on fresh food. It was small and industry-funded and didn't measure long-term health.",
    "Cooked fresh food is the safer choice: in FDA testing, 16.3% of raw pet food samples had Listeria and 7.7% had Salmonella, against none in 120 dry dog food samples.",
    "Switch over 7-10 days (AAHA advises seven, starting at 25%) and feed by calories, not cups, because fresh food is about 70% water.",
  ],
  faqs: [
    {
      question: "Is fresh dog food better than kibble?",
      answer: "It's more digestible and more palatable in the studies we have, and easier to portion. It isn't proven to make dogs live longer. A complete kibble fed at the right calories is still a sound diet.",
    },
    {
      question: "How much does fresh dog food cost per month?",
      answer: "It depends on your dog's calories. Petful's 2026 survey testing of The Farmer's Dog found about $2.31 to $26.77 a day, or roughly $69 to $803 for 30 days, from small dogs to giant breeds.",
    },
    {
      question: "Why is fresh dog food so expensive?",
      answer: "You're paying for whole ingredients, cold shipping, per-dog portioning and water: at around 70% moisture, fresh food weighs two to three times as much as kibble for the same calories.",
    },
    {
      question: "What is the cheapest fresh dog food?",
      answer: "Trial boxes are the cheapest way to try it; we found listings from $2 to $14. For ongoing feeding, a topper or mixed plan costs far less than a full fresh diet. Compare brands by price per 1,000 kcal, not per box.",
    },
    {
      question: "Can you buy fresh dog food at Walmart, Petco or Chewy?",
      answer: "Some lines, yes. In our November 2026 capture, The Farmer's Dog Instant Fresh was listed at Walmart, Ollie's baked food and jerky at Petco.com, and The Pets Table and Maxbone products at Chewy. Frozen fresh plans are mostly delivery-only.",
    },
    {
      question: "Is fresh dog food cooked or raw?",
      answer: "Most fresh dog food sold by delivery is gently cooked. Raw is a separate category, and some freeze-dried products are raw too. If the pack doesn't say cooked, handle it like raw meat.",
    },
    {
      question: "How much fresh food should I feed my dog?",
      answer: `Work from calories: 70 x (weight in kg to the power of 0.75) x 1.6 for a neutered adult, then divide by the food's calories per gram. A 25 lb neutered adult needs roughly ${Math.round(kcalPerDayForLb(25) / 10) * 10} kcal a day.`,
    },
    {
      question: "How long does fresh dog food last in the fridge?",
      answer: "Once thawed, use it within the window printed on the pack, usually a few days. Keep packs frozen until needed, thaw them in the fridge, and refrigerate or discard leftovers.",
    },
    {
      question: "Is fresh dog food good for puppies?",
      answer: "Yes, if it's complete for growth: the AAFCO statement should say growth or all life stages, and include large-size dogs if your puppy will reach 70 lb or more as an adult.",
    },
    {
      question: "Do vets recommend fresh dog food?",
      answer: "There's no blanket position on cooked fresh food. The WSAVA advises a complete, balanced diet for your dog's life stage from a reputable company, and the AVMA discourages raw diets. Your vet is the best person to review a specific food.",
    },
  ],
  sources: [
    { label: "How much does The Farmer's Dog cost? (survey testing, Feb 2026)", publisher: "Petful", year: 2026, href: SRC.petfulCost },
    { label: "Do S, et al. Nutrient digestibility and fecal characteristics, microbiota, and metabolites in dogs fed human-grade foods. J Anim Sci (University of Illinois release)", publisher: "University of Illinois / Journal of Animal Science", year: 2021, href: SRC.illinois2021 },
    { label: "Human-grade dog chow might aid digestion (study funding)", publisher: "Veterinary Practice News", year: 2021, href: SRC.illinois2021Funding },
    { label: "Algya KM, et al. Apparent total-tract macronutrient digestibility of mildly cooked human-grade and extruded dog diets. J Anim Sci", publisher: "University of Illinois / Journal of Animal Science", year: 2018, href: SRC.algya2018 },
    { label: "Lin CY, et al. Rapid shifts and subsequent stabilization after an abrupt dietary change in healthy adult dogs. Animal Microbiome", publisher: "Animal Microbiome (via PMC)", year: 2022, href: SRC.lin2022 },
    { label: "Tran QD. Extrusion processing: effects on dry canine diets (PhD thesis)", publisher: "Wageningen University", year: 2008, href: SRC.tran2008 },
    { label: "Get the Facts! Raw Pet Food Diets can be Dangerous to You and Your Pet (FDA CVM study 2010-2012; handling guidance)", publisher: "U.S. Food and Drug Administration", year: 2018, href: SRC.fdaRawStudy },
    { label: "Cat and Dog Food Manufacturers Required to Consider H5N1 in Food Safety Plans", publisher: "U.S. Food and Drug Administration", year: 2025, href: SRC.fdaH5n1 },
    { label: "FDA Investigation into Potential Link between Certain Diets and Canine DCM", publisher: "U.S. Food and Drug Administration", year: 2022, href: SRC.fdaDcm },
    { label: "Questions & Answers: FDA's Work on Potential Causes of Non-Hereditary DCM in Dogs", publisher: "U.S. Food and Drug Administration", year: 2022, href: SRC.fdaDcmQa },
    { label: "van Bree FPJ, et al. Zoonotic bacteria and parasites found in raw meat-based diets for cats and dogs. Vet Rec (abstract)", publisher: "Veterinary Record", year: 2018, href: SRC.vanBree2018 },
    { label: "Finley R, et al. The risk of salmonellae shedding by dogs fed Salmonella-contaminated commercial raw food diets. Can Vet J", publisher: "Canadian Veterinary Journal", year: 2007, href: SRC.finley2007 },
    { label: "Policy: Raw diets for dogs and cats (accessed November 2026)", publisher: "American Veterinary Medical Association", year: 2026, href: SRC.avmaRaw },
    { label: "Raw Meat Based Diets for Pets", publisher: "World Small Animal Veterinary Association", year: 2020, href: SRC.wsavaRaw },
    { label: "Selecting the best food for your pet (updated 2021)", publisher: "World Small Animal Veterinary Association", year: 2021, href: SRC.wsavaSelect },
    { label: "Frequently Asked Questions and Myths", publisher: "World Small Animal Veterinary Association", year: 2020, href: SRC.wsavaFaq },
    { label: "Tips and Timelines for Transitioning Your Pet to a New Food", publisher: "American Animal Hospital Association", year: 2021, href: SRC.aaha },
    { label: "2022 U.S. Pet Obesity Prevalence Survey", publisher: "Association for Pet Obesity Prevention", year: 2022, href: SRC.apop2022 },
    { label: "VOHC Accepted Products (list checked November 2026)", publisher: "Veterinary Oral Health Council", year: 2026, href: SRC.vohc },
    { label: "Body Condition Score chart for dogs", publisher: "World Small Animal Veterinary Association", year: 2025, href: SRC.wsavaBcs },
  ],
  relatedPaths: ["/", "/diets/fresh", "/diets/fresh-topper", "/diets/mixed-feeding", "/diets/raw", "/diets/grain-free", "/reviews"],
};

const TOC: [string, string][] = [
  ["what-is-fresh-dog-food", "What is fresh dog food?"],
  ["types", "Types of fresh dog food"],
  ["healthier", "Is it healthier than kibble?"],
  ["complete", "Complete and balanced?"],
  ["cost-overview", "How much it costs"],
  ["cheapest", "Cheapest ways to try it"],
  ["best", "The best fresh dog food (top 3)"],
  ["reviews", "What customers say"],
  ["stores", "Buying in stores"],
  ["how-much", "How much to feed"],
  ["switching", "How to switch"],
  ["puppies", "Puppies, seniors and weight loss"],
  ["raw-vs-cooked", "Raw vs cooked safety"],
  ["dcm", "Grain-free and DCM"],
  ["storage", "Storage and shelf life"],
  ["vs-canned", "Fresh vs canned"],
  ["choose", "How to choose"],
  ["worth-it-for-you", "Is it worth it for your dog?"],
  ["questions-for-brands", "Questions to ask a brand"],
  ["brand-profiles", "Brand profiles"],
  ["mistakes", "Common mistakes"],
  ["numbers", "Key numbers"],
  ["glossary", "Glossary"],
];

export function Body() {
  return (
    <>
      <P>
        Fresh dog food has gone from a niche to a mainstream choice in a few years, and the questions people ask about it have multiplied with it. We studied more than 2,200 real search queries about fresh dog food and built this guide to answer the ones that come up most: cost, brands, safety, feeding and where to buy.
      </P>
      <P>
        It&apos;s long because the subject is. Use the contents to jump to what you need; every section answers its question in the first sentence and links to a deeper guide where we have one.
      </P>
      <nav aria-label="Guide contents" className="my-6 rounded-xl border border-[#F3E3A3] bg-white p-4 sm:p-5">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wide text-[#713F12]">In this guide</p>
        <ol className="grid list-decimal gap-x-6 gap-y-1.5 pl-5 text-[15px] sm:grid-cols-2">
          {TOC.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="tap text-[#A16207] hover:underline">{label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <Part1 />
      <Part2 />
      <Part3 />
      <Part4 />
      <Part6 />
      <Part5 />
    </>
  );
}
