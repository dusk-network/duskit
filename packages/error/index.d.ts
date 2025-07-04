/**
 * Builds an {@link Error | `Error`} object out of any value.
 * If the received value is already an instance of {@link Error | `Error`},
 * it will be returned as it is.
 * If the received value is an object with a `message` string property,
 * an {@link Error | `Error`} with that message will be built.
 *
 * @example
 * getErrorFrom(new TypeError("some message")) // => TypeError: some message
 * getErrorFrom(null) // => Error: Unknown error
 * getErrorFrom("some message") // => Error: some message
 * getErrorFrom({ message: "some message" }) // => Error: some message
 * getErrorFrom({ foo: "bar" }) // => Error: { foo: "bar" }
 *
 */
export declare function getErrorFrom(value: any): Error;
