import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Byline } from "@/components/byline";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { LinkGrid } from "@/components/link-grid";
import { PageShell } from "@/components/page-shell";
import { QuickAnswer } from "@/components/quick-answer";
import { ARTICLES, ARTICLE_BY_SLUG, articlePath } from "@/content/articles";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema, citations, CITATIONS, ENTITIES, faqSchema, orgRef, WEBSITE_ID } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";
import { pageReviewSchema } from "@/data/reviewers";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = ARTICLE_BY_SLUG.get((await params).slug);
  if (!a) return {};
  const m = pageMeta({ title: a.meta.seoTitle, description: a.meta.description, path: articlePath(a.meta.slug) });
  return {
    ...m,
    openGraph: { ...m.openGraph, title: a.meta.title, type: "article", publishedTime: a.meta.publishedAt, modifiedTime: a.meta.updatedAt },
  };
}

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = ARTICLE_BY_SLUG.get((await params).slug);
  if (!a) notFound();
  const { meta, Body } = a;
  const path = articlePath(meta.slug);
  const others = ARTICLES.filter((x) => x.meta.slug !== meta.slug).slice(0, 4);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      url: `${SITE_URL}${path}`,
      mainEntityOfPage: `${SITE_URL}${path}`,
      image: `${SITE_URL}/og-default.jpg`,
      datePublished: meta.publishedAt,
      dateModified: meta.updatedAt,
      articleSection: meta.category,
      isPartOf: { "@id": WEBSITE_ID },
      author: orgRef(),
      publisher: orgRef(),
      ...pageReviewSchema(path),
      about: ENTITIES.dog,
      mentions: [ENTITIES.aafco, ENTITIES.wsava],
      abstract: meta.keyTakeaways.join(" "),
      citation: [
        ...(meta.sources ?? []).map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.href, datePublished: String(s.year), publisher: { "@type": "Organization", name: s.publisher } })),
        ...citations(),
      ],
    },
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/articles" }, { name: meta.title, path }]),
    faqSchema(meta.faqs),
  ];

  return (
    <PageShell>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/articles" }, { label: meta.title }]} />
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#A16207]">{meta.category} · {meta.readMinutes} min read</p>
      <h1 className="mt-1 text-[28px] font-extrabold leading-tight text-[#191919] sm:text-[34px]">{meta.title}</h1>
      <div className="mb-5 mt-2">
        <Byline path={path} updatedAt={meta.updatedAt} />
        <p className="mt-1 text-[12.5px] text-gray-500">Published {fmtDate(meta.publishedAt)}</p>
      </div>

      <QuickAnswer question={meta.answer.question} answer={meta.answer.text} />

      <section aria-labelledby="key-takeaways" className="mt-5 rounded-xl border border-[#F3E3A3] bg-[#FEFCE8] p-5">
        <h2 id="key-takeaways" className="mb-2 text-[16px] font-bold text-[#191919]">Key takeaways</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-gray-700">
          {meta.keyTakeaways.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <article className="mt-2">
        <Body />
      </article>

      <FaqAccordion bare title="FAQs" items={meta.faqs} />

      <section className="mt-10 rounded-xl border border-[#F3E3A3] bg-white p-5">
        <h2 className="mb-2 text-[16px] font-bold text-[#191919]">Sources</h2>
        <ul className="list-disc space-y-1 pl-5 text-[14px] text-gray-600">
          {(meta.sources ?? []).map((s) => (
            <li key={s.href}><a href={s.href} rel="noopener" className="text-[#A16207] hover:underline">{s.label}</a> ({s.publisher}, {s.year})</li>
          ))}
          {CITATIONS.map((c) => (
            <li key={c.href}><a href={c.href} rel="noopener" className="text-[#A16207] hover:underline">{c.label}</a> ({c.publisher})</li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-gray-500">General information, not veterinary advice. Talk to your vet before changing the diet of a dog with a medical condition.</p>
      </section>

      <LinkGrid
        title="Compare the brands"
        columns={3}
        items={RANKED_BRANDS.slice(0, 6).map((b) => ({ href: `/reviews/${b.slug}`, label: `${b.name} review`, note: b.verdict }))}
      />
      {others.length > 0 && (
        <LinkGrid title="More guides" items={others.map((o) => ({ href: articlePath(o.meta.slug), label: o.meta.title }))} />
      )}
      <p className="mt-8 text-[14px] text-gray-600">
        Back to the <Link href="/" className="font-semibold text-[#A16207] hover:underline">best fresh dog food ranking</Link>.
      </p>
    </PageShell>
  );
}
