import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { ARTICLES, articlePath } from "@/content/articles";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Dog Food Guides: Feeding, Nutrition & Fresh Food Explained",
  description: "Practical, data-backed guides on feeding fresh and raw dog food: how much to feed, how to read labels, switching foods, and choosing the right diet.",
  path: "/articles",
  type: "website",
});

export default function ArticlesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Dog food guides",
            url: `${SITE_URL}/articles`,
            mainEntity: { "@type": "ItemList", itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${articlePath(a.meta.slug)}`, name: a.meta.title })) },
          },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/articles" }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Dog Food Guides</h1>
      <p className="mb-6 mt-2 max-w-[680px] text-[15.5px] text-gray-700">Practical answers on feeding fresh and raw food, built on the same formulas and sources as our rankings.</p>
      <ul className="space-y-3">
        {ARTICLES.map(({ meta }) => (
          <li key={meta.slug}>
            <Link href={articlePath(meta.slug)} className="block rounded-xl border border-[#F3E3A3] bg-white p-5 transition-colors hover:border-[#EAB308] hover:bg-[#FEFCE8]">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#A16207]">{meta.category} · {meta.readMinutes} min read</p>
              <h2 className="mt-1 text-[19px] font-bold leading-snug text-[#191919]">{meta.title}</h2>
              <p className="mt-1.5 text-[14.5px] text-gray-600">{meta.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
