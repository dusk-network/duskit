/** @type {WeakMap<Element, Set<IntersectionObserverMock>>} */
const observersByElement = new WeakMap();

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
  /** @type {IntersectionObserverCallback} */
  #callback;

  /** @type {Set<Element>} */
  #observedElements = new Set();

  #root;

  #rootMargin;

  #scrollMargin;

  #thresholds;

  /**
   * @param {IntersectionObserverCallback} callback
   * @param {IntersectionObserverInit} [options]
   */
  constructor(callback, options = {}) {
    const threshold = options.threshold ?? 0;

    this.#callback = callback;
    this.#root = options.root ?? null;
    this.#rootMargin = options.rootMargin ?? "0px 0px 0px 0px";
    this.#scrollMargin = options.scrollMargin ?? "";
    this.#thresholds = Array.isArray(threshold) ? threshold : [threshold];
  }

  get root() {
    return this.#root;
  }

  get rootMargin() {
    return this.#rootMargin;
  }

  get scrollMargin() {
    return this.#scrollMargin;
  }

  get thresholds() {
    return this.#thresholds;
  }

  disconnect() {
    [...this.#observedElements].forEach((element) => {
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

    const bounds = element.getBoundingClientRect();

    const entry = {
      boundingClientRect: bounds,
      intersectionRatio: 1,
      intersectionRect: bounds,
      isIntersecting: true,
      rootBounds: bounds,
      target: element,
      time: Date.now(),
      ...data,
    };

    observers.forEach((observer) => {
      observer.#callback([entry], observer);
    });
  }
}
