import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { RatingBadge } from "./rating-badge";
import { ProviderCta } from "./provider-cta";
import { FORMAT_LABEL, type Brand } from "@/lib/dogfood/brands";

/** Review-hub box: the whole card opens the full review; a small secondary link goes to the brand. */
export function ReviewBox({ brand }: { brand: Brand }) {
  const firstSentence = brand.summary.split(/(?<=\.)\s/)[0];
  const facts = [
    brand.formats.map((f) => FORMAT_LABEL[f].replace(/ \(.*\)$/, "")).join(" + "),
    brand.subscriptionRequired === null ? null : brand.subscriptionRequired ? "Subscription" : "No subscription",
    brand.storage === "pantry" ? "No freezer needed" : brand.storage === "freezer + fridge" ? "Ships frozen" : "Frozen or dry",
  ].filter(Boolean) as string[];

  return (
    <article className="group relative flex flex-col rounded-xl border border-[#F3E3A3] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-[56px] w-[150px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logo} alt={`${brand.name} logo`} width={150} height={56} className="max-h-full max-w-full object-contain" style={brand.logoMaxH ? { maxHeight: Math.round(brand.logoMaxH * 0.9) } : undefined} />
        </div>
        <RatingBadge rating={brand.score} label={brand.scoreLabel} starRating={brand.stars} />
      </div>

      <h2 className="mt-4 text-[19px] font-bold leading-snug text-[#191919]">
        <Link href={`/reviews/${brand.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {brand.name} Review
        </Link>
      </h2>
      <p className="text-[13.5px] font-semibold text-[#A16207]">{brand.verdict}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-gray-700">{firstSentence}</p>

      <ul className="mt-3 space-y-1.5 text-[13.5px] text-gray-800">
        {brand.pros.slice(0, 2).map((p) => (
          <li key={p} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A16207]" strokeWidth={2.25} />{p}</li>
        ))}
        {brand.cons.slice(0, 1).map((c) => (
          <li key={c} className="flex gap-2 text-gray-600"><X className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={2.25} />{c}</li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {facts.map((f) => (
          <span key={f} className="rounded-full bg-[#FEFCE8] px-2.5 py-1 text-[12px] font-semibold text-[#713F12] ring-1 ring-inset ring-[#FDE68A]">{f}</span>
        ))}
      </div>

      <p className="mt-3 text-[12.5px] font-bold text-[#713F12]">Offer: <span className="font-semibold">{brand.offer}</span></p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="inline-flex h-[42px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#A16207] text-[15px] font-bold text-white transition-colors group-hover:bg-[#854D0E]">
          Read full review <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <ProviderCta
          href={brand.affiliateUrl}
          providerName={brand.name}
          providerSlug={brand.slug}
          position={brand.rank}
          pageType="review"
          sourceFlow="provider_review"
          className="relative z-10 -my-1.5 shrink-0 py-1.5 text-[13px] font-semibold text-gray-500 underline-offset-2 hover:text-[#A16207] hover:underline"
        >
          Visit site
        </ProviderCta>
      </div>
    </article>
  );
}
