import { beforeEach, describe, expect, it, vi } from "vitest";
import { writable } from "svelte/store";

import { onStoreChange } from "../..";

describe("onStoreChange", () => {
  const handler = vi.fn();

  beforeEach(() => {
    handler.mockClear();
  });

  it("should not call the handler on the initial subscription", () => {
    const store = writable(0);

    onStoreChange(store, handler);

    expect(handler).not.toHaveBeenCalled();
  });

  it("should call the handler with previous and current values when the store changes", () => {
    const store = writable("initial");

    onStoreChange(store, handler);

    store.set("updated");

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith("initial", "updated");
  });

  it("should not call the handler if the new value is the same as the previous one", () => {
    const store = writable(100);

    onStoreChange(store, handler);

    store.set(100);

    expect(handler).not.toHaveBeenCalled();
  });

  it("should correctly handle a sequence of updates", () => {
    const store = writable("initial");

    onStoreChange(store, handler);

    store.set("update 1");

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenNthCalledWith(1, "initial", "update 1");

    store.set("update 2");

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(2, "update 1", "update 2");
  });

  it("should return a working unsubscriber function", () => {
    const store = writable(0);
    const unsubscribe = onStoreChange(store, handler);

    store.set(1);

    expect(handler).toHaveBeenCalledTimes(1);

    handler.mockClear();

    unsubscribe();

    store.set(2);

    expect(handler).not.toHaveBeenCalled();
  });

  describe("detecting changes with the `SameValueZero` comparison", () => {
    it("should treat `0` and `-0` as the same value", () => {
      const store = writable(0);

      onStoreChange(store, handler);

      store.set(-0);

      expect(handler).not.toHaveBeenCalled();
    });

    it("should not call the handler when updating from `NaN` to `NaN`", () => {
      const store = writable(NaN);

      onStoreChange(store, handler);

      store.set(NaN);

      expect(handler).not.toHaveBeenCalled();
    });

    it("should call the handler when changing object reference", () => {
      const initial = { id: 1 };
      const updated = { id: 1 };
      const store = writable(initial);

      onStoreChange(store, handler);

      store.set(updated);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(initial, updated);
    });

    it("should not call the handler if the object reference is the same", () => {
      const initial = { id: 1 };
      const store = writable(initial);

      onStoreChange(store, handler);

      // This is an ugly mutation and the object reference doesn't change
      initial.id = 2;

      store.set(initial);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
