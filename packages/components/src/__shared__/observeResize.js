/** @typedef {import("./observers").ObserveResizeCallback} ObserveResizeCallback */

/** @type {WeakMap<Element, Set<ObserveResizeCallback>>} */
const callbacks = new WeakMap();

const noop = () => {};

/** @type {ResizeObserver | null} */
let observer = null;

let activeSubscribers = 0;

/** @type {import("./observers").observeResize} */
function observeResize(element, callback) {
  if (typeof window === "undefined") {
    return noop;
  }

  if (!observer) {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cbs = callbacks.get(entry.target);

        if (cbs) {
          for (const cb of cbs) {
            cb(entry);
          }
        }
      }
    });
  }

  let elementCallbacks = callbacks.get(element);

  if (!elementCallbacks) {
    elementCallbacks = new Set();
    callbacks.set(element, elementCallbacks);
    observer.observe(element);
  }

  elementCallbacks.add(callback);
  activeSubscribers++;

  return () => {
    const currentCallbacks = callbacks.get(element);

    if (!currentCallbacks || !currentCallbacks.has(callback)) {
      return;
    }

    currentCallbacks.delete(callback);
    activeSubscribers--;

    if (currentCallbacks.size === 0) {
      observer?.unobserve(element);
      callbacks.delete(element);
    }

    if (activeSubscribers === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

export default observeResize;
