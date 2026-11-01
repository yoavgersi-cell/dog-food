import Link from "next/link";
import { Award, Calculator, Info, Swords } from "lucide-react";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { PAIRS, comparePath } from "@/lib/dogfood/pairs";
import { RUBRIC } from "@/lib/dogfood/rubric";
import { CostCalculator } from "./cost-calculator";

function SidebarCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#F3E3A3] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className ?? ""}`}>
      {children}
    </div>
  );
}

export type SidebarBlock = "calculator" | "methodology" | "reviews" | "comparisons" | "disclosure";

const DEFAULT_BLOCKS: SidebarBlock[] = ["calculator", "methodology", "reviews", "comparisons", "disclosure"];

export function Sidebar({ blocks = DEFAULT_BLOCKS, featuredPairs, calcLb = 25 }: { blocks?: SidebarBlock[]; featuredPairs?: string[]; calcLb?: number }) {
  const pairs = featuredPairs ? PAIRS.filter((p) => featuredPairs.includes(p.slug)) : PAIRS.slice(0, 6);
  const nameOf = (slug: string) => RANKED_BRANDS.find((b) => b.slug === slug)?.name ?? slug;

  const render = (id: SidebarBlock) => {
    switch (id) {
      case "calculator":
        return (
          <SidebarCard key={id}>
            <p className="mb-3 flex items-center gap-2 text-[16px] font-bold text-[#191919]">
              <Calculator className="h-5 w-5 text-[#A16207]" strokeWidth={1.75} />
              Cost-per-day calculator
            </p>
            <CostCalculator defaultLb={calcLb} brands={RANKED_BRANDS.map((b) => ({ slug: b.slug, name: b.name, usdPer1000kcal: b.price?.usdPer1000kcal ?? null }))} />
          </SidebarCard>
        );
      case "methodology":
        return (
          <SidebarCard key={id}>
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7]">
                <Award className="h-5 w-5 text-[#A16207]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#191919]">How the Scout Score works</p>
                <p className="mt-0.5 text-[13px] text-gray-500">Six weighted criteria, published in full:</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {RUBRIC.map(({ label, weight }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-semibold text-[#191919]">{label}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-[#EAB308]" style={{ width: `${(weight / 30) * 100}%` }} />
                    </div>
                    <span className="w-8 text-right text-[12px] font-bold text-gray-500">{weight}%</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/how-we-rank" className="mt-4 block text-[13px] font-semibold text-[#A16207] hover:underline">
              Full methodology & formulas
            </Link>
          </SidebarCard>
        );
      case "reviews":
        return (
          <SidebarCard key={id} className="!bg-[#FEFCE8]">
            <h3 className="mb-5 text-[20px] font-bold text-[#191919]">Editorial Reviews</h3>
            <div className="space-y-4">
              {RANKED_BRANDS.map((b) => (
                <Link key={b.slug} href={`/reviews/${b.slug}`} className="group flex items-center gap-4">
                  <div className="flex h-[48px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.logo} alt="" width={64} height={18} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#191919] transition-colors group-hover:text-[#A16207]">{b.name}</p>
                    <p className="text-[13px] text-gray-500">{b.score.toFixed(1)}/10 · Read Review</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/reviews" className="mt-6 block text-[14px] font-semibold text-[#A16207] hover:underline">
              Read All Reviews
            </Link>
          </SidebarCard>
        );
      case "comparisons":
        return (
          <SidebarCard key={id}>
            <p className="mb-3 flex items-center gap-2 text-[16px] font-bold text-[#191919]">
              <Swords className="h-5 w-5 text-[#A16207]" strokeWidth={1.75} />
              Head-to-head
            </p>
            <ul className="space-y-2">
              {pairs.map((p) => (
                <li key={p.slug}>
                  <Link href={comparePath(p.slug)} className="text-[14px] text-gray-700 hover:text-[#A16207] hover:underline">
                    {nameOf(p.a)} vs {nameOf(p.b)}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/compare" className="mt-3 block text-[13px] font-semibold text-[#A16207] hover:underline">
              All 21 comparisons
            </Link>
          </SidebarCard>
        );
      case "disclosure":
        return (
          <SidebarCard key={id}>
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={1.5} />
              <p className="text-xs leading-relaxed text-gray-500">
                We may earn a commission from brands featured on this page. Scores follow our published rubric and are never changed for payment.{" "}
                <Link href="/disclosure" className="underline">Disclosure</Link>
              </p>
            </div>
          </SidebarCard>
        );
    }
  };

  return (
    <aside className="hidden w-[340px] shrink-0 lg:block" aria-label="Tools and related reviews">
      <div className="sticky top-6 space-y-4">{blocks.map(render)}</div>
    </aside>
  );
}
