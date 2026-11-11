import Link from "next/link";
import { CalendarCheck, Database, ShieldCheck } from "lucide-react";
import { BRAND_DATA_CHECKED, latestUpdate } from "@/lib/config";
import { displayName, getPageReview, reviewerPath } from "@/data/reviewers";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** E-E-A-T strip: author, freshness, data-check month and (when logged) the veterinary reviewer. */
export function Byline({ path, updatedAt }: { path: string; updatedAt?: string }) {
  const review = getPageReview(path);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-gray-600">
        <span>
          By <Link href="/about" className="tap font-semibold text-[#191919] hover:text-[#A16207]">Dog Food Scout Research</Link>
        </span>
        <span className="inline-flex items-center gap-1"><CalendarCheck className="h-3.5 w-3.5 text-[#A16207]" />Updated {fmt(latestUpdate(updatedAt))}</span>
        <span className="inline-flex items-center gap-1"><Database className="h-3.5 w-3.5 text-[#A16207]" />Brand data checked {BRAND_DATA_CHECKED}</span>
      </div>
      {review ? (
        <Link
          href={reviewerPath(review.reviewer.slug)}
          className="group block w-fit shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 leading-tight shadow-sm hover:border-[#F3E3A3] sm:text-right"
          title={`Reviewed on ${fmt(review.reviewedAt)}`}
        >
          <span className="block text-[12px] text-gray-500">Veterinary Reviewed by</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[15px] font-bold text-[#191919] group-hover:text-[#A16207] sm:justify-end">
            {displayName(review.reviewer)}
            <ShieldCheck className="h-4 w-4 text-[#16A34A]" aria-label="Verified reviewer" />
          </span>
          <span className="mt-0.5 block text-[12px] text-gray-500">{review.reviewer.jobTitle}</span>
        </Link>
      ) : null}
    </div>
  );
}
