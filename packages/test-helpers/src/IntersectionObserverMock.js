/** @type {WeakMap<Element, Set<IntersectionObserverMock>>} */
let observersByElement = new WeakMap();

/**
 * @param {Element} element
 * @returns {Set<IntersectionObserverMock>}
 */
const getObserversForElement = (element) => {
  const observers = observersByElement.get(element);

  if (observers) {
    return observers;
  }

  const newObservers = new Set();

  observersByElement.set(element, newObservers);

  return newObservers;
};

/** @type {import("..").IntersectionObserverMock} */
export default class IntersectionObserverMock {
  /** @param {IntersectionObserverCallback} callback */
  constructor(callback) {
    this.callback = callback;
  }

  get root() {
    return document;
  }

  get rootMargin() {
    return "0px 0px 0px 0px";
  }

  get thresholds() {
    return [0];
  }

  /** @type {IntersectionObserverCallback} */
  callback;

  /** @type {Set<Element>} */
  #observedElements = new Set();

  disconnect() {
    this.#observedElements.forEach((element) => {
      this.unobserve(element);
    });
  }

  /**
   * @param {Element} element
   */
  observe(element) {
    const observers = getObserversForElement(element);

    observers.add(this);
    this.#observedElements.add(element);
  }

  takeRecords() {
    return [];
  }

  /**
   * @param {Element} element
   */
  unobserve(element) {
    const observers = observersByElement.get(element);

    if (observers) {
      observers.delete(this);

      if (observers.size === 0) {
        observersByElement.delete(element);
      }
    }

    this.#observedElements.delete(element);
  }

  /**
   * Triggers all the observers registered for the given element.
   *
   * @param {Element} element
   * @param {Partial<IntersectionObserverEntry>} [data]
   */
  static trigger(element, data = {}) {
    const observers = observersByElement.get(element);

    if (!observers || observers.size === 0) {
      return;
    }

    const entry = {
      intersectionRatio: 1,
      isIntersecting: true,
      target: element,
      ...data,
    };

    observers.forEach((observer) => {
      observer.callback(
        [/** @type {IntersectionObserverEntry} */ (entry)],
        observer
      );
    });
  }

  static reset() {
    observersByElement = new WeakMap();
  }
}
