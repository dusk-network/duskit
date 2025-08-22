/** @vitest-environment node */

import { describe, expect, it, vi } from "vitest";
import { get } from "svelte/store";

import { createPollingDataStore } from "../..";

describe("createPollingDataStore (SSR)", () => {
  const dataRetriever = vi.fn();
  const fetchInterval = 1000;

  it("should create a store with initial values and not crash", () => {
    let store;

    expect(() => {
      store = createPollingDataStore(dataRetriever, fetchInterval);
    }).not.toThrow();

    // @ts-expect-error we know that store is defined now
    expect(get(store)).toStrictEqual({
      data: null,
      error: null,
      isLoading: false,
    });
  });

  it("should do nothing when `start` is called", () => {
    const store = createPollingDataStore(dataRetriever, fetchInterval);
    store.start();

    expect(dataRetriever).not.toHaveBeenCalled();
  });

  it("should do nothing but reset internal state when `stop` is called", () => {
    const store = createPollingDataStore(dataRetriever, fetchInterval);

    expect(() => store.stop()).not.toThrow();
  });
});
