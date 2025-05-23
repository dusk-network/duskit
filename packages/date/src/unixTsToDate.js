/**
 * Converts a unix timestamp to a Date Object.
 *
 * @type {import("..").unixTsToDate}
 */
const unixTsToDate = (ts) => new Date(ts * 1000);

export default unixTsToDate;
