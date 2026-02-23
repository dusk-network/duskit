/* eslint-disable sort-keys */

/** @type {import("..").RelativeTimeUnit[]} */
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

/** @type {import("..").getRelativeTimeUnit} */
function getRelativeTimeUnit(diff) {
  for (const unit of units) {
    if (Math.abs(diff) >= unit.factor) {
      return unit;
    }
  }

  return units[6];
}

export default getRelativeTimeUnit;
