/**
 * Converts a base64 string to a `Uint8Array`.
 *
 * @type {import("..").base64ToBytes}
 */
const base64ToBytes = (s) =>
  Uint8Array.from(
    atob(s),
    /** @type {(c: string) => number} */ ((c) => c.codePointAt(0))
  );

export default base64ToBytes;
