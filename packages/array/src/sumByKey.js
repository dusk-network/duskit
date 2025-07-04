import { compose, pluck } from "lamb";

import sum from "./sum";

/** @type {import("..").sumByKey} */
const sumByKey = (key) => compose(sum, pluck(key));

export default sumByKey;
