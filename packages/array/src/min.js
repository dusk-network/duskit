import { reduceWith } from "lamb";

/**
 * @function
 * @type {import("..").min}
 */
const min = reduceWith((r, c) => (r < c ? r : c));

export default min;
