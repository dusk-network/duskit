import bytesToBase64 from "./bytesToBase64";

/** @type {import("..").utf8ToBase64} */
const utf8ToBase64 = (s) => bytesToBase64(new TextEncoder().encode(s));

export default utf8ToBase64;
