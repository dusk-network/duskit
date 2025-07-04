/**
 * Performs a {@link https://en.wikipedia.org/wiki/Linear_interpolation | linear interpolation}
 * between the given `a` and `b` numbers using the given normal value `n`.
 *
 * A value of `0` for `n` will return `a`.
 * A value of `1` for `n` will return `b`.
 *
 * The resulting interpolation in a motion will be "smoother" for
 * values near `0` and "sharper" for values near `1`.
 *
 * @param {number} a The starting value
 * @param {number} b The destination value
 * @param {number} n The normal value (between `0` and `1`)
 */
export declare function lerp(a: number, b: number, n: number): number;
