import type { Ord } from "lamb";

/**
 * Checks if the two given "array-like" objects contain
 * the same elements in the same positions.
 * The function uses the `SameValueZero` comparison to
 * determine equality.
 *
 * @see [SameValueZero comparison]{@link https://262.ecma-international.org/#sec-samevaluezero}
 */
export declare function areEqual(a: ArrayLike<any>, b: ArrayLike<any>): boolean;

/**
 * Gets the max value in an array.
 *
 * @example
 * max([4, 5, 2, 3, 1]) // => 5
 *
 * @throws {@link !TypeError | TypeError} If the received array is empty.
 */
export declare function max<T extends Ord, const L extends ArrayLike<T>>(
  arrayLike: L
): L[number];

/**
 * Gets the maximum value of the given key in an array of objects.
 * The returned function will throw a {@link !TypeError | TypeError} if
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
 */
export declare function maxByKey<
  K extends string,
  S extends Record<PropertyKey, any> & Record<K, Ord>,
>(key: K): <const L extends ArrayLike<S>>(arrayLike: L) => L[number][K];

/**
 * Gets the min value in an array.
 *
 * @example
 * min([4, 5, 2, 3, 1]) // => 5
 *
 * @throws {@link !TypeError | TypeError} If the received array is empty.
 */
export declare function min<T extends Ord, const L extends ArrayLike<T>>(
  arrayLike: L
): L[number];

/**
 * Gets the minimum value of the given key in an array of objects.
 * The returned function will throw a {@link !TypeError | TypeError} if
 * receives an empty array.
 *
 * @example
 * const scores = [
 *     { score: 7, user: "John" },
 *     { score: 9, user: "Jane" },
 *     { score: 5, user: "Mario" }
 * ];
 * const getMinScore = minByKey("score");
 *
 * getMinScore(scores) // => 5
 *
 */
export declare function minByKey<
  K extends string,
  S extends Record<PropertyKey, any> & Record<K, Ord>,
>(key: K): <const L extends ArrayLike<S>>(arrayLike: L) => L[number][K];

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 */
export declare function shuffle<T>(array: T[]): T[];

/**
 * Sums the values in the given array.
 *
 * @example
 * sum([1, 2, 3, 4, 5]) // => 15
 *
 * @throws {@link !TypeError | TypeError} If the received array is empty.
 */
export declare const sum: {
  (arrayLike: ArrayLike<bigint>): bigint;
  (arrayLike: ArrayLike<number>): number;
};

/**
 * Builds a function that sums the values in the given key in an array of objects.
 * The returned function will throw a {@link !TypeError | TypeError} if
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
 */
export declare function sumByKey<K extends string>(
  key: K
): <T extends number | bigint>(
  source: ArrayLike<{ [P in K]: T } & Record<PropertyKey, any>>
) => T;
