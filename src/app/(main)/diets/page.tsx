import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { DIETS, dietPath } from "@/lib/dogfood/taxonomy";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Dog Food by Diet Type & Health Condition",
  description: `${DIETS.length} guides: raw, fresh, grain-free, high-protein and limited-ingredient diets, plus sensitive stomachs, allergies, weight loss, joints and more.`,
  path: "/diets",
  type: "website",
});

export default function DietsIndex() {
  const groups = [
    { title: "Diet types", items: DIETS.filter((d) => d.kind === "diet-type") },
    { title: "Health conditions", items: DIETS.filter((d) => d.kind === "condition") },
  ];
  return (
    <PageShell blocks={["calculator", "methodology", "reviews"]}>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Diets & health", path: "/diets" }]), { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dog food by diet and condition", url: `${SITE_URL}/diets` }]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Diets & health" }]} />
      <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[34px]">Dog Food by Diet &amp; Health Condition</h1>
      <p className="mb-6 mt-2 max-w-[680px] text-[15.5px] text-gray-700">
        Pages marked <span className="rounded bg-amber-100 px-1.5 text-[12px] font-bold text-amber-900">Vet diet</span> cover conditions usually managed with a prescription diet; they tell you what to ask your vet, not what to buy instead.{" "}
        <Link href="/ingredients" className="font-semibold text-[#A16207] hover:underline">Browse by ingredient</Link>.
      </p>
      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="mb-2 mt-8 text-[20px] font-bold text-[#191919]">{g.title}</h2>
          <ul className="grid gap-2 sm:grid-cols-3">
            {g.items.map((d) => (
              <li key={d.slug}>
                <Link href={dietPath(d.slug)} className="flex items-center justify-between gap-2 rounded-lg border border-[#F3E3A3] bg-white px-3 py-2 text-[14px] font-semibold text-[#191919] hover:border-[#EAB308]">
                  {d.name}
                  {d.therapeutic && <span className="rounded bg-amber-100 px-1.5 text-[11px] font-bold text-amber-900">Vet diet</span>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
