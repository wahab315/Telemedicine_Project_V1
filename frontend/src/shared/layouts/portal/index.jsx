"use client";

import Box from "@/ui/box";

import Sidebar from "./component/sidebar/sidebar";
import Topbar from "./component/topbar/topbar";
import { PortalRoutePathsProvider } from "./context/portal-route-paths-provider";
import { PortalSidebarProvider } from "./context/portal-sidebar-provider";

export default function PortalLayout({
  children,
  navSections = [],
  routePaths
}) {
  return (
    <PortalRoutePathsProvider value={routePaths}>
      <PortalSidebarProvider>
        <Box as='main' className='dashboard'>
          <Sidebar navSections={navSections} />
          <Box className='dashboard__layout'>
            <Topbar />
            <Box className='dashboard__layout--content'>{children}</Box>
          </Box>
        </Box>
      </PortalSidebarProvider>
    </PortalRoutePathsProvider>
  );
}
