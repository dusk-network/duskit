import { compose, getKey, reduceWith } from "lamb";

/** @type {import("..").minByKey} */
const minByKey = (key) =>
  compose(
    getKey(key),
    reduceWith((r, c) => (r[key] < c[key] ? r : c))
  );

export default minByKey;
