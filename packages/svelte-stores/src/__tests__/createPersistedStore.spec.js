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
