/**
 * Represents a resolved time unit, containing its
 * formatting name and its duration factor in milliseconds.
 */
export declare type RelativeTimeUnit = {
  factor: number;
  name: Intl.RelativeTimeFormatUnit;
};

/**
 * Creates a string representing the relative time
 * from the given date.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat | RelativeTimeFormat}
 */
export declare function getRelativeTimeString(
  date: Date,
  style: "long" | "short" | "narrow"
): string;

/**
 * Resolves the optimal time unit for a given time difference
 * in milliseconds.
 *
 * Note: This function prioritizes performance and zero
 * dependencies over strict calendar accuracy.
 * It uses fixed mathematical approximations for larger units
 * (e.g., a month is strictly 30 days, a year is strictly 365 days).
 * It is designed for relative UI time formatting rather than precise
 * chronological calculations.
 *
 * @param {number} diff - The time difference in milliseconds.
 * @returns {RelativeTimeUnit} The resolved time unit object containing the name and millisecond factor.
 */
export declare function getRelativeTimeUnit(diff: number): RelativeTimeUnit;

/**
 * Converts a unix timestamp to a Date Object.
 */
export declare function unixTsToDate(ts: number): Date;
