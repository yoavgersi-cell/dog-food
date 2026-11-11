import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Database, ShieldCheck } from "lucide-react";
import { BRAND_DATA_CHECKED, latestUpdate } from "@/lib/config";
import { displayName, getPageReview, reviewerPath } from "@/data/reviewers";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const fmtLong = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const linkedInIcon = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="#0A66C2" />
    <path fill="#fff" d="M6.9 9.4h2.6V18H6.9V9.4Zm1.3-4.1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3 4.1h2.5v1.2h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4V18h-2.6v-4.2c0-1-.02-2.29-1.4-2.29-1.4 0-1.6 1.09-1.6 2.22V18h-2.6V9.4Z" />
  </svg>
);

/**
 * E-E-A-T byline. Reviewed pages: updated date, then the reviewer row (round photo,
 * "Reviewed for veterinary accuracy by ...", LinkedIn, review date, author, how we review).
 * Unreviewed pages: the editorial strip only.
 */
export function Byline({ path, updatedAt, hideUpdated = false }: { path: string; updatedAt?: string; hideUpdated?: boolean }) {
  const review = getPageReview(path);

  if (!review) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-gray-600">
        <span>
          By <Link href="/about" className="tap font-semibold text-[#191919] hover:text-[#A16207]">Dog Food Scout Research</Link>
        </span>
        <span className="inline-flex items-center gap-1"><CalendarCheck className="h-3.5 w-3.5 text-[#A16207]" />Updated {fmt(latestUpdate(updatedAt))}</span>
        <span className="inline-flex items-center gap-1"><Database className="h-3.5 w-3.5 text-[#A16207]" />Brand data checked {BRAND_DATA_CHECKED}</span>
      </div>
    );
  }

  const r = review.reviewer;
  const linkedIn = r.sameAs.find((u) => u.includes("linkedin.com"));
  return (
    <div className="text-[13px] leading-snug">
      {!hideUpdated && <p className="text-gray-500">Updated {fmtLong(latestUpdate(updatedAt))}</p>}
      <div className={`${hideUpdated ? "" : "mt-2.5 "}flex items-start gap-2.5`}>
        <Link href={reviewerPath(r.slug)} className="shrink-0" aria-label={`${displayName(r)} profile`}>
          <Image src={r.image} alt={displayName(r)} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        </Link>
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 whitespace-nowrap text-gray-700">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#16A34A]" aria-hidden="true" />
            <span className="sm:hidden">Vet reviewed by</span>
            <span className="hidden sm:inline">Reviewed for veterinary accuracy by</span>
            <Link href={reviewerPath(r.slug)} className="font-bold text-[#191919] underline decoration-dotted underline-offset-2 hover:text-[#A16207]">
              {displayName(r)}
            </Link>
            {linkedIn && (
              <a href={linkedIn} rel="noopener me" target="_blank" aria-label={`${displayName(r)} on LinkedIn`} className="inline-flex">
                {linkedInIcon}
              </a>
            )}
          </p>
          <p className="mt-1 whitespace-nowrap text-[12px] text-gray-500 sm:whitespace-normal sm:text-[12.5px]">
            <span className="hidden sm:inline">Reviewed </span>{fmt(review.reviewedAt)}
            <span className="hidden sm:inline">
              {" "}· Written by <Link href="/about" className="text-[#A16207] hover:underline">Dog Food Scout Research</Link>
            </span>
            {" "}· <Link href="/about#veterinary-review" className="text-[#A16207] hover:underline">How we review</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
