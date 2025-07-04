import base64ToBytes from "./base64ToBytes";

/** @type {import("..").base64ToUTF8} */
const base64ToUTF8 = (s) => new TextDecoder().decode(base64ToBytes(s));

export default base64ToUTF8;
