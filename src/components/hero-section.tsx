import Image from "next/image";
import { cn } from "@/lib/utils";
import { BowlIcon, ChefHatIcon, FreshIcon } from "./hero-icons";

interface HeroSectionProps {
  backgroundImageUrl: string;
  imageAlt: string;
  updatedLabel?: string;
  h1: React.ReactNode;
  h2?: string;
  description?: React.ReactNode;
  overlayOpacity?: number;
  textAlign?: "left" | "center";
  maxTextWidth?: string;
  /** Full-height backdrop photo bleeding in from the screen's right edge (desktop). */
  sideImage?: { src: string; alt: string; width: number; height: number };
}

export function HeroSection({
  backgroundImageUrl,
  imageAlt,
  updatedLabel,
  h1,
  h2,
  description,
  textAlign = "left",
  maxTextWidth = "640px",
  sideImage,
}: HeroSectionProps) {
  return (
    <section className={cn("relative w-full overflow-hidden bg-[#FFFBEB] pb-2 pt-6 sm:pt-9", sideImage && "lg:min-h-[440px] lg:pb-6")}>
      {/* Backdrop photo (desktop): anchored to the viewport's right edge, full hero
          height. A sharp copy on the right fades into a blurred copy toward the
          text, and a cream wash keeps the headline readable over it. */}
      {sideImage && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[64%] lg:block"
          style={{ maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)" }}
        >
          <div
            className="absolute inset-0"
            style={{ filter: "blur(14px)", maskImage: "linear-gradient(to right, transparent 0%, #000 30%, #000 55%, transparent 80%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 30%, #000 55%, transparent 80%)" }}
          >
            <Image src={sideImage.src} alt="" fill sizes="64vw" className="scale-105 object-cover object-[right_30%]" />
          </div>
          <div
            className="absolute inset-0"
            style={{ maskImage: "linear-gradient(to right, transparent 25%, #000 60%)", WebkitMaskImage: "linear-gradient(to right, transparent 25%, #000 60%)" }}
          >
            <Image src={sideImage.src} alt={sideImage.alt} fill priority sizes="64vw" className="object-cover object-[right_30%]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBEB] via-[#FFFBEB]/55 via-30% to-transparent to-60%" />
        </div>
      )}
      {/* Hero image positioned on the right (omitted when no image is set) */}
      {backgroundImageUrl && (
        <div className="absolute right-[380px] top-0 h-full w-[50%] hidden sm:block">
          <Image
            src={backgroundImageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-contain object-right-top"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          "relative mx-auto flex h-full max-w-[1200px] flex-col justify-center px-4",
          textAlign === "center" && "items-center text-center"
        )}
      >
        <div
          className={cn("relative z-10 max-w-[640px]", sideImage ? "lg:max-w-[640px] lg:py-6 xl:max-w-[700px]" : "lg:max-w-[1040px]")}
          style={{ maxWidth: maxTextWidth !== "640px" ? maxTextWidth : undefined }}
        >
          {updatedLabel && (
            <span className="mb-2.5 sm:mb-3 inline-flex items-center gap-1.5 text-[13px] text-gray-600">
              <svg className="h-4 w-4 text-[#A16207]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              {updatedLabel}
            </span>
          )}

          <h1 className="text-[24px] sm:text-[32px] lg:text-[36px] leading-[1.15] font-extrabold tracking-tight text-[#191919]">
            {h1}
          </h1>

          {h2 && (
            <p className="mt-1.5 hidden sm:block sm:text-[24px] leading-[1.25] font-bold text-[#191919]">
              {h2}
            </p>
          )}

          {description && (
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-gray-700 max-w-[760px]">
              {description}
            </p>
          )}

          <ul className="mt-4 flex flex-row flex-nowrap items-center gap-x-4 sm:mt-5 sm:flex-wrap sm:gap-x-8 sm:gap-y-3 lg:gap-x-5 xl:gap-x-8">
            {[
              { label: "Fresh Ingredients", icon: FreshIcon },
              { label: "Human-Grade Quality", icon: ChefHatIcon },
              // Desktop only - mobile keeps a single row of two.
              { label: "Gentle on Digestion", icon: BowlIcon, desktopOnly: true },
            ].map(({ label, icon: Icon, desktopOnly }) => (
              <li key={label} className={`${desktopOnly ? "hidden sm:flex" : "flex"} whitespace-nowrap items-center gap-1.5 text-[13px] font-medium leading-tight text-[#3B2A10] sm:gap-2.5 sm:text-[15px]`}>
                <Icon className="h-6 w-6 shrink-0 text-[#5C3B0E] sm:h-8 sm:w-8" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
