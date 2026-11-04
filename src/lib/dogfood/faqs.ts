// Programmatic FAQ generators. Answers are built only from dataset fields, so
// they always match what the page shows (and the FAQPage JSON-LD 1:1).
import { FORMAT_LABEL, getBrand, type Brand } from "./brands";
import type { Pair } from "./pairs";
import type { Breed, Demographic, Diet } from "./taxonomy";
import { breedMidLb } from "./taxonomy";
import { AAFCO, costPerDay, fmtUsd, kcalPerDayForLb } from "@/lib/nutrition";
import type { FaqItem } from "@/lib/config";

const cost = (b: Brand, lb: number) => (b.price ? fmtUsd(costPerDay(b.price, lb)) : null);

export function brandFaqs(b: Brand): FaqItem[] {
  const c = cost(b, 25);
  return [
    {
      question: `Is ${b.name} worth it?`,
      answer: `${b.name} scores ${b.score.toFixed(1)}/10 in our rubric and is our pick for: ${b.verdict.toLowerCase()}. It suits ${b.bestFor[0].toLowerCase()}; it is not ideal for ${b.notIdealFor[0].toLowerCase()}.`,
    },
    {
      question: `How much does ${b.name} cost per day?`,
      answer: c
        ? `About ${c} per day for a 25 lb neutered adult on the standard (non-introductory) price; see the table for 10-100 lb.`
        : `We are verifying ${b.name}'s current standard pricing against its quote flow. The cost table on this page fills in automatically once confirmed. The current intro offer is: ${b.offer}.`,
    },
    {
      question: `What kind of food is ${b.name}?`,
      answer: `${b.name} sells ${b.formats.map((f) => FORMAT_LABEL[f].toLowerCase()).join(" and ")} food with ${b.proteins.join(", ")} recipes, stored in the ${b.storage}.`,
    },
    {
      question: `Does ${b.name} need a subscription?`,
      answer:
        b.subscriptionRequired === null
          ? `We are verifying ${b.name}'s current purchase options.`
          : b.subscriptionRequired
            ? `Yes - ${b.name} is sold by subscription${b.pauseSkipOnline ? ", and you can pause, skip or cancel online" : ""}.`
            : `No - ${b.name} can be bought without a subscription.`,
    },
  ];
}

export function pairFaqs(pair: Pair, a: Brand, b: Brand): FaqItem[] {
  const winner = getBrand(pair.overall)!;
  return [
    { question: `Is ${a.name} or ${b.name} better?`, answer: `${winner.name} wins overall (${winner.score.toFixed(1)}/10 vs ${(winner.slug === a.slug ? b.score : a.score).toFixed(1)}/10). ${pair.angle}` },
    // Reverse word order: people search both "A vs B" and "B vs A".
    { question: `Is ${b.name} better than ${a.name}?`, answer: winner.slug === b.slug ? `Yes, for most dogs. ${b.name} scores ${b.score.toFixed(1)}/10 against ${a.score.toFixed(1)}/10 for ${a.name}. ${a.name} is still the better pick for: ${a.bestFor[0].toLowerCase()}.` : `Not for most dogs. ${a.name} scores ${a.score.toFixed(1)}/10 against ${b.score.toFixed(1)}/10 for ${b.name}, but ${b.name} is the better pick for: ${b.bestFor[0].toLowerCase()}.` },
    ...pair.decisions.map((d) => ({
      question: d.question.replace(/\?$/, ` - ${a.name} or ${b.name}?`),
      answer: d.winner === "tie" ? `It's a tie. ${d.why}` : `${getBrand(d.winner)!.name}. ${d.why}`,
    })),
  ];
}

export function breedFaqs(br: Breed): FaqItem[] {
  const mid = breedMidLb(br);
  return [
    {
      question: `How many calories does a ${br.name} need per day?`,
      answer: `A neutered adult ${br.name} at ${mid} lb needs about ${kcalPerDayForLb(mid).toLocaleString("en-US")} kcal a day (RER x 1.6). At the breed's range of ${br.minLb}-${br.maxLb} lb that is ${kcalPerDayForLb(br.minLb).toLocaleString("en-US")}-${kcalPerDayForLb(br.maxLb).toLocaleString("en-US")} kcal. Adjust by body condition.`,
    },
    {
      question: `Is fresh food good for ${br.name}s?`,
      answer: `Fresh food is a good fit for ${br.name}s when it is complete and balanced (AAFCO) and portioned to their calorie needs. Portion accuracy matters most because ${br.name}s are commonly linked with ${br.risks.map((r) => r.replace(/-/g, " ")).join(" and ")} concerns.`,
    },
    {
      question: `Can a ${br.name} puppy eat fresh dog food?`,
      answer: `Yes, if the recipe meets AAFCO's growth or all-life-stages profile (at least ${AAFCO.growth.proteinPer1000} g protein per 1,000 kcal)${br.maxLb >= 70 ? `, including growth of large-size dogs (calcium at or under ${AAFCO.largeBreedGrowthCaMaxDM}% DM)` : ""}.`,
    },
  ];
}

export function demographicFaqs(d: Demographic): FaqItem[] {
  return [
    { question: `What is the best fresh dog food for ${d.name.toLowerCase()}?`, answer: `${d.focus} Our overall top pick is ${getBrand("the-farmers-dog")!.name}; check the ranking on this page for format-specific picks.` },
    { question: `How many calories does a ${d.refLb} lb dog need?`, answer: `About ${kcalPerDayForLb(d.refLb, d.stage).toLocaleString("en-US")} kcal per day at this life stage (RER = 70 x kg^0.75, times the life-stage factor).` },
  ];
}

export function dietFaqs(d: Diet): FaqItem[] {
  const out: FaqItem[] = [{ question: `What matters most when choosing food for ${d.name.toLowerCase()}?`, answer: d.focus }];
  if (d.therapeutic) {
    out.push({
      question: `Can fresh food replace a prescription diet for ${d.name.toLowerCase()}?`,
      answer: "No. None of the seven brands we cover sells a veterinary therapeutic diet. If your vet has prescribed one, keep feeding it and ask before adding any fresh food or topper.",
    });
  }
  return out;
}
