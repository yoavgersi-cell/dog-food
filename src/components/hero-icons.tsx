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

/** Leaf + carrot: fresh, whole-food brands. */
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

/** Bowl with paw + heart: nutrition data. */
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

/** Kitchen scale with a bone: cost per day by weight. */
export function ScaleIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M14.6 9.4h10.8" />
      <circle cx="13.2" cy="8.2" r="1.7" />
      <circle cx="13.2" cy="10.6" r="1.7" />
      <circle cx="26.8" cy="8.2" r="1.7" />
      <circle cx="26.8" cy="10.6" r="1.7" />
      <path d="M8 14.5h24M20 14.5v3" />
      <rect x="7.5" y="17.5" width="25" height="18" rx="4.5" />
      <circle cx="20" cy="26.5" r="5.2" />
      <path d="M20 26.5l2.6-2.8M16.2 26.5h.6M20 22.7v.6M23.8 26.5h-.6" />
    </svg>
  );
}

/** Clipboard with checks + paw: published scoring rubric. */
export function RubricIcon({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="9" y="8" width="22" height="28" rx="3.5" />
      <rect x="15" y="5" width="10" height="5.5" rx="1.8" />
      <path d="M13 17l1.8 1.8 3.2-3.6M21 17h6M13 24l1.8 1.8 3.2-3.6M21 24h6M21 31h6" />
      <ellipse cx="15.4" cy="31.8" rx="1.8" ry="1.35" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="30" r=".75" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="29" r=".75" fill="currentColor" stroke="none" />
      <circle cx="16.3" cy="29" r=".75" fill="currentColor" stroke="none" />
      <circle cx="17.7" cy="30" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}
