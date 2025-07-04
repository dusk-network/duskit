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
 * Converts a unix timestamp to a Date Object.
 */
export declare function unixTsToDate(ts: number): Date;
