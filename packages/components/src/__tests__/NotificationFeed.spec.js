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
  NotificationFeed,
  createNotificationStore,
} from "../..";

describe("NotificationFeed", () => {
  const baseDate = new Date(2024, 4, 20, 15, 25, 30);

  /** @type {import("../__shared__/notifications").NotificationPanelItem[]} */
  const baseData = [
    {
      date: new Date(baseDate.getTime() - 1000),
      dismissable: true,
      id: "id-1",
      mode: "panel",
      read: false,
      text: "Unread notification text",
      title: "Title 1",
      type: "info",
    },
    {
      date: new Date(baseDate.getTime() - 2000),
      dismissable: true,
      id: "id-2",
      mode: "panel",
      read: true,
      text: "Read notification text",
      title: "Title 2",
      type: "success",
    },
  ];

  /** @type {import("../__shared__/notifications").NotificationStore} */
  let store;

  vi.useFakeTimers();

  beforeEach(() => {
    vi.setSystemTime(baseDate);
    store = createNotificationStore(writable(baseData));
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render the empty state when there are no notifications", () => {
    const emptyStore = createNotificationStore(writable([]));
    const { getByLabelText, getByText } = render(NotificationFeed, {
      props: { store: emptyStore },
    });

    const btnClearAll = getByLabelText(/clear all notifications/i);
    const btnMarkAll = getByLabelText(/mark all as read/i);

    expect(getByText("You have no notifications.")).toBeInTheDocument();
    expect(btnClearAll).toBeDisabled();
    expect(btnMarkAll).toBeDisabled();
    expect(btnClearAll).toHaveAttribute("data-tooltip-disabled", "true");
    expect(btnMarkAll).toHaveAttribute("data-tooltip-disabled", "true");
  });

  it("should render the feed with notifications and the correct header text", () => {
    const { getByLabelText, getByText } = render(NotificationFeed, {
      props: { store },
    });

    const btnClearAll = getByLabelText(/clear all notifications/i);
    const btnMarkAll = getByLabelText(/mark all as read/i);

    expect(getByText("Showing", { exact: false })).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("1", { selector: "strong" })).toBeInTheDocument();
    expect(btnClearAll).not.toBeDisabled();
    expect(btnMarkAll).not.toBeDisabled();
    expect(btnClearAll).not.toHaveAttribute("data-tooltip-disabled");
    expect(btnMarkAll).not.toHaveAttribute("data-tooltip-disabled");
    expect(getByText("Title 1")).toBeInTheDocument();
    expect(getByText("Title 2")).toBeInTheDocument();
  });

  it("should use the store from the context if the `store` prop is not provided", () => {
    const context = new Map();
    context.set(NOTIFICATION_CONTEXT_KEY, store);

    const { getByText } = render(NotificationFeed, { context });

    expect(getByText("Title 1")).toBeInTheDocument();
    expect(getByText("Title 2")).toBeInTheDocument();
  });

  it("should dynamically update the UI when notifications are added to or removed from the store", async () => {
    const emptyStore = createNotificationStore(writable([]));
    const { getByText, queryByText } = render(NotificationFeed, {
      props: { store: emptyStore },
    });

    expect(getByText("You have no notifications.")).toBeInTheDocument();
    expect(queryByText("Showing", { exact: false })).not.toBeInTheDocument();

    emptyStore.add({
      mode: "panel",
      text: "Dynamically added text",
      title: "Dynamic Title",
      type: "info",
    });

    await tick();

    expect(queryByText("You have no notifications.")).not.toBeInTheDocument();
    expect(getByText("Showing", { exact: false })).toBeInTheDocument();
    expect(getByText("Dynamic Title")).toBeInTheDocument();

    emptyStore.clearPanels();

    await tick();

    expect(getByText("You have no notifications.")).toBeInTheDocument();
    expect(queryByText("Dynamic Title")).not.toBeInTheDocument();
  });

  it("should pass additional class names and attributes to the root element", () => {
    const props = {
      className: "custom-test-class",
      "data-testid": "feed-root",
      store,
    };
    const { component } = render(NotificationFeed, { props });
    const rootElement = component.getRootElement();

    expect(rootElement).toHaveClass("dusk-notification-feed");
    expect(rootElement).toHaveClass("custom-test-class");
    expect(rootElement).toHaveAttribute("data-testid", "feed-root");
  });

  it("should clear the notifications when the related button is clicked", async () => {
    const clearNotificationsSpy = vi.spyOn(store, "clearPanels");
    const { getByLabelText, getByText, queryByText } = render(
      NotificationFeed,
      {
        props: { store },
      }
    );
    const btnClearAll = getByLabelText(/clear all notifications/i);

    expect(queryByText("You have no notifications.")).toBeNull();

    await fireEvent.click(btnClearAll);

    expect(clearNotificationsSpy).toHaveBeenCalledOnce();
    expect(getByText("You have no notifications.")).toBeInTheDocument();

    clearNotificationsSpy.mockRestore();
  });

  it("should mark all notifications as read  when the related button is clicked", async () => {
    const markAllSpy = vi.spyOn(store, "markAllAsRead");
    const { getByLabelText } = render(NotificationFeed, {
      props: { store },
    });

    const btnMarkAll = getByLabelText(/mark all as read/i);
    await fireEvent.click(btnMarkAll);

    expect(markAllSpy).toHaveBeenCalledOnce();
  });

  it("should remove a notification when the related button is clicked", async () => {
    const removeSpy = vi.spyOn(store, "remove");
    const { getAllByLabelText } = render(NotificationFeed, {
      props: { store },
    });

    const dismissButtons = getAllByLabelText(/dismiss/i);
    await fireEvent.click(dismissButtons[0]);

    expect(removeSpy).toHaveBeenCalledExactlyOnceWith("id-1");
  });

  it("should mark a notification as read when the related button is clicked", async () => {
    const markAsReadSpy = vi.spyOn(store, "markAsRead");
    const { getByLabelText } = render(NotificationFeed, {
      props: { store },
    });

    const btnMarkAsRead = getByLabelText(/mark as read/i);
    await fireEvent.click(btnMarkAsRead);

    expect(markAsReadSpy).toHaveBeenCalledExactlyOnceWith("id-1");
  });

  it("should pass the `tooltipId` to its own buttons and down to the `Notification` components", async () => {
    const { getAllByLabelText, getByLabelText, rerender } = render(
      NotificationFeed,
      {
        props: { store },
      }
    );

    const btnClearAll = getByLabelText(/clear all notifications/i);
    const btnMarkAll = getByLabelText(/mark all as read/i);

    expect(btnClearAll).not.toHaveAttribute("data-tooltip-id");
    expect(btnMarkAll).not.toHaveAttribute("data-tooltip-id");

    const dismissButtons = getAllByLabelText(/dismiss/i);
    const markAsReadButtons = getAllByLabelText(/mark as read/i);

    for (const btn of dismissButtons) {
      expect(btn).not.toHaveAttribute("data-tooltip-id");
    }

    for (const btn of markAsReadButtons) {
      expect(btn).not.toHaveAttribute("data-tooltip-id");
    }

    await rerender({ tooltipId: "my-tooltip" });

    expect(btnClearAll).toHaveAttribute("data-tooltip-id", "my-tooltip");
    expect(btnMarkAll).toHaveAttribute("data-tooltip-id", "my-tooltip");

    for (const btn of dismissButtons) {
      expect(btn).toHaveAttribute("data-tooltip-id", "my-tooltip");
    }

    for (const btn of markAsReadButtons) {
      expect(btn).toHaveAttribute("data-tooltip-id", "my-tooltip");
    }
  });

  describe("Extra actions", () => {
    it("should render extra actions when provided", () => {
      const extraActions = [
        { iconPath: "path1", label: "Action 1", onClick: vi.fn() },
        {
          disabled: true,
          iconPath: "path2",
          label: "Action 2",
          onClick: vi.fn(),
        },
      ];
      const { getByLabelText } = render(NotificationFeed, {
        props: { extraActions, store, tooltipId: "test-tooltip" },
      });
      const action1Btn = getByLabelText("Action 1");

      const action2Btn = getByLabelText("Action 2");

      expect(action1Btn).toBeInTheDocument();
      expect(action1Btn).not.toBeDisabled();
      expect(action1Btn).toHaveAttribute("data-tooltip-id", "test-tooltip");
      expect(action1Btn).toHaveAttribute("data-tooltip-text", "Action 1");
      expect(action1Btn.querySelector("path")).toHaveAttribute("d", "path1");

      expect(action2Btn).toBeInTheDocument();
      expect(action2Btn).toBeDisabled();
      expect(action2Btn).toHaveAttribute("data-tooltip-disabled", "true");
      expect(action2Btn).toHaveAttribute("data-tooltip-id", "test-tooltip");
      expect(action2Btn).toHaveAttribute("data-tooltip-text", "Action 2");
      expect(action2Btn.querySelector("path")).toHaveAttribute("d", "path2");
    });

    it("should fire the onClick callback when an extra action is clicked", async () => {
      const onClickSpy = vi.fn();
      const extraActions = [
        {
          iconPath: "path-click",
          label: "Clickable Action",
          onClick: onClickSpy,
        },
      ];

      const { getByLabelText } = render(NotificationFeed, {
        props: { extraActions, store },
      });

      const actionBtn = getByLabelText("Clickable Action");
      await fireEvent.click(actionBtn);

      expect(onClickSpy).toHaveBeenCalledOnce();
    });

    it("should not crash and ignore extraActions if it is not an array", () => {
      const { queryByLabelText } = render(NotificationFeed, {
        // @ts-expect-error: Testing invalid input
        props: { extraActions: { label: "Invalid" }, store },
      });

      expect(queryByLabelText("Invalid")).toBeNull();
    });
  });
});
