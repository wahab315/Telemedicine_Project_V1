import { isSessionUserShape } from "@core/models/session-user";

const SESSION_USER_STORAGE_KEY = "telemedicine_session_user";
const SESSION_USER_CHANGE_EVENT = "telemedicine:session-user-change";
export const AUTH_TOKEN_STORAGE_KEY = "telemedicine_auth_token";

/** @type {import("@core/models/session-user").SessionUser|null} */
let sessionUserSnapshot = null;
/** @type {string|undefined} */
let sessionUserSnapshotKey;

function clearSessionUserSnapshot() {
  sessionUserSnapshotKey = undefined;
  sessionUserSnapshot = null;
}

/** @param {string} raw */
function parseSessionUser(raw) {
  const parsed = JSON.parse(raw);
  if (!isSessionUserShape(parsed)) {
    return null;
  }

  const image =
    parsed.image === null
      ? null
      : typeof parsed.image === "string"
        ? parsed.image.trim() || null
        : undefined;

  return {
    id: parsed.id,
    email: parsed.email,
    role: parsed.role,
    ...(typeof parsed.name === "string" ? { name: parsed.name } : {}),
    ...(typeof parsed.displayName === "string"
      ? { displayName: parsed.displayName }
      : {}),
    ...(image !== undefined ? { image } : {})
  };
}

function emitSessionUserChange() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(SESSION_USER_CHANGE_EVENT));
}

/** @param {() => void} onChange */
export function subscribeSessionUser(onChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(SESSION_USER_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(SESSION_USER_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** @param {string} token */
export function saveAuthToken(token) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } catch {
    // Quota or private mode — ignore.
  }
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function clearAuthToken() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** @param {import("@core/models/session-user").SessionUser} user */
export function saveSessionUser(user) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const serialized = JSON.stringify(user);
    sessionStorage.setItem(SESSION_USER_STORAGE_KEY, serialized);
    sessionUserSnapshotKey = serialized;
    sessionUserSnapshot = user;
    emitSessionUserChange();
  } catch {
    // Quota or private mode — ignore.
  }
}

/** @returns {import("@core/models/session-user").SessionUser|null} */
export function getSessionUser() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = sessionStorage.getItem(SESSION_USER_STORAGE_KEY);
    const snapshotKey = raw ?? "";

    if (snapshotKey === sessionUserSnapshotKey) {
      return sessionUserSnapshot;
    }

    sessionUserSnapshotKey = snapshotKey;
    if (!raw) {
      sessionUserSnapshot = null;
      return null;
    }

    sessionUserSnapshot = parseSessionUser(raw);
    return sessionUserSnapshot;
  } catch {
    clearSessionUserSnapshot();
    return null;
  }
}

export function clearSessionUser() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.removeItem(SESSION_USER_STORAGE_KEY);
    clearSessionUserSnapshot();
    emitSessionUserChange();
  } catch {
    // ignore
  }
}

export function clearAuthSession() {
  clearAuthToken();
  clearSessionUser();
}
