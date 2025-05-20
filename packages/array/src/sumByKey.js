import { compose, pluck } from "lamb";

import sum from "./sum";

/**
 * Builds a function that sums the values in the given key in an array of objects.
 * The returned function will throw a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError|TypeError} if
 * receives an empty array.
 *
 * @example
 * const scores = [
 *     { score: 7, user: "John" },
 *     { score: 9, user: "Jane" },
 *     { score: 5, user: "Mario" }
 * ];
 * const sumScores = sumByKey("score");
 *
 * sumScores(scores) // => 21
 *
 * @type {import("..").sumByKey}
 */
const sumByKey = (key) => compose(sum, pluck(key));

export default sumByKey;
