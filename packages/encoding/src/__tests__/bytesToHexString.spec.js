import { describe, expect, it } from "vitest";

import { bytesToHexString } from "../..";

describe("bytesToHexString", () => {
  it("should convert a `Uint8Array` into a lowercase hexadecimal string", () => {
    expect(bytesToHexString(Uint8Array.of(255, 174, 2, 83))).toBe("ffae0253");
  });

  it("should pad single digit bytes with leading zeros", () => {
    expect(bytesToHexString(Uint8Array.of(0, 1, 10, 15))).toBe("00010a0f");
  });

  it("should return an empty string when given an empty `Uint8Array`", () => {
    expect(bytesToHexString(new Uint8Array())).toBe("");
  });

  it("should throw a `TypeError` if supplied with `null` or `undefined`", () => {
    // @ts-expect-error
    expect(() => bytesToHexString(null)).toThrow(TypeError);

    // @ts-expect-error
    expect(() => bytesToHexString(undefined)).toThrow(TypeError);
  });

  it("should throw a `TypeError` if supplied with a number, string, or boolean", () => {
    // @ts-expect-error
    expect(() => bytesToHexString(123)).toThrow(TypeError);

    // @ts-expect-error
    expect(() => bytesToHexString("00ff")).toThrow(TypeError);

    // @ts-expect-error
    expect(() => bytesToHexString(false)).toThrow(TypeError);
  });

  it("should throw a `TypeError` if supplied with other iterables", () => {
    function* generator() {
      yield 0;
      yield 255;
    }

    // @ts-expect-error
    expect(() => bytesToHexString(new Uint16Array([0, 255]))).toThrow(
      TypeError
    );

    // @ts-expect-error
    expect(() => bytesToHexString([0, 255])).toThrow(TypeError);

    // @ts-expect-error
    expect(() => bytesToHexString(generator())).toThrow(TypeError);
  });

  it("should throw a TypeError if supplied with an array-like object", () => {
    const arrayLike = { 0: 0, 1: 255, length: 2 };

    // @ts-expect-error
    expect(() => bytesToHexString(arrayLike)).toThrow(TypeError);
  });
});
