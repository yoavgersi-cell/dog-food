import Link from "next/link";
import { CalendarCheck, Database, Stethoscope } from "lucide-react";
import { BRAND_DATA_CHECKED, latestUpdate } from "@/lib/config";
import { getPageReview } from "@/data/reviewers";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** E-E-A-T strip: author, freshness, data-check month and vet-review status. */
export function Byline({ path, updatedAt }: { path: string; updatedAt?: string }) {
  const review = getPageReview(path);
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-gray-600">
      <span>
        By <Link href="/about" className="tap font-semibold text-[#191919] hover:text-[#A16207]">Dog Food Scout Research</Link>
      </span>
      <span className="inline-flex items-center gap-1"><CalendarCheck className="h-3.5 w-3.5 text-[#A16207]" />Updated {fmt(latestUpdate(updatedAt))}</span>
      <span className="inline-flex items-center gap-1"><Database className="h-3.5 w-3.5 text-[#A16207]" />Brand data checked {BRAND_DATA_CHECKED}</span>
      {review ? (
        <span className="inline-flex items-center gap-1">
          <Stethoscope className="h-3.5 w-3.5 text-[#A16207]" />
          Reviewed by {review.reviewer.name}, {review.reviewer.credentials} ({fmt(review.reviewedAt)})
        </span>
      ) : null}
    </div>
  );
}
