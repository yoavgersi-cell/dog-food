import Link from "next/link";
import { TextPage } from "@/components/text-page";
import { REVIEWERS, displayName, reviewerPath } from "@/data/reviewers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Dog Food Scout - Independent Canine Nutrition Research",
  description: "Who we are, how we stay independent, and why we compare dog food on dry-matter data and cost per day instead of marketing claims.",
  path: "/about",
  type: "website",
});

export default function About() {
  return (
    <TextPage
      crumb="About"
      title="About Dog Food Scout"
      intro="Dog Food Scout is an independent research site for people who want the numbers behind fresh and raw dog food: what's in it on a dry-matter basis, what it costs per day for their dog, and which brand fits which dog."
    >
      <h2>What we do differently</h2>
      <ul>
        <li>We convert every guaranteed analysis to dry matter and per 1,000 kcal, so fresh, raw, freeze-dried and air-dried foods can be compared fairly.</li>
        <li>We calculate cost per day at real body weights instead of quoting box prices.</li>
        <li>We publish our scoring rubric and formulas in full on <Link href="/how-we-rank">How We Rank</Link>.</li>
        <li>We give a verdict. Every comparison names a winner and says who should choose the other brand.</li>
      </ul>
      <h2>Independence</h2>
      <p>We may earn a commission when you buy through our links. It doesn&apos;t change scores: they come from the rubric, and the ranking order is always the score order. See our <Link href="/disclosure">advertising disclosure</Link>.</p>
      <h2>Veterinary review</h2>
      {REVIEWERS.length === 0 ? (
        <p>We are appointing a veterinary nutrition reviewer. Until then, health-condition pages are written from published veterinary guidelines (AAFCO, WSAVA, FDA) and tell you plainly when a condition needs a prescription diet. No page claims a veterinary review it hasn&apos;t had.</p>
      ) : (
        <>
          <p>Health and nutrition statements on our guides are checked by our veterinary review team. A page shows &ldquo;Veterinary Reviewed by&rdquo; only after that reviewer has actually gone through it, with the review date.</p>
          <ul>{REVIEWERS.map((r) => <li key={r.slug} id={r.slug}><Link href={reviewerPath(r.slug)}><strong>{displayName(r)}</strong></Link> - {r.jobTitle}. {r.headline}</li>)}</ul>
        </>
      )}
    </TextPage>
  );
}
