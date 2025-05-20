import { describe, expect, it } from "vitest";

import { min } from "../..";

describe("min", () => {
  it("should get the minimum value in an array of comparable values", () => {
    const dates = [
      new Date(2024, 1, 2),
      new Date(2024, 1, 4),
      new Date(2024, 1, 3),
    ];

    expect(min([false, true, false])).toBe(false);
    expect(min(dates)).toBe(dates[0]);
    expect(min([-0, 5, 3, 4, 2])).toBe(-0);
    expect(min([6n, 8n, 4n, 3n])).toBe(3n);
    expect(min(Uint8Array.from([10, 6, 2, 3, 4, 7]))).toBe(2);
    expect(min(["bar", "foo", "Foo", "baz"])).toBe("Foo");
  });

  it("should return the last encountered value if `0` or `-0` are the max value", () => {
    expect(min([-0, 1, 0, 4, 5])).toBe(0);
  });

  it("should throw a TypeError if given an empty array", () => {
    expect(() => min([])).toThrow(TypeError);
  });
});
