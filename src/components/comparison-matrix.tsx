"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

export interface MatrixRow {
  slug: string;
  name: string;
  rank: number;
  score: number;
  verdict: string;
  formats: string;
  families: string[]; // cooked | raw | shelf-stable
  proteins: string;
  storage: string;
  pantryOk: boolean;
  subscriptionRequired: boolean | null;
  customPortions: boolean | null;
  humanGrade: boolean | null;
  aafco: string | null;
  delivery: string | null;
  costPerDay: number | null; // at refLb
  proteinDM: number | null;
  offer: string;
}

type SortKey = "score" | "cost" | "protein";

const PROCESS = [
  { id: "all", label: "All" },
  { id: "cooked", label: "Gently cooked" },
  { id: "raw", label: "Raw" },
  { id: "shelf-stable", label: "Shelf-stable" },
];

const TOGGLES = [
  { id: "noSub", label: "No subscription", test: (r: MatrixRow) => r.subscriptionRequired === false },
  { id: "pantry", label: "No freezer needed", test: (r: MatrixRow) => r.pantryOk },
  { id: "portions", label: "Calorie-targeted portions", test: (r: MatrixRow) => r.customPortions === true },
  { id: "human", label: "Human-grade", test: (r: MatrixRow) => r.humanGrade === true },
] as const;

const bool = (v: boolean | null) =>
  v === null ? <span className="text-gray-400">Verifying</span> : v ? <Check className="h-4 w-4 text-[#A16207]" aria-label="Yes" /> : <Minus className="h-4 w-4 text-gray-400" aria-label="No" />;

/**
 * Homepage comparison matrix. The full table is server-rendered (all 7 rows
 * in the HTML for crawlers and AI engines); filters and sorting only hide or
 * reorder rows on the client.
 */
export function ComparisonMatrix({ rows, refLb }: { rows: MatrixRow[]; refLb: number }) {
  const [proc, setProc] = useState("all");
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [sort, setSort] = useState<SortKey>("score");

  const visible = useMemo(() => {
    const filtered = rows.filter(
      (r) => (proc === "all" || r.families.includes(proc)) && TOGGLES.every((t) => !on[t.id] || t.test(r)),
    );
    const val = (r: MatrixRow) => (sort === "score" ? -r.score : sort === "cost" ? r.costPerDay ?? Infinity : -(r.proteinDM ?? -Infinity));
    return [...filtered].sort((a, b) => val(a) - val(b) || a.rank - b.rank);
  }, [rows, proc, on, sort]);

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
      active ? "border-[#A16207] bg-[#A16207] text-white" : "border-[#F3E3A3] bg-white text-[#191919] hover:border-[#EAB308]"
    }`;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter brands">
        {PROCESS.map((p) => (
          <button key={p.id} type="button" className={chip(proc === p.id)} aria-pressed={proc === p.id} onClick={() => setProc(p.id)}>
            {p.label}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-[#F3E3A3] sm:block" />
        {TOGGLES.map((t) => (
          <button key={t.id} type="button" className={chip(!!on[t.id])} aria-pressed={!!on[t.id]} onClick={() => setOn((s) => ({ ...s, [t.id]: !s[t.id] }))}>
            {t.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-[13px] font-semibold text-gray-600">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-md border border-[#F3E3A3] bg-white px-2 py-1.5 text-[13px] text-[#191919]">
            <option value="score">Scout Score</option>
            <option value="cost">Cost per day</option>
            <option value="protein">Protein (DM)</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
        <table className="w-full min-w-[980px] border-collapse text-left text-[13.5px]">
          <caption className="sr-only">Fresh and raw dog food brands compared on price, format, protein and plan features</caption>
          <thead className="bg-[#FEF3C7] text-[11.5px] uppercase tracking-wide text-[#713F12]">
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-[#FEF3C7] px-3 py-2.5">Brand</th>
              <th scope="col" className="px-3 py-2.5">Score</th>
              <th scope="col" className="px-3 py-2.5">Cost/day ({refLb} lb)</th>
              <th scope="col" className="px-3 py-2.5">Format</th>
              <th scope="col" className="px-3 py-2.5">Proteins</th>
              <th scope="col" className="px-3 py-2.5">Protein (DM)</th>
              <th scope="col" className="px-3 py-2.5">Custom portions</th>
              <th scope="col" className="px-3 py-2.5">Subscription</th>
              <th scope="col" className="px-3 py-2.5">Human-grade</th>
              <th scope="col" className="px-3 py-2.5">AAFCO</th>
              <th scope="col" className="px-3 py-2.5">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.slug} className="border-t border-[#FEF3C7] align-top">
                <th scope="row" className="sticky left-0 z-10 bg-white px-3 py-2.5">
                  <Link href={`/brands/${r.slug}`} className="font-bold text-[#191919] hover:text-[#A16207] hover:underline">{r.name}</Link>
                  <span className="block text-[12px] font-normal text-gray-500">{r.verdict}</span>
                </th>
                <td className="px-3 py-2.5 font-extrabold text-[#191919]">{r.score.toFixed(1)}</td>
                <td className="px-3 py-2.5">{r.costPerDay !== null ? `$${r.costPerDay.toFixed(2)}` : <span className="text-gray-400">Verifying</span>}</td>
                <td className="px-3 py-2.5">{r.formats}</td>
                <td className="px-3 py-2.5 capitalize">{r.proteins}</td>
                <td className="px-3 py-2.5">{r.proteinDM !== null ? `${r.proteinDM.toFixed(1)}%` : <span className="text-gray-400">Verifying</span>}</td>
                <td className="px-3 py-2.5">{bool(r.customPortions)}</td>
                <td className="px-3 py-2.5">{r.subscriptionRequired === null ? <span className="text-gray-400">Verifying</span> : r.subscriptionRequired ? "Required" : "Optional"}</td>
                <td className="px-3 py-2.5">{bool(r.humanGrade)}</td>
                <td className="px-3 py-2.5">{r.aafco ?? <span className="text-gray-400">Verifying</span>}</td>
                <td className="px-3 py-2.5">{r.delivery ?? <span className="text-gray-400">Verifying</span>}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={11} className="px-3 py-6 text-center text-gray-500">No brand matches every filter - remove one to see more.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
