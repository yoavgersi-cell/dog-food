#!/usr/bin/env node
// ───── SEO / GEO health audit ─────
// Crawls a running build of this site (default http://localhost:3000), every
// URL in its sitemap plus robots.txt and llms.txt, and reports anything a
// search engine or AI answer engine would penalise:
//   - non-200 pages, broken internal links
//   - missing / long / duplicate <title>, missing / off-length descriptions
//   - canonical mismatch, H1 count != 1, images without alt
//   - invalid JSON-LD, pages without any structured data
//   - content pages without a Quick Answer block; "Verifying" placeholders
//   - brands whose nutrition/price data is still unverified
// Usage: node scripts/seo-audit.mjs [baseUrl] [--out report.md]
// Exit code 1 when a blocking issue is found (so a routine can act on it).
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const BASE = (args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000").replace(/\/$/, "");
const outIdx = args.indexOf("--out");
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;
const PROD_ORIGIN = "https://www.dogfoodscout.com";

// Title is measured without the " | Dog Food Scout" suffix: the first
// ~60-70 chars carry the query, the brand suffix is expected to truncate.
// Descriptions up to ~220 are fine for AI engines; Google simply clips them.
const TITLE_MAX = 70;
const DESC_MIN = 70;
const DESC_MAX = 220;
const BRAND_SUFFIX = " | Dog Food Scout";

const blocking = [];
const warnings = [];
const info = [];

const text = async (url) => {
  const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "seo-audit/1.0" } });
  return { status: r.status, body: r.status === 200 ? await r.text() : "", location: r.headers.get("location") };
};

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

function decode(s) {
  return s.replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&rsquo;/g, "’").replace(/&ldquo;|&rdquo;/g, '"');
}

// ───── 1. sitemap ─────
const sm = await text(`${BASE}/sitemap.xml`);
if (sm.status !== 200) {
  blocking.push(`sitemap.xml returned ${sm.status}`);
}
const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = locs.map((l) => l.replace(PROD_ORIGIN, "")).map((p) => (p === "" ? "/" : p));
info.push(`${paths.length} URLs in sitemap`);
for (const l of locs) if (!l.startsWith(PROD_ORIGIN)) blocking.push(`sitemap URL not on production origin: ${l}`);

// ───── 2. robots / llms ─────
const robots = await text(`${BASE}/robots.txt`);
if (robots.status !== 200) blocking.push(`robots.txt returned ${robots.status}`);
else {
  if (!/Sitemap:\s*\S+/i.test(robots.body)) blocking.push("robots.txt has no Sitemap line");
  for (const ua of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"]) {
    if (!robots.body.includes(`User-Agent: ${ua}`)) warnings.push(`robots.txt lacks explicit rule for ${ua}`);
  }
  if (/Disallow:\s*\/\s*$/m.test(robots.body)) blocking.push("robots.txt disallows / for some agent");
}
const llms = await text(`${BASE}/llms.txt`);
if (llms.status !== 200) blocking.push(`llms.txt returned ${llms.status}`);
else {
  const llmsLinks = [...llms.body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1].replace(PROD_ORIGIN, "") || "/");
  for (const p of llmsLinks) if (!paths.includes(p) && !p.endsWith(".xml")) warnings.push(`llms.txt links a URL not in the sitemap: ${p}`);
}

// ───── 3. crawl every sitemap URL ─────
const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const pageReport = [];

for (const p of paths) {
  const r = await text(`${BASE}${p}`);
  if (r.status !== 200) {
    blocking.push(`${p} returned ${r.status}${r.location ? ` -> ${r.location}` : ""}`);
    continue;
  }
  const html = r.body;
  const title = decode(attr(html, /<title[^>]*>([^<]*)<\/title>/i) ?? "");
  const desc = decode(attr(html, /<meta name="description" content="([^"]*)"/i) ?? "");
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/i);
  const h1s = (html.match(/<h1[\s>]/gi) ?? []).length;
  const noAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) ?? []).length;
  const robotsMeta = attr(html, /<meta name="robots" content="([^"]*)"/i) ?? "";
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let ldBad = 0;
  const ldTypes = [];
  for (const s of ld) {
    try {
      const j = JSON.parse(s);
      ldTypes.push(j["@type"]);
    } catch {
      ldBad++;
    }
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) internalLinks.add(m[1]);

  if (!title) blocking.push(`${p}: missing <title>`);
  else {
    const coreTitle = title.endsWith(BRAND_SUFFIX) ? title.slice(0, -BRAND_SUFFIX.length) : title;
    if (coreTitle.length > TITLE_MAX) warnings.push(`${p}: title ${coreTitle.length} chars before the brand suffix (>${TITLE_MAX}): "${coreTitle}"`);
    if (titles.has(title)) warnings.push(`${p}: duplicate title with ${titles.get(title)}: "${title}"`);
    titles.set(title, p);
  }
  if (!desc) blocking.push(`${p}: missing meta description`);
  else {
    if (desc.length < DESC_MIN || desc.length > DESC_MAX) warnings.push(`${p}: description ${desc.length} chars (want ${DESC_MIN}-${DESC_MAX})`);
    if (descriptions.has(desc)) warnings.push(`${p}: duplicate description with ${descriptions.get(desc)}`);
    descriptions.set(desc, p);
  }
  const expectedCanonical = `${PROD_ORIGIN}${p === "/" ? "" : p}`;
  if (!canonical) warnings.push(`${p}: no canonical`);
  else if (canonical.replace(/\/$/, "") !== expectedCanonical) blocking.push(`${p}: canonical ${canonical} != ${expectedCanonical}`);
  if (h1s !== 1) warnings.push(`${p}: ${h1s} <h1> elements`);
  if (noAlt > 0) warnings.push(`${p}: ${noAlt} <img> without alt`);
  if (/noindex/i.test(robotsMeta)) warnings.push(`${p}: noindex but listed in sitemap`);
  if (ldBad > 0) blocking.push(`${p}: ${ldBad} invalid JSON-LD block(s)`);
  if (ld.length === 0) warnings.push(`${p}: no structured data`);
  const isContent = !/^\/(about|contact|privacy|terms|disclosure|how-we-rank|reviews|compare|best-for|diets|ingredients)?$/.test(p);
  if (isContent && !html.includes('aria-labelledby="quick-answer"')) warnings.push(`${p}: no Quick Answer block (AEO extraction target)`);
  const pending = (html.match(/>Verifying</g) ?? []).length;
  if (pending > 0) info.push(`${p}: ${pending} value(s) still "Verifying"`);
  pageReport.push({ p, title, titleLen: title.length, descLen: desc.length, h1s, ld: ldTypes.length });
}

// ───── 4. broken internal links ─────
const checked = new Map();
for (const l of internalLinks) {
  if (/^\/(api|admin|_next|logos|reviewers\/.*\.(jpg|webp)|.*\.(png|ico|txt|xml|webp|jpg))/.test(l)) continue;
  const r = await fetch(`${BASE}${l}`, { method: "GET", redirect: "manual", headers: { "user-agent": "seo-audit/1.0" } });
  checked.set(l, r.status);
  if (r.status === 404 || r.status >= 500) blocking.push(`broken internal link: ${l} -> ${r.status}`);
  else if (r.status >= 300 && r.status < 400) warnings.push(`internal link redirects: ${l} -> ${r.status} ${r.headers.get("location") ?? ""}`);
}
info.push(`${checked.size} distinct internal links checked`);

// ───── 5. repo-level checks ─────
const root = resolve(new URL(".", import.meta.url).pathname, "..");
const read = (f) => readFileSync(resolve(root, f), "utf8");
try {
  // Brand data completeness: every null nutrition/price keeps programmatic pages noindex.
  const brands = read("src/lib/dogfood/brands.ts");
  const missing = (brands.match(/\.\.\.NOT_VERIFIED_YET/g) ?? []).length;
  if (missing > 0) warnings.push(`${missing} brand(s) still lack verified nutrition/price data - breed, diet and ingredient pages stay noindex until filled`);
} catch (e) {
  warnings.push(`repo checks skipped: ${e.message}`);
}

// ───── report ─────
const lines = [];
lines.push(`# SEO / GEO audit - ${new Date().toISOString().slice(0, 10)}`);
lines.push("");
lines.push(`Base: ${BASE}`);
for (const i of info) lines.push(`- ${i}`);
lines.push("");
lines.push(`## Blocking (${blocking.length})`);
lines.push(...(blocking.length ? blocking.map((b) => `- ${b}`) : ["- none"]));
lines.push("");
lines.push(`## Warnings (${warnings.length})`);
lines.push(...(warnings.length ? warnings.map((w) => `- ${w}`) : ["- none"]));
lines.push("");
lines.push("## Pages");
lines.push("| path | title chars | desc chars | h1 | JSON-LD blocks |");
lines.push("|---|---|---|---|---|");
for (const r of pageReport) lines.push(`| ${r.p} | ${r.titleLen} | ${r.descLen} | ${r.h1s} | ${r.ld} |`);
const report = lines.join("\n");
console.log(report);
if (OUT) writeFileSync(OUT, report);
process.exit(blocking.length ? 1 : 0);
