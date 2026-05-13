import {
  adapter,
  allOf,
  always,
  casus,
  identity,
  isNil,
  isType,
  keySatisfies,
} from "lamb";

/** @type {(value: any) => value is Error} */
const isError = isType("Error");

/** @type {(value: any) => value is string} */
const isString = isType("String");

const hasStringMessage =
  /** @type {(source: Record<PropertyKey, any>) => source is { message: string }} */ (
    keySatisfies(isString, "message")
  );

const hasStringName =
  /** @type {(source: Record<PropertyKey, any>) => source is { name: string }} */ (
    keySatisfies(isString, "name")
  );

const isNamedErrorShape = allOf([hasStringName, hasStringMessage]);

/** @param {any} value */
function fallback(value) {
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error("Unknown error");
  }
}

/** @type {import("..").getErrorFrom} */
const getErrorFrom = adapter([
  casus(isError, identity),
  casus(isNil, always(new Error("Unknown error"))),
  casus(isString, (msg) => new Error(msg)),
  casus(isNamedErrorShape, ({ message, name }) => {
    const error = new Error(message);

    error.name = name;

    return error;
  }),
  casus(hasStringMessage, ({ message }) => new Error(message)),
  fallback,
]);

export default getErrorFrom;
