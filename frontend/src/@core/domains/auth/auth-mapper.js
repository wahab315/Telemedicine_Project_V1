/**
 * @typedef {import("@core/models/session-user").SessionUser} SessionUser
 */

/**
 * @param {unknown} dto
 * @returns {SessionUser|null}
 */
export function mapLoginResponseDataToSessionUser(dto) {
  if (dto === null || typeof dto !== "object") {
    return null;
  }

  const record = dto;
  const user = record.user;
  if (user === null || typeof user !== "object") {
    return null;
  }

  const role = typeof user.role === "string" ? user.role.trim() : "";
  if (!role || typeof user.id !== "string" || typeof user.email !== "string") {
    return null;
  }

  const image =
    user.image === null
      ? null
      : typeof user.image === "string"
        ? user.image.trim() || null
        : undefined;

  return {
    id: user.id,
    email: user.email,
    role,
    ...(typeof user.name === "string" ? { name: user.name } : {}),
    ...(typeof user.displayName === "string"
      ? { displayName: user.displayName }
      : {}),
    ...(image !== undefined ? { image } : {})
  };
}
