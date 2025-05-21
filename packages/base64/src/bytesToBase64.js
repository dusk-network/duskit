/**
 * Converts a Uint8Array in a base64 string.
 *
 * @type {import("..").bytesToBase64}
 */
const bytesToBase64 = (bytes) => btoa(String.fromCodePoint(...bytes));

export default bytesToBase64;
