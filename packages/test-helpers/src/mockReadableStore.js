import { get, writable } from "svelte/store";

/** @type {import("..").mockReadableStore} */
function mockReadableStore(initialValue) {
  const store = writable(initialValue);
  const { set, subscribe } = store;
  const getMockedStoreValue = () => get(store);

  /** @param {typeof initialValue} value */
  const setMockedStoreValue = (value) => set(value);

  return {
    getMockedStoreValue,
    setMockedStoreValue,
    subscribe,
  };
}

export default mockReadableStore;
