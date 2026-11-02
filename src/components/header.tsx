"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Best Dog Food", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "Reviews", href: "/reviews" },
  { label: "Breeds", href: "/best-for" },
  { label: "Diets & Health", href: "/diets" },
  { label: "Guides", href: "/articles" },
  { label: "How We Rank", href: "/how-we-rank" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b-2 border-[#FDE68A] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-2">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Dog Food Scout home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.webp" alt="Dog Food Scout" width={301} height={112} className="h-11 w-auto sm:h-[52px]" fetchPriority="high" />
        </Link>

        <nav className="hidden items-center gap-6 text-[14px] font-medium text-[#191919] lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#A16207] hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="text-[#191919] lg:hidden" aria-label="Toggle menu" aria-expanded={isOpen}>
          {isOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>

      {isOpen && (
        <nav className="space-y-3 border-t border-[#E5E5E5] bg-white px-4 py-3 lg:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block text-[15px] font-medium text-[#191919] hover:text-[#A16207]">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
