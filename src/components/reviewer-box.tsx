import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { displayName, getPageReview, reviewerPath } from "@/data/reviewers";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** End-of-page reviewer bio; renders only when the page is in REVIEW_LOG. */
export function ReviewerBox({ path }: { path: string }) {
  const review = getPageReview(path);
  if (!review) return null;
  const r = review.reviewer;
  return (
    <section aria-label="Veterinary review" className="mt-10 rounded-xl border border-[#F3E3A3] bg-white p-5">
      <div className="flex items-start gap-4">
        <Image src={r.image} alt={`${displayName(r)}, ${r.jobTitle}`} width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#A16207]">Veterinary reviewed</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[16px] font-bold text-[#191919]">
            <Link href={reviewerPath(r.slug)} className="hover:text-[#A16207]">{displayName(r)}</Link>
            <ShieldCheck className="h-4 w-4 text-[#16A34A]" aria-hidden="true" />
          </p>
          <p className="text-[13px] text-gray-500">{r.jobTitle} · Reviewed {fmt(review.reviewedAt)}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-700">{r.shortBio}</p>
          <Link href={reviewerPath(r.slug)} className="mt-2 inline-block text-[14px] font-semibold text-[#A16207] hover:underline">Read full profile</Link>
        </div>
      </div>
    </section>
  );
}
