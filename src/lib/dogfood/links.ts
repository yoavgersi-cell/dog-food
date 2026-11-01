// ─────────────────────────────────────────────────────────────────────────────
// Automated internal linking. Every page type gets a deterministic set of
// contextual links computed from the dataset, so:
//   - every spoke links up to its hub and sideways to siblings,
//   - every brand links to all 6 of its comparisons,
//   - breeds link to their risk diets and diets link back to those breeds,
//   - nothing is orphaned (each page is reachable from a hub index + >=3 spokes).
// ─────────────────────────────────────────────────────────────────────────────

import { BRANDS, getBrand, type Brand } from "./brands";
import { PAIRS, comparePath, pairsForBrand, type Pair } from "./pairs";
import {
  BREEDS, DEMOGRAPHICS, DIETS, INGREDIENTS, bestForPath, breedsForRisk, dietPath, ingredientPath, riskLink,
  type Breed, type Diet, type Ingredient, type SizeClass,
} from "./taxonomy";
import type { LinkItem } from "@/components/link-grid";

const nameOf = (slug: string) => getBrand(slug)?.name ?? slug;
export const pairLabel = (p: Pair) => `${nameOf(p.a)} vs ${nameOf(p.b)}`;
const pairLink = (p: Pair): LinkItem => ({ href: comparePath(p.slug), label: pairLabel(p), note: p.angle });

const SIZE_TO_DEMO: Record<SizeClass, string> = {
  toy: "toy-breed",
  small: "small-breed",
  medium: "medium-breed",
  large: "large-breed",
  giant: "giant-breed",
};

/** Diet pages whose premise a brand fits (by format), for brand hubs. */
export function dietsForBrand(b: Brand): Diet[] {
  return DIETS.filter((d) => d.formats?.some((f) => b.formats.includes(f)));
}

export function brandLinks(b: Brand) {
  return {
    comparisons: pairsForBrand(b.slug).map(pairLink),
    diets: dietsForBrand(b).map((d) => ({ href: dietPath(d.slug), label: d.name })),
    proteins: b.proteins
      .map((p) => INGREDIENTS.find((i) => i.slug === p))
      .filter((i): i is Ingredient => !!i)
      .map((i) => ({ href: ingredientPath(i.slug), label: `${i.name} dog food` })),
    lifeStages: ["puppy", "senior-dog", "small-breed", "large-breed"].map((s) => ({
      href: bestForPath(s),
      label: DEMOGRAPHICS.find((d) => d.slug === s)!.name,
    })),
  };
}

export function breedLinks(br: Breed) {
  const risks = br.risks.map(riskLink).filter((x): x is NonNullable<typeof x> => !!x);
  const siblings = BREEDS.filter((x) => x.size === br.size && x.slug !== br.slug)
    .slice(0, 6)
    .map((x) => ({ href: bestForPath(x.slug), label: `${x.name}s`, note: `${x.minLb}-${x.maxLb} lb` }));
  const demo = DEMOGRAPHICS.find((d) => d.slug === SIZE_TO_DEMO[br.size])!;
  return {
    risks,
    siblings,
    sizeHub: { href: bestForPath(demo.slug), label: `Best food for ${demo.name.toLowerCase()}` },
    puppy: { href: bestForPath(br.size === "large" || br.size === "giant" ? "large-breed-puppy" : br.size === "toy" ? "small-breed-puppy" : "puppy"), label: `${br.name} puppies` },
    comparisons: PAIRS.slice(0, 3).map(pairLink),
  };
}

export function dietLinks(d: Diet) {
  const sameKind = DIETS.filter((x) => x.kind === d.kind && x.slug !== d.slug);
  const i = DIETS.indexOf(d);
  // Deterministic neighbours: the next 6 of the same kind, wrapping around.
  const related = Array.from({ length: Math.min(6, sameKind.length) }, (_, k) => sameKind[(i + k) % sameKind.length]);
  const breeds = breedsForRisk(d.slug).map((b) => ({ href: bestForPath(b.slug), label: `${b.name}s` }));
  const fits = d.formats ? BRANDS.filter((b) => b.formats.some((f) => d.formats!.includes(f))) : [];
  const pairs = fits.length >= 2 ? PAIRS.filter((p) => fits.some((b) => b.slug === p.a) && fits.some((b) => b.slug === p.b)) : PAIRS.slice(0, 3);
  return {
    related: related.map((x) => ({ href: dietPath(x.slug), label: x.name })),
    breeds,
    comparisons: pairs.slice(0, 6).map(pairLink),
  };
}

export function ingredientLinks(ing: Ingredient) {
  const brands = BRANDS.filter((b) => b.proteins.includes(ing.slug));
  const siblings = INGREDIENTS.filter((x) => x.category === ing.category && x.slug !== ing.slug).slice(0, 8);
  const diets = DIETS.filter((d) =>
    ing.category === "protein"
      ? ["single-protein", "novel-protein", "food-allergies", "elimination-diet", "high-protein"].includes(d.slug)
      : ing.category === "carb"
        ? ["grain-free", "grain-inclusive", "dcm-concerns", "low-carb"].includes(d.slug)
        : ing.category === "fat"
          ? ["skin-and-coat", "joint-health", "brain-health"].includes(d.slug)
          : ["sensitive-stomach", "immune-support", "joint-health"].includes(d.slug),
  );
  return {
    brands,
    siblings: siblings.map((x) => ({ href: ingredientPath(x.slug), label: x.name })),
    diets: diets.map((d) => ({ href: dietPath(d.slug), label: d.name })),
  };
}
