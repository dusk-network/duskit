import { CSS_VAR_REFERENCE_PATTERN } from "./constants";

/**
 * Resolves a CSS custom property value recursively.
 *
 * @param {string} tokenName
 * @param {Record<string, string>} dictionary
 * @param {Set<string>} [visited]
 * @returns {string}
 */
function resolveToken(tokenName, dictionary, visited = new Set()) {
  if (visited.has(tokenName)) {
    throw new Error(
      `Circular dependency detected: ${Array.from(visited).join(" -> ")} -> ${tokenName}`
    );
  }

  visited.add(tokenName);

  const rawValue = dictionary[tokenName];

  if (!rawValue) {
    throw new Error(`Token not found: ${tokenName}`);
  }

  const globalPattern = new RegExp(CSS_VAR_REFERENCE_PATTERN.source, "g");

  return rawValue.replace(globalPattern, (match, innerToken) =>
    resolveToken(innerToken, dictionary, new Set(visited))
  );
}

export default resolveToken;
