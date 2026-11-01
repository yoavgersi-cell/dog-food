// Hand-drawn style line icons for the hero trust row. 40x40 grid, 1.6 stroke,
// currentColor so they inherit the hero ink colour.

type P = { className?: string };

const base = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Leaf + carrot: fresh ingredients. */
export function FreshIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M7 23C7 13.5 14 8 23 8c0 9.5-6.5 15-16 15z" />
      <path d="M7 23 18 13" />
      <path d="M12.5 19.5 12 15.5M15.5 16.5l3.6-.4" />
      <path d="M25.6 20.4c2-2 5.2.9 3.2 3.2L15.4 37c-1 .9-2.4-.5-1.5-1.5z" />
      <path d="M19 30.6l1.8 1.8M22.3 27.3l1.6 1.6M25.4 24.2l1.4 1.4" />
      <path d="M28.2 20.6c.2-2.4 1.4-4.4 3.4-5.4M29.2 22.2c1.8-1 4-1.2 5.8-.4M28.4 21.2c1-2.8 1-5 .2-7" />
    </svg>
  );
}

/** Bowl with paw + heart: gentle on digestion. */
export function BowlIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M20 14.2c-1.7-2.6-5.4-1.9-5.4.8 0 2.1 3 3.9 5.4 5.4 2.4-1.5 5.4-3.3 5.4-5.4 0-2.7-3.7-3.4-5.4-.8z" />
      <ellipse cx="20" cy="23" rx="15" ry="2.6" />
      <path d="M5 23c.6 6.5 5.5 11 15 11s14.4-4.5 15-11" />
      <path d="M13 36.5h14" />
      <ellipse cx="20" cy="30.3" rx="2.4" ry="1.8" fill="currentColor" stroke="none" />
      <circle cx="16.6" cy="28" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.8" cy="26.7" r="1" fill="currentColor" stroke="none" />
      <circle cx="21.2" cy="26.7" r="1" fill="currentColor" stroke="none" />
      <circle cx="23.4" cy="28" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Chef's hat with a sparkle: human-grade, made-in-a-real-kitchen quality. */
export function ChefHatIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12.5 23c-3.7-.2-6.3-3-6.3-6.4 0-3.6 3.1-6.4 6.8-5.9C14.3 7.6 17 5.5 20.3 5.5c3.3 0 6 2.1 7.3 5.2 3.7-.5 6.8 2.3 6.8 5.9 0 3.4-2.6 6.2-6.3 6.4" />
      <path d="M12.5 21.5v8h15.6v-8" />
      <rect x="11.5" y="29.5" width="17.6" height="5.5" rx="1.6" />
      <path d="M17.2 24.5v5M23.4 24.5v5" />
      <path d="M34.5 3.5v3.2M32.9 5.1h3.2" />
    </svg>
  );
}
