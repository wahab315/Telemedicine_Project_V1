"use client";

import { onlineManager } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";

const ONLINE_RECHECK_EVENT = "telemedicine:online-recheck";

function subscribeOnlineStatus(onStoreChange) {
  const handleChange = () => {
    onStoreChange();
  };

  window.addEventListener("online", handleChange);
  window.addEventListener("offline", handleChange);
  window.addEventListener(ONLINE_RECHECK_EVENT, handleChange);

  return () => {
    window.removeEventListener("online", handleChange);
    window.removeEventListener("offline", handleChange);
    window.removeEventListener(ONLINE_RECHECK_EVENT, handleChange);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function getOnlineServerSnapshot() {
  return true;
}

if (typeof window !== "undefined") {
  onlineManager.setEventListener(setOnline => {
    const handleOnline = () => {
      setOnline(true);
    };
    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });
}

export function recheckOnlineStatus() {
  window.dispatchEvent(new Event(ONLINE_RECHECK_EVENT));
}

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribeOnlineStatus,
    getOnlineSnapshot,
    getOnlineServerSnapshot
  );

  return { isOnline };
}
