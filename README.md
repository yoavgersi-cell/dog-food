# Dog Food Scout

Independent comparison site for fresh, raw and premium dog food delivery
brands (dogfoodscout.com). Built on the same Next.js 16 structure as
toponlinetherapy.io (same ranked provider cards, 340px sticky sidebar, hero,
disclosure bar, GEO helpers, llms.txt, IndexNow cron and SEO audit), rethemed
light yellow.

Brands: **The Farmer's Dog, Ollie, Spot & Tango, We Feed Raw, Maxbone,
The Pet Table, Redbarn.**

The full strategy (tone of voice, URL architecture, homepage spec, AEO/GEO,
programmatic templates, technical SEO, launch plan) is in
[`docs/BLUEPRINT.md`](docs/BLUEPRINT.md).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Page inventory (288 prerendered routes)

| Route | Count | Source |
|---|---|---|
| `/` ranking + filterable comparison matrix | 1 | `src/app/(main)/page.tsx` |
| `/reviews/[brand]` | 7 | `src/app/(main)/reviews/[slug]` |
| `/brands/[brand]` spec-sheet hubs | 7 | `src/app/(main)/brands/[slug]` |
| `/compare/[a]-vs-[b]` (reverse order 301s) | 21 | `src/app/(main)/compare/[slug]`, `src/lib/dogfood/pairs.ts` |
| `/best-for/[breed-or-life-stage]-dog-food` | 83 + 20 | `src/app/(main)/best-for/[slug]` |
| `/diets/[slug]` diet types + conditions | 79 | `src/app/(main)/diets/[slug]` |
| `/ingredients/[slug]` | 51 | `src/app/(main)/ingredients/[slug]` |
| Indexes, how-we-rank, about, disclosure, legal | 12 | `src/app/(main)/*` |

## Where things live

- `src/lib/dogfood/brands.ts` - **the brand dataset** (single source of truth).
- `src/lib/dogfood/taxonomy.ts` - breeds (weights + health links), life stages, diets, ingredients.
- `src/lib/dogfood/pairs.ts` - the 21 comparisons: canonical order, angle, winners.
- `src/lib/dogfood/links.ts` - automated internal linking.
- `src/lib/dogfood/rubric.ts` - Scout Score weights (rendered on /how-we-rank and in the sidebar).
- `src/lib/nutrition.ts` - formulas: dry matter, g/1,000 kcal, RER/MER, cost/day, AAFCO checks.
- `src/lib/geo.ts` - Organization/WebSite entities, Product/Review schema, AI crawler list.
- `src/lib/seo.ts` - metadata helper and the programmatic indexing gate.
- `src/data/reviewers.ts` - veterinary reviewers + REVIEW_LOG (empty until a real reviewer is confirmed).
- `src/app/globals.css` - theme tokens.

## Before launch: fill verified data

House rule (from the template): **never invent prices, ratings or nutrient numbers.**
Brand sites were not reachable when this was built, so every brand ships with
`nutrition: null` and `price: null`. Those cells render "Verifying", and the
breed / diet / ingredient pages stay `noindex, follow` and out of the sitemap
until **every** brand has both (see `programmaticIndexable()` in `src/lib/seo.ts`).

For each brand in `brands.ts`:

1. `nutrition`: guaranteed analysis + kcal/kg for a representative recipe, with source URL and date.
2. `price`: USD per 1,000 kcal on the standard (non-intro) price, from the quote flow at 25 and 50 lb.
3. `aafcoStatement`, `feedingTrials`, `delivery`, and anything listed in `toVerify`.
4. `affiliateUrl`: tracked links (currently the brands' homepages).
5. Re-check `offer` (captured from competitor pages on Nov 1 2026) and the editorial `score`.
6. Replace the placeholder wordmarks in `public/logos/*.svg` with licensed logos.

Then bump `BRAND_DATA_CHECKED` in `src/lib/config.ts`.

## SEO / GEO audit

```bash
npm run build && npm start
npm run seo:audit http://localhost:3000
```

Crawls the sitemap, robots.txt and llms.txt and checks titles, descriptions,
canonicals, H1s, JSON-LD validity, quick-answer blocks, broken internal links
and remaining "Verifying" values. Exit code 1 means a blocking issue.

## Deploy

Vercel. `vercel.json` schedules the IndexNow cron; the key file is
`public/7f3c9a2e4b8d41c6a05e9f1d2c3b4a59.txt` (see `src/lib/indexnow.ts`).
