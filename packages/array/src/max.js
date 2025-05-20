import { reduceWith } from "lamb";

/**
 * Gets the max value in an array.
 *
 * @example
 * max([4, 5, 2, 3, 1]) // => 5
 *
 * @throws {TypeError} If the received array is empty.
 * @type {import("..").max}
 */
const max = reduceWith((r, c) => (r > c ? r : c));

export default max;
