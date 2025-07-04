import {
  condition,
  filterWith,
  joinWith,
  keys,
  pickIf,
  pipe,
  uniques,
} from "lamb";

const joinWithSpace = joinWith(" ");

const makeClassNameFromArray = pipe([
  filterWith(Boolean),
  uniques,
  joinWithSpace,
]);

const makeClassNameFromObject = pipe([pickIf(Boolean), keys, joinWithSpace]);

/**
 * @function
 * @type {import("..").makeClassName}
 */
const makeClassName = condition(
  Array.isArray,
  makeClassNameFromArray,
  makeClassNameFromObject
);

export default makeClassName;
