/** @type {import("..").IntersectionObserverMock} */
export default class IntersectionObserverMock {
  static instances = [];

  /** @param {IntersectionObserverCallback} callback */
  constructor(callback) {
    this.callback = callback;
    IntersectionObserverMock.instances.push(this);
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

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}
