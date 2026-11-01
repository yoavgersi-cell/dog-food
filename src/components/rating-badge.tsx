import { Star, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  label: string;
  starRating?: number;
  className?: string;
}

export function RatingBadge({ rating, label, starRating, className }: RatingBadgeProps) {
  const stars = starRating ?? (rating / 2);
  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 >= 0.5;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center gap-1.5">
        <span className="text-[32px] font-extrabold leading-none text-[#191919]">{rating.toFixed(1)}</span>
        <div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-[14px] w-[14px]",
                  i < fullStars
                    ? "fill-[#FDB515] text-[#FDB515]"
                    : i === fullStars && hasHalf
                      ? "fill-[#FDB515]/50 text-[#FDB515]"
                      : "fill-gray-300 text-gray-300"
                )}
                strokeWidth={0}
              />
            ))}
          </div>
          <div className="mt-0.5 flex items-center gap-0.5">
            <span className="text-[11px] font-semibold text-gray-600">{label}</span>
            <ChevronDown className="h-3 w-3 text-gray-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
