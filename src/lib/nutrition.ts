// ─────────────────────────────────────────────────────────────────────────────
// Nutrition engine - the formulas every page's numbers come from.
//
// Inputs are a brand's verified as-fed guaranteed analysis + kcal/kg (see
// src/lib/dogfood/brands.ts). Outputs are dry-matter %, grams per 1,000 kcal,
// protein:fat ratio, AAFCO checks and cost per day by body weight.
//
// References (cite on /how-we-rank):
//  - AAFCO Dog Food Nutrient Profiles (2016+): minimums on a DM basis assuming
//    4,000 kcal ME/kg, and per 1,000 kcal ME.
//  - RER = 70 x kg^0.75 (NRC 2006; WSAVA Global Nutrition Guidelines).
// ─────────────────────────────────────────────────────────────────────────────

import type { NutritionFacts, PriceFacts } from "@/lib/dogfood/brands";

export const LB_PER_KG = 2.20462;
export const lbToKg = (lb: number) => lb / LB_PER_KG;

/** Weight brackets (lb) used in every cost-per-day table on the site. */
export const WEIGHT_BRACKETS_LB = [10, 25, 50, 75, 100] as const;

/** AAFCO minimums. DM % (at 4,000 kcal/kg) and g per 1,000 kcal ME. */
export const AAFCO = {
  adult: { proteinDM: 18, fatDM: 5.5, proteinPer1000: 45, fatPer1000: 13.8 },
  growth: { proteinDM: 22.5, fatDM: 8.5, proteinPer1000: 56.3, fatPer1000: 21.3 },
  caToPRatio: { min: 1, max: 2 },
  largeBreedGrowthCaMaxDM: 1.8,
} as const;

/** MER multipliers applied to RER. */
export const LIFE_STAGE_FACTORS = {
  "neutered-adult": { factor: 1.6, label: "Neutered adult" },
  "intact-adult": { factor: 1.8, label: "Intact adult" },
  "weight-loss": { factor: 1.0, label: "Weight loss (at target weight)" },
  senior: { factor: 1.4, label: "Senior / less active" },
  active: { factor: 2.0, label: "Active / working (light)" },
  "puppy-young": { factor: 3.0, label: "Puppy under 4 months" },
  "puppy-older": { factor: 2.0, label: "Puppy 4-12 months" },
} as const;
export type LifeStage = keyof typeof LIFE_STAGE_FACTORS;

/** Resting energy requirement, kcal/day. */
export const rer = (kg: number) => 70 * Math.pow(kg, 0.75);

/** Maintenance energy requirement, kcal/day. */
export const mer = (kg: number, stage: LifeStage = "neutered-adult") =>
  rer(kg) * LIFE_STAGE_FACTORS[stage].factor;

export const kcalPerDayForLb = (lb: number, stage: LifeStage = "neutered-adult") =>
  Math.round(mer(lbToKg(lb), stage));

/** As-fed % -> dry-matter %. */
export const dryMatter = (asFedPct: number, moisturePct: number) =>
  moisturePct >= 100 ? 0 : (asFedPct / (100 - moisturePct)) * 100;

/** As-fed % -> grams per 1,000 kcal (the fairest cross-format comparison). */
export const gramsPer1000kcal = (asFedPct: number, kcalPerKg: number) =>
  (asFedPct * 10000) / kcalPerKg;

export interface NutrientProfile {
  proteinDM: number;
  fatDM: number;
  fiberDM: number;
  carbsDM: number | null; // by difference; null when ash is not published
  proteinPer1000: number;
  fatPer1000: number;
  proteinToFat: number;
  kcalPerKg: number;
  caToP: number | null;
  meetsAdultMinimums: boolean;
  meetsGrowthMinimums: boolean;
}

export function profile(n: NutritionFacts): NutrientProfile {
  const m = n.moistureMaxPct;
  const carbsAsFed =
    n.ashPct !== undefined ? 100 - n.proteinMinPct - n.fatMinPct - n.fiberMaxPct - m - n.ashPct : null;
  const proteinPer1000 = gramsPer1000kcal(n.proteinMinPct, n.kcalPerKg);
  const fatPer1000 = gramsPer1000kcal(n.fatMinPct, n.kcalPerKg);
  return {
    proteinDM: dryMatter(n.proteinMinPct, m),
    fatDM: dryMatter(n.fatMinPct, m),
    fiberDM: dryMatter(n.fiberMaxPct, m),
    carbsDM: carbsAsFed === null ? null : Math.max(0, dryMatter(carbsAsFed, m)),
    proteinPer1000,
    fatPer1000,
    proteinToFat: n.proteinMinPct / n.fatMinPct,
    kcalPerKg: n.kcalPerKg,
    caToP: n.calciumPct && n.phosphorusPct ? n.calciumPct / n.phosphorusPct : null,
    meetsAdultMinimums: proteinPer1000 >= AAFCO.adult.proteinPer1000 && fatPer1000 >= AAFCO.adult.fatPer1000,
    meetsGrowthMinimums: proteinPer1000 >= AAFCO.growth.proteinPer1000 && fatPer1000 >= AAFCO.growth.fatPer1000,
  };
}

/** USD per day to feed a dog of `lb` pounds. */
export const costPerDay = (price: PriceFacts, lb: number, stage: LifeStage = "neutered-adult") =>
  (kcalPerDayForLb(lb, stage) / 1000) * price.usdPer1000kcal;

/** Grams of food per day for a dog of `lb` pounds. */
export const gramsPerDay = (n: NutritionFacts, lb: number, stage: LifeStage = "neutered-adult") =>
  (kcalPerDayForLb(lb, stage) / n.kcalPerKg) * 1000;

export const fmtUsd = (v: number) => `$${v.toFixed(2)}`;
export const fmtPct = (v: number) => `${v.toFixed(1)}%`;
export const fmtNum = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 0 });

/** Placeholder rendered wherever a number is not yet verified. */
export const PENDING = "Verifying";
