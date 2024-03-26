export default class IntersectionObserver {
  constructor() {
    console.log('constructor')
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

  disconnect() {}

  observe() {}

  takeRecords() {}

  unobserve() {}
}
