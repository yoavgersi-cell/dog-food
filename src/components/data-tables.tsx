import Link from "next/link";
import { FORMAT_LABEL, type Brand } from "@/lib/dogfood/brands";
import {
  AAFCO, LIFE_STAGE_FACTORS, WEIGHT_BRACKETS_LB, costPerDay, fmtNum, fmtPct, fmtUsd, kcalPerDayForLb, profile, PENDING, type LifeStage,
} from "@/lib/nutrition";

const th = "px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wide text-[#713F12]";
const td = "px-3 py-2.5 text-[14px] text-gray-700 align-top";
const pending = <span className="text-gray-400">{PENDING}</span>;

function TableWrap({ caption, children, note }: { caption: string; children: React.ReactNode; note?: React.ReactNode }) {
  return (
    <figure className="my-5">
      <div className="overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
        <table className="w-full min-w-[560px] border-collapse">
          <caption className="sr-only">{caption}</caption>
          {children}
        </table>
      </div>
      {note && <figcaption className="mt-2 text-[12.5px] leading-relaxed text-gray-500">{note}</figcaption>}
    </figure>
  );
}

const yesNo = (v: boolean | null) => (v === null ? pending : v ? "Yes" : "No");

/** Nutrition Spec Sheet: one column per brand, DM + per-1,000-kcal rows. */
export function NutritionSpecTable({ brands }: { brands: Brand[] }) {
  const profs = brands.map((b) => (b.nutrition ? profile(b.nutrition) : null));
  const row = (label: string, f: (i: number) => React.ReactNode) => (
    <tr className="border-t border-[#FEF3C7]">
      <th scope="row" className={`${td} sticky left-0 bg-white font-semibold text-[#191919]`}>{label}</th>
      {brands.map((b, i) => <td key={b.slug} className={td}>{f(i)}</td>)}
    </tr>
  );
  const num = (i: number, g: (p: NonNullable<(typeof profs)[number]>) => string) => (profs[i] ? g(profs[i]!) : pending);
  return (
    <TableWrap
      caption="Nutrition spec sheet"
      note={<>Dry matter (DM) = as-fed % / (100 - moisture %) x 100. Grams per 1,000 kcal = as-fed % x 10,000 / kcal per kg. AAFCO adult minimums: {AAFCO.adult.proteinPer1000} g protein and {AAFCO.adult.fatPer1000} g fat per 1,000 kcal. &quot;{PENDING}&quot; = not yet checked against the brand&apos;s published guaranteed analysis.</>}
    >
      <thead className="bg-[#FEF3C7]">
        <tr>
          <th className={`${th} sticky left-0 bg-[#FEF3C7]`}>Metric</th>
          {brands.map((b) => <th key={b.slug} className={th}><Link href={`/brands/${b.slug}`} className="hover:underline">{b.name}</Link></th>)}
        </tr>
      </thead>
      <tbody>
        {row("Representative recipe", (i) => brands[i].nutrition?.recipe ?? pending)}
        {row("Format", (i) => brands[i].formats.map((f) => FORMAT_LABEL[f]).join(", "))}
        {row("Protein (DM)", (i) => num(i, (p) => fmtPct(p.proteinDM)))}
        {row("Fat (DM)", (i) => num(i, (p) => fmtPct(p.fatDM)))}
        {row("Fiber (DM)", (i) => num(i, (p) => fmtPct(p.fiberDM)))}
        {row("Carbs (DM, by difference)", (i) => num(i, (p) => (p.carbsDM === null ? "Ash not published" : fmtPct(p.carbsDM))))}
        {row("Protein g / 1,000 kcal", (i) => num(i, (p) => fmtNum(p.proteinPer1000)))}
        {row("Fat g / 1,000 kcal", (i) => num(i, (p) => fmtNum(p.fatPer1000)))}
        {row("Protein : fat ratio", (i) => num(i, (p) => `${p.proteinToFat.toFixed(2)} : 1`))}
        {row("Calories (kcal/kg)", (i) => num(i, (p) => fmtNum(p.kcalPerKg)))}
        {row("AAFCO statement", (i) => brands[i].aafcoStatement ?? pending)}
        {row("Feeding trials", (i) => yesNo(brands[i].feedingTrials))}
      </tbody>
    </TableWrap>
  );
}

/** Cost per day at the standard weight brackets (or custom weights). */
export function CostTable({ brands, weights = [...WEIGHT_BRACKETS_LB], stage = "neutered-adult" }: { brands: Brand[]; weights?: number[]; stage?: LifeStage }) {
  return (
    <TableWrap
      caption="Cost per day by dog weight"
      note={<>Daily calories = 70 x kg^0.75 x {LIFE_STAGE_FACTORS[stage].factor} ({LIFE_STAGE_FACTORS[stage].label.toLowerCase()}). Cost/day = kcal/1,000 x the brand&apos;s standard (non-introductory) USD per 1,000 kcal.</>}
    >
      <thead className="bg-[#FEF3C7]">
        <tr>
          <th className={`${th} sticky left-0 bg-[#FEF3C7]`}>Brand</th>
          {weights.map((w) => <th key={w} className={th}>{w} lb<span className="block text-[10.5px] font-semibold normal-case text-[#854D0E]">{fmtNum(kcalPerDayForLb(w, stage))} kcal</span></th>)}
        </tr>
      </thead>
      <tbody>
        {brands.map((b) => (
          <tr key={b.slug} className="border-t border-[#FEF3C7]">
            <th scope="row" className={`${td} sticky left-0 bg-white font-semibold text-[#191919]`}>{b.name}</th>
            {weights.map((w) => <td key={w} className={td}>{b.price ? fmtUsd(costPerDay(b.price, w, stage)) : pending}</td>)}
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

/** Daily calories by weight and life stage - pure formula, always populated. */
export function CalorieTable({ weights, stages }: { weights: number[]; stages: LifeStage[] }) {
  return (
    <TableWrap caption="Daily calorie needs by weight and life stage" note={<>RER = 70 x (body weight in kg)^0.75; MER = RER x life-stage factor (NRC 2006, WSAVA). Individual dogs vary by up to +/-50% - adjust by body condition score.</>}>
      <thead className="bg-[#FEF3C7]">
        <tr>
          <th className={`${th} sticky left-0 bg-[#FEF3C7]`}>Body weight</th>
          {stages.map((s) => <th key={s} className={th}>{LIFE_STAGE_FACTORS[s].label}<span className="block text-[10.5px] font-semibold normal-case text-[#854D0E]">x{LIFE_STAGE_FACTORS[s].factor}</span></th>)}
        </tr>
      </thead>
      <tbody>
        {weights.map((w) => (
          <tr key={w} className="border-t border-[#FEF3C7]">
            <th scope="row" className={`${td} sticky left-0 bg-white font-semibold text-[#191919]`}>{w} lb ({(w / 2.20462).toFixed(1)} kg)</th>
            {stages.map((s) => <td key={s} className={td}>{fmtNum(kcalPerDayForLb(w, s))} kcal</td>)}
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

/** Feature comparison (qualitative, always populated). */
export function FeatureTable({ brands }: { brands: Brand[] }) {
  const row = (label: string, f: (b: Brand) => React.ReactNode) => (
    <tr className="border-t border-[#FEF3C7]">
      <th scope="row" className={`${td} sticky left-0 bg-white font-semibold text-[#191919]`}>{label}</th>
      {brands.map((b) => <td key={b.slug} className={td}>{f(b)}</td>)}
    </tr>
  );
  return (
    <TableWrap caption="Feature comparison">
      <thead className="bg-[#FEF3C7]">
        <tr>
          <th className={`${th} sticky left-0 bg-[#FEF3C7]`}>Feature</th>
          {brands.map((b) => <th key={b.slug} className={th}>{b.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {row("Scout Score", (b) => <strong className="text-[#191919]">{b.score.toFixed(1)}/10</strong>)}
        {row("Best for", (b) => b.verdict)}
        {row("Formats", (b) => b.formats.map((f) => FORMAT_LABEL[f]).join(", "))}
        {row("Main proteins", (b) => b.proteins.join(", "))}
        {row("Storage", (b) => b.storage)}
        {row("Subscription required", (b) => yesNo(b.subscriptionRequired))}
        {row("Pause / skip online", (b) => yesNo(b.pauseSkipOnline))}
        {row("Calorie-targeted portions", (b) => yesNo(b.customPortions))}
        {row("Human-grade (AAFCO-defined)", (b) => yesNo(b.humanGrade))}
        {row("Delivery", (b) => b.delivery ?? pending)}
        {row("Current offer", (b) => b.offer)}
      </tbody>
    </TableWrap>
  );
}
