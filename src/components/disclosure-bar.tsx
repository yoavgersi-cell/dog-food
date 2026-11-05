"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { DISCLOSURE_TEXT } from "@/lib/config";

export function DisclosureBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-1.5 sm:py-2 text-center text-[12px] sm:text-[13px] leading-tight sm:leading-normal text-gray-600">
        <span className="sm:hidden">We may earn a commission from links on this site. It never changes our scores.</span>
        <span className="max-sm:hidden">{DISCLOSURE_TEXT}</span>{" "}
        <button
          onClick={() => setIsOpen(true)}
          className="-my-1.5 inline-block py-1.5 font-bold text-[#191919] underline underline-offset-2 hover:text-[#A16207]"
        >
          Advertising Disclosure
        </button>
      </div>

      {/* Popup overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setIsOpen(false)}>
          <div
            className="relative mx-4 max-h-[80vh] w-full max-w-[600px] overflow-y-auto rounded-lg bg-white p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <h2 className="mb-5 text-[20px] font-bold text-[#191919]">Advertising Disclosure</h2>

            <div className="space-y-4 text-[14px] leading-[1.7] text-gray-600">
              <p>
                Dog Food Scout is an independent research site that compares fresh, raw and premium dog food brands using published nutrition data, our own cost-per-day calculations and a scoring rubric we publish in full.
              </p>
              <p>
                Some brands featured here may pay us a commission when you buy through our links. That never changes a score: scores are set from the rubric before any commercial terms, and a brand with a lower score is never placed above one with a higher score.
              </p>
              <p>
                Offers, prices and formulas change. We re-check brand data monthly and show &quot;Verifying&quot; wherever a number has not yet been confirmed against the brand&apos;s own published information.
              </p>
              <p>
                Brand names, trademarks and logos belong to their owners. Their appearance here does not imply endorsement. Content is general information, not veterinary advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
