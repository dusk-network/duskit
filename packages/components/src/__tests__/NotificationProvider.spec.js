import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import * as svelte from "svelte";
import { createPersistedStore } from "@duskit/svelte-stores";
import { renderWithSimpleContent } from "@duskit/test-helpers";

import {
  NOTIFICATION_CONTEXT_KEY,
  NOTIFICATION_EVENT_KEY,
  NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
  NOTIFICATION_STORAGE_KEY,
  NotificationProvider,
  createNotificationStore,
  notifier,
} from "../..";

vi.mock("@duskit/svelte-stores");

vi.mock("../__shared__/createNotificationStore", () => ({
  default: vi.fn((store) => ({
    ...store,
    _isDecorated: true,
    add: vi.fn(),
    changeNamespace: vi.fn(),
    merge: vi.fn(),
    subscribe: vi.fn(),
  })),
}));

describe("NotificationProvider", () => {
  const addEventListenerSpy = vi.spyOn(notifier, "addEventListener");
  const removeEventListenerSpy = vi.spyOn(notifier, "removeEventListener");
  const setContextSpy = vi.spyOn(svelte, "setContext");

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should orchestrate the store creation and inject it into the Svelte context", () => {
    render(NotificationProvider);

    expect(createPersistedStore).toHaveBeenCalledTimes(1);
    expect(createPersistedStore).toHaveBeenCalledWith(
      NOTIFICATION_STORAGE_KEY,
      [],
      { reviver: expect.any(Function) }
    );
    expect(createNotificationStore).toHaveBeenCalledTimes(1);
    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(setContextSpy).toHaveBeenCalledWith(
      NOTIFICATION_CONTEXT_KEY,
      expect.objectContaining({ _isDecorated: true })
    );
  });

  it("should provide a working reviver function for dates", () => {
    render(NotificationProvider);

    // @ts-expect-error we know we have passed a reviver
    const { reviver } = vi.mocked(createPersistedStore).mock.calls[0][2];
    const validIsoString = "2024-05-20T15:25:30.000Z";
    const revivedDate = reviver("date", validIsoString);

    expect(revivedDate).toBeInstanceOf(Date);
    expect(revivedDate.toISOString()).toBe(validIsoString);
    expect(reviver("date", 123456789)).toBe(123456789);
    expect(reviver("date", null)).toBeNull();
    expect(reviver("id", "123")).toBe("123");
  });

  it("should render its slot content", () => {
    const { container } = renderWithSimpleContent(NotificationProvider);

    expect(container.textContent).toMatchInlineSnapshot(`"some text"`);
  });

  it("should listen to global notification events and clean up on destroy", () => {
    const { unmount } = render(NotificationProvider);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      NOTIFICATION_EVENT_KEY,
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      NOTIFICATION_EVENT_KEY,
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
      expect.any(Function)
    );
  });

  it("should add a notification to the store when a global event is emitted", () => {
    render(NotificationProvider);

    /** @type {Function} */
    const listener = addEventListenerSpy.mock.calls[0][1];

    const mockContext =
      /** @type {import("../__shared__/notifications").NotificationStore} */ (
        setContextSpy.mock.calls[0][1]
      );
    const addSpy = vi.spyOn(mockContext, "add");

    /** @type {import("../__shared__/notifications").NotificationInput} */
    const detail = {
      dismissable: true,
      mode: "toast",
      type: "info",
    };

    const event = new CustomEvent(NOTIFICATION_EVENT_KEY, { detail });

    listener.call(notifier, event);

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledWith(detail);
  });

  it("should initialize the store with a custom namespace if provided", () => {
    const customNamespace = "custom-user-namespace";

    render(NotificationProvider, {
      props: { initialNamespace: customNamespace },
    });

    expect(createPersistedStore).toHaveBeenCalledWith(customNamespace, [], {
      reviver: expect.any(Function),
    });
  });

  it("should provide a working transition strategy to the notification store", () => {
    const mockRebind = vi.fn();

    // @ts-expect-error we only mock the necessary method
    vi.mocked(createPersistedStore).mockReturnValue({ rebind: mockRebind });

    render(NotificationProvider);

    const transitionStrategy = vi.mocked(createNotificationStore).mock
      .calls[0][1];
    const testConfig = { clearOldKey: true };

    // @ts-expect-error we know we have a strategy in place
    transitionStrategy("test-namespace", testConfig);

    expect(mockRebind).toHaveBeenCalledExactlyOnceWith(
      "test-namespace",
      testConfig
    );
  });

  it("should delegate namespace changes to the notification store", () => {
    render(NotificationProvider);

    const mockContext =
      /** @type {import("../__shared__/notifications").NotificationStore} */ (
        setContextSpy.mock.calls[0][1]
      );
    const changeNamespaceSpy = mockContext.changeNamespace;

    const namespace = "new-user-zone";
    const options = { clearPrevious: true, merge: true };

    notifier.namespace(namespace, options);

    expect(changeNamespaceSpy).toHaveBeenCalledExactlyOnceWith(
      namespace,
      options
    );
  });

  it("should fall back to the base namespace when handleNamespaceChange receives an empty string", () => {
    const customInitial = "base-zone";

    render(NotificationProvider, {
      props: { initialNamespace: customInitial },
    });

    const mockContext = /** @type {any} */ (setContextSpy.mock.calls[0][1]);
    const changeNamespaceSpy = mockContext.changeNamespace;

    const options = { clearPrevious: true, merge: false };

    // Trigger change with an empty string to test the "reset" fallback logic
    notifier.namespace("", options);

    expect(changeNamespaceSpy).toHaveBeenCalledExactlyOnceWith(
      customInitial,
      options
    );
  });
});
