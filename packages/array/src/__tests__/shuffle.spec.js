import { afterAll, describe, expect, it, vi } from "vitest";
import { randomInt } from "lamb";

import { shuffle } from "../..";

vi.mock("lamb", async (importOriginal) => {
  /** @type {import("lamb")} */
  const original = await importOriginal();

  return {
    ...original,
    randomInt: vi.fn(original.randomInt),
  };
});

describe("shuffle", () => {
  const array = [1, 2, 3, 4, 5];

  afterAll(() => {
    vi.doUnmock("lamb");
  });

  it("should shuffle the array elements", () => {
    vi.mocked(randomInt)
      .mockReturnValue(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(0);

    let shuffledArray = shuffle(array);

    expect(shuffledArray).toStrictEqual([3, 1, 2, 4, 5]);

    shuffledArray = shuffle(array);
    expect(shuffledArray).toStrictEqual([1, 4, 2, 5, 3]);

    shuffledArray = shuffle(array);
    expect(shuffledArray).toStrictEqual([1, 4, 2, 5, 3]);

    expect(vi.mocked(randomInt).mock.calls.length).toBe(array.length * 3 - 3);

    // this way we keep the function mocked,
    // but we restore the original implementation
    vi.mocked(randomInt).mockReset();
  });

  it("should not mutate the original array", () => {
    const copy = [...array];
    const shuffled = shuffle(array);

    expect(shuffled).not.toBe(array);
    expect(array).toStrictEqual(copy);
  });

  it("should handle empty arrays and arrays with a single element", () => {
    expect(shuffle([])).toStrictEqual([]);
    expect(shuffle([1])).toStrictEqual([1]);
  });
});
