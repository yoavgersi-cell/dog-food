import { Star } from "lucide-react";
import type { TrustpilotData } from "@/lib/dogfood/brands";

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`flex h-5 w-5 items-center justify-center ${i < Math.round(n) ? "bg-[#00B67A]" : "bg-gray-300"}`}>
          <Star className="h-3.5 w-3.5 fill-white text-white" strokeWidth={0} />
        </span>
      ))}
    </span>
  );
}

/** Real Trustpilot data only (captured from the brand's public profile, with the capture date). */
export function TrustpilotBlock({ brandName, data }: { brandName: string; data: TrustpilotData }) {
  return (
    <div className="rounded-xl border border-[#F3E3A3] bg-white p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[28px] font-extrabold text-[#191919]">{data.rating.toFixed(1)}</span>
        <Stars n={data.rating} />
        <span className="text-[14px] text-gray-600">
          TrustScore from {data.reviewCount.toLocaleString("en-US")} reviews ·{" "}
          <a href={data.url} rel="noopener nofollow" className="font-semibold text-[#A16207] hover:underline">{brandName} on Trustpilot</a>
        </span>
      </div>
      <p className="mt-1 text-[12px] text-gray-500">Captured {fmtDate(data.checked)}. Reviews quoted verbatim, including critical ones.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {data.reviews.map((r) => (
          <li key={r.title + r.date} className="rounded-lg border border-gray-100 bg-[#FEFCE8] p-4">
            <Stars n={r.rating} />
            <p className="mt-2 text-[14.5px] font-bold text-[#191919]">{r.title}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-700">{r.text}</p>
            <p className="mt-2 text-[12.5px] text-gray-500">{r.name} · {fmtDate(r.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
