import { reduceWith, sum as sumNumbers } from "lamb";

/**
 * Sums the values in the given array.
 *
 * @example
 * sum([1, 2, 3, 4, 5]) // => 15
 *
 * @throws {TypeError} If the received array is empty.
 * @type {import("..").sum}
 */
const sum = reduceWith(sumNumbers);

export default sum;
