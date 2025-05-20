import { compose, getKey, reduceWith } from "lamb";

/**
 * Gets the maximum value of the given key in an array of objects.
 * The returned function will throw a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError|TypeError} if
 * receives an empty array.
 *
 * @example
 * const scores = [
 *     { score: 7, user: "John" },
 *     { score: 9, user: "Jane" },
 *     { score: 5, user: "Mario" }
 * ];
 * const getMaxScore = maxByKey("score");
 *
 * getMaxScore(scores) // => 9
 *
 * @type {import("..").maxByKey}
 */
const maxByKey = (key) =>
  compose(
    getKey(key),
    reduceWith((r, c) => (r[key] > c[key] ? r : c))
  );

export default maxByKey;
