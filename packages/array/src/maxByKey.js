import { compose, getKey, reduceWith } from "lamb";

/** @type {import("..").maxByKey} */
const maxByKey = (key) =>
  compose(
    getKey(key),
    reduceWith((r, c) => (r[key] > c[key] ? r : c))
  );

export default maxByKey;
