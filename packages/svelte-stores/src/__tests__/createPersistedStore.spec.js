import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "svelte/store";

describe("createPersistedStore", () => {
  const initialValue = { count: 0, text: "initial" };
  const testKey = "test-store";

  beforeEach(() => {
    localStorage.clear();
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

      it("shouldn't attempt a merge and return the stored value if the initial value is `null` or `undefined`", () => {
        const storedValue = { count: 1, text: "stored" };

        localStorage.setItem(testKey, JSON.stringify(storedValue));

        const storeA = createPersistedStore(testKey, null);
        const storeB = createPersistedStore(testKey, void 0);

        expect(get(storeA)).toStrictEqual(storedValue);
        expect(get(storeB)).toStrictEqual(storedValue);
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

      it("should give precedence to the stored value, if exists, even if its parsed value is `null`", () => {
        localStorage.setItem(testKey, JSON.stringify(null));

        const store = createPersistedStore(testKey, {});

        expect(get(store)).toBeNull();
      });
    });

    describe("persistence", () => {
      it("should persist the new value to localStorage on set", () => {
        const store = createPersistedStore(testKey, initialValue);
        const newValue = { count: 1, text: "updated" };

        store.set(newValue);

        expect(JSON.parse(localStorage.getItem(testKey) ?? "")).toStrictEqual(
          newValue
        );
      });

      it("should persist the new value to localStorage on update", () => {
        const store = createPersistedStore(testKey, initialValue);

        store.update((current) => ({ ...current, count: current.count + 1 }));

        expect(JSON.parse(localStorage.getItem(testKey) ?? "")).toStrictEqual({
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
  });
});
