// ─────────────────────────────────────────────────────────────────────────────
// Programmatic taxonomy: breeds, demographics, diets/conditions, ingredients.
//
// Launch inventory: 83 breeds + 20 demographics under /best-for, 79 diet and
// health-condition pages under /diets, 51 ingredient pages under /ingredients.
//
// Breed weights are approximate adult ranges (lb) used only to pick cost and
// calorie brackets - verify against the breed standard before publishing.
// `risks` are slugs of /diets (or /best-for) pages a breed links to; every
// breed-health statement on the page must carry a cited veterinary source.
// ─────────────────────────────────────────────────────────────────────────────

import type { Format } from "./brands";

export type SizeClass = "toy" | "small" | "medium" | "large" | "giant";

export interface Breed {
  slug: string; // URL: /best-for/<slug>-dog-food
  name: string;
  minLb: number;
  maxLb: number;
  size: SizeClass;
  risks: string[];
}

const BREED_ROWS = [
  "Labrador Retriever|55|80|large|weight-management;joint-health",
  "French Bulldog|16|28|small|allergies;sensitive-stomach",
  "Golden Retriever|55|75|large|skin-and-coat;joint-health",
  "German Shepherd|50|90|large|sensitive-stomach;joint-health",
  "Standard Poodle|40|70|medium|sensitive-stomach;skin-and-coat",
  "Miniature Poodle|10|15|small|dental-health;weight-management",
  "Toy Poodle|4|6|toy|hypoglycemia-prone;dental-health",
  "Bulldog|40|50|medium|allergies;weight-management",
  "Rottweiler|80|135|giant|joint-health;weight-management",
  "Beagle|20|30|small|weight-management;picky-eater",
  "Dachshund|16|32|small|weight-management;joint-health",
  "Miniature Dachshund|8|11|toy|weight-management;dental-health",
  "German Shorthaired Pointer|45|70|large|high-energy;joint-health",
  "Pembroke Welsh Corgi|24|30|small|weight-management;joint-health",
  "Australian Shepherd|40|65|medium|high-energy;sensitive-stomach",
  "Yorkshire Terrier|4|7|toy|sensitive-stomach;dental-health",
  "Cavalier King Charles Spaniel|13|18|small|heart-health;weight-management",
  "Doberman Pinscher|60|100|large|heart-health;joint-health",
  "Cane Corso|88|110|giant|joint-health;sensitive-stomach",
  "Miniature Schnauzer|11|20|small|low-fat;pancreatitis",
  "Great Dane|110|175|giant|joint-health;sensitive-stomach",
  "Boxer|50|80|large|heart-health;sensitive-stomach",
  "Siberian Husky|35|60|medium|skin-and-coat;high-energy",
  "Bernese Mountain Dog|70|115|giant|joint-health;weight-management",
  "Shih Tzu|9|16|small|allergies;dental-health",
  "Boston Terrier|12|25|small|sensitive-stomach;allergies",
  "Pomeranian|3|7|toy|dental-health;weight-management",
  "Havanese|7|13|toy|skin-and-coat;picky-eater",
  "Shetland Sheepdog|15|25|small|weight-management;skin-and-coat",
  "Brittany|30|40|medium|high-energy;joint-health",
  "English Springer Spaniel|40|50|medium|skin-and-coat;weight-management",
  "Cocker Spaniel|20|30|small|skin-and-coat;weight-management",
  "Miniature American Shepherd|20|40|small|high-energy;sensitive-stomach",
  "Border Collie|30|55|medium|high-energy;joint-health",
  "Vizsla|44|60|medium|high-energy;allergies",
  "Basset Hound|40|65|medium|weight-management;joint-health",
  "Belgian Malinois|40|80|large|high-energy;joint-health",
  "Chihuahua|3|6|toy|dental-health;hypoglycemia-prone",
  "Pug|14|18|small|weight-management;allergies",
  "Mastiff|120|230|giant|joint-health;weight-management",
  "Rough Collie|50|75|large|sensitive-stomach;skin-and-coat",
  "Maltese|4|7|toy|dental-health;sensitive-stomach",
  "Weimaraner|55|90|large|high-energy;sensitive-stomach",
  "Newfoundland|100|150|giant|joint-health;heart-health",
  "Rhodesian Ridgeback|70|85|large|joint-health;high-energy",
  "West Highland White Terrier|15|20|small|allergies;skin-and-coat",
  "Shiba Inu|17|23|small|allergies;picky-eater",
  "Bichon Frise|12|18|small|allergies;dental-health",
  "Bloodhound|80|110|large|sensitive-stomach;joint-health",
  "Akita|70|130|giant|allergies;joint-health",
  "Saint Bernard|120|180|giant|joint-health;weight-management",
  "Portuguese Water Dog|35|60|medium|high-energy;allergies",
  "Bullmastiff|100|130|giant|joint-health;sensitive-stomach",
  "Chesapeake Bay Retriever|55|80|large|high-energy;joint-health",
  "Lhasa Apso|12|18|small|kidney-support;skin-and-coat",
  "Whippet|25|40|medium|lean-muscle;sensitive-stomach",
  "Samoyed|35|65|medium|skin-and-coat;joint-health",
  "Soft Coated Wheaten Terrier|30|40|medium|kidney-support;sensitive-stomach",
  "Scottish Terrier|18|22|small|skin-and-coat;weight-management",
  "Australian Cattle Dog|35|50|medium|high-energy;joint-health",
  "Great Pyrenees|85|160|giant|joint-health;weight-management",
  "Papillon|5|10|toy|dental-health;picky-eater",
  "Italian Greyhound|7|14|toy|dental-health;lean-muscle",
  "Greyhound|60|70|large|lean-muscle;sensitive-stomach",
  "Alaskan Malamute|75|85|large|skin-and-coat;joint-health",
  "Chinese Shar-Pei|45|60|medium|allergies;skin-and-coat",
  "Staffordshire Bull Terrier|24|38|medium|allergies;skin-and-coat",
  "American Staffordshire Terrier|40|70|medium|allergies;joint-health",
  "American Pit Bull Terrier|30|65|medium|allergies;skin-and-coat",
  "Jack Russell Terrier|13|17|small|high-energy;dental-health",
  "Border Terrier|11|16|small|sensitive-stomach;weight-management",
  "Cardigan Welsh Corgi|25|38|small|weight-management;joint-health",
  "Dalmatian|45|70|large|low-purine;skin-and-coat",
  "Bull Terrier|50|70|medium|allergies;kidney-support",
  "Irish Setter|60|70|large|sensitive-stomach;high-energy",
  "Labradoodle|50|65|large|allergies;joint-health",
  "Goldendoodle|50|90|large|allergies;sensitive-stomach",
  "Bernedoodle|70|90|large|joint-health;sensitive-stomach",
  "Cavapoo|12|25|small|sensitive-stomach;dental-health",
  "Cockapoo|12|24|small|allergies;weight-management",
  "Maltipoo|5|20|toy|dental-health;picky-eater",
  "Mixed Breed (Small)|10|25|small|weight-management;dental-health",
  "Mixed Breed (Large)|50|90|large|joint-health;weight-management",
];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[()'.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const BREEDS: Breed[] = BREED_ROWS.map((row) => {
  const [name, min, max, size, risks] = row.split("|");
  return { slug: slugify(name), name, minLb: Number(min), maxLb: Number(max), size: size as SizeClass, risks: risks.split(";") };
});

/** Representative adult weight used for the breed's headline numbers. */
export const breedMidLb = (b: Breed) => Math.round((b.minLb + b.maxLb) / 2);

// ── Demographics (life stage, size, lifestyle) - also under /best-for ──────
export interface Demographic {
  slug: string; // URL: /best-for/<slug>-dog-food
  name: string; // used in "Best Fresh & Raw Dog Food for <name>"
  refLb: number; // reference weight for the cost table headline
  stage: "neutered-adult" | "senior" | "active" | "puppy-older" | "puppy-young";
  focus: string;
}

export const DEMOGRAPHICS: Demographic[] = [
  { slug: "puppy", name: "Puppies", refLb: 25, stage: "puppy-older", focus: "Puppies need a food that meets AAFCO's growth (or all-life-stages) profile - adult-maintenance-only recipes are not complete for them." },
  { slug: "large-breed-puppy", name: "Large-Breed Puppies", refLb: 50, stage: "puppy-older", focus: "Large-breed puppies (expected adult weight over 70 lb) need controlled calcium: AAFCO caps it at 1.8% DM for large-breed growth." },
  { slug: "small-breed-puppy", name: "Small-Breed Puppies", refLb: 8, stage: "puppy-older", focus: "Small-breed puppies burn more calories per pound and are prone to low blood sugar, so calorie density and meal frequency matter most." },
  { slug: "adult-dog", name: "Adult Dogs", refLb: 50, stage: "neutered-adult", focus: "For a healthy adult the deciding numbers are protein per 1,000 kcal, portion accuracy and cost per day at your dog's weight." },
  { slug: "senior-dog", name: "Senior Dogs", refLb: 40, stage: "senior", focus: "Seniors typically need about 20-30% fewer calories than younger adults but not less protein - aim for high protein per 1,000 kcal at lower total energy." },
  { slug: "small-breed", name: "Small Dogs", refLb: 15, stage: "neutered-adult", focus: "Small dogs eat little in absolute terms, so fresh food costs the least per day here - the gap to kibble is smallest under 20 lb." },
  { slug: "toy-breed", name: "Toy Breeds", refLb: 6, stage: "neutered-adult", focus: "Toy breeds need calorie-dense food in small portions and benefit from soft textures if dental disease has started." },
  { slug: "medium-breed", name: "Medium Dogs", refLb: 40, stage: "neutered-adult", focus: "Medium dogs sit in the middle of every cost bracket; plan type (full vs. mixed vs. topper) moves the price more than the brand does." },
  { slug: "large-breed", name: "Large Dogs", refLb: 75, stage: "neutered-adult", focus: "For large dogs, cost per day dominates - mixed or topper plans are often the realistic way to feed fresh." },
  { slug: "giant-breed", name: "Giant Breeds", refLb: 120, stage: "neutered-adult", focus: "Giant breeds can eat 2,000+ kcal a day; a full fresh diet is a major cost, so per-1,000-kcal price is the number to compare." },
  { slug: "active-dog", name: "Active Dogs", refLb: 50, stage: "active", focus: "Active dogs need more energy and a higher fat share; compare fat per 1,000 kcal and calorie density." },
  { slug: "working-dog", name: "Working Dogs", refLb: 60, stage: "active", focus: "Working dogs can need 2-5x RER; calorie density and fat become the limiting factors for a fresh diet." },
  { slug: "apartment-dog", name: "Apartment Dogs", refLb: 20, stage: "neutered-adult", focus: "Apartment dogs tend to be less active, and small kitchens favour pantry-stable formats (fresh-dry, freeze-dried, air-dried)." },
  { slug: "indoor-dog", name: "Indoor Dogs", refLb: 30, stage: "neutered-adult", focus: "Lower activity means lower calories - portion accuracy is the main lever against weight gain." },
  { slug: "picky-eater", name: "Picky Eaters", refLb: 25, stage: "neutered-adult", focus: "Palatability is where fresh and raw beat kibble; protein rotation and toppers are the practical tools." },
  { slug: "rescue-dog", name: "Rescue Dogs", refLb: 40, stage: "neutered-adult", focus: "Rescues often arrive under- or over-weight with sensitive stomachs; a slow 7-10 day transition and consistent portions matter most." },
  { slug: "pregnant-and-nursing-dog", name: "Pregnant & Nursing Dogs", refLb: 50, stage: "puppy-older", focus: "Gestation and lactation require AAFCO growth & reproduction (or all-life-stages) recipes and much higher calories - work with your vet." },
  { slug: "multi-dog-household", name: "Multi-Dog Households", refLb: 50, stage: "neutered-adult", focus: "Per-dog portioning and combined shipping decide the cost; plans that portion each dog separately prevent over-feeding." },
  { slug: "first-time-owner", name: "First-Time Owners", refLb: 30, stage: "neutered-adult", focus: "Pre-portioned plans remove the calorie math; pick a brand with clear pause/skip controls." },
  { slug: "budget", name: "Budget-Conscious Owners", refLb: 40, stage: "neutered-adult", focus: "Compare cost per 1,000 kcal, not per box: topper and mixed plans cut the daily cost by half or more." },
];

// ── Diets & health conditions - /diets/<slug> ──────────────────────────────
export type DietKind = "diet-type" | "condition";

export interface Diet {
  slug: string;
  name: string; // "Sensitive Stomachs"
  kind: DietKind;
  focus: string; // the one thing that matters - used in the direct answer
  /** Requires a veterinary therapeutic diet in many cases: page must say so. */
  therapeutic?: boolean;
  /** Formats that fit the page's premise by definition. */
  formats?: Format[];
}

type DietRow = [slug: string, name: string, kind: DietKind, focus: string, therapeutic?: boolean, formats?: Format[]];

const DIET_ROWS: DietRow[] = [
  // Diet types
  ["fresh", "Fresh Dog Food", "diet-type", "Fresh food is minimally processed and portioned; compare protein per 1,000 kcal and cost per day, not marketing labels.", false, ["gently-cooked", "raw-frozen"]],
  ["raw", "Raw Dog Food", "diet-type", "Raw diets are highest in protein but carry documented pathogen risk (FDA, CDC); handling rules matter as much as nutrients.", false, ["raw-frozen", "freeze-dried"]],
  ["gently-cooked", "Gently Cooked Dog Food", "diet-type", "Gently cooked food is heated enough to kill pathogens while keeping whole-food texture - the format of most fresh subscriptions.", false, ["gently-cooked"]],
  ["freeze-dried", "Freeze-Dried Dog Food", "diet-type", "Freeze-drying removes water without cooking; it is pantry-stable but is usually the most expensive format per 1,000 kcal.", false, ["freeze-dried"]],
  ["air-dried", "Air-Dried Dog Food", "diet-type", "Air-drying slowly removes moisture at low heat; calorie-dense and pantry-stable, fed by weight like kibble.", false, ["air-dried"]],
  ["dehydrated", "Dehydrated Dog Food", "diet-type", "Dehydrated food is rehydrated before serving; compare on a dry-matter basis because moisture differs wildly between formats.", false, ["air-dried", "freeze-dried", "fresh-dry"]],
  ["fresh-dry", "Fresh-Dry (UnKibble-Style) Dog Food", "diet-type", "Fresh-dry formats bridge fresh and kibble: whole-food recipes, pantry storage, fed by the cup.", false, ["fresh-dry"]],
  ["frozen", "Frozen Dog Food", "diet-type", "Frozen delivery needs freezer space - roughly one cubic foot per 25 lb of dog per two weeks is a practical rule of thumb.", false, ["gently-cooked", "raw-frozen"]],
  ["human-grade", "Human-Grade Dog Food", "diet-type", "\"Human-grade\" is a regulated claim (AAFCO): every ingredient and the facility must meet human-food standards.", false],
  ["grain-free", "Grain-Free Dog Food", "diet-type", "Grain-free is not inherently healthier; the FDA's DCM investigation (2018-2022) is why we flag legume-heavy recipes.", false],
  ["grain-inclusive", "Grain-Inclusive Dog Food", "diet-type", "Whole grains add fiber and are appropriate for most dogs without a diagnosed grain allergy.", false],
  ["limited-ingredient", "Limited-Ingredient Dog Food", "diet-type", "Limited-ingredient diets reduce the number of proteins and carbs to make food reactions easier to trace.", false],
  ["single-protein", "Single-Protein Dog Food", "diet-type", "Single-protein recipes use one animal protein source - the starting point for elimination trials.", false],
  ["novel-protein", "Novel-Protein Dog Food", "diet-type", "A novel protein is one your dog has never eaten (lamb, duck, venison, rabbit for most US dogs).", false],
  ["high-protein", "High-Protein Dog Food", "diet-type", "Judge protein per 1,000 kcal: AAFCO's adult minimum is 45 g; most fresh and raw foods sit well above 80 g.", false],
  ["low-fat", "Low-Fat Dog Food", "diet-type", "Low-fat usually means under ~12% fat DM; for pancreatitis-prone dogs, your vet sets the target.", false],
  ["low-carb", "Low-Carb Dog Food", "diet-type", "Carbohydrate is rarely listed - we calculate it by difference (NFE) once ash is published.", false],
  ["low-calorie", "Low-Calorie Dog Food", "diet-type", "Calories per kg vary 4x between formats; portioning to a calorie target matters more than the label.", false],
  ["high-fiber", "High-Fiber Dog Food", "diet-type", "Fiber supports satiety and stool quality; compare crude fiber on a dry-matter basis.", false],
  ["low-sodium", "Low-Sodium Dog Food", "diet-type", "Sodium restriction is usually part of a cardiac plan set by a vet; fresh foods rarely publish sodium.", true],
  ["low-purine", "Low-Purine Dog Food", "diet-type", "Low-purine diets (for urate stones, e.g. Dalmatians) limit organ meats and some fish.", true],
  ["low-phosphorus", "Low-Phosphorus Dog Food", "diet-type", "Phosphorus restriction is the core of renal diets - a vet-prescribed therapeutic diet, not a fresh-food claim.", true],
  ["keto-style", "Keto-Style Dog Food", "diet-type", "There is no AAFCO \"keto\" category; very-low-carb raw diets are the closest match.", false, ["raw-frozen"]],
  ["barf", "BARF (Biologically Appropriate Raw Food) Diets", "diet-type", "BARF diets include bone, organ, and vegetables; commercial complete raw is the safest way to keep them balanced.", false, ["raw-frozen", "freeze-dried"]],
  ["prey-model-raw", "Prey-Model Raw Diets", "diet-type", "Prey-model raw is roughly 80/10/10 muscle/bone/organ with no plants - it is easy to get calcium and vitamins wrong at home.", false, ["raw-frozen"]],
  ["rotational-feeding", "Rotational Feeding", "diet-type", "Rotating proteins can reduce boredom and limit exposure to any one ingredient; switch gradually.", false],
  ["fresh-topper", "Fresh Food Toppers", "diet-type", "Topping kibble with 10-25% fresh food captures palatability at a fraction of the full-fresh cost.", false, ["topper", "freeze-dried"]],
  ["mixed-feeding", "Mixed Feeding (Kibble + Fresh)", "diet-type", "Mixed feeding works when you subtract the fresh calories from the kibble portion - otherwise dogs gain weight.", false],
  ["transitioning-to-fresh", "Transitioning to Fresh Food", "diet-type", "Transition over 7-10 days (25/50/75/100%) to avoid GI upset.", false],
  ["subscription-vs-retail", "Subscription vs. Retail Dog Food", "diet-type", "Subscriptions portion and deliver; retail gives flexibility. Cost per 1,000 kcal is the fair comparison.", false],
  ["homemade-vs-fresh-delivery", "Homemade vs. Fresh-Delivery Dog Food", "diet-type", "Most homemade recipes are nutritionally incomplete (published studies have found most fall short); delivery brands formulate to AAFCO.", false],
  ["organic", "Organic Dog Food", "diet-type", "\"Organic\" on pet food follows USDA NOP rules; few fresh subscriptions are certified organic.", false],
  // Conditions
  ["sensitive-stomach", "Sensitive Stomachs", "condition", "Consistency beats novelty: a single protein, moderate fat, and a slow transition matter more than the brand.", false],
  ["weight-loss", "Weight Loss", "condition", "Weight loss is calorie math: feed RER at target weight (1.0 x RER) with high protein per 1,000 kcal to protect muscle.", false],
  ["weight-management", "Weight Management", "condition", "Pre-portioned, calorie-targeted packs are the most reliable weight-management tool fresh food offers.", false],
  ["weight-gain", "Healthy Weight Gain", "condition", "Underweight dogs need calorie density (kcal/kg) and fat - rule out medical causes with your vet first.", false],
  ["allergies", "Dogs With Allergies", "condition", "Most food allergies in dogs are to common proteins (beef, dairy, chicken); a vet-guided elimination trial is the only reliable diagnosis.", false],
  ["food-allergies", "Food Allergies", "condition", "Use an 8-week elimination trial with a single novel protein; fresh single-protein recipes can serve if your vet agrees.", false],
  ["environmental-allergies", "Environmental Allergies", "condition", "Diet can't cure environmental allergies, but omega-3 (EPA/DHA) supports the skin barrier.", false],
  ["itchy-skin", "Itchy Skin", "condition", "Itch has many causes (fleas, atopy, food); diet changes help mainly when food is the trigger.", false],
  ["skin-and-coat", "Skin & Coat Health", "condition", "Fat quality matters: look for added fish oil (EPA/DHA), zinc and vitamin E.", false],
  ["joint-health", "Joint Health", "condition", "Lean body weight is the best-evidenced joint intervention; EPA/DHA has the next-best evidence.", false],
  ["hip-dysplasia", "Hip Dysplasia", "condition", "For dysplasia-prone breeds, controlled growth in puppyhood and lean adult weight matter most.", false],
  ["arthritis", "Arthritis", "condition", "Weight loss of even 6-9% can measurably reduce lameness in arthritic dogs; pair with vet-directed omega-3.", false],
  ["pancreatitis", "Pancreatitis-Prone Dogs", "condition", "Pancreatitis management is low-fat and vet-supervised; these fresh brands are not therapeutic diets.", true],
  ["kidney-support", "Kidney Health", "condition", "Kidney disease needs a vet-prescribed renal diet (restricted phosphorus); fresh maintenance foods are not substitutes.", true],
  ["liver-support", "Liver Health", "condition", "Liver disease diets are vet-prescribed (copper, protein quality); use this page to talk to your vet, not to self-treat.", true],
  ["heart-health", "Heart Health", "condition", "Watch taurine and legume-heavy grain-free recipes (FDA DCM reports); cardiac diets are set by your vet.", true],
  ["dcm-concerns", "DCM Concerns (Grain-Free & Legumes)", "condition", "The FDA closed its DCM updates in 2022 without a causal finding; we flag recipes with legumes in the top ingredients.", false],
  ["diabetes", "Diabetic Dogs", "condition", "Diabetic dogs need consistent meals timed with insulin; any diet change must go through your vet.", true],
  ["ibd", "Inflammatory Bowel Disease (IBD)", "condition", "IBD diets are hydrolyzed or novel-protein therapeutic diets chosen with your vet.", true],
  ["constipation", "Constipation", "condition", "Fiber and moisture are the levers; fresh food's ~70% moisture helps many dogs.", false],
  ["gas", "Gas & Flatulence", "condition", "Gas often follows abrupt diet changes or high-fermentable fiber; transition slowly.", false],
  ["vomiting", "Vomiting & Regurgitation", "condition", "Recurrent vomiting needs a vet visit before any diet change.", true],
  ["diarrhea", "Diarrhea", "condition", "Acute diarrhea after a food switch usually means the transition was too fast; persistent diarrhea needs a vet.", false],
  ["colitis", "Colitis", "condition", "Colitis often responds to fiber and highly digestible diets under vet guidance.", true],
  ["dental-health", "Dental Health", "condition", "No food replaces brushing; soft fresh food neither cleans nor harms teeth by itself.", false],
  ["bad-breath", "Bad Breath", "condition", "Persistent bad breath is usually dental disease - a vet exam beats a diet change.", false],
  ["tear-stains", "Tear Stains", "condition", "Tear staining is mostly anatomical; diet claims here are weak - we say so on the page.", false],
  ["yeast-infections", "Yeast Infections", "condition", "Yeast overgrowth is usually secondary to allergy; low-carb diets are a popular but weakly evidenced fix.", false],
  ["ear-infections", "Ear Infections", "condition", "Recurrent ear infections are frequently allergy-driven; diet trials help only when food is the trigger.", false],
  ["urinary-health", "Urinary Health", "condition", "Moisture intake helps urinary health - fresh food's moisture is an advantage; stones need vet diets.", false],
  ["bladder-stones", "Bladder Stones", "condition", "Stone type (struvite, oxalate, urate) dictates the diet; this is always a vet-prescribed plan.", true],
  ["cancer-support", "Dogs With Cancer", "condition", "Nutrition during cancer treatment is set by your veterinary oncologist; palatability is the main fresh-food benefit.", true],
  ["post-surgery-recovery", "Post-Surgery Recovery", "condition", "Recovery needs adequate protein and calories; follow discharge instructions first.", false],
  ["hypoglycemia-prone", "Hypoglycemia-Prone Toy Breeds", "condition", "Small, frequent, calorie-dense meals help prevent low blood sugar in toy puppies.", false],
  ["lean-muscle", "Lean Muscle", "condition", "Muscle maintenance tracks protein per 1,000 kcal and activity, not total protein %.", false],
  ["high-energy", "High-Energy Dogs", "condition", "High-energy dogs need calorie density; fat per 1,000 kcal is the number to compare.", false],
  ["brain-health", "Brain Health & Cognitive Decline", "condition", "DHA, antioxidants and MCTs have the best evidence for canine cognitive dysfunction.", false],
  ["immune-support", "Immune Support", "condition", "Complete-and-balanced nutrition is the immune foundation; \"immune\" marketing claims are mostly unregulated.", false],
  ["anal-gland-health", "Anal Gland Health", "condition", "Firm stools from adequate fiber help glands express naturally.", false],
  ["coprophagia", "Coprophagia (Poop Eating)", "condition", "Coprophagia is mainly behavioural; diet changes rarely fix it alone.", false],
  ["low-residue", "Low-Residue Diets", "condition", "Low-residue diets are highly digestible, low-fiber diets used short-term under vet guidance.", true],
  ["elimination-diet", "Elimination Diets", "condition", "An elimination trial lasts about 8 weeks with nothing else fed - treats included.", false],
  ["seizures", "Dogs With Seizures", "condition", "Epilepsy is managed with medication; diet (e.g. MCT oil) is an adjunct set by your vet.", true],
  ["cushings", "Cushing's Disease", "condition", "Cushing's dogs often need moderate fat and good-quality protein; plans are vet-directed.", true],
  ["hypothyroidism", "Hypothyroidism", "condition", "Hypothyroid dogs gain weight easily until treated; calorie-targeted portions help.", false],
  ["bloat-gdv", "Bloat (GDV) Risk", "condition", "For deep-chested breeds, multiple smaller meals reduce GDV risk; food format matters less than feeding pattern.", false],
  ["megaesophagus", "Megaesophagus", "condition", "Megaesophagus feeding (upright, consistent texture) is managed with your vet.", true],
];

export const DIETS: Diet[] = DIET_ROWS.map(([slug, name, kind, focus, therapeutic, formats]) => ({
  slug, name, kind, focus, therapeutic: !!therapeutic, formats,
}));

// ── Ingredients - /ingredients/<slug> ──────────────────────────────────────
export type IngredientCategory = "protein" | "organ" | "carb" | "vegetable" | "fruit" | "fat" | "supplement";

export interface Ingredient {
  slug: string;
  name: string;
  category: IngredientCategory;
  note: string;
}

type IngRow = [string, IngredientCategory, string];
const ING_ROWS: IngRow[] = [
  ["Beef", "protein", "Among the most common food allergens in dogs (with dairy and chicken), yet also the most common fresh-food protein."],
  ["Chicken", "protein", "Lean and highly digestible; a frequent allergen simply because it is so widely fed."],
  ["Turkey", "protein", "Lean poultry often used as a lower-fat alternative to beef."],
  ["Lamb", "protein", "Historically used as a novel protein; now common enough that it is no longer novel for many dogs."],
  ["Pork", "protein", "Highly palatable; cooked pork is safe and is used by several fresh brands."],
  ["Duck", "protein", "A true novel protein for most US dogs, useful for elimination trials."],
  ["Venison", "protein", "Lean novel protein; costly and rarely used by fresh subscriptions."],
  ["Rabbit", "protein", "Very lean novel protein favoured in hypoallergenic diets."],
  ["Salmon", "protein", "Supplies EPA/DHA omega-3 directly - check that it's cooked or properly frozen."],
  ["Whitefish", "protein", "Lean fish protein suited to low-fat diets."],
  ["Sardines", "protein", "Small oily fish rich in omega-3 with low mercury."],
  ["Bison", "protein", "Lean red meat used as a beef alternative."],
  ["Goat", "protein", "Novel protein; goat milk is also popular as a topper."],
  ["Kangaroo", "protein", "Very lean novel protein, used in some veterinary hypoallergenic diets."],
  ["Beef Liver", "organ", "Dense in vitamin A and copper - which is why AAFCO limits matter in liver-heavy recipes."],
  ["Chicken Liver", "organ", "Rich in vitamin A, iron and B vitamins; used in small percentages."],
  ["Beef Heart", "organ", "Technically muscle meat; a natural source of taurine."],
  ["Green Tripe", "organ", "Unbleached stomach lining, popular with raw feeders for palatability."],
  ["Eggs", "protein", "Complete protein with excellent digestibility."],
  ["Bone Broth", "supplement", "Hydration and palatability; nutritional claims beyond that are weak."],
  ["Sweet Potato", "carb", "Common grain-free carb; watch for legume pairing in DCM-flagged recipes."],
  ["Pumpkin", "carb", "Soluble fiber used for both loose stools and constipation."],
  ["Brown Rice", "carb", "Digestible whole grain common in grain-inclusive fresh recipes."],
  ["Quinoa", "carb", "Pseudo-grain with more protein than rice."],
  ["Oats", "carb", "Soluble fiber (beta-glucan) and gentle on the stomach."],
  ["Lentils", "carb", "Legume - one of the ingredients flagged in the FDA's DCM reports when high in a recipe."],
  ["Chickpeas", "carb", "Legume; same DCM caveat as lentils and peas."],
  ["Peas", "carb", "Legume and pea protein - the most common ingredient in FDA DCM case diets."],
  ["Carrots", "vegetable", "Beta-carotene and fiber; low calorie."],
  ["Kale", "vegetable", "Leafy green with vitamin K; fine in small amounts."],
  ["Spinach", "vegetable", "Contains oxalates - limit for oxalate-stone-prone dogs."],
  ["Broccoli", "vegetable", "Safe in small amounts; large amounts cause gas."],
  ["Blueberries", "fruit", "Antioxidant-rich, low-calorie fruit."],
  ["Cranberries", "fruit", "Popular for urinary health; evidence in dogs is limited."],
  ["Apples", "fruit", "Fiber and vitamin C; seeds and cores removed."],
  ["Fish Oil", "fat", "The main source of EPA and DHA in complete diets."],
  ["Omega-3 (EPA & DHA)", "fat", "Best-evidenced nutrients for skin, joints and cognition."],
  ["Taurine", "supplement", "Added by many brands since the DCM reports; dogs normally synthesize it."],
  ["Glucosamine & Chondroitin", "supplement", "Joint supplements with mixed evidence; dose matters."],
  ["Probiotics", "supplement", "Strain-specific; survival in fresh food depends on processing."],
  ["Prebiotics (Inulin)", "supplement", "Fermentable fiber that feeds gut bacteria."],
  ["Turmeric", "supplement", "Anti-inflammatory compound with poor oral absorption."],
  ["Coconut Oil", "fat", "MCT source; calorie-dense, so watch portions."],
  ["Kelp", "supplement", "Iodine source - excess iodine is a known risk."],
  ["Zinc", "supplement", "Essential mineral for skin and coat."],
  ["Vitamin E", "supplement", "Antioxidant that protects fats from oxidation."],
  ["Calcium & Phosphorus", "supplement", "The ratio (1:1 to 2:1) matters, especially for large-breed puppies."],
  ["Choline", "supplement", "Supports liver and brain function; required by AAFCO."],
  ["Copper", "supplement", "Required, but excess copper is linked to liver disease in some breeds."],
  ["Vitamin D", "supplement", "Essential and toxic in excess - recalls have occurred over too much vitamin D."],
  ["Green-Lipped Mussel", "supplement", "Omega-3 and glycosaminoglycan source used for joints."],
];

export const INGREDIENTS: Ingredient[] = ING_ROWS.map(([name, category, note]) => ({
  slug: slugify(name),
  name,
  category,
  note,
}));

// ── Lookups ────────────────────────────────────────────────────────────────
export const BREED_BY_SLUG = new Map(BREEDS.map((b) => [b.slug, b]));
export const DEMOGRAPHIC_BY_SLUG = new Map(DEMOGRAPHICS.map((d) => [d.slug, d]));
export const DIET_BY_SLUG = new Map(DIETS.map((d) => [d.slug, d]));
export const INGREDIENT_BY_SLUG = new Map(INGREDIENTS.map((i) => [i.slug, i]));

export const BEST_FOR_SUFFIX = "-dog-food";
export const bestForPath = (slug: string) => `/best-for/${slug}${BEST_FOR_SUFFIX}`;
export const dietPath = (slug: string) => `/diets/${slug}`;
export const ingredientPath = (slug: string) => `/ingredients/${slug}`;

/** Resolve a breed `risks` entry to a page (diets first, then demographics). */
export function riskLink(slug: string): { href: string; label: string } | null {
  const d = DIET_BY_SLUG.get(slug);
  if (d) return { href: dietPath(d.slug), label: d.name };
  const g = DEMOGRAPHIC_BY_SLUG.get(slug);
  if (g) return { href: bestForPath(g.slug), label: g.name };
  return null;
}

/** Breeds that link to a given diet/condition page (reverse index for internal links). */
export function breedsForRisk(slug: string): Breed[] {
  return BREEDS.filter((b) => b.risks.includes(slug));
}
