"use client";

import { SessionContext } from "@core/providers/session-context";
import {
  getSessionUser,
  saveSessionUser,
  subscribeSessionUser
} from "@core/session/session-storage";
import { useMemo, useSyncExternalStore } from "react";

const unsubscribeNoop = () => {};
const subscribeNoop = () => unsubscribeNoop;
const clientSnapshotTrue = () => true;
const serverSnapshotFalse = () => false;
const sessionUserServerSnapshot = () => null;

export function SessionProvider({ children }) {
  const user = useSyncExternalStore(
    subscribeSessionUser,
    getSessionUser,
    sessionUserServerSnapshot
  );
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    clientSnapshotTrue,
    serverSnapshotFalse
  );

  const sessionValue = useMemo(
    () => ({
      hydrated,
      user,
      setUser: next => {
        saveSessionUser(next);
      }
    }),
    [hydrated, user]
  );

  return (
    <SessionContext.Provider value={sessionValue}>
      {children}
    </SessionContext.Provider>
  );
}
