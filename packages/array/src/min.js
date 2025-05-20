import { reduceWith } from "lamb";

/**
 * Gets the min value in an array.
 *
 * @example
 * min([4, 5, 2, 3, 1]) // => 5
 *
 * @throws {TypeError} If the received array is empty.
 * @type {import("..").min}
 */
const min = reduceWith((r, c) => (r < c ? r : c));

export default min;
