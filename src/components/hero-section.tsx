import Image from "next/image";
import { cn } from "@/lib/utils";
import { BowlIcon, FreshIcon, RubricIcon, ScaleIcon } from "./hero-icons";

interface HeroSectionProps {
  backgroundImageUrl: string;
  imageAlt: string;
  updatedLabel?: string;
  h1: string;
  h2?: string;
  description?: string;
  overlayOpacity?: number;
  textAlign?: "left" | "center";
  maxTextWidth?: string;
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
}: HeroSectionProps) {
  return (
    <section className="relative w-full py-5 sm:py-0 sm:min-h-[260px] lg:min-h-[290px] overflow-hidden bg-[#FFFBEB] border-b border-[#FEF3C7]">
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
          "relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-4 py-4 sm:px-10 sm:py-8 lg:px-16 lg:py-12",
          textAlign === "center" && "items-center text-center"
        )}
      >
        <div className="max-w-[640px] lg:max-w-[1040px]" style={{ maxWidth: maxTextWidth !== "640px" ? maxTextWidth : undefined }}>
          {updatedLabel && (
            <span className="mb-2.5 sm:mb-3 inline-flex items-center gap-1.5 text-[13px] text-gray-600">
              <svg className="h-4 w-4 text-[#A16207]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              {updatedLabel}
            </span>
          )}

          <h1 className="text-[22px] sm:text-[28px] lg:text-[30px] leading-[1.12] font-extrabold text-[#191919] lg:whitespace-nowrap">
            {h1}
          </h1>

          {h2 && (
            <h2 className="mt-2 hidden sm:block text-[24px] lg:text-[26px] leading-[1.25] font-semibold text-[#A16207]">
              {h2}
            </h2>
          )}

          {description && (
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-[16px] leading-[1.5] sm:leading-[1.6] text-gray-600 max-w-[520px]">
              {description}
            </p>
          )}

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
            {[
              { label: "7 Fresh & Raw Brands", icon: FreshIcon },
              { label: "Dry-Matter Nutrition Data", icon: BowlIcon },
              { label: "Cost per Day by Weight", icon: ScaleIcon },
              { label: "Open Scoring Rubric", icon: RubricIcon },
            ].map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2 text-[13px] font-medium leading-tight text-[#3B2A10] sm:gap-2.5 sm:text-[15px] lg:whitespace-nowrap">
                <Icon className="h-7 w-7 shrink-0 text-[#5C3B0E] sm:h-8 sm:w-8" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
