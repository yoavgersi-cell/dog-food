import { Zap } from "lucide-react";

export interface QuickAnswerRow {
  label: string;
  value: string;
  href?: string;
}

/**
 * Direct-Answer Block - the AEO extraction target. One question-shaped
 * heading, a 40-60 word answer that stands alone when quoted, then a compact
 * label/value table. Always rendered server-side near the top of the page.
 */
export function QuickAnswer({ question, answer, rows }: { question: string; answer: string; rows?: QuickAnswerRow[] }) {
  return (
    <section aria-labelledby="quick-answer" className="rounded-xl border border-[#FDE68A] border-l-4 border-l-[#EAB308] bg-white p-5 shadow-sm">
      <p className="mb-1 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-[#A16207]">
        <Zap className="h-3.5 w-3.5" strokeWidth={2.25} /> Quick answer
      </p>
      <h2 id="quick-answer" className="text-[18px] font-bold leading-snug text-[#191919]">{question}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-gray-700" data-speakable="true">{answer}</p>
      {rows && rows.length > 0 && (
        <table className="mt-4 w-full text-left text-[14px]">
          <tbody className="divide-y divide-[#FEF3C7]">
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="w-[45%] py-2 pr-3 font-semibold text-gray-600">{r.label}</th>
                <td className="py-2 font-bold text-[#191919]">
                  {r.href ? <a href={r.href} className="text-[#A16207] hover:underline">{r.value}</a> : r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
