import { Sidebar, type SidebarBlock } from "./sidebar";

/** Main column + 340px sticky sidebar - the same 1200px grid as the homepage. */
export function PageShell({ children, blocks }: { children: React.ReactNode; blocks?: SidebarBlock[] }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-12 pt-5">
      <div className="flex items-start gap-6">
        <div className="min-w-0 flex-1">{children}</div>
        <Sidebar blocks={blocks} />
      </div>
    </section>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="mb-3 mt-10 scroll-mt-6 text-[22px] font-bold leading-tight text-[#191919] sm:text-[24px]">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[16px] leading-[1.7] text-gray-700">{children}</p>;
}

export function Callout({ tone = "info", children }: { tone?: "info" | "warn"; children: React.ReactNode }) {
  const cls = tone === "warn" ? "border-amber-300 bg-amber-50 text-amber-900" : "border-[#FDE68A] bg-[#FEFCE8] text-[#713F12]";
  return <div className={`my-4 rounded-lg border px-4 py-3 text-[14.5px] leading-relaxed ${cls}`}>{children}</div>;
}
