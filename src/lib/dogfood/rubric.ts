// The Scout Score rubric - published on /how-we-rank and summarized in the
// sidebar. Weights sum to 100. Scores are fixed BEFORE commercial terms are
// discussed, and a lower total can never be ranked above a higher one.
export const RUBRIC = [
  { key: "nutrition", label: "Nutrition & formulation", weight: 30, detail: "Protein and fat per 1,000 kcal vs. AAFCO minimums, Ca:P ratio, who formulated it (board-certified veterinary nutritionist or PhD animal nutritionist), life-stage coverage." },
  { key: "safety", label: "Safety & transparency", weight: 15, detail: "Exact AAFCO statement published, feeding trials vs. formulation only, full guaranteed analysis and calorie content public, recall history (FDA)." },
  { key: "ingredients", label: "Ingredient quality & sourcing", weight: 15, detail: "Named whole-food proteins first, human-grade claim (AAFCO-defined), legume load (FDA DCM flag), sourcing disclosure." },
  { key: "value", label: "Value (cost per 1,000 kcal)", weight: 20, detail: "Standard (non-intro) price converted to USD per 1,000 kcal, then to cost per day at 10, 25, 50, 75 and 100 lb." },
  { key: "flexibility", label: "Plan flexibility & personalization", weight: 15, detail: "Calorie-targeted portions, pause/skip/cancel online, mixed and topper plans, subscription lock-in." },
  { key: "convenience", label: "Convenience & delivery", weight: 5, detail: "Storage needs (freezer / fridge / pantry), delivery coverage, retail availability." },
] as const;
