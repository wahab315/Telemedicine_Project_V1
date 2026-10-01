import { buildPath } from "@core/router/path-builder";

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label
 * @property {string} [href]
 */

/**
 * @typedef {Record<string, string>} RouteParams
 */

/**
 * @typedef {Object} RouteMeta
 * @property {string|((params: RouteParams) => string)} label
 */

/**
 * @typedef {Object} RouteDefBase
 * @property {string} path
 * @property {RouteDefBase} [parent]
 * @property {(params: RouteParams) => BreadcrumbItem} breadcrumb
 */

/**
 * @typedef {RouteDefBase & {
 *   meta: RouteMeta;
 *   toPath: (params: RouteParams) => string;
 * }} RouteDef
 */

/**
 * @param {Object} config
 * @param {string} config.path
 * @param {RouteDefBase} [config.parent]
 * @param {RouteMeta} config.meta
 * @returns {RouteDef}
 */
export function defineRoute(config) {
  const { path, parent, meta } = config;

  return {
    path,
    parent,
    meta,
    toPath(params) {
      return buildPath(path, params);
    },
    breadcrumb(params) {
      const label =
        typeof meta.label === "function" ? meta.label(params) : meta.label;

      return {
        label,
        href: buildPath(path, params)
      };
    }
  };
}
