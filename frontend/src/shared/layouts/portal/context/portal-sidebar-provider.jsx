"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { PortalSidebarContext } from "./portal-sidebar-context";

export function PortalSidebarProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 60em)");
    const sync = () => {
      setIsMobile(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
    };
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed(value => !value);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(value => !value);
  }, []);

  const value = useMemo(
    () => ({
      isMobile,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebarCollapsed,
      mobileNavOpen,
      setMobileNavOpen,
      toggleMobileNav
    }),
    [
      isMobile,
      sidebarCollapsed,
      mobileNavOpen,
      toggleSidebarCollapsed,
      toggleMobileNav
    ]
  );

  return (
    <PortalSidebarContext.Provider value={value}>
      {children}
    </PortalSidebarContext.Provider>
  );
}
