/**
 * @typedef {Object} SessionUser
 * @property {string} id
 * @property {string} email
 * @property {string} role
 * @property {string} [name]
 * @property {string} [displayName]
 * @property {string|null} [image]
 */

/** @type {SessionUser} */
export const DEFAULT_DEV_SESSION_USER = {
  id: "user-dev",
  email: "dev@telemedicine.local",
  role: "patient",
  displayName: "Dev User"
};

/** @param {unknown} value */
export function isSessionUserShape(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const record = value;
  return (
    typeof record.id === "string" &&
    typeof record.email === "string" &&
    typeof record.role === "string"
  );
}
