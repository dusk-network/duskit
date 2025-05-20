import { describe, expect, it } from "vitest";

import { maxByKey } from "../..";

describe("maxByKey", () => {
  const testArr = [
    { a: true, d: new Date(2024, 1, 2), uid: "id3", v: 6, x: 0, y: 4n },
    { a: false, d: new Date(2024, 1, 3), uid: "id2", v: 3, x: -0, y: 8n },
    { a: false, d: new Date(2024, 1, 4), uid: "id1", v: 5, x: -1, y: 2n },
  ];

  it("should get the maximum value of a key holding a comparable value in an array of objects", () => {
    expect(maxByKey("a")(testArr)).toBe(true);
    expect(maxByKey("d")(testArr)).toBe(testArr[2].d);
    expect(maxByKey("uid")(testArr)).toBe("id3");
    expect(maxByKey("v")(testArr)).toBe(6);
    expect(maxByKey("y")(testArr)).toBe(8n);
  });

  it("should return the last encountered value if `0` or `-0` are the maximum values", () => {
    expect(maxByKey("x")(testArr)).toBe(-0);
  });

  it("should throw a TypeError if given an empty array", () => {
    expect(() => maxByKey("v")([])).toThrow(TypeError);
  });
});
