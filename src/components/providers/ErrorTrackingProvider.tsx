"use client";

import { useEffect } from "react";

// Simple error tracking — replace with Sentry by:
// 1. npm install @sentry/nextjs
// 2. Update this file to use Sentry.init()
export function ErrorTrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Capture unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error("[ErrorTracking]", event.error);
      // In production, send to your error tracking service here
      // e.g., fetch('/api/errors', { method: 'POST', body: JSON.stringify({ message: event.message, stack: event.error?.stack }) })
      // Send to error tracking in production
      // fetch('/api/errors', { method: 'POST', body: JSON.stringify({ message, stack }) })
    };

    // Capture unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("[ErrorTracking] Unhandled Promise Rejection:", event.reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return <>{children}</>;
}
