import { get, writable } from "svelte/store";

import { getErrorFrom } from "@duskit/error";

/**
 * @template T
 * @typedef {import("..").DataStoreContent<T>} DataStoreContent
 */

/** @type {import("..").createDataStore} */
function createDataStore(dataRetriever) {
  /** @type {DataStoreContent<Awaited<ReturnType<typeof dataRetriever>>>} */
  const initialState = {
    data: null,
    error: null,
    isLoading: false,
  };

  const dataStore = writable(initialState);
  const { set, subscribe, update } = dataStore;

  let currentRetrieveId = 0;

  /** @type {(...args: Parameters<typeof dataRetriever>) => Promise<DataStoreContent<Awaited<ReturnType<typeof dataRetriever>>>>} */
  const getData = (...args) => {
    const retrieveId = ++currentRetrieveId;

    update((store) => ({ ...store, error: null, isLoading: true }));

    return dataRetriever(...args)
      .then((data) => {
        if (retrieveId === currentRetrieveId) {
          const newStoreContent = { data, error: null, isLoading: false };

          set(newStoreContent);

          return newStoreContent;
        } else {
          return get(dataStore);
        }
      })
      .catch((error) => {
        if (retrieveId === currentRetrieveId) {
          const newStoreContent = {
            data: null,
            error: getErrorFrom(error),
            isLoading: false,
          };

          set(newStoreContent);

          return newStoreContent;
        } else {
          return get(dataStore);
        }
      });
  };

  const reset = () => {
    /**
     * We don't want pending promises to be written
     * in the store, and we don't want id clashes
     * if `getData` is called immediately after `reset`.
     */
    currentRetrieveId++;
    set(initialState);
  };

  return {
    getData,
    reset,
    subscribe,
  };
}

export default createDataStore;
