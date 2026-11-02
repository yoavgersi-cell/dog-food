import Link from "next/link";
import { RANKED_BRANDS } from "@/lib/dogfood/brands";
import { PAIRS, comparePath } from "@/lib/dogfood/pairs";

export default function NotFound() {
  const nameOf = (s: string) => RANKED_BRANDS.find((b) => b.slug === s)?.name ?? s;
  return (
    <div className="min-h-[70vh] bg-[#FFFBEB]">
      <div className="mx-auto max-w-[760px] px-4 py-16 sm:py-24">
        <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#A16207]">Error 404</p>
        <h1 className="mt-2 text-[30px] font-extrabold leading-tight text-[#191919] sm:text-[38px]">We couldn&rsquo;t find that page</h1>
        <p className="mt-3 text-[16px] text-gray-600">Try the full ranking, a brand review or a head-to-head comparison.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 font-bold text-[#191919]">Top-rated brands</p>
            <ul className="space-y-1.5">
              <li><Link href="/" className="text-[#A16207] hover:underline">Best fresh & raw dog food (ranking)</Link></li>
              {RANKED_BRANDS.slice(0, 4).map((b) => (
                <li key={b.slug}><Link href={`/reviews/${b.slug}`} className="text-[#A16207] hover:underline">{b.name} review</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-bold text-[#191919]">Popular comparisons</p>
            <ul className="space-y-1.5">
              {PAIRS.slice(0, 5).map((p) => (
                <li key={p.slug}><Link href={comparePath(p.slug)} className="text-[#A16207] hover:underline">{nameOf(p.a)} vs {nameOf(p.b)}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
