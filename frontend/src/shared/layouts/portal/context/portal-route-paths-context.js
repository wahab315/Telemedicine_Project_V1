import { createContext } from "react";

/**
 * @typedef {Object} PortalRoutePaths
 * @property {string} login
 * @property {string} portalRoot
 * @property {string} settings
 */

/** @type {import("react").Context<PortalRoutePaths|null>} */
export const PortalRoutePathsContext = createContext(null);
