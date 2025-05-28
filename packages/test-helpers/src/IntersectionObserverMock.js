/** @type {import("..").IntersectionObserverMock} */
export default class IntersectionObserverMock {
  get root() {
    return document;
  }

  get rootMargin() {
    return "0px 0px 0px 0px";
  }

  get thresholds() {
    return [0];
  }

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}
