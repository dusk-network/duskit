import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "svelte/store";

/**
 * Safely retrieves and parses a JSON value from local storage.
 * Prevents syntax errors during tests if the key is missing.
 *
 * @param {string} key - The local storage key to read.
 * @returns {any} The parsed value, or null if the key does not exist.
 */
function getStoredValue(key) {
  return JSON.parse(localStorage.getItem(key) ?? "null");
}

describe("createPersistedStore", () => {
  const initialValue = { count: 0, text: "initial" };
  const testKey = "test-store";

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe("in a non-browser environment (SSR)", () => {
    it("should initialize with the initial value without accessing `localStorage`", async () => {
      vi.resetModules();

      const realLocalStorage = globalThis.localStorage;

      // @ts-ignore we need to do it to test the case
      delete globalThis.localStorage;

      const { createPersistedStore } = await import("../..");

      const store = createPersistedStore(testKey, initialValue);

      expect(get(store)).toStrictEqual(initialValue);

      globalThis.localStorage = realLocalStorage;

      vi.resetModules();
    });

    it("should safely ignore rebind calls without breaking or accessing `localStorage`", async () => {
      vi.resetModules();

      const realLocalStorage = globalThis.localStorage;

      // @ts-ignore we need to do it to test the case
      delete globalThis.localStorage;

      const { createPersistedStore } = await import("../..");

      const store = createPersistedStore(testKey, initialValue);

      // This should not throw as no attempt to clear local
      // storage has been made.
      store.rebind("some-new-key", { clearOldKey: true });

      expect(get(store)).toStrictEqual(initialValue);

      globalThis.localStorage = realLocalStorage;

      vi.resetModules();
    });
  });

  describe("in a browser environment", async () => {
    const { createPersistedStore } = await import("../..");

    describe("initialization", () => {
      it("should initialize with the initial value if `localStorage` is empty", () => {
        const store = createPersistedStore(testKey, initialValue);

        expect(get(store)).toStrictEqual(initialValue);
      });

      it("should initialize with the value from `localStorage` if it exists", () => {
        const storedValue = { count: 1, text: "stored" };

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, initialValue);

        expect(get(store)).toStrictEqual(storedValue);
      });

      it("should support schema updates and merge the initial value with the one in local storage", () => {
        const storedValue = { count: 1, text: "stored" };

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const newInitialValue = { ...initialValue, extraKey: true };
        const store = createPersistedStore(testKey, newInitialValue);

        expect(get(store)).toStrictEqual({
          ...newInitialValue,
          ...storedValue,
        });
      });

      it("should perform a shallow merge (not deep) for nested objects", () => {
        const newInitialValue = {
          config: { notifications: true, theme: "dark" },
          version: 1,
        };
        const storedValue = {
          config: { theme: "light" },
          version: 1,
        };

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, newInitialValue);

        expect(get(store)).toStrictEqual(storedValue);
      });

      it("shouldn't attempt a merge if the initial value is an array", () => {
        const storedValue = [3, 4, 5];

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, [1, 2, 3]);

        expect(get(store)).toStrictEqual(storedValue);
      });

      it("shouldn't attempt a merge if the initial value is primitive", () => {
        const storedValue = false;

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, true);

        expect(get(store)).toStrictEqual(storedValue);
      });

      it("should reject stored values that differ from nullish initial values", () => {
        const consoleWarnSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});
        const storedValue = { count: 1, text: "stored" };

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const storeA = createPersistedStore(testKey, null);

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const storeB = createPersistedStore(testKey, void 0);

        expect(get(storeA)).toBeNull();
        expect(get(storeB)).toBeUndefined();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(2);

        consoleWarnSpy.mockRestore();
      });

      it("should fall back to the initial value if it's not `null` or `undefined` and add a warning in console when there is a type mismatch between the initial value and the stored one", () => {
        const consoleWarnSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});
        const storedValue = 3;

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, initialValue);

        expect(get(store)).toStrictEqual(initialValue);
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

        consoleWarnSpy.mockRestore();
      });

      it("should give precedence to the initial value even if it's `undefined` if there is no stored value", () => {
        const store = createPersistedStore(testKey, void 0);

        expect(get(store)).toBe(void 0);
      });

      it("should reject a stored `null` when the initial value is not nullish", () => {
        const consoleWarnSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});

        localStorage.setItem(testKey, JSON.stringify(null));

        const store = createPersistedStore(testKey, {});

        expect(get(store)).toStrictEqual({});
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

        consoleWarnSpy.mockRestore();
      });

      it("should use a custom validator for intentionally nullable values", () => {
        const validate = vi.fn((value) => value === null);

        localStorage.setItem(testKey, JSON.stringify(null));

        const store = createPersistedStore(testKey, initialValue, {
          validate,
        });

        expect(get(store)).toBeNull();
        expect(validate).toHaveBeenCalledExactlyOnceWith(null, initialValue);
      });

      it("should reject a stored value that fails custom validation", () => {
        const consoleWarnSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});
        const storedValue = { count: -1, text: "invalid" };

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, initialValue, {
          validate: (value) =>
            typeof value === "object" &&
            value !== null &&
            "count" in value &&
            typeof value.count === "number" &&
            value.count >= 0,
        });

        expect(get(store)).toStrictEqual(initialValue);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          `Validation failed for key "${testKey}". Reverting to initial value.`
        );

        consoleWarnSpy.mockRestore();
      });
    });

    describe("storage selection", () => {
      afterEach(() => {
        vi.restoreAllMocks();
      });

      it("should use the configured synchronous storage", () => {
        const storedValue = { count: 4, text: "session" };
        const getStorage = vi.fn(() => sessionStorage);

        sessionStorage.setItem(testKey, JSON.stringify(storedValue));

        const store = createPersistedStore(testKey, initialValue, {
          getStorage,
        });

        expect(get(store)).toStrictEqual(storedValue);
        expect(getStorage).toHaveBeenCalledOnce();
        expect(localStorage.getItem(testKey)).toBeNull();

        const updatedValue = { count: 5, text: "updated session" };

        store.set(updatedValue);

        expect(
          JSON.parse(sessionStorage.getItem(testKey) ?? "null")
        ).toStrictEqual(updatedValue);
      });

      it("should remain usable when resolving storage throws", () => {
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const storageError = new Error("Storage is blocked");
        const store = createPersistedStore(testKey, initialValue, {
          getStorage: () => {
            throw storageError;
          },
        });

        store.set({ count: 1, text: "memory only" });
        store.rebind("ignored-key", { clearOldKey: true });

        expect(get(store)).toStrictEqual({
          count: 1,
          text: "memory only",
        });
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Error while accessing persisted store storage:",
          storageError
        );
      });
    });

    describe("persistence", () => {
      it("should persist the new value to localStorage on set", () => {
        const store = createPersistedStore(testKey, initialValue);
        const newValue = { count: 1, text: "updated" };

        store.set(newValue);

        expect(getStoredValue(testKey)).toStrictEqual(newValue);
      });

      it("should persist the new value to localStorage on update", () => {
        const store = createPersistedStore(testKey, initialValue);

        store.update((current) => ({ ...current, count: current.count + 1 }));

        expect(getStoredValue(testKey)).toStrictEqual({
          ...initialValue,
          count: 1,
        });
      });
    });

    describe("serialization with replacer / reviver", () => {
      /** @type {(key: string, value: any) => any} */
      const replacer = (key, value) =>
        typeof value === "bigint" ? `${value}n` : value;

      /** @type {(key: string, value: any) => any} */
      const reviver = (key, value) =>
        typeof value === "string" && /^\d+n$/.test(value)
          ? BigInt(value.slice(0, -1))
          : value;

      it("should use the replacer to stringify the value for storage", () => {
        const store = createPersistedStore(testKey, {}, { replacer });
        const newValue = { balance: 100n, id: "user-1" };

        store.set(newValue);

        expect(localStorage.getItem(testKey)).toBe(
          '{"balance":"100n","id":"user-1"}'
        );
      });

      it("should use the reviver to parse the stored value", () => {
        const storedString = '{"balance": "100n", "id": "user-1"}';
        localStorage.setItem(testKey, storedString);

        /** @type {import("svelte/store").Writable<{ balance: bigint, id: string } | null>} */
        const store = createPersistedStore(testKey, null, {
          replacer,
          reviver,
          validate: (value) => typeof value === "object" && value !== null,
        });

        expect(get(store)?.balance).toBe(100n);
      });
    });

    describe("load error handling", () => {
      beforeEach(() => {
        localStorage.setItem(testKey, "{malformed json}");
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      it("should use `initialValue` and log an error if localStorage contains malformed JSON", () => {
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const store = createPersistedStore(testKey, initialValue);

        expect(get(store)).toStrictEqual(initialValue);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          `Error while parsing store "${testKey}":`,
          expect.any(SyntaxError)
        );
      });

      it("should call the load error fallback and use its return value if parsing fails", () => {
        const consoleWarnSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});
        const fallbackValue = { count: -1, text: "fallback" };
        const getLoadErrorFallback = vi.fn(() => fallbackValue);
        const store = createPersistedStore(testKey, initialValue, {
          getLoadErrorFallback,
        });

        expect(get(store)).toStrictEqual(fallbackValue);
        expect(getLoadErrorFallback).toHaveBeenCalledWith(
          expect.any(SyntaxError),
          "{malformed json}"
        );
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          `Error while parsing store "${testKey}":`,
          expect.any(SyntaxError)
        );
      });

      it("should use the `initialValue` and log an error if the load error callback returns `undefined`", () => {
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const getLoadErrorFallback = vi.fn(() => undefined);
        const store = createPersistedStore(testKey, initialValue, {
          getLoadErrorFallback,
        });

        expect(get(store)).toStrictEqual(initialValue);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          `Error while parsing store "${testKey}":`,
          expect.any(SyntaxError)
        );
      });

      it("should handle errors while reading from storage", () => {
        const consoleWarnSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});
        const readError = new Error("Storage read failed");
        const fallbackValue = { count: -1, text: "read fallback" };
        const getLoadErrorFallback = vi.fn(() => fallbackValue);
        const storage = {
          getItem: vi.fn(() => {
            throw readError;
          }),
          setItem: vi.fn(),
        };
        const store = createPersistedStore(testKey, initialValue, {
          getLoadErrorFallback,
          // @ts-expect-error only the exercised Storage methods are needed here
          getStorage: () => storage,
        });

        expect(get(store)).toStrictEqual(fallbackValue);
        expect(getLoadErrorFallback).toHaveBeenCalledWith(readError, null);
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          `Error while parsing store "${testKey}":`,
          readError
        );
      });
    });

    describe("save error handling", () => {
      /** @type {import("vitest").MockInstance} */
      let consoleErrorSpy;

      beforeEach(() => {
        consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      it("should log an error if serialization fails", () => {
        const store = createPersistedStore(testKey, {});
        const circularValue = {};

        circularValue.self = circularValue;

        store.set(circularValue);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          `Error while serializing store "${testKey}":`,
          expect.any(TypeError)
        );
      });

      it("should call onSaveError if serialization fails", () => {
        const onSaveError = vi.fn();
        const store = createPersistedStore(testKey, {}, { onSaveError });
        const circularValue = {};

        circularValue.self = circularValue;

        store.set(circularValue);

        expect(onSaveError).toHaveBeenCalledTimes(1);
        expect(onSaveError).toHaveBeenCalledWith(
          expect.any(TypeError),
          circularValue
        );
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          `Error while serializing store "${testKey}":`,
          expect.any(TypeError)
        );
      });
    });

    describe("rebinding", () => {
      const newKey = "new-test-store";

      beforeEach(() => {
        localStorage.clear();
      });

      it("should safely ignore the operation if the new key matches the current key", () => {
        const store = createPersistedStore(testKey, initialValue);

        // Spying on the prototype prevents jsdom from bypassing the mock,
        // which happens when targeting the global `localStorage` instance directly.
        const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

        store.rebind(testKey);

        expect(getItemSpy).not.toHaveBeenCalled();
      });

      it("should immediately adopt the existing value of the new key from local storage", () => {
        const storedNewValue = { count: 42, text: "new-stored" };

        localStorage.setItem(newKey, JSON.stringify(storedNewValue));

        const store = createPersistedStore(testKey, initialValue);

        store.rebind(newKey);

        expect(get(store)).toStrictEqual(storedNewValue);
      });

      it("should adopt the initial value if the new key does not exist in local storage and persist it immediately", () => {
        const store = createPersistedStore(testKey, initialValue);

        // Changing the store value for the current key
        store.set({ count: 99, text: "mutated" });

        store.rebind(newKey);

        // The store memory should fall back to initialValue since newKey is empty
        expect(get(store)).toStrictEqual(initialValue);

        // The reactive update must immediately create the new key in local storage
        expect(getStoredValue(newKey)).toStrictEqual(initialValue);
      });

      it("should maintain the reactive subscription active across rebinds", () => {
        const store = createPersistedStore(testKey, initialValue);
        const subscriberSpy = vi.fn();

        store.subscribe(subscriberSpy);

        // Clear initial subscription call
        subscriberSpy.mockClear();

        store.rebind(newKey);

        // Subscriber should be called with initialValue (since `newKey` is empty)
        expect(subscriberSpy).toHaveBeenNthCalledWith(1, initialValue);

        const updatedValue = { count: 1, text: "updated" };

        store.set(updatedValue);

        expect(subscriberSpy).toHaveBeenNthCalledWith(2, updatedValue);
      });

      it("should redirect subsequent state updates to the new key in local storage", () => {
        const store = createPersistedStore(testKey, initialValue);

        store.rebind(newKey);

        const updatedValue = { count: 5, text: "redirected" };

        store.set(updatedValue);

        // The old key contains the value written by Svelte's first subscribe.
        // The important thing is that it remains unchanged.
        expect(getStoredValue(testKey)).toStrictEqual(initialValue);

        expect(getStoredValue(newKey)).toStrictEqual(updatedValue);
      });

      it("should permanently remove the old key from local storage if `clearOldKey` is true", () => {
        localStorage.setItem(testKey, JSON.stringify(initialValue));

        const store = createPersistedStore(testKey, initialValue);

        store.rebind(newKey, { clearOldKey: true });

        expect(localStorage.getItem(testKey)).toBeNull();
        expect(getStoredValue(newKey)).toStrictEqual(initialValue);
      });

      it("should complete a rebind if removing the old key fails", () => {
        localStorage.setItem(testKey, JSON.stringify(initialValue));

        const store = createPersistedStore(testKey, initialValue);
        const removalError = new Error("Mocked removal failure");
        const removeItemSpy = vi
          .spyOn(Storage.prototype, "removeItem")
          .mockThrowOnce(removalError);
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        store.rebind(newKey, { clearOldKey: true });

        expect(get(store)).toStrictEqual(initialValue);
        expect(getStoredValue(newKey)).toStrictEqual(initialValue);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          `Error while removing store "${testKey}":`,
          removalError
        );

        removeItemSpy.mockRestore();
        consoleErrorSpy.mockRestore();
      });

      it("should safely keep the old key if writing to the new key fails during rebind with `clearOldKey`", () => {
        localStorage.setItem(testKey, JSON.stringify(initialValue));

        const store = createPersistedStore(testKey, initialValue);

        // Spying on the prototype prevents jsdom from bypassing the mock,
        // which happens when targeting the global `localStorage` instance directly.
        const setItemSpy = vi
          .spyOn(Storage.prototype, "setItem")
          .mockThrowOnce(new Error("Mocked storage failure"));
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        // We create a rebind that will throw, while asking to clear the old key
        store.rebind(newKey, { clearOldKey: true });

        expect(getStoredValue(testKey)).toStrictEqual(initialValue);

        setItemSpy.mockRestore();
        consoleErrorSpy.mockRestore();
      });

      it("should leave the old key in local storage if `clearOldKey` is omitted or false", () => {
        localStorage.setItem(testKey, JSON.stringify(initialValue));

        const store = createPersistedStore(testKey, initialValue);

        store.rebind(newKey);

        expect(getStoredValue(testKey)).toStrictEqual(initialValue);
      });

      it("should use the provided `merger` strategy to resolve the final state", () => {
        const storedOldValue = { count: 10, text: "old" };
        const storedNewValue = { count: 20, text: "new" };
        const merger = vi.fn((oldVal, newVal) => ({
          count: oldVal.count + newVal.count,
          text: newVal.text,
        }));

        localStorage.setItem(testKey, JSON.stringify(storedOldValue));
        localStorage.setItem(newKey, JSON.stringify(storedNewValue));

        const store = createPersistedStore(testKey, initialValue);

        store.rebind(newKey, { merger });

        const expectedMergedValue = { count: 30, text: "new" };

        expect(merger).toHaveBeenCalledExactlyOnceWith(
          storedOldValue,
          storedNewValue
        );
        expect(get(store)).toStrictEqual(expectedMergedValue);
      });
    });
  });
});
