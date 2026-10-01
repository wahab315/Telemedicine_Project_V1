/**
 * @typedef {import("@core/router/define-route").BreadcrumbItem} BreadcrumbItem
 * @typedef {import("@core/router/define-route").RouteDef} RouteDef
 * @typedef {import("@core/router/define-route").RouteDefBase} RouteDefBase
 * @typedef {import("@core/router/define-route").RouteParams} RouteParams
 */

/**
 * @param {RouteDef} route
 * @param {RouteParams} params
 * @param {{ lastIsCurrent?: boolean }} [options]
 * @returns {readonly BreadcrumbItem[]}
 */
export function breadcrumbsFor(route, params, options) {
  const lastIsCurrent = options?.lastIsCurrent ?? true;
  /** @type {BreadcrumbItem[]} */
  const items = [];
  /** @type {RouteDefBase|undefined} */
  let current = route;

  while (current) {
    items.unshift(current.breadcrumb(params));
    current = current.parent;
  }

  if (lastIsCurrent && items.length > 0) {
    const lastItem = items.at(-1);

    if (lastItem) {
      items[items.length - 1] = { label: lastItem.label };
    }
  }

  return items;
}
