import Link from "next/link";
import { CalendarCheck, Check, Leaf, Package, Scale, Snowflake, Tag, Wallet, type LucideIcon } from "lucide-react";
import { RatingBadge } from "./rating-badge";
import { ProviderCta } from "./provider-cta";
import { FORMAT_LABEL, type Brand } from "@/lib/dogfood/brands";
import { costPerDay, fmtUsd } from "@/lib/nutrition";

interface ComparisonCardProps {
  brand: Brand;
  /** Position shown in the rank tab (defaults to the brand's site rank). */
  rank?: number;
  hideRank?: boolean;
  /** Body weight (lb) used for the cost-per-day cell. */
  refLb?: number;
  pageType?: "listing" | "review" | "battle" | "quiz_results";
  sourceFlow?: "main_comparison" | "provider_review" | "battle_page" | "matching_flow";
}

const arrowSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;

type StripItem = { icon: LucideIcon; text: string };

/**
 * Three plain-language facts per card (no label/value pairs, never a
 * "Verifying" placeholder). A verified cost per day takes the first slot
 * automatically once the brand's price is filled in.
 */
function dataStrip(brand: Brand, refLb: number): StripItem[] {
  const candidates: (StripItem | null)[] = [
    brand.price ? { icon: Wallet, text: `${fmtUsd(costPerDay(brand.price, refLb))}/day for a ${refLb} lb dog` } : null,
    brand.subscriptionRequired === false
      ? { icon: CalendarCheck, text: "No subscription" }
      : brand.pauseSkipOnline
        ? { icon: CalendarCheck, text: "Cancel anytime" }
        : null,
    brand.customPortions ? { icon: Scale, text: "Custom portions" } : null,
    brand.storage === "freezer + fridge"
      ? { icon: Snowflake, text: "Ships frozen" }
      : brand.storage === "pantry"
        ? { icon: Package, text: "No freezer" }
        : { icon: Package, text: "Frozen or dry" },
    { icon: Leaf, text: FORMAT_LABEL[brand.formats[0]].replace(/ \(.*\)$/, "") },
  ];
  return candidates.filter((c): c is StripItem => !!c).slice(0, 3);
}

/** One row of 3 facts, icon and label inline on the same line. */
function StripRow({ items, className = "" }: { items: StripItem[]; className?: string }) {
  return (
    <ul className={`flex flex-nowrap items-center justify-between gap-x-1.5 sm:justify-start sm:gap-x-4 ${className}`}>
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex min-w-0 items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-[#191919] max-[370px]:text-[10.5px] sm:text-[12px]">
          <Icon className="h-3.5 w-3.5 shrink-0 text-[#A16207]" strokeWidth={2} />
          {text}
        </li>
      ))}
    </ul>
  );
}

export function ComparisonCard({ brand, rank = brand.rank, hideRank, refLb = 25, pageType = "listing", sourceFlow = "main_comparison" }: ComparisonCardProps) {
  const strip = dataStrip(brand, refLb);
  const cta = (cls: string) => (
    <ProviderCta href={brand.affiliateUrl} providerName={brand.name} providerSlug={brand.slug} position={rank} pageType={pageType} sourceFlow={sourceFlow} className={cls}>
      Visit Site
      {arrowSvg}
    </ProviderCta>
  );

  return (
    <article
      id={`brand-${brand.slug}`}
      data-brand={brand.slug}
      className="relative overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {!hideRank && (
        <div className="absolute left-0 top-0 z-10 flex h-[28px] w-[28px] items-center justify-center rounded-br-lg bg-[#191919] text-[15px] font-bold text-white">
          {rank}
        </div>
      )}
      {!hideRank && brand.badge && rank === 1 && (
        <div className="absolute left-[34px] top-0 z-10 flex h-[28px] items-center rounded-br-lg bg-[#EBA51E] px-3 text-[12px] font-bold uppercase tracking-wide text-[#3A2A06]">
          {brand.badge}
        </div>
      )}

      {/* ===== DESKTOP ===== */}
      <div className="hidden sm:flex sm:min-h-[196px] sm:flex-row">
        <div className="flex items-center justify-center px-6 sm:w-[220px] sm:shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logo} alt={`${brand.name} logo`} width={160} height={44} className="mx-auto block w-auto max-w-[170px] object-contain" style={{ maxHeight: brand.logoMaxH ?? 80 }} />
        </div>

        <div className="flex-1 px-6 py-5">
          <h3 className="text-[12px] font-semibold text-[#1A1A1A]">
            {brand.name} <span className="font-normal text-gray-500">- {brand.verdict}</span>
          </h3>
          <div className="flex gap-3 text-[12px] font-semibold">
            <Link href={`/reviews/${brand.slug}`} className="text-[#A16207] hover:underline">Read Review</Link>
            <Link href={`/brands/${brand.slug}`} className="text-gray-500 hover:text-[#A16207] hover:underline">Specs &amp; prices</Link>
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#FEF3C7] px-2.5 py-1 text-[12px] font-bold text-[#713F12] ring-1 ring-inset ring-[#FDE68A]">
            <Tag className="h-3.5 w-3.5" strokeWidth={2} />
            {brand.offer}
          </p>
          <ul className="mt-2 space-y-0.5">
            {brand.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-center gap-2 text-[12px] leading-[1.35] text-gray-800">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#A16207]" strokeWidth={2} />
                {h}
              </li>
            ))}
          </ul>
          <StripRow items={strip} className="mt-3 border-t border-dashed border-gray-200 pt-2.5" />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 px-6 py-5 sm:w-[200px] sm:shrink-0">
          <RatingBadge rating={brand.score} label={brand.scoreLabel} starRating={brand.stars} />
          {cta("flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#A16207] text-[15px] font-bold text-white transition-colors hover:bg-[#854D0E]")}
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="flex flex-col px-4 pb-5 pt-12 sm:hidden">
        <div className="flex items-start justify-between">
          <div className="flex h-[64px] w-[150px] items-center justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={`${brand.name} logo`} width={150} height={41} className="max-h-full max-w-full object-contain" style={brand.logoMaxH ? { maxHeight: Math.round(brand.logoMaxH * 0.8) } : undefined} />
          </div>
          <RatingBadge rating={brand.score} label={brand.scoreLabel} starRating={brand.stars} />
        </div>
        <p className="mt-3 text-[14px] font-semibold text-[#1A1A1A]">{brand.verdict}</p>
        <p className="mt-2 inline-flex items-center gap-1.5 self-start rounded-md bg-[#FEF3C7] px-2.5 py-1.5 text-[13px] font-bold text-[#713F12] ring-1 ring-inset ring-[#FDE68A]">
          <Tag className="h-4 w-4" strokeWidth={2} />
          {brand.offer}
        </p>
        <ul className="mt-2 space-y-1">
          {brand.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-[14px] leading-[1.4] text-gray-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A16207]" strokeWidth={2} />
              {h}
            </li>
          ))}
        </ul>
        <StripRow items={strip} className="mt-3 border-t border-dashed border-gray-200 pt-3" />
        {cta("mt-4 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#A16207] text-[16px] font-bold text-white transition-colors hover:bg-[#854D0E]")}
        <Link href={`/reviews/${brand.slug}`} className="mt-1.5 py-1.5 text-center text-[13px] font-semibold text-[#A16207] underline-offset-2 hover:underline">
          Read the full {brand.name} review
        </Link>
      </div>
    </article>
  );
}
