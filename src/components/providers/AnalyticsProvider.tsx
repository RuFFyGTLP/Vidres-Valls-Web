"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Simple analytics provider — replace with GA4 or Plausible by updating these functions
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, opts?: { props: Record<string, string | number> }) => void;
  }
}

function trackPageView(url: string) {
  if (typeof window === "undefined") return;
  // Google Analytics 4 (add your GA4 ID to env as NEXT_PUBLIC_GA4_ID)
  if (window.gtag) {
    window.gtag("event", "page_view", { page_location: url });
  }
  // Plausible (auto tracks page views if script is loaded)
  if (typeof window.plausible === "function") {
    window.plausible("pageview", { props: { url } });
  }
}

export function trackEvent(eventName: string, props?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", eventName, props);
  }
  if (window.plausible) {
    window.plausible(eventName, { props: props ?? {} });
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : "");
    trackPageView(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
