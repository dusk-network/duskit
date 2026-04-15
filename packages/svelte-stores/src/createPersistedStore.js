import { get, writable } from "svelte/store";
import { getErrorFrom } from "@duskit/error";
import { isNil, type } from "lamb";

/**
 * @template T
 * @typedef {import("..").PersistedStoreOptions<T>} PersistedStoreOptions<T>
 */

const isBrowser = "localStorage" in globalThis;

/**
 * Safely serializes and saves a value to local storage.
 *
 * @template T
 * @param {string} key
 * @param {any} value
 * @param {PersistedStoreOptions<T>} options
 * @returns {boolean} True if the save was successful, false otherwise.
 */
function safeSaveToStorage(key, value, options) {
  try {
    localStorage.setItem(key, JSON.stringify(value, options.replacer));

    return true;
  } catch (reason) {
    const error = getErrorFrom(reason);
    const { onSaveError } = options;

    // eslint-disable-next-line no-console
    console.error(`Error while serializing store "${key}":`, error);

    if (onSaveError) {
      onSaveError(error, value);
    }

    return false;
  }
}

/**
 * @template T
 * @param {import("svelte/store").Writable<T>} store
 * @param {{ isRebinding: boolean, key: string }} context
 * @param {T} initialValue
 * @param {PersistedStoreOptions<T>} options
 * @returns {import("..").PersistedStore<T>["rebind"]}
 */
function bindStorageContext(store, context, initialValue, options) {
  const { getLoadErrorFallback, reviver } = options;

  return (newKey, rebindOptions = {}) => {
    if (!isBrowser || context.key === newKey) {
      return;
    }

    const { clearOldKey, merger } = rebindOptions;
    const oldKey = context.key;
    const currentValue = get(store);
    const newValueFromStorage = loadFromStorage(
      newKey,
      initialValue,
      reviver,
      getLoadErrorFallback
    );

    const nextValue = merger
      ? merger(currentValue, newValueFromStorage)
      : newValueFromStorage;

    const isSaveSuccessful = safeSaveToStorage(newKey, nextValue, options);

    if (isSaveSuccessful) {
      context.isRebinding = true;
      context.key = newKey;

      if (clearOldKey) {
        localStorage.removeItem(oldKey);
      }

      store.set(nextValue);
    }
  };
}

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
 * @param {PersistedStoreOptions<T>["reviver"]} reviver
 * @param {PersistedStoreOptions<T>["getLoadErrorFallback"]} getLoadErrorFallback
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
function createPersistedStore(initialKey, initialValue, options = {}) {
  const context = {
    /**
     * Flag used to prevent the subscriber from performing a double I/O
     * operation when the Svelte store is updated after a successful
     * manual storage write during a rebind.
     */
    isRebinding: false,
    key: initialKey,
  };
  const { getLoadErrorFallback, reviver } = options;

  const store = writable(
    isBrowser
      ? loadFromStorage(
          context.key,
          initialValue,
          reviver,
          getLoadErrorFallback
        )
      : initialValue
  );

  if (isBrowser) {
    store.subscribe((value) => {
      if (context.isRebinding) {
        // Resetting the flag to ensure the bypass only affects
        // this specific update, restoring standard persistence
        // for all subsequent changes.
        context.isRebinding = false;

        return;
      }

      safeSaveToStorage(context.key, value, options);
    });
  }

  return {
    ...store,
    rebind: bindStorageContext(store, context, initialValue, options),
  };
}

export default createPersistedStore;
