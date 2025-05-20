import { describe, expect, it } from "vitest";

import { sumByKey } from "../..";

describe("sumByKey", () => {
  const testArr = [
    { v1: 10n, v2: 5 },
    { v1: 11n, v2: -3 },
    { v1: -12n, v2: 6 },
  ];

  it("should sum the numeric values contained in a key in an array of objects", () => {
    expect(sumByKey("v1")(testArr)).toBe(9n);
    expect(sumByKey("v2")(testArr)).toBe(8);
  });

  it("should throw an exception if the build function receives an empty array", () => {
    expect(() => sumByKey("value")([])).toThrow(TypeError);
  });
});
