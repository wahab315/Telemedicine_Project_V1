const PARAM_PATTERN = /:([a-zA-Z_][a-zA-Z0-9_]*)/g;

/**
 * @param {string} template
 * @param {Record<string, string|number>} params
 */
export function buildPath(template, params) {
  return template.replace(PARAM_PATTERN, (_, name) => {
    if (!(name in params)) {
      throw new Error(`Missing required path parameter: ${name}`);
    }

    return encodeURIComponent(String(params[name]));
  });
}
