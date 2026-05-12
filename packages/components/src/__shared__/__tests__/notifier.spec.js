import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

import {
  NOTIFICATION_EVENT_KEY,
  NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
  notifier,
} from "../../..";

/** @typedef {import("../notifications").NotificationPanelPayload} NotificationPanelPayload */
/** @typedef {import("../notifications").NotificationToastPayload} NotificationToastPayload */

describe("notifier", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("`bounded` method", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    afterAll(() => {
      consoleWarnSpy.mockRestore();
    });

    it("should return an object strictly exposing only `panel` and `toast` methods", () => {
      const bound = notifier.bounded(() => "user-1");

      expect(bound).toHaveProperty("panel", expect.any(Function));
      expect(bound).toHaveProperty("toast", expect.any(Function));
      expect(Object.keys(bound)).toHaveLength(2);
    });

    it("should dispatch the event if the identity remains exactly the same, applying `SameValueZero` logic", () => {
      const listener = vi.fn();
      const bound = notifier.bounded(() => "user-1");

      notifier.addEventListener(NOTIFICATION_EVENT_KEY, listener);

      // Normal string match
      bound.toast({
        dismissable: false,
        text: "Identity is stable",
        type: "info",
      });

      expect(listener).toHaveBeenCalledTimes(1);

      // `SameValueZero` boundary test: `-0` should match `+0`
      let numericId = -0;

      const numericBound = notifier.bounded(() => numericId);

      numericId = +0;
      numericBound.panel({ text: "SVZ works", type: "success" });

      expect(listener).toHaveBeenCalledTimes(2);

      // `SameValueZero` boundary test: `NaN` should be equal to itself
      const nanBound = notifier.bounded(() => NaN);

      nanBound.panel({ text: "SVZ works again", type: "success" });

      expect(listener).toHaveBeenCalledTimes(3);
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      notifier.removeEventListener(NOTIFICATION_EVENT_KEY, listener);
    });

    it("should quietly discard the notification and log a warning if the identity has changed", () => {
      const listener = vi.fn();

      notifier.addEventListener(NOTIFICATION_EVENT_KEY, listener);

      let currentId = "user-1";

      const bound = notifier.bounded(() => currentId);

      // Simulate a context change
      currentId = "user-2";

      bound.toast({
        dismissable: false,
        text: "This toast should leak",
        type: "error",
      });
      bound.panel({ text: "This panel should leak", type: "warning" });

      expect(listener).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledTimes(2);
      expect(consoleWarnSpy).toHaveBeenNthCalledWith(
        1,
        'Notification discarded: identity context changed before dispatching "toast"'
      );
      expect(consoleWarnSpy).toHaveBeenNthCalledWith(
        2,
        'Notification discarded: identity context changed before dispatching "panel"'
      );

      notifier.removeEventListener(NOTIFICATION_EVENT_KEY, listener);
    });
  });

  it("should dispatch a namespace change event with the provided name and options", () => {
    const listener = vi.fn();
    const testName = "wallet-123";
    const testOptions = {
      clearPrevious: true,
      merge: false,
    };

    notifier.addEventListener(
      NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
      listener
    );

    notifier.namespace(testName, testOptions);

    expect(listener).toHaveBeenCalledTimes(1);

    const event = listener.mock.calls[0][0];

    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe(NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY);
    expect(event.detail).toStrictEqual({
      namespace: testName,
      options: testOptions,
    });

    notifier.removeEventListener(
      NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
      listener
    );
  });

  it('should expose a method that emits a `CustomEvent` with mode "panel"', () => {
    const listener = vi.fn();
    notifier.addEventListener(NOTIFICATION_EVENT_KEY, listener);

    /** @type {NotificationPanelPayload} */
    const testData = {
      text: "Operazione completata",
      type: "success",
    };

    notifier.panel(testData);

    expect(listener).toHaveBeenCalledTimes(1);

    const event = listener.mock.calls[0][0];
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.detail).toStrictEqual({
      ...testData,
      mode: "panel",
    });

    notifier.removeEventListener(NOTIFICATION_EVENT_KEY, listener);
  });

  it('should expose a method that emits a `CustomEvent` with mode "toast"', () => {
    const listener = vi.fn();
    notifier.addEventListener(NOTIFICATION_EVENT_KEY, listener);

    /** @type {NotificationToastPayload} */
    const testData = {
      dismissable: false,
      timeout: 5000,
      type: "error",
    };

    notifier.toast(testData);

    expect(listener).toHaveBeenCalledTimes(1);

    const event = listener.mock.calls[0][0];
    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.detail).toStrictEqual({
      ...testData,
      mode: "toast",
    });

    notifier.removeEventListener(NOTIFICATION_EVENT_KEY, listener);
  });
});
