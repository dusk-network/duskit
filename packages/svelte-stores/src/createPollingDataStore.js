import { derived, get } from "svelte/store";

import { resolveAfter } from "@duskit/promise";

import createDataStore from "./createDataStore";

/** @type {import("..").createPollingDataStore} */
const createPollingDataStore = (dataRetriever, fetchInterval) => {
  let currentPollId = 0;

  /** @type {Parameters<dataRetriever>?} */
  let resumeArgs = null;

  function visibilityChangeHandler() {
    if (document.hidden && resumeArgs) {
      currentPollId++;
    } else {
      /* istanbul ignore else `resumeArgs` is never `null` here */
      if (resumeArgs) {
        start(...resumeArgs);
      }
    }
  }

  const dataStore = createDataStore(dataRetriever);

  /** @type {(pollId: number, args: Parameters<dataRetriever>) => void} */
  const poll = (pollId, args) => {
    if (pollId === currentPollId) {
      dataStore
        .getData(...args)
        .then((store) =>
          store.error === null
            ? resolveAfter(fetchInterval, undefined).then(() =>
                poll(pollId, args)
              )
            : stop()
        )
        .catch(stop);
    }
  };

  const reset = () => {
    stop();
    dataStore.reset();
  };

  const stop = () => {
    document.removeEventListener("visibilitychange", visibilityChangeHandler);
    resumeArgs = null;
    currentPollId++;
  };

  /** @type {(...args: Parameters<dataRetriever>) => void} */
  const start = (...args) => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);
    resumeArgs = args;
    poll(++currentPollId, args);
  };

  const pollingDataStore = derived(
    dataStore,
    ($dataStore, set) => {
      set($dataStore);
    },
    get(dataStore)
  );

  return {
    reset,
    start,
    stop,
    subscribe: pollingDataStore.subscribe,
  };
};

export default createPollingDataStore;
