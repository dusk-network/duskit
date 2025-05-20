import { describe, expect, it } from "vitest";

import { areEqual } from "../..";

describe("areEqual", () => {
  it("should check if the two given array like objects contain equivalent elements in the same positions", () => {
    expect(areEqual([], [])).toBe(true);
    expect(areEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areEqual([1, 2, 3], [1, 3, 2])).toBe(false);
    expect(areEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
    expect(areEqual([1, 2, 3, 4], [1, 2, 3])).toBe(false);
    expect(
      areEqual(Uint8Array.from([1, 2, 3]), Uint8Array.from([1, 2, 3]))
    ).toBe(true);
    expect(
      areEqual(Uint8Array.from([1, 2, 3]), Uint8Array.from([1, 3, 2]))
    ).toBe(false);
    expect(areEqual("abcd", "abcd")).toBe(true);
    expect(areEqual("abcd", "acbd")).toBe(false);
  });

  it("should use the `SameValueZero` comparison", () => {
    expect(areEqual([-0, 1, 2, 3], [0, 1, 2, 3])).toBe(true);
    expect(areEqual([1, NaN, 2], [1, NaN, 2])).toBe(true);
  });
});
