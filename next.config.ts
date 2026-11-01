import type { NextConfig } from "next";
import { PAIR_ALIASES } from "./src/lib/dogfood/pairs";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Reverse-order comparisons collapse onto the canonical (demand-ordered) slug.
      ...Object.entries(PAIR_ALIASES).map(([from, to]) => ({
        source: `/compare/${from}`,
        destination: `/compare/${to}`,
        statusCode: 301 as const,
      })),
    ];
  },
};

export default nextConfig;
