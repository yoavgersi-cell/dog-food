import Link from "next/link";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { PAIRS, comparePath } from "@/lib/dogfood/pairs";
import { DIETS, DEMOGRAPHICS, BREEDS, bestForPath, dietPath } from "@/lib/dogfood/taxonomy";
import { DISCLOSURE_TEXT, SITE_NAME } from "@/lib/config";

// Sitewide footer: every hub is linked from every page (no orphan hubs), plus
// a rotating handful of high-demand spokes per silo.
const nameOf = (slug: string) => RANKED_BRANDS.find((b) => b.slug === slug)?.name ?? slug;

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Reviews",
    links: [...RANKED_BRANDS.map((b) => ({ label: `${b.name} Review`, href: `/reviews/${b.slug}` })), { label: "All Reviews", href: "/reviews" }],
  },
  {
    title: "Compare",
    links: [
      ...PAIRS.slice(0, 6).map((p) => ({ label: `${nameOf(p.a)} vs ${nameOf(p.b)}`, href: comparePath(p.slug) })),
      { label: "All 21 Comparisons", href: "/compare" },
    ],
  },
  {
    title: "Best Food For",
    links: [
      ...["golden-retriever", "french-bulldog", "labrador-retriever", "dachshund"].map((s) => ({ label: BREEDS.find((b) => b.slug === s)!.name + "s", href: bestForPath(s) })),
      ...["puppy", "senior-dog"].map((s) => ({ label: DEMOGRAPHICS.find((d) => d.slug === s)!.name, href: bestForPath(s) })),
      { label: "All Breeds & Life Stages", href: "/best-for" },
    ],
  },
  {
    title: "Diets & Health",
    links: [
      ...["sensitive-stomach", "weight-loss", "allergies", "raw", "grain-free", "high-protein"].map((s) => ({ label: DIETS.find((d) => d.slug === s)!.name, href: dietPath(s) })),
      { label: "How Much to Feed", href: "/articles/how-much-fresh-food-to-feed-a-dog" },
      { label: "All Guides", href: "/articles" },
      { label: "All Diets & Conditions", href: "/diets" },
      { label: "Ingredient Guide", href: "/ingredients" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How We Rank", href: "/how-we-rank" },
      { label: "Advertising Disclosure", href: "/disclosure" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-[#FDE68A] bg-[#FEFCE8]">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[#713F12]">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13.5px] text-gray-700 hover:text-[#A16207] hover:underline">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 border-t border-[#FDE68A] pt-6 text-[12px] leading-relaxed text-gray-500">
          <p>{DISCLOSURE_TEXT}</p>
          <p className="mt-2">
            Content on {SITE_NAME} is for general information and is not veterinary advice. Talk to your veterinarian before changing the diet of a dog with a medical condition. Brand names and logos belong to their owners.
          </p>
          <p className="mt-2">&copy; 2026 {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
