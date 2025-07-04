/** @type {import("..").bytesToHexString} */
function bytesToHexString(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new TypeError("Uint8Array expected");
  }

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export default bytesToHexString;
