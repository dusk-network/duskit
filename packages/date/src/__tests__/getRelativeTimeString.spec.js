import { describe, expect, it } from "vitest";

import { getRelativeTimeString } from "../..";

/**
 * Note: We use exact day subtractions (e.g., - 31 days) instead of
 * native Date methods like setMonth() or setFullYear().
 * The underlying utility uses fixed-length approximations
 * (30-day months, 365-day years) to remain dependency-free.
 * Using native calendar methods would introduce flaky tests
 * due to leap years and variable month lengths.
 */
describe("getRelativeTimeString", () => {
  it("should return the correct relative time", () => {
    let date = new Date();

    expect(getRelativeTimeString(date, "long")).toBe("now");

    date.setDate(date.getDate() - 2);
    expect(getRelativeTimeString(date, "long")).toBe("2 days ago");
    expect(getRelativeTimeString(date, "narrow")).toBe("2d ago");

    date = new Date();
    date.setDate(date.getDate() - 7);

    expect(getRelativeTimeString(date, "long")).toBe("last week");
    expect(getRelativeTimeString(date, "short")).toBe("last wk.");

    date = new Date();
    date.setDate(date.getDate() - 14);

    expect(getRelativeTimeString(date, "long")).toBe("2 weeks ago");
    expect(getRelativeTimeString(date, "short")).toBe("2 wk. ago");
    expect(getRelativeTimeString(date, "narrow")).toBe("2w ago");

    date = new Date();
    date.setDate(date.getDate() - 31);

    expect(getRelativeTimeString(date, "long")).toBe("last month");

    date = new Date();
    date.setDate(date.getDate() - 31 * 2);

    expect(getRelativeTimeString(date, "long")).toBe("2 months ago");

    date = new Date();
    date.setDate(date.getDate() - 366);

    expect(getRelativeTimeString(date, "long")).toBe("last year");

    date = new Date();
    date.setDate(date.getDate() - 366 * 2);

    expect(getRelativeTimeString(date, "long")).toBe("2 years ago");
  });
});
