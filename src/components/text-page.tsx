import { Breadcrumbs } from "./breadcrumbs";
import { JsonLd } from "./json-ld";
import { SITE_URL } from "@/lib/config";
import { breadcrumbSchema, orgRef, WEBSITE_ID } from "@/lib/geo";

/** Simple single-column page for policies and company pages. */
export function TextPage({
  title,
  crumb,
  intro,
  children,
  path,
  schemaType = "WebPage",
}: {
  title: string;
  crumb: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  /** When set, emits WebPage-type + BreadcrumbList JSON-LD for this page. */
  path?: string;
  schemaType?: "WebPage" | "AboutPage" | "ContactPage";
}) {
  return (
    <section className="mx-auto max-w-[820px] px-4 pb-16 pt-6">
      {path && (
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": schemaType,
              name: title,
              url: `${SITE_URL}${path}`,
              isPartOf: { "@id": WEBSITE_ID },
              publisher: orgRef(),
              ...(schemaType === "AboutPage" ? { mainEntity: orgRef() } : {}),
            },
            breadcrumbSchema([{ name: "Home", path: "/" }, { name: crumb, path }]),
          ]}
        />
      )}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: crumb }]} />
      <h1 className="text-[30px] font-extrabold leading-tight text-[#191919] sm:text-[36px]">{title}</h1>
      {intro && <p className="mt-3 text-[16.5px] leading-relaxed text-gray-700">{intro}</p>}
      <div className="mt-6 space-y-4 text-[15.5px] leading-[1.75] text-gray-700 [&_h2]:mt-8 [&_h2]:text-[21px] [&_h2]:font-bold [&_h2]:text-[#191919] [&_a]:font-semibold [&_a]:text-[#A16207] [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_code]:rounded [&_code]:bg-[#FEF3C7] [&_code]:px-1">
        {children}
      </div>
    </section>
  );
}
