"use client";

import { createContext, useContext } from "react";

/**
 * @typedef {Object} SessionContextValue
 * @property {boolean} hydrated
 * @property {import("@core/models/session-user").SessionUser|null} user
 * @property {(next: import("@core/models/session-user").SessionUser) => void} setUser
 */

/** @type {import("react").Context<SessionContextValue|null>} */
export const SessionContext = createContext(null);

/** @returns {SessionContextValue} */
export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionContext provider");
  }
  return ctx;
}
