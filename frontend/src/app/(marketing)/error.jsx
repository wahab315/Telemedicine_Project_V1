"use client";

import { useEffect } from "react";

import { RouteErrorFallback } from "@/common/route-error-fallback";

export default function MarketingError({ error, reset }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return <RouteErrorFallback reset={reset} />;
}
