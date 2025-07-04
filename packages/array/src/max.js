import { reduceWith } from "lamb";

/**
 * @function
 * @type {import("..").max}
 */
const max = reduceWith((r, c) => (r > c ? r : c));

export default max;
