import { AUTH_TOKEN_STORAGE_KEY } from "@core/session/session-storage";

function readAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** @param {import("axios").InternalAxiosRequestConfig} config */
export function attachAuthInterceptor(config) {
  const token = readAuthToken();
  if (!token) {
    return config;
  }

  if (typeof config.headers.set === "function") {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}
