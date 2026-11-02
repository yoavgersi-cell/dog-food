import { Breadcrumbs } from "./breadcrumbs";

/** Simple single-column page for policies and company pages. */
export function TextPage({ title, crumb, intro, children }: { title: string; crumb: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[820px] px-4 pb-16 pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: crumb }]} />
      <h1 className="text-[30px] font-extrabold leading-tight text-[#191919] sm:text-[36px]">{title}</h1>
      {intro && <p className="mt-3 text-[16.5px] leading-relaxed text-gray-700">{intro}</p>}
      <div className="mt-6 space-y-4 text-[15.5px] leading-[1.75] text-gray-700 [&_h2]:mt-8 [&_h2]:text-[21px] [&_h2]:font-bold [&_h2]:text-[#191919] [&_a]:font-semibold [&_a]:text-[#A16207] [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_code]:rounded [&_code]:bg-[#FEF3C7] [&_code]:px-1">
        {children}
      </div>
    </section>
  );
}
