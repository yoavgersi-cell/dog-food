import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3.5 flex items-center gap-1.5 text-[12px] text-gray-400 sm:mb-6 sm:text-[13px]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.5} />}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#A16207] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600 truncate max-w-[170px] sm:max-w-[250px]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
