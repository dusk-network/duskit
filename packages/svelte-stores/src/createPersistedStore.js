import { writable } from "svelte/store";
import { getErrorFrom } from "@duskit/error";
import { isNil, type } from "lamb";

const isBrowser = "localStorage" in globalThis;

/**
 * Creates a writable store that persists its value to `localStorage`.
 * If a `reviver` is provided in the options, it will be used during
 * parsing to transform the stored value (e.g. to restore complex types like
 * `BigInt` or `Date`) before the merge takes place.
 *
 * It supports schema evolution by performing a shallow merge of the `initialValue`
 * with the stored data if both are plain objects.
 *
 * @remarks
 * The merge is not recursive: nested objects in the stored value will completely
 * overwrite the corresponding nested objects in the `initialValue`.
 *
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @param {import("..").PersistedStoreOptions<T>["reviver"]} reviver
 * @param {import("..").PersistedStoreOptions<T>["getLoadErrorFallback"]} getLoadErrorFallback
 * @returns {T}
 */
// eslint-disable-next-line max-statements
function loadFromStorage(key, initialValue, reviver, getLoadErrorFallback) {
  const storedValue = localStorage.getItem(key);

  try {
    if (storedValue) {
      const parsed = JSON.parse(storedValue, reviver);
      const expectedType = type(initialValue);
      const parsedType = type(parsed);

      if (isNil(initialValue) || isNil(parsed)) {
        return parsed;
      }

      if (parsedType !== expectedType) {
        // eslint-disable-next-line no-console
        console.warn(
          `Type mismatch for key "${key}": expected "${expectedType}", but got "${parsedType}". Reverting to initial value.`
        );

        return initialValue;
      }

      if (expectedType === "Object") {
        return { ...initialValue, ...parsed };
      }

      return parsed;
    }
  } catch (reason) {
    const error = getErrorFrom(reason);
    const message = `Error while parsing store "${key}":`;

    if (getLoadErrorFallback) {
      const fallbackValue = getLoadErrorFallback(error, storedValue);

      if (fallbackValue !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(message, error);

        return fallbackValue;
      }
    }

    // eslint-disable-next-line no-console
    console.error(message, error);
  }

  return initialValue;
}

/** @type {import("..").createPersistedStore} */
function createPersistedStore(key, initialValue, options = {}) {
  const { getLoadErrorFallback, replacer, reviver, onSaveError } = options;
  const store = writable(
    isBrowser
      ? loadFromStorage(key, initialValue, reviver, getLoadErrorFallback)
      : initialValue
  );

  if (isBrowser) {
    store.subscribe((value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value, replacer));
      } catch (reason) {
        const error = getErrorFrom(reason);

        // eslint-disable-next-line no-console
        console.error(`Error while serializing store "${key}":`, error);

        if (onSaveError) {
          onSaveError(error, value);
        }
      }
    });
  }

  return store;
}

export default createPersistedStore;
