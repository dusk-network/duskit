import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { getContext } from "svelte";

import { randomUUID } from "@duskit/string";

import { DETERMINISTIC_ID_CONTEXT_KEY } from "../constants";
import { getDeterministicId } from "../getDeterministicId";

vi.mock("svelte", () => ({
  getContext: vi.fn(),
}));

vi.mock("@duskit/string", () => ({
  randomUUID: vi.fn(),
}));

describe("getDeterministicId", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should gracefully fallback to a random UUID if the context is completely missing", () => {
    vi.mocked(getContext).mockReturnValueOnce(undefined);
    vi.mocked(randomUUID).mockReturnValueOnce("mocked-uuid-1234");

    const result = getDeterministicId("dusk-checkbox");

    expect(getContext).toHaveBeenCalledExactlyOnceWith(
      DETERMINISTIC_ID_CONTEXT_KEY
    );
    expect(randomUUID).toHaveBeenCalledTimes(1);
    expect(result).toBe("dusk-checkbox-mocked-uuid-1234");
  });

  it("should delegate ID generation to the context method if the provider is correctly configured", () => {
    const fakeGeneratedId = "customApp-dusk-banner-1";

    vi.mocked(getContext).mockReturnValueOnce({
      generateId: () => fakeGeneratedId,
    });

    const result = getDeterministicId("dusk-banner");

    expect(randomUUID).not.toHaveBeenCalled();
    expect(result).toBe(fakeGeneratedId);
  });
});
