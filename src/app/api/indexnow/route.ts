import { NextRequest, NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { INDEXNOW_KEY, INDEXNOW_HOST } from "@/lib/indexnow";

// IndexNow submitter: collects hub URLs whose sitemap lastmod falls inside
// the freshness window and pushes them to api.indexnow.org, which fans out
// to Bing and every other participating engine (this is also the index that
// feeds Copilot / ChatGPT Search browsing). Triggered by the daily Vercel
// cron (vercel.json) and manually after big content pushes:
//   GET /api/indexnow?token=<key>&since=<hours>   (dry=1 to preview only)
//
// Per the IndexNow spec we submit only recently-changed URLs, never the
// whole sitemap wholesale - repeated bulk submission reads as spam.
export const dynamic = "force-dynamic";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const HUB_ORIGIN = `https://${INDEXNOW_HOST}`;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const isCron = (req.headers.get("user-agent") || "").includes("vercel-cron");
  if (!isCron && params.get("token") !== INDEXNOW_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sinceHours = Math.min(720, Math.max(1, Number(params.get("since")) || 72));
  const cutoff = Date.now() - sinceHours * 3600_000;
  // Cap per call, newest first. The sitewide freshness-floor date can put
  // most of the sitemap inside a wide window (as the first live run proved:
  // 305 URLs); the cap keeps submissions to the genuinely freshest pages.
  const limit = Math.min(500, Math.max(1, Number(params.get("limit")) || 100));

  // The sitemap module is host-aware via request headers; it returns the full
  // dogfoodscout.com sitemap. Filter to URLs modified inside the window - the key
  // file only vouches for this host.
  const entries = await sitemap();
  const urlList = entries
    .filter((e) => e.url.startsWith(HUB_ORIGIN))
    .map((e) => ({ url: e.url, lm: e.lastModified ? new Date(e.lastModified).getTime() : 0 }))
    .filter((e) => e.lm >= cutoff)
    .sort((a, b) => b.lm - a.lm)
    .slice(0, limit)
    .map((e) => e.url);

  if (urlList.length === 0) {
    return NextResponse.json({ submitted: 0, sinceHours, note: "no URLs modified inside the window" });
  }

  if (params.get("dry") === "1") {
    return NextResponse.json({ submitted: 0, dry: true, sinceHours, wouldSubmit: urlList.length, urls: urlList });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${HUB_ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    // IndexNow returns 200/202 on acceptance; anything else is worth surfacing.
    const ok = res.status === 200 || res.status === 202;
    return NextResponse.json({
      submitted: ok ? urlList.length : 0,
      sinceHours,
      limit,
      indexnowStatus: res.status,
      ok,
      // 403 = IndexNow could not validate the key file. Usually propagation:
      // the file must be publicly fetchable at keyFileUrl. Verify it in a
      // browser, then retry - the daily cron retries automatically anyway.
      ...(res.status === 403 && {
        hint: `key validation failed - confirm ${HUB_ORIGIN}/${INDEXNOW_KEY}.txt returns the key, then retry in a few hours`,
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { submitted: 0, sinceHours, error: `indexnow fetch failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 502 }
    );
  }
}
