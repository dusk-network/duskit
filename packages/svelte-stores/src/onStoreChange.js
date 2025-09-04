import { get } from "svelte/store";
import { areSVZ } from "lamb";

/** @type {import("..").onStoreChange} */
function onStoreChange(store, handler) {
  let previous = get(store);

  return store.subscribe((current) => {
    if (!areSVZ(current, previous)) {
      handler(previous, current);
      previous = current;
    }
  });
}

export default onStoreChange;
