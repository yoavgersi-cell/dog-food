"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal scroller for server-rendered product cards (passed as <li> children),
 * so the cards themselves stay in the HTML for crawlers and AI tools.
 * Arrows only appear when the row overflows.
 */
export function ProductRail({ label, children }: { label: string; children: React.ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ overflow: false, atStart: true, atEnd: false, progress: 0 });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el || el.clientWidth < 1) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({ overflow: max > 4, atStart: el.scrollLeft < 4, atEnd: el.scrollLeft > max - 4, progress: max > 0 ? el.scrollLeft / max : 0 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const per = Math.max(1, Math.floor(el.clientWidth / card.offsetWidth));
    el.scrollBy({ left: dir * per * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={track}
        onScroll={measure}
        aria-label={label}
        className="-mx-4 grid snap-x snap-mandatory scroll-px-4 auto-cols-[74%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] min-[480px]:auto-cols-[220px] sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      {state.overflow && (
        <div className="mt-3 flex items-center gap-3">
          <button type="button" onClick={() => step(-1)} disabled={state.atStart} aria-label={`Previous ${label}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-40">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200" aria-hidden>
            <div className="h-full rounded-full bg-[#7C4A1E] transition-all" style={{ width: `${Math.max(12, state.progress * 100)}%` }} />
          </div>
          <button type="button" onClick={() => step(1)} disabled={state.atEnd} aria-label={`Next ${label}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-40">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
