import { FORMAT_LABEL, processFamilies, type Brand } from "./brands";
import { costPerDay, profile } from "@/lib/nutrition";
import type { MatrixRow } from "@/components/comparison-matrix";

/** Serialize brands into the homepage matrix rows (all values precomputed server-side). */
export function matrixRows(brands: Brand[], refLb: number): MatrixRow[] {
  return brands.map((b) => ({
    slug: b.slug,
    name: b.name,
    rank: b.rank,
    score: b.score,
    verdict: b.verdict,
    formats: b.formats.map((f) => FORMAT_LABEL[f]).join(", "),
    families: processFamilies(b),
    proteins: b.proteins.join(", "),
    storage: b.storage,
    pantryOk: b.storage !== "freezer + fridge",
    subscriptionRequired: b.subscriptionRequired,
    customPortions: b.customPortions,
    humanGrade: b.humanGrade,
    aafco: b.aafcoStatement,
    delivery: b.delivery,
    costPerDay: b.price ? costPerDay(b.price, refLb) : null,
    proteinDM: b.nutrition ? profile(b.nutrition).proteinDM : null,
    offer: b.offer,
  }));
}
