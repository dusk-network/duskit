/** @type {import("..").hexStringToBytes} */
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
