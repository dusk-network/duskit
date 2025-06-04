import { describe, expect, it } from "vitest";

import { hexStringToBytes } from "../..";

describe("hexStringToBytes", () => {
  const expected = Uint8Array.of(255, 174, 2, 83);

  it("should convert a hexadecimal string into a `Uint8Array`", () => {
    expect(hexStringToBytes("ffae0253")).toStrictEqual(expected);
    expect(hexStringToBytes("FFAE0253")).toStrictEqual(expected);
  });

  it("should return an empty `Uint8Array` if supplied with an empty string", () => {
    expect(hexStringToBytes("")).toStrictEqual(new Uint8Array());
  });

  it("shouw throw a `TypeError` if the string has not an even length", () => {
    expect(() => hexStringToBytes("ffae025")).toThrow(TypeError);
  });

  it("should throw a `TypeError` if the string contains invalid characters", () => {
    expect(() => hexStringToBytes("ffaeXX")).toThrow(TypeError);
    expect(() => hexStringToBytes("ffae  0253")).toThrow(TypeError);
  });

  it("should throw a `TypeError` if supplied with `null` or `undefined`", () => {
    // @ts-expect-error
    expect(() => hexStringToBytes(null)).toThrow(TypeError);

    // @ts-expect-error
    expect(() => hexStringToBytes(undefined)).toThrow(TypeError);
  });

  it("should convert every other input to string", () => {
    // @ts-expect-error
    expect(hexStringToBytes(53)).toStrictEqual(Uint8Array.from([83]));

    // @ts-expect-error
    expect(hexStringToBytes({ toString: () => "ffae0253" })).toStrictEqual(
      expected
    );
  });
});
