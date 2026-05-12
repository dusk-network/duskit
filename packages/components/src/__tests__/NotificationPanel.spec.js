import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { tick } from "svelte";
import { writable } from "svelte/store";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  NOTIFICATION_CONTEXT_KEY,
  NotificationPanel,
  createNotificationStore,
} from "../..";

describe("NotificationPanel", () => {
  /** @type {import("../__shared__/notifications").NotificationStore} */
  let store;

  beforeEach(() => {
    store = createNotificationStore(
      writable([
        {
          date: new Date(),
          dismissable: true,
          id: "id-1",
          mode: "panel",
          read: false,
          text: "Test notification text",
          title: "Test Title",
          type: "info",
        },
      ])
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should not render the notification feed when `open` is false", () => {
    const { queryByText } = render(NotificationPanel, {
      props: { open: false, store },
    });

    expect(queryByText("Test Title")).toBeNull();
  });

  it("should render the notification feed when `open` is true", () => {
    const { getByText } = render(NotificationPanel, {
      props: { open: true, store },
    });

    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("should render an invisible announcer that dynamically updates its message based on the unread notifications count", async () => {
    const { getByRole } = render(NotificationPanel, {
      props: { open: true, store },
    });
    const announcer = getByRole("status");

    expect(announcer).toHaveTextContent("You have 1 unread notifications");

    store.markAllAsRead();

    await tick();

    expect(announcer).toHaveTextContent("No unread notifications");
  });

  it("should not render the notification feed when `open` is false, but should keep the announcer in the DOM", () => {
    const { getByRole, queryByText } = render(NotificationPanel, {
      props: { open: false, store },
    });
    const announcer = getByRole("status");

    expect(queryByText("Test Title")).toBeNull();
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveClass("dusk-notification-panel__announcer");
    expect(announcer).toHaveAttribute("aria-live", "polite");
    expect(announcer).toHaveTextContent("You have 1 unread notifications");
  });

  it("should use the store from the context and pass it to the feed if the `store` prop is not provided", () => {
    const context = new Map();

    context.set(NOTIFICATION_CONTEXT_KEY, store);

    const { getByRole, getByText } = render(NotificationPanel, {
      context,
      props: { open: true },
    });
    const announcer = getByRole("status");

    expect(announcer).toHaveTextContent("You have 1 unread notifications");

    // Verifying that the store from the context is successfully passed down to the NotificationFeed
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("should pass additional class names and attributes to the root element", () => {
    const props = {
      className: "custom-test-class",
      "data-testid": "panel-root",
      open: true,
      store,
    };
    const { component } = render(NotificationPanel, { props });
    const rootElement = component.getRootElement();

    expect(rootElement).toHaveClass("dusk-notification-panel");
    expect(rootElement).toHaveClass("custom-test-class");
    expect(rootElement).toHaveAttribute("data-testid", "panel-root");
  });

  it("should forward the `tooltipId` to the underlying feed", () => {
    const { getByLabelText } = render(NotificationPanel, {
      props: { open: true, store, tooltipId: "test-tooltip" },
    });
    const closeFeedBtn = getByLabelText(/close notification panel/i);

    expect(closeFeedBtn).toHaveAttribute("data-tooltip-id", "test-tooltip");
  });

  it("should dispatch a cancelable `closerequest` event with the correct payload when the close button is clicked", async () => {
    const closeRequestSpy = vi.fn();
    const { getByLabelText } = render(NotificationPanel, {
      events: { closerequest: closeRequestSpy },
      props: { open: true, store },
    });
    const closeBtn = getByLabelText(/close notification panel/i);

    await fireEvent.click(closeBtn);

    expect(closeRequestSpy).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        cancelable: true,
        detail: {
          originalEvent: expect.any(MouseEvent),
          reason: "closebutton",
        },
      })
    );
  });

  it("should dispatch a cancelable `closerequest` event with the correct payload when clicking outside the panel", async () => {
    const closeRequestSpy = vi.fn();

    render(NotificationPanel, {
      events: { closerequest: closeRequestSpy },
      props: { open: true, store },
    });

    // Simulating an outside click at the document level
    await fireEvent.click(document.body);

    expect(closeRequestSpy).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        cancelable: true,
        detail: {
          originalEvent: expect.any(MouseEvent),
          reason: "outsideclick",
        },
      })
    );
  });

  it("should dispatch a cancelable `closerequest` event with the correct payload when pressing the Escape key", async () => {
    const closeRequestSpy = vi.fn();

    render(NotificationPanel, {
      events: { closerequest: closeRequestSpy },
      props: { open: true, store },
    });

    // Simulating the Escape key press at the document level.
    await fireEvent.keyDown(document.body, { key: "Escape" });

    expect(closeRequestSpy).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        cancelable: true,
        detail: {
          originalEvent: expect.any(KeyboardEvent),
          reason: "cancel",
        },
      })
    );
  });
});
