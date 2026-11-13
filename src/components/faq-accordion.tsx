import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ list built on <details>: every answer is in the server HTML (crawlers and
 * AI engines read it; the FAQPage JSON-LD matches it 1:1) and it works without JS.
 */
export function FaqAccordion({ items, title = "FAQs", bare = false }: { items: FaqItem[]; title?: string; bare?: boolean }) {
  const list = (
    <>
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">{title}</h2>
      <div className="divide-y divide-[#F3E3A3] rounded-xl border border-[#F3E3A3] bg-white">
        {items.map((item) => (
          <details key={item.question} className="group px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold text-[#191919] transition-colors hover:text-[#A16207] [&::-webkit-details-marker]:hidden">
              <h3 className="text-[16px] font-semibold">{item.question}</h3>
              <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" strokeWidth={1.5} />
            </summary>
            <p className="pb-5 text-[15.5px] leading-[1.7] text-gray-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
  if (bare) return <section className="mt-10">{list}</section>;
  return <section className="mx-auto max-w-[1200px] px-4 py-12">{list}</section>;
}
