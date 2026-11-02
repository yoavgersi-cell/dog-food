/**
 * Analytics helper - fires events to both Meta Pixel and GA4.
 *
 * Usage:
 *   import { trackEvent, trackOnce } from "@/lib/analytics";
 *   trackEvent("ProviderClick", { provider: "altrx" });
 *   trackOnce("StartMatch");  // fires only once per session
 */

type AnalyticsEvent =
  | "PageView"
  | "Lead"
  | "StartMatch"
  | "CompleteMatch"
  | "ProviderClick"
  | "ViewContent"
  | "QuizStep";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const STANDARD_FB_EVENTS = new Set(["PageView", "Lead", "ViewContent"]);

function fireFB(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.fbq) return;
  const method = STANDARD_FB_EVENTS.has(event) ? "track" : "trackCustom";
  if (params) {
    window.fbq(method, event, params);
  } else {
    window.fbq(method, event);
  }
}

function fireGA(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  fireFB(event, params);
  fireGA(event, params);
}

/**
 * Track a provider CTA click. Fire-and-forget - never blocks the redirect.
 */
export function trackProviderClick(params: {
  provider_name: string;
  provider_slug: string;
  provider_position?: number;
  page_type: "listing" | "review" | "battle" | "quiz_results";
  source_flow: "main_comparison" | "provider_review" | "battle_page" | "matching_flow";
}) {
  trackEvent("ProviderClick", {
    ...params,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Fire an event only once per browser session.
 * Prevents duplicates on refresh or re-render.
 */
export function trackOnce(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const key = `_evt_sent_${event}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  trackEvent(event, params);
}
