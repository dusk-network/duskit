/** @typedef {{ factor: number, name: Intl.RelativeTimeFormatUnit }} TimeUnit */

/* eslint-disable sort-keys */

/** @type {TimeUnit[]} */
const units = [
  { name: "year", factor: 1000 * 60 * 60 * 24 * 365 },
  { name: "month", factor: 1000 * 60 * 60 * 24 * 30 },
  { name: "week", factor: 1000 * 60 * 60 * 24 * 7 },
  { name: "day", factor: 1000 * 60 * 60 * 24 },
  { name: "hour", factor: 1000 * 60 * 60 },
  { name: "minute", factor: 1000 * 60 },
  { name: "second", factor: 1000 },
];

/* eslint-enable sort-keys */

/**
 * Resolves the optimal time unit for a given time difference in milliseconds.
 *
 * Note: This function prioritizes performance and zero dependencies over strict calendar accuracy.
 * It uses fixed mathematical approximations for larger units (e.g., a month is strictly 30 days,
 * a year is strictly 365 days). It is designed for relative UI time formatting rather than
 * precise chronological calculations.
 *
 * @private
 * @param {number} diff - The time difference in milliseconds.
 * @returns {TimeUnit} The resolved time unit object containing the name and millisecond factor.
 */
function getTimeUnit(diff) {
  for (const unit of units) {
    if (Math.abs(diff) >= unit.factor) {
      return unit;
    }
  }

  return units[6];
}

/** @type {import("..").getRelativeTimeString} */
function getRelativeTimeString(date, style) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "auto",
    style,
  });
  const diff = date.getTime() - Date.now();
  const unit = getTimeUnit(diff);

  return rtf.format(Math.round(diff / unit.factor), unit.name);
}

export default getRelativeTimeString;
