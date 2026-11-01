"use client";

import { useState } from "react";
import { LIFE_STAGE_FACTORS, kcalPerDayForLb, fmtUsd, PENDING, type LifeStage } from "@/lib/nutrition";

export interface CalcBrand {
  slug: string;
  name: string;
  usdPer1000kcal: number | null;
}

/** Daily calories (RER x factor) and cost per day for every brand at a chosen weight. */
export function CostCalculator({ brands, defaultLb = 25 }: { brands: CalcBrand[]; defaultLb?: number }) {
  const [lb, setLb] = useState(defaultLb);
  const [stage, setStage] = useState<LifeStage>("neutered-adult");
  const kcal = lb > 0 ? kcalPerDayForLb(lb, stage) : 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <label className="text-[12px] font-semibold text-gray-600">
          Weight (lb)
          <input
            type="number"
            min={2}
            max={250}
            value={lb}
            onChange={(e) => setLb(Math.max(0, Number(e.target.value)))}
            className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-[14px] text-[#191919] focus:border-[#A16207] focus:outline-none"
          />
        </label>
        <label className="text-[12px] font-semibold text-gray-600">
          Life stage
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as LifeStage)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-1.5 py-1.5 text-[13px] text-[#191919] focus:border-[#A16207] focus:outline-none"
          >
            {Object.entries(LIFE_STAGE_FACTORS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 rounded-lg bg-[#FEF3C7] px-3 py-2 text-[13px] text-[#713F12]">
        <span className="text-[18px] font-extrabold">{kcal.toLocaleString("en-US")}</span> kcal/day
        <span className="block text-[11px] text-[#854D0E]">RER 70 x kg^0.75 x {LIFE_STAGE_FACTORS[stage].factor}</span>
      </p>
      <ul className="mt-3 divide-y divide-gray-100 text-[13px]">
        {brands.map((b) => (
          <li key={b.slug} className="flex items-center justify-between py-1.5">
            <span className="text-gray-700">{b.name}</span>
            <span className={b.usdPer1000kcal ? "font-bold text-[#191919]" : "text-gray-400"}>
              {b.usdPer1000kcal ? `${fmtUsd((kcal / 1000) * b.usdPer1000kcal)}/day` : PENDING}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
