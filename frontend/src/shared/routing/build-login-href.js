import { AuthRoutes } from "@/module/auth/routes";

/**
 * @param {string} [returnPath]
 */
export function buildLoginHref(returnPath) {
  const loginPath = AuthRoutes.login.toPath({});
  if (!returnPath || returnPath === loginPath) {
    return loginPath;
  }
  const params = new URLSearchParams({ returnTo: returnPath });
  return `${loginPath}?${params.toString()}`;
}
