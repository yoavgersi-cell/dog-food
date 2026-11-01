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
  { label: "How We Rank", href: "/how-we-rank" },
];

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#FDE68A" stroke="#A16207" strokeWidth="2" />
      <circle cx="11" cy="12" r="2.6" fill="#713F12" />
      <circle cx="21" cy="12" r="2.6" fill="#713F12" />
      <circle cx="8" cy="18" r="2.3" fill="#713F12" />
      <circle cx="24" cy="18" r="2.3" fill="#713F12" />
      <ellipse cx="16" cy="21" rx="5" ry="4" fill="#713F12" />
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b-2 border-[#FDE68A] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2" aria-label="Dog Food Scout home">
          <Mark />
          <span className="text-[20px] font-extrabold tracking-tight text-[#191919]">
            Dog Food <span className="text-[#A16207]">Scout</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[14px] font-medium text-[#191919] md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#A16207] hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="text-[#191919] md:hidden" aria-label="Toggle menu" aria-expanded={isOpen}>
          {isOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>

      {isOpen && (
        <nav className="space-y-3 border-t border-[#E5E5E5] bg-white px-4 py-3 md:hidden" aria-label="Mobile">
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
