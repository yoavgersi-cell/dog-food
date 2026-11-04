"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { TrustpilotData, TrustpilotReview } from "@/lib/dogfood/brands";

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const TP_GREEN = "#00B67A";

/** Trustpilot-style star row; partial fill for the last star (e.g. 4.7). */
function ScoreStars({ score, size = 22 }: { score: number; size?: number }) {
  return (
    <span className="inline-flex gap-[3px]" role="img" aria-label={`TrustScore ${score} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, score - i));
        return (
          <span
            key={i}
            className="flex items-center justify-center"
            style={{ width: size, height: size, background: `linear-gradient(90deg, ${TP_GREEN} ${fill * 100}%, #DCDCE6 ${fill * 100}%)` }}
          >
            <Star className="fill-white text-white" style={{ width: size * 0.68, height: size * 0.68 }} strokeWidth={0} />
          </span>
        );
      })}
    </span>
  );
}

function TrustpilotWordmark() {
  return (
    <span className="inline-flex items-center gap-1 font-bold text-[#191919]">
      <Star className="h-5 w-5" style={{ fill: TP_GREEN, color: TP_GREEN }} strokeWidth={0} aria-hidden />
      Trustpilot
    </span>
  );
}

type SortKey = "highest" | "newest" | "lowest" | "oldest" | "issues";
const RATED_SORTS: { key: SortKey; label: string }[] = [
  { key: "highest", label: "Highest rated" },
  { key: "newest", label: "Newest" },
  { key: "lowest", label: "Lowest rated" },
];
const UNRATED_SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "issues", label: "Complaints first" },
];

function sortReviews(reviews: TrustpilotReview[], key: SortKey) {
  const byDate = (a: TrustpilotReview, b: TrustpilotReview) => b.date.localeCompare(a.date);
  const list = [...reviews];
  if (key === "newest") return list.sort(byDate);
  if (key === "oldest") return list.sort((a, b) => -byDate(a, b));
  if (key === "highest") return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || byDate(a, b));
  if (key === "lowest") return list.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0) || byDate(a, b));
  return list.sort((a, b) => Number(!!b.issue) - Number(!!a.issue) || byDate(a, b));
}

function ReviewCard({ r }: { r: TrustpilotReview }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > 220;
  return (
    <li className="flex snap-start flex-col rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between gap-2">
        {r.rating ? (
          <ScoreStars score={r.rating} size={18} />
        ) : r.issue ? (
          <span className="rounded-full bg-[#FEF2F2] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#B91C1C]">Reported a problem</span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gray-500">
            <Star className="h-3.5 w-3.5" style={{ fill: TP_GREEN, color: TP_GREEN }} strokeWidth={0} aria-hidden />
            Trustpilot review
          </span>
        )}
        <time dateTime={r.date} className="shrink-0 text-[13px] text-gray-500">{fmtDate(r.date)}</time>
      </div>
      <p className="mt-2.5 line-clamp-2 text-[15px] font-bold sm:mt-3 sm:text-[15.5px] leading-snug text-[#191919]" title={r.title}>{r.title}</p>
      {r.text && (
        <blockquote className={`mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-gray-700 sm:text-[14.5px] ${open ? "" : "line-clamp-6 sm:line-clamp-5"}`}>
          &ldquo;{r.text}&rdquo;
        </blockquote>
      )}
      {long && (
        <button type="button" onClick={() => setOpen((v) => !v)} className="mt-1 self-start text-[13px] font-semibold text-[#A16207] hover:underline">
          {open ? "Show less" : "Read full review"}
        </button>
      )}
      <div className="mt-auto flex items-center gap-3 pt-4 sm:pt-5">
        <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[14px] sm:h-10 sm:w-10 font-bold text-[#92400E]">
          {r.name.charAt(0).toUpperCase()}
        </span>
        <span className="leading-tight">
          <span className="block text-[14.5px] font-semibold text-[#191919]">{r.name}</span>
          {r.country && <span className="block text-[13px] text-gray-500">{r.country}</span>}
        </span>
      </div>
    </li>
  );
}

/** Real Trustpilot data only: headline score from the brand's public profile plus every review we captured, verbatim. */
export function TrustpilotBlock({ brandName, logo, data }: { brandName: string; logo?: string; data: TrustpilotData }) {
  const rated = data.reviews.length > 0 && data.reviews.every((r) => r.rating);
  const SORTS = rated ? RATED_SORTS : UNRATED_SORTS;
  const [sort, setSort] = useState<SortKey>(rated ? "highest" : "newest");
  const reviews = useMemo(() => sortReviews(data.reviews, sort), [data.reviews, sort]);
  const issues = rated ? data.reviews.filter((r) => (r.rating ?? 5) <= 2).length : data.reviews.filter((r) => r.issue).length;
  const count = data.reviewCount ? data.reviewCount.toLocaleString("en-US") : data.reviewCountLabel;

  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(1);

  /** Step = one card + gap; a "page" is however many cards fit in view. */
  const geometry = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first || el.clientWidth < 1 || first.offsetWidth < 1) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first.offsetWidth + gap;
    const per = Math.max(1, Math.floor((el.clientWidth - parseFloat(getComputedStyle(el).paddingLeft) * 2 + gap) / step));
    return { el, step, per };
  };

  const measure = useCallback(() => {
    const g = geometry();
    if (!g) return;
    setPerView(g.per);
    setPages(Math.max(1, Math.ceil(g.el.childElementCount / g.per)));
    setPage(Math.round(g.el.scrollLeft / (g.step * g.per)));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // Fires once on observe (initial measure) and on every resize.
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, reviews]);

  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
  }, [sort]);

  const go = (p: number) => {
    const g = geometry();
    if (!g) return;
    g.el.scrollTo({ left: Math.max(0, Math.min(pages - 1, p)) * g.per * g.step, behavior: "smooth" });
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#F3E3A3] bg-[#FFFDF5] p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[16px] sm:gap-x-3 sm:text-[19px]">
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={brandName} className="h-6 w-auto max-w-[96px] object-contain sm:h-7 sm:max-w-[110px]" />
          )}
          <span className="font-bold text-[#191919]">
            <span className={logo ? "max-sm:hidden" : ""}>{brandName} </span><span className="font-normal text-gray-600">reviews on</span>
          </span>
          <TrustpilotWordmark />
        </div>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:gap-x-3">
          <span className="text-[22px] font-extrabold leading-none text-[#191919]">{data.rating.toFixed(1)}</span>
          <ScoreStars score={data.rating} />
          {count && <span className="text-[13.5px] text-gray-600 sm:text-[14px]">({count} reviews)</span>}
          <a href={data.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-0.5 text-[13.5px] font-semibold text-[#A16207] max-sm:basis-full sm:text-[14px] underline-offset-2 hover:underline">
            See all on Trustpilot <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>

      {/* Score facts (only what the profile shows) */}
      {(data.breakdown || data.negativeReplyRate !== undefined) && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-700 sm:gap-x-5 sm:text-[13.5px]">
          {data.breakdown && (
            <>
              <li><strong className="text-[#191919]">{data.breakdown[0]}%</strong> 5-star</li>
              <li><strong className="text-[#191919]">{data.breakdown[1]}%</strong> 4-star</li>
              <li><strong className="text-[#191919]">{data.breakdown[3] + data.breakdown[4]}%</strong> 1–2 star</li>
            </>
          )}
          {data.negativeReplyRate !== undefined && (
            <li>Replies to <strong className="text-[#191919]">{data.negativeReplyRate}%</strong> of negative reviews</li>
          )}
        </ul>
      )}

      {reviews.length > 0 ? (
        <>
          {/* Caption + sort */}
          <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-[13.5px] text-gray-600 sm:text-[14px]">
              All {reviews.length} reviews we captured, including every {rated ? "1- and 2-star one" : "complaint"}{issues ? ` (${issues})` : ""}.
            </p>
            <div className="grid grid-cols-3 gap-1 rounded-full border border-gray-200 bg-white p-1 sm:flex sm:items-center sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0" role="group" aria-label="Sort reviews">
              <span className="hidden text-[12px] font-semibold uppercase tracking-wider text-gray-500 sm:inline">Sort</span>
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={sort === s.key}
                  onClick={() => setSort(s.key)}
                  className={`whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-semibold transition-colors sm:border sm:px-3.5 sm:py-1.5 sm:text-[13.5px] ${
                    sort === s.key ? "bg-[#7C4A1E] text-white sm:border-[#7C4A1E]" : "text-gray-700 sm:border-gray-200 sm:bg-white sm:hover:border-gray-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel: all reviews are in the HTML; the track scrolls horizontally. */}
          <ul
            ref={track}
            onScroll={measure}
            className="-mx-4 mt-4 grid snap-x snap-mandatory scroll-px-4 auto-cols-[84%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0 [scrollbar-width:none] sm:auto-cols-[calc((100%-1rem)/2)] xl:auto-cols-[calc((100%-2rem)/3)] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <ReviewCard key={`${r.name}-${r.date}-${r.title}`} r={r} />
            ))}
          </ul>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-center gap-3 sm:mt-4">
            <button type="button" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous reviews" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-40">
              <ChevronLeft className="h-5 w-5" />
            </button>
            {pages <= 20 ? (
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to page ${i + 1} of ${pages}`}
                    aria-current={i === page}
                    className={`h-2 rounded-full transition-all ${i === page ? "w-6 bg-[#7C4A1E]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex w-full max-w-[420px] flex-col items-center gap-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200" aria-hidden>
                  <div className="h-full rounded-full bg-[#7C4A1E] transition-all" style={{ width: `${((page + 1) / pages) * 100}%` }} />
                </div>
                <span className="text-[12.5px] tabular-nums text-gray-500" aria-live="polite">
                  {perView > 1 ? `${Math.min(page * perView + 1, reviews.length)}–${Math.min((page + 1) * perView, reviews.length)}` : page + 1} of {reviews.length}
                </span>
              </div>
            )}
            <button type="button" onClick={() => go(page + 1)} disabled={page >= pages - 1} aria-label="Next reviews" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-40">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <p className="mt-4 text-[14px] text-gray-600">
          We&apos;ve captured {brandName}&apos;s headline TrustScore only; individual reviews will be added here once we&apos;ve read them.
        </p>
      )}

      <p className="mt-4 border-t border-[#F3E3A3] pt-3 text-[12px] sm:mt-5 sm:pt-4 sm:text-[12.5px] leading-relaxed text-gray-500">
        Captured {fmtDate(data.checked)} from {brandName}&apos;s public Trustpilot profile. Reviews are individual experiences quoted verbatim, star ratings as given, names shortened.
        {!rated && <> &ldquo;Reported a problem&rdquo; is our label, not a Trustpilot rating.</>} Trustpilot is a trademark of Trustpilot A/S and is not affiliated with this site.
      </p>
    </div>
  );
}
