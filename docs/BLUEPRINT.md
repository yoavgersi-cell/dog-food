# Dog Food Scout — Master Blueprint

**Domain:** dogfoodscout.com · **Status:** Launch spec v1 · **Updated:** 2026-11-01
**Stack:** Next.js 16 App Router, ported from the operator's toponlinetherapy.io codebase (`yoavgersi-cell/online-therapy`).
**Scope:** 7 launch brands, ~265 indexable URLs at launch, programmatic expansion to 500+.

> **How to use this doc.** Sections 1–6 answer the six launch dimensions. Section 7 is the week-by-week launch plan. Section 8 maps the spec onto what already exists in this repo. Every rule here is binding for content, code and QA. Where a rule is a number, it is a pass/fail gate.

---

## Table of contents

0. [Non-negotiables (read first)](#0-non-negotiables-read-first)
1. [Brand identity & tone of voice](#1-brand-identity--tone-of-voice)
2. [Site architecture & URL hierarchy](#2-site-architecture--url-hierarchy)
3. [Homepage architecture & comparison matrix](#3-homepage-architecture--comparison-matrix)
4. [AEO & GEO blueprint](#4-aeo--geo-blueprint)
5. [Programmatic content matrix & outline templates](#5-programmatic-content-matrix--outline-templates)
6. [Technical SEO & crawlability](#6-technical-seo--crawlability)
7. [Phased launch plan](#7-phased-launch-plan)
8. [Implemented in this repo vs. next](#8-implemented-in-this-repo-vs-next)
- [Appendix A — Nutrition engine formulas](#appendix-a--nutrition-engine-formulas)
- [Appendix B — Data verification workflow](#appendix-b--data-verification-workflow)
- [Appendix C — Full taxonomy seed](#appendix-c--full-taxonomy-seed)

---

## 0. Non-negotiables (read first)

| # | Rule | Enforcement |
|---|------|-------------|
| 0.1 | **Never invent prices, ratings, nutrient values or statistics.** Inherited from the operator's template house rules. | Brand data fields default to `null` with a `verified` flag. UI renders **"Verifying"** for any `null`. `seo:audit` fails the build on any rendered number whose source field is unverified. |
| 0.2 | **Data-completeness gate controls indexing.** A page is `index,follow` only if every brand it features passes the gate (§B.3). Otherwise `noindex,follow` and left out of the sitemap. | Computed at build time from `src/lib/dogfood/brands.ts`. |
| 0.3 | **Rank follows score.** A lower Scout Score can never sit above a higher one. Scores come from the published rubric (§1.6), not from commercial terms. | Build-time assertion: `ranking[i].score >= ranking[i+1].score`. |
| 0.4 | **Offers are time-bound claims.** Launch offers are taken from competitor screenshots (Nov 2026) and must be re-verified on the brand's own checkout before going live, then every 30 days. | `offerVerifiedAt` field. The audit warns at 30 days and hides the offer at 45 days. |
| 0.5 | **YMYL health pages.** No treatment claims. A vet reviewer is shown only when the page path is in `REVIEW_LOG`. Prescription-diet conditions must say plainly that these brands are **not therapeutic diets**. | Template-level copy blocks (§5.6), plus the `REVIEW_LOG` gate (already in `src/data/reviewers.ts`). |
| 0.6 | **No client-only content.** Every word, number and link is in the server-rendered HTML. JS is used only for progressive enhancement (filters, calculator, accordions). | Lighthouse "view source" check in CI. `seo:audit` greps the raw HTML for each brand's spec values. |

---

## 1. Brand identity & tone of voice

### 1.1 Positioning statement

> **Dog Food Scout is the independent, numbers-first analyst of fresh, raw and premium dog food.** We convert every label into dry-matter nutrients, grams per 1,000 kcal and cost-per-day for a real dog's weight, and then we give a verdict.

The aim is to be the Wirecutter / Consumer Reports of fresh dog food: the same rubric for every brand, published math, visible sources and a dated changelog.

### 1.2 Core persona — "The Unbiased Canine Nutrition Analyst"

| Trait | What it sounds like | What it never sounds like |
|-------|---------------------|---------------------------|
| **Analytical** | "On a dry-matter basis, the beef recipe is 41.2% protein, 2.3× the AAFCO adult minimum." | "Packed with protein your pup will love!" |
| **Transparent** | "We earn a commission if you buy through our links. It does not change scores; here is the rubric." | Hidden disclosures, "partner" euphemisms |
| **Evidence-based** | Cites AAFCO profiles, WSAVA guidance, peer-reviewed sources, brand guaranteed analyses with dates | "Vets agree…", "studies show…" with no citation |
| **Decisive** | "Best for raw feeders on a budget: We Feed Raw." | "It really depends on your dog." |
| **Warm, accessible** | "If your Frenchie's stool is loose after day 3 of the switch, slow the transition to 10 days." | Clinical coldness, jargon without a gloss |

### 1.3 Voice rules (style guide)

| Rule | Spec |
|------|------|
| **Lead with the answer** | The first sentence under every H1/H2 answers the heading in ≤ 30 words. |
| **Numbers over adjectives** | At least 1 hard data point per 150 words in body copy (see density targets §1.5). |
| **Units** | Always state the basis: `% DM`, `% as-fed`, `g/1,000 kcal`, `kcal/kg ME`, `$/day @ 25 lb`. Never a bare "%". |
| **Rounding** | Nutrients to 1 decimal place. Money to cents (`$4.37/day`). kcal to the integer. Weights in lb with kg in parentheses on first use. |
| **Verdict phrasing** | "Best for [specific dog / owner situation]: [Brand]." Each verdict names **one** winner. Ties are allowed only when the numbers are within the stated tolerance (±3% cost, ±1.5 pts DM protein). |
| **Hedging budget** | At most one "may/might/could" per section, and only where evidence is genuinely mixed. Say *why* it is mixed. |
| **Health language** | "supports", "is formulated for", "has lower fat than". Never "treats", "cures", "prevents", "heals". |
| **Brand names** | Use official styling: The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, The Pets Table, Maxbone, Redbarn. |
| **Person** | "We" for the editorial team. "You" for the reader. "Your dog". Never "fur baby", "pupper", "doggo". |
| **Banned filler** | "In today's world", "when it comes to", "look no further", "game-changer", "it's important to note", "at the end of the day", "furry friend". `seo:audit` flags these as lint warnings. |
| **Sentences** | Median ≤ 20 words. Paragraphs ≤ 4 sentences. One idea per paragraph. |
| **Headings** | H2s are phrased as questions that people actually ask ("How much does Ollie cost per day for a 50 lb dog?"). This is AEO bait (§4). |

### 1.4 E-E-A-T layer

| Signal | Implementation |
|--------|----------------|
| **Experience** | Feeding-log boxes ("We fed the Beef recipe to a 52 lb Lab mix for 21 days: stool score, refusal rate, transition notes"). Show these only when the test really happened, with the date and the dog's profile. Our own photos of packaging, portions and labels (never brand stock in place of evidence). |
| **Expertise** | Named authors with bios at `/about#team`. A veterinary reviewer (DVM, or DACVIM-Nutrition where possible) shown via `REVIEW_LOG` only. |
| **Authoritativeness** | Citations to AAFCO, WSAVA Global Nutrition Guidelines, FDA CVM, NRC 2006, peer-reviewed journals. An outbound-citation block on every data page. |
| **Trust** | Disclosure bar on every page. `/how-we-rank` with rubric weights. Editorial policy section on `/how-we-rank`. Visible "Data checked: Nov 2026" line. Per-page changelog. Corrections log. |

### 1.5 Content depth & density standards (pass/fail)

| Page type | Words | Min. hard data points | Min. tables | Min. outbound citations | Direct-answer blocks |
|-----------|-------|-----------------------|-------------|--------------------------|----------------------|
| Homepage | 1,200–1,800 (below the fold) | 40 (matrix) | 1 matrix + 1 spec | 3 | Quick Verdict + 5 FAQ |
| Brand review `/reviews/[brand]` | 2,500–3,500 | 35 | 3 | 5 | Quick Verdict, Spec Sheet, Cost Table |
| Brand hub `/brands/[brand]` | 1,000–1,600 | 30 | 3 | 3 | Spec Sheet, Recipe Table |
| Compare `/compare/[a]-vs-[b]` | 3,000–4,000 | 45 | 4 | 5 | Winner Summary, Head-to-Head table, Cost Table |
| Best-for (breed) | 1,500–2,500 | 25 | 2 | 4 | Quick Pick, Breed Nutrition Card, Cost Table |
| Best-for (demographic) | 1,500–2,500 | 25 | 2 | 4 | Quick Pick, Requirements Card |
| Diet / condition | 1,500–2,500 | 20 | 2 | 5 (≥ 2 vet/peer-reviewed) | Short Answer, Requirements Card |
| Ingredient | 1,500–2,000 | 20 | 2 | 4 | Short Answer, Ingredient Card |

The word count is a ceiling as much as a floor. If the data runs out, stop writing. Padding to hit a count is a fail.

### 1.6 Scout Score rubric (published at `/how-we-rank`)

| Pillar | Weight | Measured by (all from verified data) |
|--------|--------|--------------------------------------|
| **Nutrition & formulation** | 30% | Protein and fat g/1,000 kcal vs AAFCO minimums; Ca:P in range; who formulated it (board-certified veterinary nutritionist / PhD animal nutritionist); life-stage coverage |
| **Value (cost per 1,000 kcal)** | 20% | Standard (non-intro) price → USD per 1,000 kcal → $/day at the 5 weight brackets |
| **Safety & transparency** | 15% | Exact AAFCO statement published; feeding trials vs. formulated; full guaranteed analysis + kcal public; recall history (FDA, 5 years); pathogen controls for raw |
| **Ingredient quality & sourcing** | 15% | Named whole-food proteins first; human-grade claim (AAFCO-defined); legume load (FDA DCM flag); sourcing disclosure |
| **Plan flexibility & personalization** | 15% | Calorie-targeted portions; pause/skip/cancel online; mixed and topper plans; subscription lock-in |
| **Convenience & delivery** | 5% | Storage (freezer / fridge / pantry); delivery coverage; retail availability |

The rubric lives in code at `src/lib/dogfood/rubric.ts` and renders on `/how-we-rank` and in the sidebar, so the published weights and the applied weights are the same object.

Score = Σ (pillar score 0–10 × weight), rounded to 1 decimal. Labels: ≥ 9.5 **Outstanding**, 9.0–9.4 **Excellent**, 8.5–8.9 **Very Good**, 8.0–8.4 **Good**, < 8.0 **Fair**. Stars = score/2 rounded to the nearest 0.5. Both are derived from the score in `brands.ts` (`scoreLabelFor`), never typed by hand.

**Anti-pattern to avoid.** All For Your Furbaby ranks Redbarn **8.4 at #7** below A Pup Above at **7.8** (#6). That ranking is visibly commercial, not editorial. Our build fails if rank order breaks score order (§0.3).

**Pillars we refuse to use:** "Brand Visibility" and "User Engagement" (All For Your Furbaby's scoring inputs). These measure marketing spend, not food quality.

### 1.7 Visual identity (ported UI, retheme)

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `#FFFBEB` | Page background (light yellow) |
| Tint 1 | `#FEFCE8` | Section backgrounds, table zebra rows |
| Tint 2 | `#FEF3C7` | Offer pills, badges, Quick Verdict box |
| Tint 3 | `#FDE68A` | Borders on highlighted elements, #1 card ring |
| Primary / accent | `#A16207` | Links, CTA buttons (white text: 4.9:1 contrast, AA), rank badges |
| Primary hover | `#854D0E` | Hover/active |
| Ink | `#191919` | Body text, headings |
| Stars | `#EAB308` on `#FEF3C7` | Rating stars |

Typography: Geist (already in the template) via `next/font` with `display: swap`. Body 16px/1.6 on mobile, 17px on desktop. Headings 700.

---

## 2. Site architecture & URL hierarchy

### 2.1 URL conventions

| Rule | Spec |
|------|------|
| Trailing slash | **None** (Next default). Slash variants 308 → slashless. |
| Case | Lowercase only. Uppercase variants 308. |
| Separators | Hyphens. No underscores, no dates in URLs. |
| Brand slugs | `the-farmers-dog`, `ollie`, `spot-and-tango`, `we-feed-raw`, `the-pets-table`, `maxbone`, `redbarn` |
| Year in URL | Never. The year goes in `<title>` and the H1 only, so URLs survive yearly refreshes. |
| Query params | Filter state (`?format=raw&sort=price`) is never indexable. `<link rel=canonical>` points to the clean URL. |

### 2.2 Full URL map

| Silo | Pattern | Count at launch | Search intent | Template |
|------|---------|-----------------|---------------|----------|
| Home | `/` | 1 | "best fresh dog food", "fresh dog food delivery" | Ranked cards + matrix |
| Reviews | `/reviews` (index) + `/reviews/[brand]` | 1 + 7 | "[brand] review", "is [brand] worth it" | Editorial review |
| Brand hubs | `/brands` (index) + `/brands/[brand]` | 1 + 7 | "[brand] dog food", "[brand] ingredients", "[brand] price" | Entity hub / spec sheet |
| Compare | `/compare` (index) + `/compare/[a]-vs-[b]` | 1 + 21 | "[a] vs [b]" | Head-to-head (battle) |
| Best-for: breeds | `/best-for/[breed]-dog-food` | 83 | "best fresh dog food for [breed]" | Breed page |
| Best-for: demographics | `/best-for/[demographic]-dog-food` | 20 | "best fresh dog food for puppies / seniors / picky eaters" | Demographic page |
| Diets: diet types | `/diets/[slug]` | 30 | "raw vs cooked dog food", "grain-free fresh dog food" | Diet page |
| Diets: conditions | `/diets/[slug]` | 40 | "fresh dog food for sensitive stomach / pancreatitis" | Condition page (YMYL) |
| Ingredients | `/ingredients/[slug]` | 50 | "is [ingredient] good for dogs", "dog food with [ingredient]" | Ingredient page |
| Articles | `/articles` + `/articles/[slug]` | 1 + 10–15 | Informational / guides | Article |
| Trust | `/how-we-rank` (includes the editorial policy), `/about`, `/disclosure`, `/contact`, `/privacy`, `/terms` | 6 | Navigational / E-E-A-T | Static |
| **Total** | | **≈ 265–270** | | |

Counts are taken from the taxonomy seed: **83 breeds, 20 demographics, 79 diets (32 diet types + 47 conditions), 51 ingredients = 233 programmatic pages**, plus 7 reviews, 7 hubs, 21 compares, the indexes, articles and trust pages.

### 2.3 Why `/brands/` and `/reviews/` both exist (anti-cannibalization contract)

| | `/brands/[brand]` | `/reviews/[brand]` |
|--|-------------------|--------------------|
| Intent | Entity / navigational: "Ollie dog food", "Ollie ingredients", "Ollie price" | Evaluative: "Ollie review", "is Ollie worth it", "Ollie pros and cons" |
| Title pattern | `Ollie Dog Food: Recipes, Nutrition (DM) & Price per Day` | `Ollie Review (2026): Tested, Scored & Cost-Checked` |
| Content | Spec sheet, every recipe's GA → DM table, kcal, cost table by weight, AAFCO statements, links to **every** page featuring the brand | Verdict, Scout Score breakdown, feeding test, pros/cons, who it's for/not for, alternatives |
| Primary schema | `Brand` + `ItemList` of `Product` (recipes) + `Dataset` | `Review` of `Product` |
| Cross-link | Hub → review ("Read our verdict") in the first screen | Review → hub ("Full recipe & nutrient data") in the spec block |

Rule: the hub **never** carries a verdict paragraph, and the review **never** reproduces the full recipe table (it shows the top 3 and links out). Search Console is checked monthly for query overlap. If one query sends > 20% of its clicks to the "wrong" page, tighten that page's title and H1.

### 2.4 Silo & hub-spoke model

```
                                   ┌───────────────────────────┐
                                   │   /  (Comparison Matrix)  │
                                   └─────────────┬─────────────┘
        ┌───────────────────┬────────────────────┼───────────────────┬──────────────────────┐
        ▼                   ▼                    ▼                   ▼                      ▼
   /brands/*  ◄──►     /reviews/*  ◄──►     /compare/*          /best-for/*            /diets/*  ◄──►  /ingredients/*
   (7 hubs)           (7 reviews)          (21 pairs)          (83 breeds +           (30 types +       (50)
       │                   │                    │               20 demographics)       40 conditions)
       └──── every brand hub links to: its review, its 6 compares, every best-for/diet/ingredient page where it is a pick
                           every breed page links to: 2–3 condition pages (taxonomy `risk` field), size-class demographic page, the top-pick brand review, 1 compare
                           every condition page links to: breeds with that risk, relevant diet-type pages, relevant ingredients, top-pick reviews
```

**Link-equity rules**

1. The homepage links **directly** to all 7 reviews, 7 hubs, 21 compares (Popular Comparisons grid + matrix), the 4 index pages, and the top 12 breed and top 12 diet pages. Max click depth for any page is **3**.
2. Every programmatic page receives **≥ 3 contextual inbound links** from sibling or parent pages (see §6.3 cross-link engine). Orphans fail the audit.
3. Index pages (`/compare`, `/best-for`, `/diets`, `/ingredients`, `/brands`, `/reviews`) list **every** child page, grouped, server-rendered, with no pagination at launch scale.

### 2.5 Breadcrumbs (visible + `BreadcrumbList`)

| Page | Breadcrumb |
|------|-----------|
| Review | Home › Reviews › Ollie Review |
| Hub | Home › Brands › Ollie |
| Compare | Home › Compare › The Farmer's Dog vs Ollie |
| Breed | Home › Best For › Breeds › French Bulldog |
| Demographic | Home › Best For › Senior Dogs |
| Diet type | Home › Diets › Raw |
| Condition | Home › Diets › Health Conditions › Pancreatitis |
| Ingredient | Home › Ingredients › Green Tripe |

---

## 3. Homepage architecture & comparison matrix

### 3.1 Competitor teardown (from the supplied screenshots)

#### Best Pet Food — "Best Fresh Dog Food – November 2026"

| Element | Observation | Verdict |
|---------|-------------|---------|
| "Updated on 01 November 2026" chip above H1 | Freshness signal, dated to the day | **Copy.** Ours is tied to `dateModified` in the schema, never a render-time timestamp. |
| H1 with month + year in an accent color | Good CTR lever | **Copy** ("Best Fresh & Raw Dog Food Delivery — November 2026"). |
| 2 trust icons (Fresh Ingredients, Better Nutrition) | Vague, unverifiable | **Beat:** replace with verifiable proof chips ("7 brands · 1 rubric", "Dry-matter math", "Data checked Nov 2026"). |
| "Our Top Choice" tab on card #1 | Strong winner badge | **Copy.** |
| Card: rank circle · logo · offer pill · 3 bullets · score box + label + stars · CTA | Clean, scannable; equal card weight | **Copy the proportions** (toponlinetherapy card grid, §3.3). |
| Offer pills ("65% off your first order + free shipping") | Main conversion hook | **Copy**, with `offerVerifiedAt` tracking. |
| No sidebar, no table, no price, no nutrient data, no methodology link | Thin. AI engines can't cite numbers from it. | **Beat:** matrix, $/day, DM protein on every card. |
| Maxbone at #1 (9.9) | Surprising order for a freeze-dried, non-calorie-personalized brand; looks commercially driven | Our order follows the rubric. |

#### All For Your Furbaby — "Best Fresh Dog Food Delivery Services of Nov 2026"

| Element | Observation | Verdict |
|---------|-------------|---------|
| "Last Updated November 2026" + H1 + H2 + editor summary naming the top 2 | Editor summary = an answer-first paragraph | **Copy** as our Quick Verdict box (with numbers). |
| 2 FAQ accordions above the fold ("How do I choose…", "Why choose fresh…") | Captures informational intent early | **Copy** as 2–3 collapsed `<details>` under the hero. |
| Top-3 strip with a "Great Value" diagonal ribbon on #1 | High-CTR pattern for mobile scanners | **Copy** (top-3 picks strip, §3.2 block 4). |
| #1 card expanded: "Explore Fresh Meal Plans" visual + "26,729 pet parents visited last month" | Social proof on the winner only | **Copy the expanded #1 card.** Social-proof counts are shown **only from real analytics** (rule 0.1); otherwise the element is omitted. |
| Mid-list full-width brand banner after #3 | Ad-like; breaks scanning | **Avoid.** Use an in-list "Compare #1 vs #2" link card instead. |
| Sidebar: big counter "6,571,118 people compared", How We Score (Brand Visibility / User Engagement / Products), Top Products images, Editorial Reviews list, Must Reads | Good sidebar *structure*; the scoring inputs are marketing metrics | **Copy the structure. Beat the content:** real rubric, cost calculator, data-checked date. |
| Score/rank mismatch (Redbarn 8.4 at #7 below 7.8) | Destroys credibility | **Never** (rule 0.3). |
| "Read Review" under each CTA | Internal link to reviews from cards | **Copy.** Plus a "Compare" link and a "Full data" link to the hub. |

#### toponlinetherapy.io (operator's own template — the structural base)

The live site was not reachable from the build environment. The structure below comes from the operator's repo (`yoavgersi-cell/online-therapy`), which is the ground truth for proportions:

| Element | Keep as-is |
|---------|-----------|
| Disclosure bar (top, full width) | ✓ text adapted |
| Header: logo left, nav right, sticky on desktop | ✓ nav: Best Fresh Dog Food · Compare · Best For · Diets · Reviews · How We Rank |
| Hero: updated label, H1, H2, description, light background | ✓ yellow theme |
| `MedicalReviewBar` byline strip under the hero (`REVIEW_LOG`-gated) | ✓ renamed "Vet review" |
| Main layout `max-w-[1200px]`: `flex gap-6`, cards column `flex-1`, `Sidebar` 340px sticky | ✓ identical |
| `ComparisonCard`: rank, badge, logo, tagline, highlights, score/label/stars, CTA | ✓ plus a data strip (§3.3) |
| `SocialProofBand` after card #1 | ✓ only with real analytics numbers |
| `EditorialContent` → `StateLinks` → `FaqAccordion` below the fold | ✓ `StateLinks` → "Browse by breed / diet" link grids |

### 3.2 Homepage block order (top → bottom)

| # | Block | Element | Content / data | Purpose |
|---|-------|---------|----------------|---------|
| 1 | Disclosure bar | `<aside role="note">` | "We earn commissions from some links. Scores never change for pay → How we rank" | FTC + trust |
| 2 | Header | `<header><nav>` | Logo + 6 nav items | Silo entry points |
| 3 | Hero | `<section>` | Updated chip · H1 · H2 · 1-sentence description · 3 proof chips | CTR, freshness |
| 4 | **Quick Verdict** (direct answer) | `<section aria-labelledby>` | 3-line answer: Best overall / Best raw / Best budget, each with 1 number | AI snippet extraction |
| 5 | Top-3 strip | `<ol>` | Logo, offer, CTA, ribbon on #1 | Mobile fast-path conversion |
| 6 | Vet-review byline | `MedicalReviewBar` | `REVIEW_LOG`-gated | E-E-A-T |
| 7 | Filter chips | `<form>` (no-JS works as a GET form) | Format · Budget · Shelf-stable · Sort | UX; params are non-indexable |
| 8 | **Ranked cards ×7** + **Sidebar** | `<section>` of `<article>` + `<aside>` | §3.3 / §3.5 | Conversion |
| 9 | **Comparison matrix** | `<table>` | §3.4, all 7 brands × 14 vectors | Data citation surface |
| 10 | Cost-per-day table | `<table>` | 7 brands × 5 weight brackets | The single most-cited number |
| 11 | How we score | `<section>` | Rubric weights + link to `/how-we-rank` | Trust |
| 12 | Popular comparisons | `<nav>` grid | All 21 pairs (top 9 visible, rest under `<details>`) | Link equity to compares |
| 13 | Browse by breed / by diet | `<nav>` grids | Top 12 breeds, top 12 diets/conditions, "All →" | Link equity to programmatic silos |
| 14 | Editorial explainer | `<article>` | Fresh vs raw vs freeze-dried vs air-dried; how to read a GA; DM explained | Topical depth |
| 15 | FAQ | `<section>` + `<details>` | 8–10 Q&As | AEO |
| 16 | Sources & methodology | `<section>` | Citation list + "Data checked" month + changelog link | Trust |
| 17 | Footer | `<footer>` | Silo links, trust pages, disclosure | Crawl paths |

### 3.3 Provider card spec (toponlinetherapy proportions + data strip)

Desktop card ≈ 860px wide inside the 1200px container (sidebar 340px + 24px gap):

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Our Top Choice]  (tab, #1 only)                                                               │
│ ┌────┐  ┌──────────────┐  ┌───────────────────────────────────────┐  ┌────────┐  ┌──────────┐ │
│ │ 1  │  │   LOGO       │  │ [65% off first box + free shipping]   │  │  9.7   │  │Visit Site│ │
│ │    │  │  (160×60)    │  │ • highlight 1                         │  │Outstand│  │  ──────  │ │
│ └────┘  └──────────────┘  │ • highlight 2                         │  │ ★★★★★  │  │Read rev. │ │
│                           │ • highlight 3                         │  └────────┘  │Compare → │ │
│                           └───────────────────────────────────────┘              └──────────┘ │
│ ─────────────────────────────────────────────────────────────────────────────────────────────  │
│  Format: Gently cooked │ $/day @25 lb: Verifying │ Protein DM: Verifying │ Plan: Pause/skip ✓ │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
  ~6%      ~20%                 ~44%                                ~14%        ~16%
```

| Zone | Width (desktop) | Mobile (< 640px) |
|------|-----------------|------------------|
| Rank badge | 6% | Top-left overlay on the logo |
| Logo | 20% | Full-width row 1, centered, 140px |
| Offer + 3 highlights | 44% | Row 2 |
| Score + label + stars | 14% | Row 3, inline with CTA |
| CTA + Read review + Compare | 16% | Row 3, full-width button (min 48px tall) |
| **Data strip** (new) | 100%, 4 cells | 2×2 grid |

Card rules: `<article itemscope>` with `<h3>` = brand name (visually hidden if a logo is used). CTA is `rel="sponsored nofollow noopener"` with `target="_blank"`. "Read review" and "Compare" are plain internal links (followed). The #1 card gets a `#FDE68A` 2px ring and an expanded "What's in the box" row, as on All For Your Furbaby.

### 3.4 Dynamic comparison matrix

**Vectors (rows of the data model; columns of the table):**

| # | Vector | Field | Type | Filterable | Source |
|---|--------|-------|------|------------|--------|
| 1 | Scout Score | `score` | number | sort | Rubric |
| 2 | Price per day @ 25 lb neutered adult | `costPerDay[25]` | $ | sort, range | Quote flow (§B) |
| 3 | Price per 1,000 kcal | `costPer1000kcal` | $ | sort | Computed |
| 4 | Processing method | `formats[]` | enum: gently-cooked, raw-frozen, freeze-dried, air-dried, baked, fresh-dry | ✓ chips | Brand site |
| 5 | Primary proteins | `primaryProteins[]` | enum list | ✓ select | Recipes |
| 6 | Protein (DM), recipe median | `nutrientsDM.protein` | % | sort | GA → DM |
| 7 | Fat (DM), recipe median | `nutrientsDM.fat` | % | — | GA → DM |
| 8 | Protein:fat ratio | computed | ratio | — | Computed |
| 9 | Subscription required | `subscription.required` | bool | ✓ | Checkout |
| 10 | Pause / skip / online cancel | `subscription.*` | bools | ✓ "Flexible plans" | Checkout + test |
| 11 | Custom calorie portions | `customCalories` | bool | ✓ | Quiz flow |
| 12 | Human-grade / organic | `humanGrade`, `organic` | bools | ✓ | Brand claim + facility |
| 13 | AAFCO statement | `aafco.profile` + `aafco.method` (formulated / feeding trial) | enum | ✓ "Feeding-trial tested" | Label |
| 14 | Storage | `shelfStable` | enum: frozen/fridge/shelf | ✓ "No freezer needed" | Brand |
| 15 | Delivery area | `delivery` | text | — | Brand FAQ |

**Rendering contract**

- The server renders the full `<table>` with all 7 rows in brand-rank order. `<caption>` states the basis ("Prices: first full-price box, standard plan, 25 lb neutered adult; checked Nov 2026").
- Each `<td>` carries `data-sort` and `data-filter-*` attributes. A ≤ 3 KB vanilla script handles sort and filter by toggling `hidden` on rows.
- Without JS, the filter chips are a GET form (`/?format=raw`). The server renders the filtered list and sets `noindex` plus a canonical to `/`.
- `null` values render as `<td><span class="verifying">Verifying</span></td>` and sort last.
- Mobile: the table sits in `overflow-x:auto` with a **sticky first column** (brand), a scroll-shadow hint and `min-width: 880px`.
- Each brand cell links to `/brands/[brand]`. Each "vs" header link (when two rows are selected via checkboxes) opens `/compare/[a]-vs-[b]` in canonical order.

**Cost-per-day table (block 10):** rows = 7 brands, cols = 10 / 25 / 50 / 75 / 100 lb, values = `$X.XX`. Footnote: the MER formula and multipliers. This is the table we want AI engines to quote. It also ships as a `Dataset` (§4.2).

### 3.5 Sidebar spec (340px, `position: sticky; top: 24px`)

| Order | Block | Content |
|-------|-------|---------|
| 1 | Top pick mini-card | #1 logo, score, offer, CTA |
| 2 | **Cost-per-day calculator** | Weight (lb) + life stage select → $/day for all 7 (computed client-side from the same server-provided dataset; server renders the 25 lb default) |
| 3 | How we score | 7 pillars with weights, link to `/how-we-rank` |
| 4 | Data checked | "Nutrition & prices checked: Nov 2026" + changelog link |
| 5 | Editorial reviews | 7 brand links with small logos |
| 6 | Must reads | 5 articles / top condition pages |
| 7 | Disclosure | Short affiliate disclosure |

The sidebar collapses below the main column on < 1024px. Blocks 1 and 2 move above the FAQ on mobile.

### 3.6 Semantic HTML skeleton

```html
<body>
  <aside class="disclosure" role="note">…</aside>
  <header><a href="/" aria-label="Dog Food Scout home">…</a><nav aria-label="Primary">…</nav></header>
  <main id="content">
    <section class="hero" aria-labelledby="h1">
      <p class="updated"><time datetime="2026-11-01">Updated November 1, 2026</time></p>
      <h1 id="h1">Best Fresh &amp; Raw Dog Food Delivery — November 2026</h1>
      <p class="h2">7 brands, one rubric, real cost-per-day math</p>
    </section>
    <section id="quick-verdict" aria-labelledby="qv-h">
      <h2 id="qv-h">Quick verdict</h2>
      <dl><dt>Best overall</dt><dd>The Farmer's Dog — …</dd>…</dl>
    </section>
    <div class="layout">
      <section aria-labelledby="ranked-h" class="cards">
        <h2 id="ranked-h" class="sr-only">Ranked fresh dog food brands</h2>
        <ol>
          <li><article id="the-farmers-dog" aria-labelledby="b1">…</article></li>
          …
        </ol>
      </section>
      <aside aria-label="Tools and methodology" class="sidebar">…</aside>
    </div>
    <section id="matrix" aria-labelledby="m-h">
      <h2 id="m-h">Fresh dog food comparison chart</h2>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Comparison chart, scrolls horizontally">
        <table><caption>…</caption><thead>…</thead><tbody>…</tbody></table>
      </div>
    </section>
    <section id="cost" aria-labelledby="c-h"><h2 id="c-h">Cost per day by dog weight</h2><table>…</table></section>
    <nav aria-labelledby="pc-h"><h2 id="pc-h">Popular comparisons</h2>…</nav>
    <nav aria-labelledby="br-h"><h2 id="br-h">Best fresh dog food by breed</h2>…</nav>
    <article class="editorial">…</article>
    <section id="faq" aria-labelledby="faq-h"><h2 id="faq-h">FAQ</h2><details><summary>…</summary>…</details></section>
    <section id="sources">…</section>
  </main>
  <footer>…</footer>
</body>
```

### 3.7 Homepage internal linking budget

| From block | Links to | Count | Anchor pattern |
|------------|----------|-------|----------------|
| Cards | `/reviews/[b]`, `/brands/[b]`, `/compare/[#1]-vs-[b]` | 21 | "Read our Ollie review", "Ollie nutrition data", "Ollie vs The Farmer's Dog" |
| Matrix | `/brands/[b]` | 7 | Brand name |
| Popular comparisons | `/compare/*` | 21 | "The Farmer's Dog vs Ollie" |
| Breed grid | `/best-for/*` | 12 + index | "French Bulldogs" |
| Diet grid | `/diets/*` | 12 + index | "Sensitive stomachs" |
| Editorial | `/diets/raw`, `/diets/gently-cooked`, `/ingredients/*`, `/how-we-rank` | 6–10 | Descriptive, in-sentence |
| Footer | All indexes + trust pages | ~15 | Plain |

Target: 100–130 unique internal links. No `nofollow` on internal links, ever.

---

## 4. AEO & GEO blueprint

### 4.1 Principles

1. **Answer first, then prove.** Each page opens with a ≤ 60-word answer containing ≥ 1 number and a named winner. AI engines lift the first well-formed answer under a matching heading.
2. **Quotable units.** Every key fact is a self-contained sentence that survives being cut out: *"For a 25 lb neutered adult dog, The Pets Table costs $X.XX/day versus $Y.YY for Ollie (Nov 2026, first full-price box)."* No "it", "this brand" or "above" references inside quotable sentences.
3. **Stable entities.** One `@id` per entity across the site (brand, product, organization, author, breed). This is already modeled in `src/lib/geo.ts`.
4. **Tables are first-class.** Real `<table>` with `<caption>`, `<th scope>` and units in headers. LLM crawlers parse tables far better than div grids.
5. **Freshness is visible and machine-readable:** `<time datetime>`, `dateModified`, and a "Data checked" line.
6. **Crawl access:** explicit allow for AI crawlers (§6.5), `llms.txt`, and no JS-gated content.

### 4.2 JSON-LD by template

All pages include (from `layout.tsx` via `geo.ts`) the single `Organization` (`@id: https://dogfoodscout.com/#organization`) and `WebSite` (`@id: …/#website`). Page-level graphs reference them by `@id`.

**Allowed / forbidden types**

| Type | Use | Rule |
|------|-----|------|
| `Review` + `reviewRating` | Our single editorial rating of a product/brand | ✓ author = `Person` (named editor) or `Organization`; `itemReviewed` = `Product` with `brand: Brand` |
| `AggregateRating` | **Do not emit.** | Only if we someday collect real, on-site user ratings. Never derive from Trustpilot or our own score. |
| `FAQPage` | Visible FAQ only | Google limits FAQ rich results to gov/health sites (since Aug 2023), but the markup still helps parsing and AI extraction. Q&A must match the visible text exactly. |
| `HowTo` | **Do not emit** | Deprecated in Google rich results. Use plain ordered lists. |
| `ItemList` | Ranked lists (home, best-for, diets, compare index) | `ListItem.position` = rank; `item` → review URL |
| `BreadcrumbList` | Every page except home | Matches the visible breadcrumb |
| `Dataset` | Nutrition spec / cost-per-day tables | `variableMeasured`, `measurementTechnique` ("Dry-matter conversion of guaranteed analysis"), `dateModified`, `creator` → Organization, `license` |
| `Article` / `WebPage` | Body container | `about` (primary entities), `mentions` (secondary), `reviewedBy` only if in `REVIEW_LOG` |
| `Product` | Per brand / per recipe | `brand`, `category: "Dog food"`, `material`/`additionalProperty` for format, `offers` **only** when the price is verified (with `priceValidUntil`) |
| `Organization` (AAFCO) | `mentions` | `{ "@type":"Organization", "name":"Association of American Feed Control Officials", "sameAs":"https://www.aafco.org" }` |
| Breed entity | `about` on breed pages | `{ "@type":"Thing", "name":"French Bulldog", "sameAs":["https://www.wikidata.org/wiki/Q37462","https://en.wikipedia.org/wiki/French_Bulldog"] }`. Verify every QID before publish; store the QIDs in the taxonomy. |

#### 4.2.1 Homepage

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://dogfoodscout.com/#webpage",
      "url": "https://dogfoodscout.com",
      "name": "Best Fresh & Raw Dog Food Delivery — November 2026",
      "isPartOf": { "@id": "https://dogfoodscout.com/#website" },
      "publisher": { "@id": "https://dogfoodscout.com/#organization" },
      "datePublished": "2026-11-01",
      "dateModified": "2026-11-01",
      "inLanguage": "en-US",
      "about": [{ "@id": "https://dogfoodscout.com/brands/the-farmers-dog#brand" }],
      "mainEntity": { "@id": "https://dogfoodscout.com/#ranking" }
    },
    {
      "@type": "ItemList",
      "@id": "https://dogfoodscout.com/#ranking",
      "name": "Best fresh dog food delivery brands",
      "itemListOrder": "https://schema.org/ItemListOrderDescending",
      "numberOfItems": 7,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "The Farmer's Dog", "url": "https://dogfoodscout.com/reviews/the-farmers-dog" },
        { "@type": "ListItem", "position": 2, "name": "Ollie", "url": "https://dogfoodscout.com/reviews/ollie" }
      ]
    },
    {
      "@type": "Dataset",
      "@id": "https://dogfoodscout.com/#cost-dataset",
      "name": "Fresh dog food cost per day by dog weight (November 2026)",
      "description": "Daily feeding cost for 7 fresh, raw and air-dried dog food brands at 10, 25, 50, 75 and 100 lb, computed from MER = 1.6 × 70 × kg^0.75 and verified first-box prices.",
      "creator": { "@id": "https://dogfoodscout.com/#organization" },
      "dateModified": "2026-11-01",
      "measurementTechnique": "Resting energy requirement × life-stage multiplier × price per 1,000 kcal",
      "variableMeasured": ["Cost per day (USD)", "Price per 1,000 kcal (USD)"],
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "isAccessibleForFree": true
    },
    { "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "What is the best fresh dog food?", "acceptedAnswer": { "@type": "Answer", "text": "…" } } ] }
  ]
}
```

#### 4.2.2 Review `/reviews/[brand]`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://dogfoodscout.com/brands/ollie#product",
      "name": "Ollie Fresh Dog Food",
      "brand": { "@type": "Brand", "@id": "https://dogfoodscout.com/brands/ollie#brand", "name": "Ollie", "sameAs": "https://www.myollie.com" },
      "category": "Pet Supplies > Dog Food",
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Processing", "value": "Gently cooked; baked" },
        { "@type": "PropertyValue", "name": "AAFCO statement", "value": "Formulated to meet AAFCO Dog Food Nutrient Profiles for All Life Stages" }
      ]
    },
    {
      "@type": "Review",
      "@id": "https://dogfoodscout.com/reviews/ollie#review",
      "itemReviewed": { "@id": "https://dogfoodscout.com/brands/ollie#product" },
      "author": { "@type": "Person", "@id": "https://dogfoodscout.com/about#jane-doe", "name": "Jane Doe" },
      "publisher": { "@id": "https://dogfoodscout.com/#organization" },
      "datePublished": "2026-11-01",
      "dateModified": "2026-11-01",
      "reviewRating": { "@type": "Rating", "ratingValue": 9.4, "bestRating": 10, "worstRating": 0 },
      "positiveNotes": { "@type": "ItemList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Fresh, baked or mixed plans" } ] },
      "negativeNotes": { "@type": "ItemList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Requires freezer space" } ] },
      "reviewBody": "Quick verdict text …"
    },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dogfoodscout.com" },
      { "@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://dogfoodscout.com/reviews" },
      { "@type": "ListItem", "position": 3, "name": "Ollie Review" } ] }
  ]
}
```

`offers` is added to the `Product` **only** when `price.verified === true`:
`"offers": { "@type": "Offer", "price": "…", "priceCurrency": "USD", "priceValidUntil": "<verifiedAt + 30d>", "url": "<affiliate landing, canonical brand URL>" }`.

#### 4.2.3 Brand hub `/brands/[brand]`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Brand", "@id": "https://dogfoodscout.com/brands/we-feed-raw#brand", "name": "We Feed Raw", "url": "https://dogfoodscout.com/brands/we-feed-raw", "sameAs": ["https://wefeedraw.com"] },
    { "@type": "ItemList", "name": "We Feed Raw recipes", "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "Product", "name": "We Feed Raw Beef", "brand": { "@id": "https://dogfoodscout.com/brands/we-feed-raw#brand" } } } ] },
    { "@type": "Dataset", "name": "We Feed Raw nutrient profile (dry-matter basis)", "variableMeasured": ["Crude protein % DM", "Crude fat % DM", "Crude fiber % DM", "Moisture % as-fed", "kcal/kg ME", "Protein g/1,000 kcal"], "measurementTechnique": "DM% = as-fed% / (1 − moisture%)", "creator": { "@id": "https://dogfoodscout.com/#organization" }, "dateModified": "2026-11-01" },
    { "@type": "BreadcrumbList", "itemListElement": [] }
  ]
}
```

#### 4.2.4 Compare `/compare/[a]-vs-[b]`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://dogfoodscout.com/compare/the-farmers-dog-vs-ollie#article",
      "headline": "The Farmer's Dog vs Ollie (2026): Cost per Day, DM Protein & Verdict",
      "about": [ { "@id": "https://dogfoodscout.com/brands/the-farmers-dog#product" }, { "@id": "https://dogfoodscout.com/brands/ollie#product" } ],
      "mentions": [ { "@type": "Organization", "name": "Association of American Feed Control Officials", "sameAs": "https://www.aafco.org" } ],
      "author": { "@id": "https://dogfoodscout.com/about#jane-doe" },
      "publisher": { "@id": "https://dogfoodscout.com/#organization" },
      "dateModified": "2026-11-01",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "The Farmer's Dog", "url": "https://dogfoodscout.com/reviews/the-farmers-dog" },
          { "@type": "ListItem", "position": 2, "name": "Ollie", "url": "https://dogfoodscout.com/reviews/ollie" }
        ]
      }
    },
    { "@type": "FAQPage", "mainEntity": [] },
    { "@type": "BreadcrumbList", "itemListElement": [] }
  ]
}
```

No `Review` on compare pages: the rating lives on the review URL, so it isn't duplicated.

#### 4.2.5 Best-for (breed)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Best Fresh & Raw Dog Food for French Bulldogs (2026)",
      "about": [ { "@type": "Thing", "name": "French Bulldog", "sameAs": ["https://www.wikidata.org/wiki/Q37462", "https://en.wikipedia.org/wiki/French_Bulldog"] } ],
      "mentions": [ { "@id": "https://dogfoodscout.com/brands/ollie#brand" }, { "@type": "Thing", "name": "Food allergy", "sameAs": "https://en.wikipedia.org/wiki/Food_allergy" } ],
      "mainEntity": { "@type": "ItemList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "…", "url": "…" } ] },
      "dateModified": "2026-11-01",
      "publisher": { "@id": "https://dogfoodscout.com/#organization" }
    },
    { "@type": "Dataset", "name": "Daily calories and cost for a 16–28 lb French Bulldog", "variableMeasured": ["kcal/day", "Cost per day (USD)"] },
    { "@type": "FAQPage", "mainEntity": [] },
    { "@type": "BreadcrumbList", "itemListElement": [] }
  ]
}
```

#### 4.2.6 Diet / condition

Same as breed, but `about` = the condition or diet (`Thing` with Wikipedia `sameAs`, or `MedicalCondition` for conditions with a stable Wikidata QID), plus `reviewedBy` (Person with `jobTitle: "Veterinarian"`) **only if** the path is in `REVIEW_LOG`, and `lastReviewed`.

#### 4.2.7 Ingredient

`Article` with `about: { "@type": "Thing", "name": "Green tripe", "sameAs": "…" }`, `mentions` the brands that use it, plus `FAQPage` + `BreadcrumbList`. Optional `Dataset` for the nutrient composition table, citing USDA FoodData Central IDs.

### 4.3 Direct-answer block library (standard modules)

All modules are server components with fixed HTML structure. Each is an `<section>` with an `<h2>` phrased as the query and contains the numbers in plain text, not images.

#### A. Quick Verdict (reviews, home)

```html
<section class="qa" id="quick-verdict" aria-labelledby="qv">
  <h2 id="qv">Is Ollie worth it? Quick verdict</h2>
  <p><strong>Yes, for owners who want fresh food with a baked-food fallback.</strong>
     Ollie scores 9.4/10 in our 7-brand test. It costs $X.XX/day for a 25 lb adult
     (Nov 2026, first full-price box) and its recipes average X% protein on a dry-matter basis.</p>
  <ul><li><strong>Best for:</strong> …</li><li><strong>Skip if:</strong> …</li><li><strong>Best alternative:</strong> <a href="/compare/the-farmers-dog-vs-ollie">The Farmer's Dog</a> (…)</li></ul>
</section>
```

#### B. Winner Summary (compare)

| Category | Winner | Margin |
|----------|--------|--------|
| Cost/day @ 25 lb | Ollie | $0.41/day cheaper |
| Protein (DM, median) | The Farmer's Dog | +2.1 pts |
| Recipe variety | Ollie | 5 vs 4 proteins |
| Flexibility | Tie | Both pause/skip/cancel online |
| **Overall** | **The Farmer's Dog** | **9.7 vs 9.4** |

Rendered as `<table>` with `<caption>The Farmer's Dog vs Ollie: who wins each category</caption>`. One sentence above it: "**The Farmer's Dog wins 3 of 6 categories and the overall verdict; Ollie wins on price.**"

#### C. Nutrition Spec Sheet (hub, review, compare)

| Recipe | Protein % DM | Fat % DM | Fiber % DM | Carbs % DM (NFE) | kcal/kg ME | Protein g/1,000 kcal | P:F | AAFCO profile | Method |
|--------|--------------|----------|------------|------------------|------------|----------------------|-----|---------------|--------|

Footnote (verbatim on every instance): *"Dry matter (DM) = as-fed % ÷ (1 − moisture %). Carbohydrate by difference (NFE) = 100 − protein − fat − fiber − ash (DM); ash assumed 8% DM where unpublished, and flagged. Source: brand guaranteed analysis, checked [Month YYYY]."*

#### D. Cost Table (everywhere a brand appears)

| Brand | 10 lb | 25 lb | 50 lb | 75 lb | 100 lb | $/1,000 kcal |
|-------|-------|-------|-------|-------|--------|--------------|

Caption: "Neutered adult, MER = 1.6 × RER, first full-price box, standard plan, Nov 2026."

#### E. Quick Pick (breed / demographic)

```html
<section class="qa" aria-labelledby="qp">
  <h2 id="qp">What is the best fresh dog food for a French Bulldog?</h2>
  <p><strong>Ollie's lamb recipe</strong> is our pick for most French Bulldogs: single novel protein, X% fat DM,
     and $X.XX/day for a 22 lb adult. <strong>Budget pick:</strong> … <strong>Raw pick:</strong> …</p>
</section>
```

#### F. Breed Nutrition Card

| Field | Value |
|-------|-------|
| Adult weight | 16–28 lb (7.3–12.7 kg) |
| Size class | Small |
| Daily calories (neutered adult) | 469–699 kcal (computed, midpoint 22 lb → 593 kcal) |
| Common diet-relevant risks | Food allergies; sensitive stomach (→ links) |
| Feeding priorities | Limited-ingredient, moderate fat, kibble-free texture for brachycephalic eating |

#### G. Short Answer (diet / condition / ingredient)

≤ 50 words, starts with Yes/No/a number where the question allows: *"Yes. Green tripe is safe for most adult dogs. It is ~X% protein DM, has a Ca:P near 1:1 and is rich in … ; feed it as ≤ 10% of daily calories unless it's part of a complete raw formula."*

#### H. Requirements Card (condition)

| Nutrient target | Typical guidance | AAFCO adult min. | Cohort brands meeting it |
|-----------------|------------------|------------------|--------------------------|
| Fat | < 10% DM for fat-responsive conditions (vet-directed) | 5.5% DM | links |

…plus the mandatory **"Not a prescription diet"** callout for therapeutic conditions (§5.6).

### 4.4 Entity association strategy

**Entity graph (what every page must connect):**

```
Brand ──makes──► Product/Recipe ──hasNutrient──► Nutrient (protein, fat, Ca, P, taurine…)
  │                     │                              │
  │                     └──meetsProfile──► AAFCO Profile (Adult Maintenance / Growth / All Life Stages)
  │                                                    │
  └──processing──► Format (gently cooked, raw, freeze-dried, air-dried)                 ▼
                                                   Veterinary guideline (WSAVA, NRC 2006)
Breed ──hasSizeClass──► Size ──hasEnergyNeed──► kcal/day ──costs──► $/day per Brand
  └──predisposedTo──► Condition ──benefitsFrom──► Diet type / Nutrient target ──metBy──► Recipe
Ingredient ──usedIn──► Recipe ; Ingredient ──contributes──► Nutrient
```

**Copy rules that make the graph explicit:**

| Rule | Example |
|------|---------|
| Name both ends of a relationship in one sentence | "**Ollie's** lamb recipe is formulated to meet **AAFCO** profiles for **all life stages**." |
| Use the canonical entity name on first mention, then pronouns only in non-quotable sentences | "French Bulldog" not "Frenchie" on first mention, then either |
| Link the first mention of an entity to its hub page | Brand → `/brands/x`; condition → `/diets/x`; ingredient → `/ingredients/x`; breed → `/best-for/x-dog-food` |
| Attach a number to the relationship whenever one exists | "…**18% DM** AAFCO adult minimum; Ollie's beef is **2.2×** that." |
| Cite authority entities by full name once | "Association of American Feed Control Officials (AAFCO)", "World Small Animal Veterinary Association (WSAVA)" |
| Disambiguate the format | Always "gently cooked fresh", "frozen raw", "freeze-dried raw", "air-dried". Never just "fresh". |
| Use `sameAs` IDs in schema | Wikidata QIDs stored in the taxonomy per breed/condition/ingredient |

**Off-site entity work (GEO):**

1. Organization profiles with consistent NAP/name: LinkedIn, Crunchbase, X, a Wikidata item once notability is met.
2. Publish the dataset (CSV + JSON) at `/data/fresh-dog-food-2026-11.csv` under CC BY 4.0. Datasets get cited and linked.
3. Monthly "Fresh Dog Food Price Index" post. It is a recurring, dated, quotable stat that AI engines love.
4. Reddit/forum presence: answer with data plus a link only where the link adds the table. Never astroturf.

### 4.5 `llms.txt` (generated at `/llms.txt`)

```
# Dog Food Scout
> Independent, data-first comparisons of fresh, raw and premium dog food: dry-matter nutrients, cost per day by dog weight, AAFCO statements, Scout Score rubric.

## Rankings
- [Best fresh & raw dog food](https://dogfoodscout.com): ranked list + comparison chart
- [How we rank](https://dogfoodscout.com/how-we-rank): rubric & weights

## Brands
- [The Farmer's Dog review](https://dogfoodscout.com/reviews/the-farmers-dog) …

## Comparisons
- [The Farmer's Dog vs Ollie](https://dogfoodscout.com/compare/the-farmers-dog-vs-ollie) …

## Data
- [Cost-per-day dataset (CSV)](https://dogfoodscout.com/data/fresh-dog-food-2026-11.csv)
```

Generated from the same config as the pages. Only indexable (gate-passing) URLs are listed.

---

## 5. Programmatic content matrix & outline templates

### 5.1 Data model (single source of truth)

Every programmatic page is a **pure function of data**: `page = template(brandData, taxonomyEntry, nutritionEngine)`. Editors add prose in "slots"; they never type numbers by hand.

| Store | File | Key fields |
|-------|------|-----------|
| Brands | `src/lib/dogfood/brands.ts` | `slug, name, rank, score, verdict, offer, offerVerifiedAt, formats[], primaryProteins[], shelfStable, subscription{required,pauseSkip,cancelOnline}, customCalories, humanGrade, organic, aafco{profile,method}, delivery, recipes[], verified{nutrition,price,offer}` |
| Recipes | inside brand | `name, protein, asFed{protein,fat,fiber,moisture,ash?}, kcalPerKg, aafcoProfile, ingredientsTop5[], priceSamples{10,25,50,75,100}` |
| Breeds | taxonomy | `name, slug, minLb, maxLb, sizeClass, risks[], wikidata` |
| Demographics | taxonomy | `slug, merMultiplier, nutrientFocus[]` |
| Diets/conditions | taxonomy | `slug, kind: diet|condition, therapeutic: bool, nutrientTargets{}, relatedBreeds[] (reverse of risk), relatedIngredients[]` |
| Ingredients | taxonomy | `slug, category (protein/organ/carb/veg/fruit/supplement), fdcId, brandsUsing[] (computed from recipes)` |
| Engine | `src/lib/nutrition.ts` | `toDM(), gPer1000kcal(), rer(), mer(), costPerDay(), aafcoCheck(), proteinFatRatio(), nfe()` |

### 5.2 Uniqueness & thin-content controls (programmatic pages)

| Control | Threshold |
|---------|-----------|
| Unique data points per page (values not on any sibling page) | ≥ 12 (e.g., breed-specific kcal and cost rows) |
| Templated boilerplate share | ≤ 35% of body text (measured by n-gram overlap vs. siblings in `seo:audit`) |
| Editor-written slot (breed-specific feeding notes, condition nuance) | ≥ 250 words, mandatory before indexing |
| Pick logic | Must change across siblings: if > 70% of breed pages share the same top pick, the scoring weights per size/risk are wrong. Fix the logic, not the copy. |
| Gate | Data-completeness gate (§B.3) + editor slot filled → `index`; else `noindex,follow` |

**Pick logic (breed/demographic/condition):**
`fitScore(brand, page) = 0.4 × ScoutScore_norm + 0.3 × nutrientFit(page.targets, recipe) + 0.2 × valueAt(page.weightMid) + 0.1 × formatFit(page)`
Best recipe per brand = argmax of `nutrientFit`. Ties break on cost/day. Top pick, budget pick (lowest $/day among fit ≥ 0.7) and format pick (best raw / best shelf-stable) are always distinct brands when possible.

### 5.3 (a) All 21 head-to-head pairs

Canonical slug = `[A]-vs-[B]` where A comes first in the demand order: `the-farmers-dog > ollie > spot-and-tango > we-feed-raw > the-pets-table > maxbone > redbarn`. The reverse slug 301s to canonical.

| # | URL `/compare/…` | Core angle (the question the page settles) | Decisive vectors | Priority |
|---|------------------|---------------------------------------------|------------------|----------|
| 1 | `the-farmers-dog-vs-ollie` | Two gently cooked leaders: which is better value per 1,000 kcal and per recipe? | $/day ×5 weights, DM protein, recipe count, baked-food option | P1 |
| 2 | `the-farmers-dog-vs-spot-and-tango` | Fridge/freezer fresh vs. fresh + fridge-free UnKibble™ | Storage, $/day, DM protein, grain options | P1 |
| 3 | `the-farmers-dog-vs-we-feed-raw` | Gently cooked vs. raw: protein, pathogen controls, cost | DM protein/fat, P:F, safety process, $/day | P1 |
| 4 | `the-farmers-dog-vs-the-pets-table` | Premium DTC vs. HelloFresh-backed flexible plans | $/day, plan types (fresh/air-dried/topper), flexibility | P1 |
| 5 | `the-farmers-dog-vs-maxbone` | Personalized fresh vs. shelf-stable freeze-dried | Storage, calorie personalization, $/1,000 kcal | P2 |
| 6 | `the-farmers-dog-vs-redbarn` | Subscription fresh vs. retail air-dried/rolled, no subscription | Buying model, $/day, availability | P2 |
| 7 | `ollie-vs-spot-and-tango` | Both offer a non-frozen option (baked vs. UnKibble): which hybrid wins? | Hybrid-plan cost, DM protein, texture | P1 |
| 8 | `ollie-vs-we-feed-raw` | Cooked + baked vs. raw + freeze-dried | DM protein/fat, $/day, safety | P1 |
| 9 | `ollie-vs-the-pets-table` | Mixed-plan showdown (fresh+baked vs. fresh+air-dried) | Mixed-plan $/day, flexibility | P1 |
| 10 | `ollie-vs-maxbone` | Fresh subscription vs. premium freeze-dried | Storage, $/1,000 kcal | P2 |
| 11 | `ollie-vs-redbarn` | Personalized fresh vs. retail air-dried | Buying model, $/day | P2 |
| 12 | `spot-and-tango-vs-we-feed-raw` | Cooked/fresh-dry vs. raw: digestibility and protein | DM protein, P:F, $/day | P1 |
| 13 | `spot-and-tango-vs-the-pets-table` | Two flexible-format subscriptions | Formats, $/day, grain options | P2 |
| 14 | `spot-and-tango-vs-maxbone` | Two shelf-stable approaches: UnKibble vs. freeze-dried | Shelf life, $/1,000 kcal, DM protein | P2 |
| 15 | `spot-and-tango-vs-redbarn` | Shelf-stable fresh-dry vs. air-dried/rolled | Storage, buying model, $/day | P2 |
| 16 | `we-feed-raw-vs-the-pets-table` | Raw specialist vs. cooked generalist | DM protein, safety, $/day | P2 |
| 17 | `we-feed-raw-vs-maxbone` | Frozen raw vs. freeze-dried: same nutrition, different logistics? | Storage, $/1,000 kcal, rehydration | P2 |
| 18 | `we-feed-raw-vs-redbarn` | Raw subscription vs. retail air-dried | Processing, $/day | P2 |
| 19 | `the-pets-table-vs-maxbone` | Budget fresh vs. premium freeze-dried | $/day gap, storage | P2 |
| 20 | `the-pets-table-vs-redbarn` | Air-dried head-to-head (subscription vs. retail) | Air-dried $/1,000 kcal, buying model | P2 |
| 21 | `maxbone-vs-redbarn` | Shelf-stable premium: freeze-dried vs. air-dried | $/1,000 kcal, DM protein, availability | P2 |

P1 pages get a hand-written verdict section (≥ 600 words) and a feeding test when available. P2 pages ship with the engine-generated comparison plus a ≥ 300-word editor slot.

### 5.4 Template — Head-to-head `/compare/[a]-vs-[b]` (3,000–4,000 words)

| § | Block (H2 phrased as a query) | Content spec | Data / module | Words |
|---|-------------------------------|--------------|---------------|-------|
| 0 | H1 + byline + dates | "[A] vs [B] (2026): Cost per Day, Nutrition & Verdict" · author · "Data checked [Month]" | `LastUpdated`, `MedicalReviewBar` | — |
| 1 | **Which is better, [A] or [B]?** | Winner Summary module (B): one decisive sentence + category table | Engine diff, Scout Scores | 120 |
| 2 | At-a-glance comparison | Head-to-head table: 15 matrix vectors, winner cell highlighted | Matrix data | 80 |
| 3 | How much do [A] and [B] cost per day? | Cost table at 5 weights + $/1,000 kcal + intro-offer math (first box vs. ongoing) | `costPerDay()` | 350 |
| 4 | Which has better nutrition? | Spec sheets side by side (DM protein/fat/fiber/NFE, g/1,000 kcal, P:F, Ca:P if published), AAFCO statement and method | `toDM()`, `aafcoCheck()` | 500 |
| 5 | Ingredients & sourcing | Top 5 ingredients per flagship recipe, kitchen standard, recall history (FDA, 5 years) | Recipes, FDA list | 350 |
| 6 | Processing & storage | Format, prep time, fridge/freezer days, shelf life | Brand data | 250 |
| 7 | Plans, flexibility & delivery | Subscription, pause/skip, cancel, minimums, coverage | Brand data | 250 |
| 8 | Personalization & portioning | Quiz depth, calorie targeting, body-condition inputs | Our test | 200 |
| 9 | Which is better for…? (fit finder) | 6–8 rows: puppies, seniors, allergies, weight loss, large breeds, budget, raw-curious, no freezer → winner + 1-line reason, linking to `/best-for` and `/diets` | Pick logic | 400 |
| 10 | Our feeding test (if conducted) | Dog profile, duration, stool score, acceptance, transition | Feeding log | 300 |
| 11 | Pros & cons | 4/4 each, concrete and numerical | — | 200 |
| 12 | Final verdict | "Choose [A] if… Choose [B] if…" (3 bullets each) + CTAs | — | 250 |
| 13 | Alternatives | The 2 closest other brands → their compare pages with A | Cross-link engine | 120 |
| 14 | FAQ (6) | "Is [A] cheaper than [B]?", "Can I mix [A] and [B]?", "Which has more protein?"… | `FAQPage` | 400 |
| 15 | Sources & methodology | Citations + data-check date + changelog | `SourcesMethodology` | 80 |

### 5.5 (b) Template — Brand review `/reviews/[brand]` (2,500–3,500 words)

| § | Block | Content spec | Words |
|---|-------|--------------|-------|
| 0 | H1 "[Brand] Review (2026): Tested, Scored & Cost-Checked" + byline + dates | | — |
| 1 | **Is [Brand] worth it?** Quick Verdict (A) | Score, best for / skip if / best alternative, 2 numbers minimum | 120 |
| 2 | Scout Score breakdown | 7 pillar scores, bar chart (SSR SVG) + 1 line each | 250 |
| 3 | How much does [Brand] cost? | Cost table ×5 weights, intro vs. ongoing, $/1,000 kcal vs. cohort median | 350 |
| 4 | Nutrition analysis | Spec sheet (top 3 recipes) + link to the hub for all recipes; AAFCO method | 450 |
| 5 | Ingredients & sourcing | Ingredient quality, kitchen standard, recalls | 300 |
| 6 | How [Brand] works | Quiz → plan → delivery → storage → feeding (ordered list, no `HowTo` schema) | 250 |
| 7 | Our hands-on test | Feeding log (only if real) | 350 |
| 8 | Pros & cons | | 200 |
| 9 | Who [Brand] is best / not for | Links to 3–5 best-for/diet pages where the brand is a pick | 250 |
| 10 | [Brand] vs. the alternatives | Mini-table vs. the other 6 (score, $/day @25 lb, format) → 6 compare links | 200 |
| 11 | Final verdict | | 150 |
| 12 | FAQ (6–8) | | 400 |
| 13 | Sources & methodology | | 80 |

### 5.6 Brand hub `/brands/[brand]` (1,000–1,600 words)

| § | Block |
|---|-------|
| 1 | H1 "[Brand] Dog Food: Recipes, Nutrition (Dry Matter) & Price per Day" + 50-word entity summary (what, format, where sold, founded, parent company) + "Read our verdict →" |
| 2 | Spec sheet: **every recipe** (module C) |
| 3 | Cost table ×5 weights per recipe/plan |
| 4 | AAFCO statements verbatim, per recipe, with method |
| 5 | Ingredient lists (top 10 per recipe, each ingredient linked to `/ingredients/*` when we have a page) |
| 6 | Plans & policies facts table |
| 7 | "[Brand] on Dog Food Scout": all 6 compare links, every best-for/diet page where it is a pick (auto-generated) |
| 8 | Changelog (dated data changes) |

### 5.7 (c) Template — Best-for breed `/best-for/[breed]-dog-food` (1,500–2,500 words)

| § | Block (H2) | Content spec | Data | Words |
|---|-----------|--------------|------|-------|
| 0 | H1 "Best Fresh & Raw Dog Food for [Breed]s (2026)" | byline, dates | | — |
| 1 | **What is the best fresh dog food for a [Breed]?** Quick Pick (E) | Top / budget / format pick with numbers | Pick logic | 100 |
| 2 | [Breed] nutrition card (F) | Weight, size class, kcal/day range, risks | Taxonomy + engine | 60 |
| 3 | How many calories does a [Breed] need? | RER/MER table at min/mid/max weight × life stages (puppy 4–12 mo, neutered adult, intact, senior, weight loss) | `rer()`, `mer()` | 200 |
| 4 | Ranked picks for [Breed]s | 3–5 compact cards (same component as homepage) with the breed-specific reason + recipe | Pick logic | 500 |
| 5 | How much will it cost to feed your [Breed]? | Cost table: all 7 brands at the breed's min/mid/max weight | `costPerDay()` | 200 |
| 6 | Breed-specific feeding priorities | **Editor slot** (≥ 250 words): body type, eating style, risk-driven nutrient targets, each risk linked to `/diets/*` | Taxonomy `risks` | 400 |
| 7 | Puppy vs. adult vs. senior [Breed] | Growth caveat (large/giant: Ca ≤ 1.8% DM, AAFCO growth profile incl. large-size adults); senior kcal shift | Engine | 250 |
| 8 | How to switch your [Breed] to fresh food | 7–10 day transition table (% old/new by day) | Static | 150 |
| 9 | FAQ (5) | "How much fresh food should a 22 lb French Bulldog eat?" (grams/day per brand) | Engine | 300 |
| 10 | Related | Size-class demographic page, 2 sibling breeds (same size + shared risk), 1 compare of the top two picks | Cross-link | 50 |
| 11 | Sources | Breed standard (AKC), WSAVA, AAFCO, risk citations | | 50 |

**Grams/day formula** (shown in FAQ answers): `g/day = MER ÷ (kcal/kg ÷ 1,000)`.

### 5.8 Template — Best-for demographic `/best-for/[demographic]-dog-food`

Same skeleton as the breed template, with these swaps: §2 → **Requirements Card** (life-stage AAFCO profile, MER multiplier, nutrient focus); §3 → calories across 10/25/50/75/100 lb at that multiplier; §6 editor slot → life-stage science (e.g., puppies: growth profile, DHA, large-breed Ca ceiling; seniors: protein ≥ adult, kcal −10–20%, joint support). Puppy pages must state which recipes carry an **All Life Stages / Growth** AAFCO statement, and must exclude adult-maintenance-only recipes from the picks.

### 5.9 (d) Template — Diet / condition `/diets/[slug]` (1,500–2,500 words)

| § | Block | Content spec | Words |
|---|-------|--------------|-------|
| 0 | H1 "Best Fresh & Raw Dog Food for [Condition] (2026)" or "[Diet] Dog Food: [Benefit/Number] Compared" | byline, **vet review (only if in REVIEW_LOG)**, dates | — |
| 1 | **Short Answer (G)** | Yes/No/number-led answer; for therapeutic conditions, the first sentence is the not-a-prescription-diet line | 80 |
| 2 | **Therapeutic-diet callout** (conditions with `therapeutic: true`) | Verbatim: *"[Condition] is managed with a veterinary therapeutic diet chosen by your veterinarian. None of the fresh or raw brands compared here is a therapeutic diet, and none is formulated to treat [condition]. Use this page to understand the nutrient targets and to discuss options with your vet, not to replace a prescribed food."* Applies at minimum to: kidney-support, pancreatitis, bladder-stones, urinary-health, diabetes, liver-support, ibd-and-chronic-diarrhea, cancer-support, heart-health, dcm-concerns, low-phosphorus, low-purine, hypoglycemia-prone, elimination-diet, post-surgery-recovery | 60 |
| 3 | What does the research say? | Mechanism + nutrient targets, 2+ peer-reviewed/vet citations, no outcome promises | 350 |
| 4 | Requirements Card (H) | Target ranges vs. AAFCO minimums | 80 |
| 5 | Which fresh/raw recipes fit these targets? | Engine filter: recipes that meet the targets, shown as a table (DM nutrients, $/day @ 25 lb) | 300 |
| 6 | Ranked picks | 3–5 cards; for therapeutic conditions, framed as "discuss with your vet" options, never "best for treating" | 400 |
| 7 | Breeds most often affected | Reverse of taxonomy `risk` → links to breed pages | 120 |
| 8 | Ingredients to look for / avoid | Links to `/ingredients/*` | 250 |
| 9 | When to see a vet | Red-flag symptoms list (vomiting > 24 h, blood, lethargy, etc.) | 120 |
| 10 | FAQ (5) | | 300 |
| 11 | Sources | ≥ 5 citations, ≥ 2 peer-reviewed or veterinary-association | 60 |

Diet-**type** pages (`raw`, `freeze-dried`, `grain-free`, …) use the same skeleton without the therapeutic callout. They swap §3 for "How [diet] is made / what changes nutritionally" and add a **format comparison table** (DM protein, $/1,000 kcal, storage across all cohort brands offering that format). Grain-free must cite the FDA CVM DCM investigation (2018–2022) neutrally.

### 5.10 Template — Ingredient `/ingredients/[slug]` (1,500–2,000 words)

| § | Block |
|---|-------|
| 1 | Short Answer: "Is [ingredient] good for dogs?" (Yes/No + condition + number) |
| 2 | Ingredient card: category, typical nutrient contribution per 100 g (USDA FoodData Central ID cited), safety notes, feeding ceiling |
| 3 | Which brands use [ingredient]? (computed from recipes; table with recipe, position in ingredient list, recipe DM protein, $/day) |
| 4 | Benefits (evidence-graded: Strong / Moderate / Limited, citation each) |
| 5 | Risks, allergies, contraindications |
| 6 | How much is safe? (% of daily calories, by weight) |
| 7 | Related conditions & diets (links) |
| 8 | FAQ (5) + Sources |

### 5.11 Programmatic production pipeline

| Step | Owner | Tool | Output | Gate |
|------|-------|------|--------|------|
| 1. Data entry | Data analyst | `brands.ts` PRs | Verified recipe/price records with `sourceUrl` + `checkedAt` | Reviewer approves the diff against screenshots |
| 2. Engine build | Code | `nutrition.ts` | DM, g/1,000 kcal, MER, cost tables | Unit tests vs. hand-calculated fixtures |
| 3. Skeleton render | Code | Route templates | Pages with modules + empty editor slots | Build passes; pages `noindex` |
| 4. Editor slots | Writer | Seed files (`src/lib/seeds/*`) | ≥ 250-word breed/condition notes, P1 verdicts | Style lint (banned phrases, hedging budget) |
| 5. Vet review (YMYL) | DVM | Review checklist | `REVIEW_LOG` entry | Only reviewed pages show the reviewer |
| 6. QA | Editor | `npm run seo:audit` | Report | Zero blocking issues |
| 7. Index flip | Ops | Gate auto-passes | Sitemap inclusion + IndexNow ping | Data gate + slot filled |

Throughput target: 25–30 programmatic pages/week per writer+analyst pair after the engine is done.

---

## 6. Technical SEO & crawlability

### 6.1 XML sitemap taxonomy

**Implemented now:** one `/sitemap.xml` (`src/app/sitemap.ts`, ~50 URLs today; the programmatic silos join automatically when the data gate passes). **Target** once Search Console per-silo reporting is wanted: a sitemap index with child sitemaps:

| Sitemap | Contents | `changefreq` (advisory) | Notes |
|---------|----------|-------------------------|-------|
| `/sitemaps/core.xml` | `/`, indexes, trust pages | daily | |
| `/sitemaps/reviews.xml` | 7 reviews + 7 hubs | weekly | |
| `/sitemaps/compare.xml` | 21 compares | weekly | Canonical order only |
| `/sitemaps/best-for.xml` | 83 breeds + 20 demographics | weekly | Gate-passing only |
| `/sitemaps/diets.xml` | 79 diets/conditions | weekly | Gate-passing only |
| `/sitemaps/ingredients.xml` | 51 ingredients | monthly | Gate-passing only |
| `/sitemaps/articles.xml` | Articles | weekly | |

Rules: `lastmod` = the page's real `dateModified` (max of its content date and its brands' data `checkedAt`), **never** the build time. Only 200, canonical, indexable URLs. Separate sitemaps let Search Console report index coverage per silo.

### 6.2 Canonical & indexation rules

| Case | Rule |
|------|------|
| Every page | Self-referencing absolute canonical `https://www.dogfoodscout.com/...` (no trailing slash) |
| apex / `http` | 308 → `https://www.dogfoodscout.com` (the host is `SITE_URL` in `src/lib/config.ts`; set the apex redirect in Vercel domains) |
| Reverse compare slug `/compare/ollie-vs-the-farmers-dog` | 301 → canonical order |
| Filter/sort params on home/index pages | Canonical → clean URL; `noindex,follow` when the params change the content |
| Gate-failing programmatic pages | `noindex,follow`, out of the sitemap, still linked (equity flows) |
| Paginated indexes (future, > 150 items) | Self-canonical per page, no `rel=prev/next` dependency, a "view all" link |
| Near-duplicate breed variants (e.g., Miniature vs Standard Poodle) | Separate pages only when weight brackets differ by ≥ 2× and the picks differ. Otherwise merge and 301. |
| Year rollover | Titles/H1 updated; URL unchanged; `dateModified` bumped only if content/data actually changed |

### 6.3 Automated internal cross-linking engine (`src/lib/related.ts`)

The engine scores candidate links per page. The top N are rendered in contextual blocks ("Keep exploring") and in-body slots.

| Source page | Link targets (rule) | N |
|-------------|---------------------|---|
| Compare A-vs-B | Reviews A & B; hubs A & B; A vs (next-closest brand to B); B vs (next-closest to A); best-for pages where A or B is the top pick, preferring ones where the **other** brand is runner-up; diet-type pages for each brand's format | 8–10 |
| Review X | Hub X; all 6 compares containing X; the 3–5 best-for/diet pages where X is top or budget pick | 10–12 |
| Hub X | Review X; 6 compares; **every** page where X is a pick (complete list, grouped) | all |
| Breed | Its 2 `risk` diet/condition pages; size-class demographic; 2 siblings (same size class with ≥ 1 shared risk); compare of its top two picks; top-pick review | 7 |
| Demographic | 5 breeds in that class (top search demand); related conditions; compare of top two picks | 8 |
| Condition | Breeds with that risk (up to 8); related diet types; 3–5 ingredients; top-pick reviews | 12–15 |
| Diet type | Brands offering the format (hubs); related conditions; ingredient pages; the compare that best represents the format contrast (e.g., raw → `the-farmers-dog-vs-we-feed-raw`) | 10 |
| Ingredient | Brands/recipes using it (hubs); conditions where it's a target; 2 sibling ingredients (same category) | 8 |

**Scoring:** `linkScore = 3·sharedEntity + 2·sameSilo(neg if over-linked) + 2·targetInboundDeficit + 1·searchDemandTier`. The `inboundDeficit` term routes links to pages with the fewest inbound links, which removes orphans automatically.

**Anchor rules:** descriptive and varied (3 rotating patterns per target type, e.g., "French Bulldog food guide" / "best fresh food for Frenchies" / "French Bulldogs"). Never "click here". Exact-match anchor ≤ 30% per target.

**Audit:** `seo:audit` computes inbound internal links per URL. Fail if any indexable URL has < 3, or a click depth > 3 from `/`.

### 6.4 Rendering & performance (mobile-first)

| Metric (p75, mobile, CrUX) | Target | How |
|----------------------------|--------|-----|
| LCP | **< 2.0 s** | SSG/ISR HTML from the edge; LCP element is the H1 text or the #1 logo (≤ 15 KB, `priority`); no hero background image on mobile; Geist via `next/font` (self-hosted, `display: swap`, preload one weight) |
| INP | **< 200 ms** | No hydration of content sections (server components); client islands only for the filter (≤ 3 KB), calculator (≤ 4 KB), accordions (native `<details>`, zero JS) |
| CLS | **< 0.05** | `next/image` with explicit `width/height` + `sizes`; logos in fixed-ratio boxes; offer pills with reserved height; no late-injected banners; promo popup only after user scroll, as an overlay that doesn't shift layout |
| TTFB | < 200 ms | ISR (`revalidate` 3600 for programmatic, 60 for home), Vercel edge cache |
| JS budget | ≤ 70 KB gz first load | Audit analytics scripts; GA/Meta Pixel `afterInteractive`/`lazyOnload` |
| Total page weight | ≤ 600 KB mobile | WebP/AVIF logos, SVG icons (lucide tree-shaken) |

**Mobile layout rules**

- Single column below 1024px. The sidebar becomes in-flow blocks (top pick + calculator after the cards).
- Comparison tables: wrapper `overflow-x: auto; -webkit-overflow-scrolling: touch`, `position: sticky; left: 0` on the first column with a solid background and a right shadow, `min-width` on the table, `tabindex="0"` + `role="region"` + `aria-label` for keyboard scroll.
- Tap targets ≥ 48×48 px. CTA buttons full width on cards.
- Font size ≥ 16px for body and inputs (prevents iOS zoom).

### 6.5 `robots.txt` (from `src/app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /*?*sort=
Disallow: /*?*format=

# Search & AI crawlers explicitly welcomed
User-agent: Googlebot
User-agent: Bingbot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://dogfoodscout.com/sitemap.xml
```

(The parameter disallows are a crawl-budget belt-and-braces. The real protection is the `noindex` + canonical on filtered states. Never disallow URLs that carry a `noindex` you need crawled. Gate-failing pages are therefore **not** disallowed.)

### 6.6 IndexNow & freshness

- `/api/indexnow` (already in the template) pings Bing/Yandex/Seznam via IndexNow for URLs whose `dateModified` changed in the last 48 h. The Vercel cron runs daily at 06:00 UTC.
- Index flips (gate passes) trigger an immediate ping.
- Google: sitemap `lastmod` + Search Console submission. No Indexing API (not permitted for this content type).

### 6.7 Weekly SEO/GEO audit (`npm run seo:audit`)

Inherited from the template and extended with these checks:

| Check | Blocking? |
|-------|-----------|
| Sitemap URLs return 200, self-canonical, indexable | ✓ |
| Any rendered number backed by an unverified field | ✓ |
| Rank order violates score order | ✓ |
| Offer older than 45 days still rendered | ✓ |
| JSON-LD parses; no `AggregateRating`; no `HowTo`; `FAQPage` matches visible text | ✓ |
| `reviewedBy` present without a `REVIEW_LOG` entry | ✓ |
| Indexable URL with < 3 inbound internal links / click depth > 3 | ✓ |
| Title > 60 chars or description > 155 chars | warn |
| Banned-phrase lint / hedging budget exceeded | warn |
| Template-overlap > 35% vs siblings | warn |
| Therapeutic callout missing on `therapeutic: true` pages | ✓ |

### 6.8 Metadata patterns

| Page | `<title>` (≤ 60) | Meta description (≤ 155) |
|------|------------------|--------------------------|
| Home | Best Fresh Dog Food Delivery (Nov 2026): 7 Brands Ranked | We compared 7 fresh & raw dog food brands on dry-matter protein, cost per day (10–100 lb) and AAFCO statements. See the winners. |
| Review | Ollie Review (2026): Cost per Day, Nutrition & Verdict | Ollie scores 9.4/10. We checked its price per day at 5 weights, converted every recipe to dry matter and tested the plans. |
| Hub | Ollie Dog Food: Recipes, Dry-Matter Nutrition & Price | Every Ollie recipe's protein, fat and kcal on a dry-matter basis, cost per day by weight, and AAFCO statements. Checked Nov 2026. |
| Compare | The Farmer's Dog vs Ollie (2026): Which Is Better? | The Farmer's Dog vs Ollie on cost per day, DM protein, recipes and plans. Clear winner in each category, plus our overall pick. |
| Breed | Best Fresh Dog Food for French Bulldogs (2026) | Calories, cost per day and the best fresh & raw picks for a 16–28 lb French Bulldog, with allergy- and stomach-friendly options. |
| Condition | Fresh Dog Food for Pancreatitis: Fat Targets & Options | Fat targets for dogs prone to pancreatitis, which fresh recipes fall under 10% fat DM, and why none replace a prescription diet. |
| Ingredient | Is Green Tripe Good for Dogs? Nutrition, Safety & Brands | Green tripe's protein, Ca:P ratio and safe serving size, plus which raw and fresh dog food brands use it. |

---

## 7. Phased launch plan

| Week | Phase | Deliverables | Exit criteria |
|------|-------|--------------|---------------|
| **0** | Foundations | Domain + DNS (decide apex vs www); Vercel project; GA4/Search Console/Bing Webmaster; affiliate links for all 7; legal pages; `/how-we-rank` rubric frozen | Rubric published; disclosure live |
| **1** | Data acquisition I | Guaranteed analysis + kcal/kg + AAFCO statement + top ingredients for **every recipe** of all 7 brands, each with `sourceUrl` + screenshot + `checkedAt` | `verified.nutrition = true` for 7/7 |
| **2** | Data acquisition II | Quote flows at 10/25/50/75/100 lb (neutered adult, standard plan) for the 6 subscription brands; retail price-per-bag + kcal for Redbarn/Maxbone; offers re-verified | `verified.price = true` for 7/7; `$/1,000 kcal` computed |
| **2** | Engine | `nutrition.ts` unit-tested; cost/DM tables render; gate logic live | Tests green; spot-check 10 values by hand |
| **3** | Money pages | Home (matrix, cards, sidebar calculator), 7 reviews, 7 hubs written to spec; Scout Scores computed from the rubric | seo:audit clean; home + 14 brand pages indexable |
| **4** | Compare silo | 21 compares: P1 ×8 with hand-written verdicts, P2 ×13 with editor slots | 21 indexable; reverse slugs 301 |
| **5** | Feeding tests | Start 21-day feeding logs (≥ 3 dogs, different sizes) for the top 4 brands | Logs captured with photos |
| **5–6** | Breeds wave 1 | Top 40 breeds by search demand (editor slots + vet spot-check) | 40 indexable, uniqueness ≥ thresholds |
| **6–7** | Demographics + diet types | 20 demographics + 30 diet types | 50 indexable |
| **7–8** | Conditions (YMYL) | 40 conditions, vet-reviewed, therapeutic callouts | `REVIEW_LOG` entries for each reviewed page |
| **8–9** | Breeds wave 2 + ingredients | Remaining 43 breeds + 51 ingredients | ≈ 265 indexable URLs total |
| **9** | GEO push | Public dataset CSV, first monthly "Fresh Dog Food Price Index", Wikidata/organization profiles, outreach to 20 pet-nutrition sites with the dataset | Dataset live; 5+ referring domains |
| **10+** | Iterate | Search Console query mapping → title/H1 tuning; add brands (each new brand creates 7+ compare pairs automatically); re-verify data every 30 days | Monthly changelog published |

**Recurring operations**

| Cadence | Task |
|---------|------|
| Daily | IndexNow cron; offer monitor |
| Weekly | `seo:audit` on a fresh build (scheduled Claude routine, as in the template); fix safe issues |
| Monthly (30 d) | Re-verify prices, offers, recipes; bump `PROVIDER_DATA_CHECKED`; publish the changelog + Price Index |
| Quarterly | Re-score the rubric; review the cannibalization report; prune/merge pages under 10 impressions/month after 6 months |

---

## 8. Implemented in this repo vs. next

### 8.1 Implemented (this branch)

| Area | Where |
|------|-------|
| Ported toponlinetherapy.io Next.js 16 structure, rethemed light yellow | `src/app/globals.css`, components |
| Homepage: ranked provider cards + 340px sticky sidebar + comparison matrix | `src/app/(main)/page.tsx`, `src/components/comparison-card.tsx`, `src/components/sidebar.tsx` |
| Brand reviews | `src/app/(main)/reviews/[slug]` |
| Brand hubs | `src/app/(main)/brands/[slug]` |
| 21 compare pages (canonical order, reverse 301) | `src/app/(main)/compare/[slug]` |
| Programmatic routes: best-for (breeds + demographics), diets, ingredients | `src/app/(main)/best-for`, `/diets`, `/ingredients` |
| Nutrition engine (DM, g/1,000 kcal, RER/MER, cost/day, AAFCO checks) | `src/lib/nutrition.ts` |
| Brand dataset with `verified` flags (nulls render "Verifying") | `src/lib/dogfood/brands.ts` |
| Data gate (`programmaticIndexable()` in `src/lib/seo.ts`): breed/diet/ingredient pages noindex + out of sitemap until every brand has verified nutrition + price | `src/lib/seo.ts`, `src/app/sitemap.ts` |
| Sidebar cost-per-day calculator + homepage matrix filters (client islands; table fully server-rendered) | `src/components/cost-calculator.tsx`, `src/components/comparison-matrix.tsx` |
| Automated internal linking (brand ↔ 6 compares, breed ↔ risk diets, diet ↔ breeds, siblings) | `src/lib/dogfood/links.ts` |
| Sitemap, robots (AI crawlers named), llms.txt | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts` |
| Stable-@id Organization/WebSite entities, REVIEW_LOG reviewer gating, IndexNow cron, seo-audit script | `src/lib/geo.ts`, `src/data/reviewers.ts`, `src/app/api/indexnow`, `scripts/seo-audit.mjs` |

### 8.2 Next (in order)

1. **Fill verified data** (Appendix B). This is the single blocker for indexing.
2. Editor slots for the P1 compares and the top 40 breeds.
3. `Dataset` JSON-LD + public CSV export route.
4. Per-recipe data (today each brand carries one representative recipe) so ingredient pages can list recipes.
6. Extend `seo:audit` with the blocking checks in §6.7.
7. Split sitemaps per silo (§6.1).
8. Wikidata QIDs for breeds/conditions/ingredients in the taxonomy.
9. Feeding-test log component (renders only with real entries).
10. Real author/vet profiles (`src/data/reviewers.ts`). Credentials only for people who hold them.

---

## Appendix A — Nutrition engine formulas

All functions live in `src/lib/nutrition.ts`. Inputs come from verified brand data only.

| Quantity | Formula | Example |
|----------|---------|---------|
| Dry-matter % | `DM% = asFed% / (1 − moisture%)` | 11% protein, 70% moisture → 11 / 0.30 = **36.7% DM** |
| Grams per 1,000 kcal | `g/1000kcal = asFed% × 10,000 / kcalPerKg` | 11% protein, 1,300 kcal/kg → 110,000 / 1,300 = **84.6 g/1,000 kcal** |
| Carbohydrate (NFE, DM) | `100 − protein − fat − fiber − ash` (all DM); ash default 8% DM when unpublished, flagged "est." | |
| Protein:fat ratio | `proteinDM / fatDM` | 36.7 / 20.0 = **1.8:1** |
| RER (kcal/day) | `70 × kg^0.75` | 25 lb = 11.34 kg → 70 × 6.19 = **433 kcal** |
| MER | `RER × multiplier` | Neutered adult 25 lb → 433 × 1.6 = **693 kcal/day** |
| Grams per day | `MER / (kcalPerKg / 1,000)` | 693 / 1.3 = **533 g/day** |
| $ per 1,000 kcal | `pricePerKg / (kcalPerKg / 1,000)` or `planPricePerDay / (planKcalPerDay / 1,000)` | |
| Cost per day | `MER / 1,000 × $per1000kcal` | 0.693 × $6.00 = **$4.16/day** |
| lb → kg | `lb × 0.45359237` | |

**MER multipliers**

| Life stage / state | Multiplier |
|--------------------|-----------|
| Neutered adult (default) | 1.6 |
| Intact adult | 1.8 |
| Weight loss (at target weight's RER) | 1.0 |
| Senior / inactive | 1.2–1.4 (use 1.4 default, 1.2 for "inactive") |
| Active / working | 2.0–5.0 (light work 2.0, moderate 3.0, heavy 4.0–5.0) |
| Puppy < 4 months | 3.0 |
| Puppy 4–12 months | 2.0 |

**Weight brackets:** 10, 25, 50, 75, 100 lb (4.5, 11.3, 22.7, 34.0, 45.4 kg).

**AAFCO Dog Food Nutrient Profiles (2016+), minimums**

| Nutrient | Adult Maintenance | Growth & Reproduction |
|----------|-------------------|-----------------------|
| Crude protein | 18.0% DM · 45.0 g/1,000 kcal | 22.5% DM · 56.3 g/1,000 kcal |
| Crude fat | 5.5% DM · 13.8 g/1,000 kcal | 8.5% DM · 21.3 g/1,000 kcal |
| Ca:P ratio | 1:1 – 2:1 | 1:1 – 2:1 |
| Calcium max (large-size growth, ≥ 70 lb adult weight) | — | 1.8% DM (4.5 g/1,000 kcal) |

(DM profiles assume 4,000 kcal ME/kg. When a food's energy density differs, compare on g/1,000 kcal, which the engine does by default.)

**AAFCO statement types (displayed verbatim, never paraphrased):**

| Method | Label language | Our display |
|--------|----------------|-------------|
| Formulated | "…is formulated to meet the nutritional levels established by the AAFCO Dog Food Nutrient Profiles for [stage]." | "Formulated to meet AAFCO [stage]" |
| Feeding trial | "Animal feeding tests using AAFCO procedures substantiate that … provides complete and balanced nutrition for [stage]." | "**Feeding-trial tested** (AAFCO procedures) for [stage]" |
| Intermittent / supplemental | "…for intermittent or supplemental feeding only." | "Not complete & balanced (topper/treat)" |

The rubric rewards feeding-trial substantiation. A "formulated" claim is never described as "tested".

---

## Appendix B — Data verification workflow

### B.1 Sources (priority order)

| Data | Primary source | Secondary | Never |
|------|----------------|-----------|-------|
| Guaranteed analysis (protein, fat, fiber, moisture, ash) | Brand's recipe/nutrition page or package label photo | Brand customer support (written) | Competitor sites, retailer copy |
| kcal/kg ME (and kcal per cup/pack) | Calorie statement on label / brand page | Support | Estimates from GA (Atwater) **unless** flagged "est." and excluded from cost math |
| AAFCO statement | Label / brand page, verbatim | Support | Paraphrase |
| Ingredients | Full list from brand page | Label | |
| Price | **Quote flow** on the brand site for a standardized dog at 10/25/50/75/100 lb (neutered adult, moderate activity, standard plan, no add-ons, zip 10001 + 94110 + 60601), recording first-box (with intro offer) **and** ongoing price per box, box size in days | Retail shelf price per bag + bag kcal (Redbarn, Maxbone) | Third-party "average cost" claims |
| Offers | Brand checkout at the time of verification | | Competitor-listed offers (the launch offers came from competitor screenshots and **must** be re-verified) |
| Recalls | FDA recalls database, AVMA recall list | Brand statements | |

### B.2 Record format

```ts
recipes: [{
  name: "Beef",
  asFed: { protein: 11, fat: 8, fiber: 1, moisture: 70, ash: null },
  kcalPerKg: 1300,
  aafco: { statement: "…verbatim…", profile: "All Life Stages", method: "formulated" },
  sourceUrl: "https://…", evidence: "/evidence/ollie/beef-2026-11-03.png",
  checkedAt: "2026-11-03", checkedBy: "analyst-initials",
}]
prices: { 10: { firstBox: …, ongoingPerDay: …, boxDays: 14 }, 25: {…}, … , sourceUrl, checkedAt }
verified: { nutrition: true, price: true, offer: true }
```

(The values above show the shape only; they are not data.)

### B.3 Data-completeness gate (controls `index` vs `noindex,follow`)

A **brand passes** when:
1. ≥ 1 recipe has a complete GA (protein, fat, fiber, moisture) **and** kcal/kg, and every recipe shown on the page meets this.
2. Price per day exists for all 5 weight brackets (subscription brands) or price per bag + kcal per bag (retail brands).
3. The AAFCO statement is captured verbatim for every recipe shown.
4. `checkedAt` ≤ 45 days old.

A **page passes** when every brand rendered in its picks, tables or cards passes, its editor slot (if the template has one) is filled, and (for `therapeutic: true` conditions) the callout is present. Homepage exception: it is always indexable, and unverified cells render "Verifying". It only becomes "complete" when 7/7 brands pass.

### B.4 Cadence & changelog

- Re-verify every brand every **30 days** (offers weekly when promoting them).
- Every change appends to `/changelog` (and the page's own changelog block): `2026-12-02 · Ollie · Beef recipe fat 8% → 9% as-fed (label update) · cost/day @25 lb $X → $Y`.
- `PROVIDER_DATA_CHECKED` in `config.ts` is bumped only when **all** brands have been re-verified. It is a claim, not a timestamp.

---

## Appendix C — Full taxonomy seed

Counts: **83 breeds · 20 demographics · 79 diets (32 diet types + 47 conditions) · 51 ingredients = 233 programmatic pages.**

### C.1 Breeds (83) → `/best-for/[slug]-dog-food`

| Size class | Breeds |
|-----------|--------|
| Toy (≤ 12 lb) | Toy Poodle, Miniature Dachshund, Yorkshire Terrier, Pomeranian, Havanese, Chihuahua, Maltese, Papillon, Italian Greyhound, Maltipoo |
| Small (12–30 lb) | French Bulldog, Miniature Poodle, Beagle, Dachshund, Pembroke Welsh Corgi, Cavalier King Charles Spaniel, Miniature Schnauzer, Shih Tzu, Boston Terrier, Shetland Sheepdog, Cocker Spaniel, Miniature American Shepherd, Pug, West Highland White Terrier, Shiba Inu, Bichon Frise, Lhasa Apso, Scottish Terrier, Jack Russell Terrier, Border Terrier, Cardigan Welsh Corgi, Cavapoo, Cockapoo, Mixed Breed (Small) |
| Medium (30–55 lb) | Standard Poodle, Bulldog, Australian Shepherd, Siberian Husky, Brittany, English Springer Spaniel, Border Collie, Vizsla, Basset Hound, Portuguese Water Dog, Whippet, Samoyed, Soft Coated Wheaten Terrier, Australian Cattle Dog, Chinese Shar-Pei, Staffordshire Bull Terrier, American Staffordshire Terrier, American Pit Bull Terrier, Bull Terrier |
| Large (55–90 lb) | Labrador Retriever, Golden Retriever, German Shepherd, German Shorthaired Pointer, Doberman Pinscher, Boxer, Belgian Malinois, Rough Collie, Weimaraner, Rhodesian Ridgeback, Bloodhound, Chesapeake Bay Retriever, Greyhound, Alaskan Malamute, Dalmatian, Irish Setter, Labradoodle, Goldendoodle, Bernedoodle, Mixed Breed (Large) |
| Giant (90+ lb) | Rottweiler, Cane Corso, Great Dane, Bernese Mountain Dog, Mastiff, Newfoundland, Akita, Saint Bernard, Bullmastiff, Great Pyrenees |

Each breed carries `minLb`, `maxLb`, `sizeClass` and 2 `risk` links (e.g., French Bulldog → allergies, sensitive-stomach; Miniature Schnauzer → low-fat, pancreatitis; Dalmatian → low-purine). Every risk claim needs a cited veterinary source on-page. The size class above follows the taxonomy's `sizeClass` field; where the table and the field disagree, the field wins.

### C.2 Demographics (20) → `/best-for/[slug]-dog-food`

puppies · large-breed-puppies · small-breed-puppies · adult-dogs · senior-dogs · small-dogs · toy-breeds · medium-dogs · large-dogs · giant-breeds · active-dogs · working-dogs · apartment-dogs · indoor-dogs · picky-eaters · rescue-dogs · pregnant-and-nursing-dogs · multi-dog-households · first-time-owners · budget-conscious-owners

### C.3 Diet types (30) → `/diets/[slug]`

fresh · raw · gently-cooked · freeze-dried · air-dried · dehydrated · fresh-dry-unkibble · frozen · human-grade · grain-free · grain-inclusive · limited-ingredient · single-protein · novel-protein · high-protein · low-fat · low-carb · low-calorie · high-fiber · low-sodium · low-purine · low-phosphorus · keto-style · biologically-appropriate-raw-food-barf · prey-model-raw · rotational-feeding · fresh-topper · mixed-feeding-kibble-plus-fresh · transitioning-to-fresh · subscription-vs-retail

### C.4 Health conditions (40) → `/diets/[slug]` (YMYL; **T** = therapeutic callout required)

sensitive-stomach · weight-loss · weight-management · weight-gain · allergies · food-allergies · environmental-allergies · itchy-skin · skin-and-coat · joint-health · hip-dysplasia · arthritis · pancreatitis **T** · kidney-support **T** · liver-support **T** · heart-health **T** · dcm-concerns **T** · diabetes **T** · ibd-and-chronic-diarrhea **T** · constipation · gas-and-flatulence · vomiting-and-regurgitation · dental-health · bad-breath · tear-stains · yeast-infections · ear-infections · urinary-health **T** · bladder-stones **T** · cancer-support **T** · post-surgery-recovery **T** · hypoglycemia-prone **T** · lean-muscle · high-energy · brain-health-cognitive-decline · immune-support · anal-gland-health · coprophagia · low-residue · elimination-diet **T**

(Diet types `low-phosphorus` and `low-purine` also carry the therapeutic callout.)

### C.5 Ingredients (50) → `/ingredients/[slug]`

| Category | Ingredients |
|----------|-------------|
| Muscle proteins | beef, chicken, turkey, lamb, pork, duck, venison, rabbit, salmon, whitefish, sardines, bison, goat, kangaroo |
| Organs & other animal | beef-liver, chicken-liver, beef-heart, green-tripe, eggs, bone-broth |
| Carbohydrates | sweet-potato, pumpkin, brown-rice, quinoa, oats, lentils, chickpeas, peas |
| Vegetables & fruit | carrots, kale, spinach, broccoli, blueberries, cranberries, apples |
| Fats & oils | fish-oil, omega-3-epa-dha, coconut-oil |
| Supplements & micronutrients | taurine, glucosamine-chondroitin, probiotics, prebiotics-inulin, turmeric, kelp, zinc, vitamin-e, calcium-and-phosphorus, choline, copper, vitamin-d |

### C.6 Launch page count

| Type | Count |
|------|-------|
| Home | 1 |
| Reviews (+ index) | 7 + 1 |
| Brand hubs (+ index) | 7 + 1 |
| Compares (+ index) | 21 + 1 |
| Best-for: breeds | 83 |
| Best-for: demographics (+ index) | 20 + 1 |
| Diets: types + conditions (+ index) | 70 + 1 |
| Ingredients (+ index) | 50 + 1 |
| Articles (+ index) | 10–15 + 1 |
| Trust pages | 7 |
| **Total** | **≈ 282–287 URLs (≈ 265 content pages + indexes/trust)** |
