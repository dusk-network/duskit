import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

describe("observeResize", () => {
  /** @type {import("../../..").observeResize} */
  let observeResize;

  /** @type {((entries: ResizeObserverEntry[]) => void) | undefined} */
  let resizeObserverCallback;

  const disconnectMock = vi.fn();
  const observeMock = vi.fn();
  const unobserveMock = vi.fn();

  beforeEach(async () => {
    // Purge the module cache to reset the internal state
    // (activeSubscribers = 0, observer = null, empty WeakMap)
    vi.resetModules();

    resizeObserverCallback = undefined;

    // Stub the native ResizeObserver globally
    vi.stubGlobal(
      "ResizeObserver",
      class MockResizeObserver {
        /** @param {ResizeObserverCallback} callback */
        constructor(callback) {
          resizeObserverCallback = (entries) => callback(entries, this);
        }

        disconnect = disconnectMock;
        observe = observeMock;
        unobserve = unobserveMock;
      }
    );

    // Dynamically import the module to get a fresh instance for the current test
    observeResize = (await import("../../..")).observeResize;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should return a noop function and prevent initialization if window is undefined (SSR)", () => {
    vi.stubGlobal("window", undefined);

    const element = document.createElement("div");
    const callback = vi.fn();

    const unobserve = observeResize(element, callback);

    // Call the returned function to ensure it doesn't throw
    unobserve();

    // The callback should not be triggered, and the observer should not be instantiated
    expect(resizeObserverCallback).toBeUndefined();
    expect(observeMock).not.toHaveBeenCalled();
  });

  it("should lazily initialize a single ResizeObserver instance for multiple elements", () => {
    const elementA = document.createElement("div");
    const elementB = document.createElement("div");
    const callback = vi.fn();

    observeResize(elementA, callback);
    observeResize(elementB, callback);

    // The observer native method should be called twice
    expect(observeMock).toHaveBeenCalledTimes(2);
    expect(observeMock).toHaveBeenNthCalledWith(1, elementA);
    expect(observeMock).toHaveBeenNthCalledWith(2, elementB);

    // But the constructor should have been captured exactly once
    expect(resizeObserverCallback).toBeTypeOf("function");
  });

  it("should route resize entries to the correct element callbacks", () => {
    const elementA = document.createElement("div");
    const elementB = document.createElement("div");
    const elementC = document.createElement("div"); // Observed, but not resized

    const callbackA = vi.fn();
    const callbackB = vi.fn();
    const callbackC = vi.fn();

    observeResize(elementA, callbackA);
    observeResize(elementB, callbackB);
    observeResize(elementC, callbackC);

    const entryA = { contentRect: { width: 100 }, target: elementA };
    const entryB = { contentRect: { width: 200 }, target: elementB };

    // Simulate the browser firing the resize event with an array of entries
    // @ts-expect-error we don't need the full entries
    resizeObserverCallback([entryA, entryB]);

    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackA).toHaveBeenCalledWith(entryA);

    expect(callbackB).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledWith(entryB);

    // Element C was not in the entries array, so its callback must not be called
    expect(callbackC).not.toHaveBeenCalled();
  });

  it("should call unobserve and remove the element from the map on unsubscribe", () => {
    const element = document.createElement("div");
    const callback = vi.fn();

    const unobserve = observeResize(element, callback);

    unobserve();

    expect(unobserveMock).toHaveBeenCalledTimes(1);
    expect(unobserveMock).toHaveBeenCalledWith(element);

    // Trigger a mock resize for the unobserved element to ensure it was deleted from the WeakMap
    // @ts-expect-error we don't need the full entries
    resizeObserverCallback([{ target: element }]);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should disconnect the observer and clear the instance when the last subscriber unsubscribes", () => {
    const elementA = document.createElement("div");
    const elementB = document.createElement("div");

    const unobserveA = observeResize(elementA, vi.fn());
    const unobserveB = observeResize(elementB, vi.fn());

    // Disconnecting the first element should not trigger a global disconnect
    unobserveA();
    expect(disconnectMock).not.toHaveBeenCalled();

    // Disconnecting the last element should trigger a global disconnect
    unobserveB();
    expect(disconnectMock).toHaveBeenCalledTimes(1);

    // Re-observing an element should instantiate a new ResizeObserver
    resizeObserverCallback = undefined;
    observeResize(elementA, vi.fn());

    expect(resizeObserverCallback).toBeTypeOf("function");
  });

  it("should handle multiple unsubscribe calls safely without corrupting the subscriber count", () => {
    const elementA = document.createElement("div");
    const elementB = document.createElement("div");

    const unobserveA = observeResize(elementA, vi.fn());

    observeResize(elementB, vi.fn());

    // Clumsy consumer calling unobserve multiple times
    unobserveA();
    unobserveA();
    unobserveA();

    // The global disconnect should NOT have been called because elementB is still subscribed
    expect(disconnectMock).not.toHaveBeenCalled();

    // the early return intercepts subsequent calls, preventing native API spam
    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple independent subscriptions to the same DOM element", () => {
    const element = document.createElement("div");

    const callbackA = vi.fn();
    const callbackB = vi.fn();

    const unobserveA = observeResize(element, callbackA);
    const unobserveB = observeResize(element, callbackB);

    // The native observe method should only be called once per element
    expect(observeMock).toHaveBeenCalledTimes(1);

    const entry = { contentRect: { width: 100 }, target: element };

    // Trigger a resize
    // @ts-expect-error we don't need the full entries
    resizeObserverCallback([entry]);

    // Both callbacks should receive the event
    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);

    unobserveA();

    // The native unobserve should NOT be called yet, as callbackB is still listening
    expect(unobserveMock).not.toHaveBeenCalled();

    // Trigger another resize
    // @ts-expect-error we don't need the full entries
    resizeObserverCallback([entry]);

    // Only B should receive the new event
    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(2);

    unobserveB();

    // Now the native unobserve should be called, and observer disconnected
    expect(unobserveMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
