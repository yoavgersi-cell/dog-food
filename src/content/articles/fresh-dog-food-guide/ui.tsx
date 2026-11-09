import Link from "next/link";

export const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
export const usd = (n: number) => `$${n.toFixed(2)}`;

export const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-semibold text-[#A16207] hover:underline">{children}</Link>
);
export const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} rel="noopener" className="font-semibold text-[#A16207] hover:underline">{children}</a>
);

export function Table({ caption, head, rows, note }: { caption: string; head: string[]; rows: React.ReactNode[][]; note?: React.ReactNode }) {
  return (
    <div className="my-5">
      <div className="overflow-x-auto rounded-xl border border-[#F3E3A3] bg-white">
        <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[#FEF3C7] text-[12px] uppercase tracking-wide text-[#713F12]">
            <tr>{head.map((h) => <th key={h} scope="col" className="px-3 py-2.5 font-bold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-[#FEF3C7] align-top">
                {r.map((c, j) =>
                  j === 0 ? <th key={j} scope="row" className="px-3 py-2.5 font-semibold text-[#191919]">{c}</th> : <td key={j} className="px-3 py-2.5 text-gray-700">{c}</td>,
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{note}</p>}
    </div>
  );
}

export function List({ items, ordered = false }: { items: React.ReactNode[]; ordered?: boolean }) {
  const cls = `mb-4 ${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5 text-[16px] leading-[1.7] text-gray-700`;
  const children = items.map((it, i) => <li key={i}>{it}</li>);
  return ordered ? <ol className={cls}>{children}</ol> : <ul className={cls}>{children}</ul>;
}

/** Part heading used to group the guide into chapters (H2s stay the question headings). */
export function Part({ id, n, title }: { id: string; n: number; title: string }) {
  return (
    <p id={id} className="mb-1 mt-12 scroll-mt-24 text-[12px] font-bold uppercase tracking-[0.12em] text-[#A16207]">
      Part {n} · {title}
    </p>
  );
}

// Every source below was opened and read during research for this guide or for
// the articles it summarises (Nov 2-9, 2026).
export const SRC = {
  fdaRawStudy: "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet",
  fdaH5n1: "https://www.fda.gov/animal-veterinary/cvm-updates/cat-and-dog-food-manufacturers-required-consider-h5n1-food-safety-plans",
  fdaDcm: "https://www.fda.gov/animal-veterinary/outbreaks-and-advisories/fda-investigation-potential-link-between-certain-diets-and-canine-dilated-cardiomyopathy",
  fdaDcmQa: "https://www.fda.gov/animal-veterinary/animal-health-literacy/questions-answers-fdas-work-potential-causes-non-hereditary-dcm-dogs",
  avmaRaw: "https://www.avma.org/resources-tools/avma-policies/raw-or-undercooked-animal-source-protein-cat-and-dog-diets",
  wsavaRaw: "https://wsava.org/wp-content/uploads/2021/04/Raw-Meat-Based-Diets-for-Pets_WSAVA-Global-Nutrition-Toolkit.pdf",
  wsavaSelect: "https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf",
  wsavaFaq: "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf",
  aaha: "https://www.aaha.org/wp-content/uploads/globalassets/05-pet-health-resources/nutritionalresources/petparent/aaha-tips-and-timelines.pdf",
  lin2022: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9341101/",
  illinois2021: "https://www.eurekalert.org/news-releases/786753",
  illinois2021Funding: "https://www.veterinarypracticenews.com/human-grade-dog-chow-might-aid-digestion/",
  algya2018: "https://experts.illinois.edu/en/publications/apparent-total-tract-macronutrient-digestibility-of-mildly-cooked/",
  tran2008: "https://edepot.wur.nl/121964",
  finley2007: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1716752/",
  vanBree2018: "https://pubmed.ncbi.nlm.nih.gov/29326391/",
  apop2022: "https://petobesityprevention.org/2022",
  petfulCost: "https://www.petful.com/food/the-farmers-dog-cost/",
  vohc: "https://vohc.org/",
  wsavaBcs: "https://wsava.org/wp-content/uploads/2025/06/WSAVA_BCSCat_BCSDog_Nutrition_250612.pdf",
} as const;
