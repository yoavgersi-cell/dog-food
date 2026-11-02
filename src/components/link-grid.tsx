import Link from "next/link";

export interface LinkItem {
  href: string;
  label: string;
  note?: string;
}

/** Contextual internal-link block ("Keep exploring"). Plain <a> links, server-rendered. */
export function LinkGrid({ title, items, columns = 2 }: { title: string; items: LinkItem[]; columns?: 2 | 3 }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-[20px] font-bold text-[#191919]">{title}</h2>
      <ul className={`grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="block rounded-lg border border-[#F3E3A3] bg-white px-3.5 py-2.5 transition-colors hover:border-[#EAB308] hover:bg-[#FEFCE8]">
              <span className="text-[14px] font-semibold text-[#191919]">{it.label}</span>
              {it.note && <span className="mt-0.5 block text-[12.5px] text-gray-500">{it.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
