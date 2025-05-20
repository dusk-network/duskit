import { describe, expect, it } from "vitest";

import { minByKey } from "../..";

describe("minByKey", () => {
  const testArr = [
    { a: true, d: new Date(2024, 1, 2), uid: "id3", v: 6, x: 0, y: 4n },
    { a: false, d: new Date(2024, 1, 3), uid: "id2", v: 3, x: -0, y: 8n },
    { a: false, d: new Date(2024, 1, 4), uid: "id1", v: 5, x: 1, y: 2n },
  ];

  it("should get the minimum value of a key holding a comparable value in an array of objects", () => {
    expect(minByKey("a")(testArr)).toBe(false);
    expect(minByKey("d")(testArr)).toBe(testArr[0].d);
    expect(minByKey("uid")(testArr)).toBe("id1");
    expect(minByKey("v")(testArr)).toBe(3);
    expect(minByKey("y")(testArr)).toBe(2n);
  });

  it("should return the last encountered value if `0` or `-0` are the minimum values", () => {
    expect(minByKey("x")(testArr)).toBe(-0);
  });

  it("should throw a TypeError if given an empty array", () => {
    expect(() => minByKey("v")([])).toThrow(TypeError);
  });
});
