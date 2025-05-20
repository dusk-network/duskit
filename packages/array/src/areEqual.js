import { areSVZ } from "lamb";

/**
 * Checks if the two given "array-like" objects contain
 * the same elements in the same positions.
 * The function uses the `SameValueZero` comparison to
 * determine equality.
 *
 * @see [SameValueZero comparison]{@link https://262.ecma-international.org/#sec-samevaluezero}
 * @type {import("..").areEqual}
 */
function areEqual(a, b) {
  const lenA = a.length;

  if (lenA !== b.length) {
    return false;
  }

  for (let i = 0; i < lenA; i++) {
    if (!areSVZ(a[i], b[i])) {
      return false;
    }
  }

  return true;
}

export default areEqual;
