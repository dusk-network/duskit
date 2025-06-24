/**
 * @typedef {import('style-dictionary/types').DesignToken} DesignToken
 */

/**
 * Creates a nested JSON tree where every final value is the `.value` prop
 *
 * @param {DesignToken|Object<string, *>} token
 * @param {(token: DesignToken) => DesignToken} transform
 * @returns {Object<string, *>}
 */
export const transformTokens = (token, transform) => {
  if (typeof token !== "object" || token === null) return token;

  if ("$value" in token || "value" in token) {
    return transform(token);
  }

  const nextObj = {};
  for (const [prop, value] of Object.entries(token)) {
    // @ts-ignore
    nextObj[prop] = transformTokens(value, transform);
  }
  return nextObj;
};
