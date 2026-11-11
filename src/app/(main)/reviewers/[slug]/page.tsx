import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { ARTICLE_BY_SLUG } from "@/content/articles";
import { REVIEWERS, displayName, getReviewer, pagesReviewedBy, personSchema, reviewerPath } from "@/data/reviewers";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema, WEBSITE_ID } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return REVIEWERS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getReviewer((await params).slug);
  if (!r) return {};
  const m = pageMeta({
    title: `${displayName(r)} - ${r.jobTitle}`,
    description: r.headline.slice(0, 158),
    path: reviewerPath(r.slug),
    type: "website",
  });
  return { ...m, openGraph: { ...m.openGraph, type: "profile", images: [{ url: r.image, width: 800, height: 800, alt: displayName(r) }] } };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function titleFor(path: string) {
  if (path === "/") return "Best Fresh Dog Food: 7 Delivery Services Compared (homepage ranking)";
  const m = path.match(/^\/articles\/(.+)$/);
  return (m && ARTICLE_BY_SLUG.get(m[1])?.meta.title) || path;
}

export default async function ReviewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = getReviewer((await params).slug);
  if (!r) notFound();
  const path = reviewerPath(r.slug);
  const reviewed = pagesReviewedBy(r.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE_URL}${path}`,
      url: `${SITE_URL}${path}`,
      name: `${displayName(r)} - ${r.jobTitle}`,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: personSchema(r),
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: displayName(r), path }]),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: displayName(r) }]} />

      <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Image src={r.image} alt={`${displayName(r)}, ${r.jobTitle}`} width={160} height={160} priority className="h-[140px] w-[140px] rounded-full border-4 border-white object-cover shadow sm:h-[160px] sm:w-[160px]" />
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#A16207]">Veterinary review team</p>
          <h1 className="mt-1 flex items-center gap-2 text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">
            {displayName(r)}
            <ShieldCheck className="h-6 w-6 text-[#16A34A]" aria-hidden="true" />
          </h1>
          <p className="mt-1 text-[15px] font-semibold text-gray-700">{r.jobTitle}</p>
          <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-gray-600">{r.headline}</p>
          {r.sameAs.length > 0 && (
            <p className="mt-2 text-[14px]">
              {r.sameAs.map((u) => (
                <a key={u} href={u} rel="noopener me" className="mr-3 font-semibold text-[#A16207] hover:underline">
                  {u.includes("linkedin.com") ? "LinkedIn profile" : new URL(u).hostname}
                </a>
              ))}
            </p>
          )}
        </div>
      </header>

      <section className="mt-8">
        <h2 className="mb-3 text-[20px] font-bold text-[#191919]">About {r.shortName}</h2>
        <div className="space-y-4 text-[16px] leading-[1.7] text-gray-700">
          {r.bio.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>
      </section>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <section className="rounded-xl border border-[#F3E3A3] bg-white p-5">
          <h2 className="mb-2 text-[16px] font-bold text-[#191919]">Education</h2>
          <ul className="list-disc space-y-1 pl-5 text-[15px] text-gray-700">
            {r.education.map((e) => <li key={e.name}>{e.name}</li>)}
          </ul>
        </section>
        <section className="rounded-xl border border-[#F3E3A3] bg-white p-5">
          <h2 className="mb-2 text-[16px] font-bold text-[#191919]">Areas of focus</h2>
          <ul className="list-disc space-y-1 pl-5 text-[15px] text-gray-700">
            {r.focus.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-xl border border-[#F3E3A3] bg-[#FEFCE8] p-5">
        <h2 className="mb-2 text-[16px] font-bold text-[#191919]">Veterinary reviewed by {r.shortName}</h2>
        {reviewed.length > 0 ? (
          <ul className="space-y-1.5 text-[15px]">
            {reviewed.map((x) => (
              <li key={x.path}>
                <Link href={x.path} className="font-semibold text-[#A16207] hover:underline">{titleFor(x.path)}</Link>
                <span className="text-gray-500"> · reviewed {fmt(x.reviewedAt)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[15px] text-gray-600">Pages will be listed here as each veterinary review is completed.</p>
        )}
        <p className="mt-3 text-[13px] text-gray-500">
          Reviewers check health and nutrition statements against veterinary references. Brand scores come from our published <Link href="/how-we-rank" className="text-[#A16207] hover:underline">rubric</Link>, not from reviewers.
        </p>
      </section>
    </PageShell>
  );
}
