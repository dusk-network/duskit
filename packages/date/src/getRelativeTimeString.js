import getRelativeTimeUnit from "./getRelativeTimeUnit";

/** @type {import("..").getRelativeTimeString} */
function getRelativeTimeString(date, style) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "auto",
    style,
  });
  const diff = date.getTime() - Date.now();
  const unit = getRelativeTimeUnit(diff);

  return rtf.format(Math.round(diff / unit.factor), unit.name);
}

export default getRelativeTimeString;
