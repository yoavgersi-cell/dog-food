import Link from "next/link";
import { CalorieTable } from "@/components/data-tables";
import { JsonLd } from "@/components/json-ld";
import { TextPage } from "@/components/text-page";
import { RUBRIC } from "@/lib/dogfood/rubric";
import { AAFCO, LIFE_STAGE_FACTORS, WEIGHT_BRACKETS_LB } from "@/lib/nutrition";
import { BRAND_DATA_CHECKED, SITE_URL } from "@/lib/config";
import { CITATIONS, breadcrumbSchema, citations, orgRef } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "How We Rank Dog Food: The Scout Score Rubric, Formulas & Sources",
  description: "The six weighted criteria behind every Scout Score, the exact dry-matter, calorie and cost-per-day formulas we use, AAFCO thresholds, and how we verify brand data.",
  path: "/how-we-rank",
});

export default function HowWeRank() {
  return (
    <TextPage
      crumb="How we rank"
      title="How We Rank Dog Food"
      intro="Every number on Dog Food Scout comes from a formula on this page applied to data the brand itself publishes. Every score comes from the rubric below. Nothing else moves a ranking."
    >
      <JsonLd data={[{ "@context": "https://schema.org", "@type": "WebPage", name: "How we rank", url: `${SITE_URL}/how-we-rank`, publisher: orgRef(), citation: citations() }, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "How we rank", path: "/how-we-rank" }])]} />

      <h2>The Scout Score (out of 10)</h2>
      <ul>
        {RUBRIC.map((r) => (
          <li key={r.key}><strong>{r.label} - {r.weight}%.</strong> {r.detail}</li>
        ))}
      </ul>
      <p>Rules: scores are set before any commercial conversation; the ranking order is always the score order (a lower score is never placed above a higher one); a score is re-checked whenever a brand&apos;s formulation, price or AAFCO statement changes.</p>

      <h2>Formulas</h2>
      <ul>
        <li><strong>Dry matter:</strong> <code>DM% = as-fed% / (100 - moisture%) x 100</code>. A fresh food with 11% protein and 70% moisture is 36.7% protein DM.</li>
        <li><strong>Per 1,000 kcal:</strong> <code>g/1,000 kcal = as-fed% x 10,000 / kcal per kg</code> - the fairest cross-format comparison.</li>
        <li><strong>Carbohydrates</strong> (rarely published): by difference, <code>100 - protein - fat - fiber - moisture - ash</code>, only when ash is published.</li>
        <li><strong>Daily calories:</strong> <code>RER = 70 x kg^0.75</code>; <code>MER = RER x factor</code> ({Object.values(LIFE_STAGE_FACTORS).map((f) => `${f.label.toLowerCase()} ${f.factor}`).join(", ")}).</li>
        <li><strong>Cost per day:</strong> <code>MER / 1,000 x USD per 1,000 kcal</code>, at {WEIGHT_BRACKETS_LB.join(", ")} lb, using the standard price after any introductory discount.</li>
      </ul>
      <CalorieTable weights={[...WEIGHT_BRACKETS_LB]} stages={["neutered-adult", "senior", "active", "puppy-older"]} />

      <h2>AAFCO thresholds we check</h2>
      <ul>
        <li>Adult maintenance: protein &ge; {AAFCO.adult.proteinDM}% DM ({AAFCO.adult.proteinPer1000} g/1,000 kcal), fat &ge; {AAFCO.adult.fatDM}% DM ({AAFCO.adult.fatPer1000} g/1,000 kcal).</li>
        <li>Growth &amp; reproduction: protein &ge; {AAFCO.growth.proteinDM}% DM ({AAFCO.growth.proteinPer1000} g), fat &ge; {AAFCO.growth.fatDM}% DM ({AAFCO.growth.fatPer1000} g).</li>
        <li>Calcium:phosphorus between {AAFCO.caToPRatio.min}:1 and {AAFCO.caToPRatio.max}:1; large-breed growth calcium &le; {AAFCO.largeBreedGrowthCaMaxDM}% DM.</li>
        <li>We record whether a recipe was <em>formulated to meet</em> the profiles or <em>substantiated by animal feeding trials</em> - they are different claims.</li>
      </ul>

      <h2>How brand data is verified</h2>
      <ul>
        <li>Guaranteed analysis and kcal/kg: read from the brand&apos;s own recipe page or label; we store the URL and date.</li>
        <li>Prices: the brand&apos;s quote flow for 25 lb and 50 lb neutered adults, converted to USD per 1,000 kcal.</li>
        <li>Re-checked every 30 days (last check: {BRAND_DATA_CHECKED}). Anything unconfirmed displays &quot;Verifying&quot; - we never estimate.</li>
      </ul>

      <h2>Sources</h2>
      <ul>
        {CITATIONS.map((c) => <li key={c.href}><a href={c.href} rel="noopener">{c.label}</a> ({c.publisher})</li>)}
      </ul>
      <p>Questions or a correction? <Link href="/contact">Contact the research team</Link>.</p>
    </TextPage>
  );
}
