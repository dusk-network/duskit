import { reduceWith, sum as sumNumbers } from "lamb";

/**
 * @function
 * @type {import("..").sum}
 */
const sum = reduceWith(sumNumbers);

export default sum;
