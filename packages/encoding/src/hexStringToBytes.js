/**
 * Converts a hexadecimal string to a `Uint8Array`.
 *
 * @example
 *
 * hexStringToBytes("ffae0253") // => Uint8Array(4) [ 255, 174, 2, 83 ]
 *
 * @throws {TypeError} If called with `null` or `undefined`
 * @throws {TypeError} If the source string has not an even length
 * @throws {TypeError} If the source string contains invalid characters
 * @type {import("..").hexStringToBytes}
 */
function hexStringToBytes(s) {
  s = String(s);

  if (s.length % 2 !== 0) {
    throw new TypeError("The source hex string must have an even length");
  }

  if (!/^[\da-f]*$/i.test(s)) {
    throw new TypeError("Invalid source hex string");
  }

  return Uint8Array.from(s.match(/../g) ?? [], (hexByte) =>
    parseInt(hexByte, 16)
  );
}

export default hexStringToBytes;
