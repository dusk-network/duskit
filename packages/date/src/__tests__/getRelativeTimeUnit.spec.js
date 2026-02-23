import { describe, expect, it } from "vitest";

import { getRelativeTimeUnit } from "../..";

describe("getRelativeTimeUnit", () => {
  it("should return the correct relative time unit for positive differences", () => {
    expect(getRelativeTimeUnit(1000 * 60 * 60 * 24 * 365)).toStrictEqual({
      factor: 31536000000,
      name: "year",
    });

    expect(getRelativeTimeUnit(1000 * 60 * 60 * 24 * 30)).toStrictEqual({
      factor: 2592000000,
      name: "month",
    });

    expect(getRelativeTimeUnit(1000 * 60 * 60 * 24 * 7)).toStrictEqual({
      factor: 604800000,
      name: "week",
    });

    expect(getRelativeTimeUnit(1000 * 60 * 60 * 24)).toStrictEqual({
      factor: 86400000,
      name: "day",
    });

    expect(getRelativeTimeUnit(1000 * 60 * 60)).toStrictEqual({
      factor: 3600000,
      name: "hour",
    });

    expect(getRelativeTimeUnit(1000 * 60)).toStrictEqual({
      factor: 60000,
      name: "minute",
    });

    expect(getRelativeTimeUnit(1000)).toStrictEqual({
      factor: 1000,
      name: "second",
    });
  });

  it('should fallback to "second" for differences smaller than 1000ms', () => {
    expect(getRelativeTimeUnit(999)).toStrictEqual({
      factor: 1000,
      name: "second",
    });

    expect(getRelativeTimeUnit(0)).toStrictEqual({
      factor: 1000,
      name: "second",
    });
  });

  it("should handle negative differences correctly", () => {
    expect(getRelativeTimeUnit(-1000 * 60 * 60 * 24 * 365)).toStrictEqual({
      factor: 31536000000,
      name: "year",
    });

    expect(getRelativeTimeUnit(-1000 * 60 * 60)).toStrictEqual({
      factor: 3600000,
      name: "hour",
    });

    expect(getRelativeTimeUnit(-500)).toStrictEqual({
      factor: 1000,
      name: "second",
    });
  });
});
