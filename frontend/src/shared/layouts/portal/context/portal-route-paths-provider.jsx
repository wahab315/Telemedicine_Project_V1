"use client";

import { PortalRoutePathsContext } from "./portal-route-paths-context";

export function PortalRoutePathsProvider({ children, value }) {
  return (
    <PortalRoutePathsContext.Provider value={value}>
      {children}
    </PortalRoutePathsContext.Provider>
  );
}
