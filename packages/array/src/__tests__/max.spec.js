import { describe, expect, it } from "vitest";

import { max } from "../..";

describe("max", () => {
  it("should get the maximum value in an array of comparable values", () => {
    const dates = [
      new Date(2024, 1, 2),
      new Date(2024, 1, 4),
      new Date(2024, 1, 3),
    ];

    expect(max([false, true, false])).toBe(true);
    expect(max(dates)).toBe(dates[1]);
    expect(max([-0, 5, 3, 4, 2])).toBe(5);
    expect(max([6n, 8n, 4n, 3n])).toBe(8n);
    expect(max(Uint8Array.from([10, 6, 2, 3, 4, 7]))).toBe(10);
    expect(max(["bar", "foo", "Foo", "baz"])).toBe("foo");
  });

  it("should return the last encountered value if `0` or `-0` are the max value", () => {
    expect(max([-0, -1, 0, -4, -5])).toBe(0);
  });

  it("should throw a TypeError if given an empty array", () => {
    expect(() => max([])).toThrow(TypeError);
  });
});
