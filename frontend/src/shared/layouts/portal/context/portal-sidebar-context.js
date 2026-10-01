import { createContext } from "react";

/**
 * @typedef {Object} PortalSidebarContextValue
 * @property {boolean} isMobile
 * @property {boolean} sidebarCollapsed
 * @property {(collapsed: boolean) => void} setSidebarCollapsed
 * @property {() => void} toggleSidebarCollapsed
 * @property {boolean} mobileNavOpen
 * @property {(open: boolean) => void} setMobileNavOpen
 * @property {() => void} toggleMobileNav
 */

/** @type {import("react").Context<PortalSidebarContextValue|null>} */
export const PortalSidebarContext = createContext(null);
