import { describe, expect, it } from "vitest";

import { sum } from "../..";

describe("sum", () => {
  it("should sum the values contained in an array of numbers", () => {
    expect(sum([-0, 1, 2, 3, -4, 5])).toBe(7);
    expect(sum([10n, 1n, 3n, -5n, 7n])).toBe(16n);
    expect(sum(Uint8Array.from([0, 1, 2, 3, 4, 5]))).toBe(15);
  });

  it("should throw an exception if the received array is empty", () => {
    expect(() => sum([])).toThrow(TypeError);
  });
});
