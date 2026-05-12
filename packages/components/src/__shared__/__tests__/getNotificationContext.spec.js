import * as svelte from "svelte";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

import { NOTIFICATION_CONTEXT_KEY } from "../constants";

import getNotificationContext from "../getNotificationContext";

describe("getNotificationContext", () => {
  const getContextSpy = vi.spyOn(svelte, "getContext");

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should return the store when the context is properly set", () => {
    const dummyStore = { data: {}, subscribe: vi.fn() };

    getContextSpy.mockReturnValueOnce(dummyStore);

    const result = getNotificationContext();

    expect(getContextSpy).toHaveBeenCalledTimes(1);
    expect(getContextSpy).toHaveBeenCalledWith(NOTIFICATION_CONTEXT_KEY);
    expect(result).toStrictEqual(dummyStore);
  });

  it("should throw an error when called outside of the provider", () => {
    getContextSpy.mockReturnValueOnce(undefined);

    expect(() => getNotificationContext()).toThrowError(
      "`getNotificationContext` must be used within a `NotificationProvider`"
    );
    expect(getContextSpy).toHaveBeenCalledTimes(1);
    expect(getContextSpy).toHaveBeenCalledWith(NOTIFICATION_CONTEXT_KEY);
  });
});
