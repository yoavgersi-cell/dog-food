import Image from "next/image";
import { Truck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ProductRail } from "@/components/product-rail";
import { ProviderCta } from "@/components/provider-cta";
import { getBrand } from "@/lib/dogfood/brands";
import { PRODUCT_TYPES, fmtPrice, groupByType, type ProductListing } from "@/lib/dogfood/products";
import { SITE_URL } from "@/lib/config";

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function sellerLine(p: ProductListing) {
  if (p.sellerKind === "marketplace") return `Sold by a ${p.seller.replace(/ seller$/, "")} seller`;
  return `Sold by ${p.seller}`;
}

function ProductCard({ p, showBrand, pageType }: { p: ProductListing; showBrand: boolean; pageType: "listing" | "review" }) {
  const brand = getBrand(p.brand);
  if (!brand) return null;
  return (
    <li className="flex snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="relative aspect-square bg-[#F6F5F1]">
        <Image src={p.image} alt={`${brand.name} ${p.name}`} fill sizes="(max-width: 480px) 70vw, 220px" className="object-contain p-2" />
        {p.format && <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[12px] font-semibold text-[#7C4A1E] shadow-sm">{p.format}</span>}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        {showBrand && <p className="text-[12px] font-bold uppercase tracking-wide text-gray-500">{brand.name}</p>}
        <h4 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-[#191919]" title={p.name}>{p.name}</h4>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-[20px] font-extrabold text-[#191919]">{fmtPrice(p.price)}</span>
          {p.listPrice && <s className="text-[13.5px] text-gray-500">{fmtPrice(p.listPrice)}</s>}
          {p.unitPrice && <span className="text-[13px] text-gray-500">{p.unitPrice}</span>}
        </p>
        {p.size && <p className="mt-0.5 text-[13px] text-gray-600">{p.size}</p>}
        <p className="mt-1.5 text-[13px] leading-snug text-gray-600">{sellerLine(p)}</p>
        {p.freeShipping && (
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[#15803D]">
            <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden /> Free shipping
          </p>
        )}
        {p.note && <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-snug text-gray-500">{p.note}</p>}
        <div className="mt-auto pt-3">
          <ProviderCta
            href={brand.affiliateUrl}
            providerName={brand.name}
            providerSlug={brand.slug}
            pageType={pageType}
            sourceFlow={pageType === "review" ? "provider_review" : "main_comparison"}
            className="flex h-10 w-full items-center justify-center rounded-lg border border-[#A16207] text-[14px] font-bold text-[#A16207] transition-colors hover:bg-[#A16207] hover:text-white"
          >
            Shop {brand.name}
          </ProviderCta>
        </div>
      </div>
    </li>
  );
}

/** schema.org ItemList of Products with Offers. No ratings: listing ratings belong to retailers, not to us. */
function shelfSchema(name: string, path: string, items: ProductListing[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${path}#products`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => {
      const brand = getBrand(p.brand)!;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: `${brand.name} ${p.name}`,
          image: `${SITE_URL}${p.image}`,
          brand: { "@type": "Brand", name: brand.name },
          category: `Pet Supplies > Dog Food > ${PRODUCT_TYPES[p.type].label}`,
          description: [p.format, p.size, p.note].filter(Boolean).join(". ") || PRODUCT_TYPES[p.type].blurb,
          offers: {
            "@type": "Offer",
            price: p.price.toFixed(2),
            priceCurrency: "USD",
            seller: { "@type": "Organization", name: p.seller },
            ...(p.sellerKind === "brand" ? { url: brand.officialSite } : {}),
          },
        },
      };
    }),
  };
}

/** Product carousels, one per product type. Server-rendered; only the scroll controls run in the browser. */
export function ProductShelf({
  products,
  path,
  name,
  showBrand = false,
  pageType = "review",
}: {
  products: ProductListing[];
  path: string;
  name: string;
  showBrand?: boolean;
  pageType?: "listing" | "review";
}) {
  if (products.length === 0) return null;
  const groups = groupByType(products);
  const checked = products.map((p) => p.checked).sort().at(-1)!;
  return (
    <div className="space-y-7">
      <JsonLd data={shelfSchema(name, path, products)} />
      {groups.map((g) => (
        <section key={g.type} aria-labelledby={`products-${g.type}`}>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 id={`products-${g.type}`} className="text-[18px] font-bold text-[#191919]">
              {g.label} <span className="text-[14px] font-semibold text-gray-500">({g.items.length})</span>
            </h3>
            <p className="text-[13.5px] text-gray-600">{g.blurb}</p>
          </div>
          <ProductRail label={g.label.toLowerCase()}>
            {g.items.map((p) => (
              <ProductCard key={p.id} p={p} showBrand={showBrand} pageType={pageType} />
            ))}
          </ProductRail>
        </section>
      ))}
      <p className="text-[12.5px] leading-relaxed text-gray-500">
        Prices as listed on Google Shopping on {fmtDate(checked)}, from the brand and from retailers; they change often and may include sale or introductory pricing.
        Subscription plans are priced to your dog, so check the brand&apos;s own quote before you buy. We may earn a commission from brand links.
      </p>
    </div>
  );
}
