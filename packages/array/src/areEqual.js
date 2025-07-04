import { areSVZ } from "lamb";

/** @type {import("..").areEqual} */
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
