import { writable } from "svelte/store";
import { getErrorFrom } from "@duskit/error";

const isBrowser = "localStorage" in globalThis;

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @param {import("..").PersistedStoreOptions<T>["reviver"]} reviver
 * @param {import("..").PersistedStoreOptions<T>["getLoadErrorFallback"]} getLoadErrorFallback
 * @returns {T}
 */
function loadFromStorage(key, initialValue, reviver, getLoadErrorFallback) {
  const storedValue = localStorage.getItem(key);

  try {
    if (storedValue) {
      return JSON.parse(storedValue, reviver);
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
