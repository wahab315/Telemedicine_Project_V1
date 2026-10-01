"use client";

import { useContext } from "react";

import { PortalRoutePathsContext } from "./portal-route-paths-context";

export function usePortalRoutePaths() {
  const value = useContext(PortalRoutePathsContext);

  if (value === null) {
    throw new Error(
      "usePortalRoutePaths must be used within PortalRoutePathsProvider"
    );
  }

  return value;
}
