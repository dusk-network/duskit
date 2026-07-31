import { get, writable } from "svelte/store";
import { getErrorFrom } from "@duskit/error";
import { type } from "lamb";

/**
 * @template T
 * @typedef {import("..").PersistedStoreOptions<T>} PersistedStoreOptions<T>
 */

/**
 * Resolves the storage used by a persisted store without accessing browser
 * globals during module evaluation.
 *
 * @template T
 * @param {PersistedStoreOptions<T>} options
 * @returns {Storage | undefined}
 */
function getStorage(options) {
  if (!options.getStorage && !("localStorage" in globalThis)) {
    return undefined;
  }

  try {
    return options.getStorage ? options.getStorage() : globalThis.localStorage;
  } catch (reason) {
    // eslint-disable-next-line no-console
    console.error(
      "Error while accessing persisted store storage:",
      getErrorFrom(reason)
    );

    return undefined;
  }
}

/**
 * Safely serializes and saves a value to storage.
 *
 * @template T
 * @param {Storage} storage
 * @param {string} key
 * @param {any} value
 * @param {PersistedStoreOptions<T>} options
 * @returns {boolean} True if the save was successful, false otherwise.
 */
function safeSaveToStorage(storage, key, value, options) {
  try {
    storage.setItem(key, JSON.stringify(value, options.replacer));

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
 * Removes a value from storage without allowing a storage error to interrupt
 * a successful rebind.
 *
 * @param {Storage} storage
 * @param {string} key
 * @returns {void}
 */
function safeRemoveFromStorage(storage, key) {
  try {
    storage.removeItem(key);
  } catch (reason) {
    // eslint-disable-next-line no-console
    console.error(`Error while removing store "${key}":`, getErrorFrom(reason));
  }
}

/**
 * @template T
 * @param {import("svelte/store").Writable<T>} store
 * @param {{ isRebinding: boolean, key: string, storage: Storage | undefined }} context
 * @param {T} initialValue
 * @param {PersistedStoreOptions<T>} options
 * @returns {import("..").PersistedStore<T>["rebind"]}
 */
function bindStorageContext(store, context, initialValue, options) {
  // eslint-disable-next-line max-statements
  return (newKey, rebindOptions = {}) => {
    if (!context.storage || context.key === newKey) {
      return;
    }

    const { clearOldKey, merger } = rebindOptions;
    const oldKey = context.key;
    const currentValue = get(store);
    const loadResult = loadFromStorage(
      context.storage,
      newKey,
      initialValue,
      options
    );

    if (!loadResult.didRead) {
      return;
    }

    const newValueFromStorage = loadResult.value;

    const nextValue = merger
      ? merger(currentValue, newValueFromStorage)
      : newValueFromStorage;

    const isSaveSuccessful = safeSaveToStorage(
      context.storage,
      newKey,
      nextValue,
      options
    );

    if (isSaveSuccessful) {
      context.isRebinding = true;
      context.key = newKey;

      if (clearOldKey) {
        safeRemoveFromStorage(context.storage, oldKey);
      }

      try {
        store.set(nextValue);
      } finally {
        context.isRebinding = false;
      }
    }
  };
}

/**
 * Creates a writable store that persists its value to a synchronous `Storage`.
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
 * @param {Storage} storage
 * @param {string} key
 * @param {T} initialValue
 * @param {PersistedStoreOptions<T>} options
 * @returns {{ didRead: boolean, value: T }}
 */
// eslint-disable-next-line max-statements
function loadFromStorage(storage, key, initialValue, options) {
  const { getLoadErrorFallback, reviver, validate } = options;
  let didRead = false;
  /** @type {string | null} */
  let storedValue = null;

  try {
    storedValue = storage.getItem(key);
    didRead = true;

    if (storedValue !== null) {
      const parsed = JSON.parse(storedValue, reviver);
      const expectedType = type(initialValue);
      const parsedType = type(parsed);
      const isValid = validate
        ? validate(parsed, initialValue)
        : parsedType === expectedType;

      if (!isValid) {
        // eslint-disable-next-line no-console
        console.warn(
          validate
            ? `Validation failed for key "${key}". Reverting to initial value.`
            : `Type mismatch for key "${key}": expected "${expectedType}", but got "${parsedType}". Reverting to initial value.`
        );

        return { didRead, value: initialValue };
      }

      if (expectedType === "Object" && parsedType === "Object") {
        return { didRead, value: { ...initialValue, ...parsed } };
      }

      return { didRead, value: parsed };
    }
  } catch (reason) {
    const error = getErrorFrom(reason);
    const message = `Error while parsing store "${key}":`;

    if (getLoadErrorFallback) {
      const fallbackValue = getLoadErrorFallback(error, storedValue);

      if (fallbackValue !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(message, error);

        return { didRead, value: fallbackValue };
      }
    }

    // eslint-disable-next-line no-console
    console.error(message, error);
  }

  return { didRead, value: initialValue };
}

/** @type {import("..").createPersistedStore} */
function createPersistedStore(initialKey, initialValue, options = {}) {
  const storage = getStorage(options);
  const context = {
    /**
     * Flag used to prevent the subscriber from performing a double I/O
     * operation when the Svelte store is updated after a successful
     * manual storage write during a rebind.
     */
    isRebinding: false,
    key: initialKey,
    storage,
  };

  const loadResult = storage
    ? loadFromStorage(storage, context.key, initialValue, options)
    : { didRead: false, value: initialValue };
  const store = writable(loadResult.value);
  let skipInitialSave = storage ? !loadResult.didRead : false;

  if (storage) {
    store.subscribe((value) => {
      if (skipInitialSave) {
        skipInitialSave = false;

        return;
      }

      if (context.isRebinding) {
        return;
      }

      safeSaveToStorage(storage, context.key, value, options);
    });
  }

  return {
    ...store,
    rebind: bindStorageContext(store, context, initialValue, options),
  };
}

export default createPersistedStore;
