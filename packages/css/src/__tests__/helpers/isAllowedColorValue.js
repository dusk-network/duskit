import { CSS_NAMED_COLORS, CSS_VAR_REFERENCE_PATTERN } from "./constants";

/**
 * Validates whether a given CSS value is strictly a valid W3C named color
 * or a standalone CSS variable reference.
 * Rejects hex codes, rgb(), hsl(), and composite string values.
 *
 * @param {string} value
 * @returns {boolean}
 */
function isAllowedColorValue(value) {
  if (CSS_NAMED_COLORS.has(value.toLowerCase())) {
    return true;
  }

  const match = value.match(CSS_VAR_REFERENCE_PATTERN);

  // Ensures the CSS variable is the entire string, preventing false positives
  // from partial matches within composite values like "1px solid var(--color)"
  return match !== null && match[0] === value;
}

export default isAllowedColorValue;
