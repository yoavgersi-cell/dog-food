import { Clock } from "lucide-react";

// Subtle "Last updated" freshness line. Formats an ISO/date string as
// "Aug 11, 2026" (unambiguous for a US audience; matches Trustpilot dates).
export function LastUpdated({ date, className = "" }: { date: string; className?: string }) {
  const label = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <p className={`inline-flex items-center gap-1.5 text-[12px] font-bold text-gray-500 ${className}`}>
      <Clock className="h-3.5 w-3.5" strokeWidth={2} />
      Last updated: {label}
    </p>
  );
}
