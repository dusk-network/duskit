import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get, writable } from "svelte/store";
import { partition } from "lamb";

import { createNotificationStore } from "../../..";

/** @typedef {import("../../..").NotificationItem} NotificationItem */
/** @typedef {import("../../..").NotificationInput} NotificationInput */

describe("createNotificationStore", () => {
  const baseDate = new Date(2024, 4, 20, 15, 25, 30);

  /** @type {NotificationItem[]} */
  const baseData = [
    {
      date: new Date(),
      dismissable: true,
      id: "id-1",
      mode: "toast",
      timeout: 3000,
      type: "info",
    },
    {
      date: new Date(),
      dismissable: true,
      id: "id-2",
      mode: "panel",
      read: false,
      type: "warning",
    },
    {
      date: new Date(),
      dismissable: false,
      id: "id-3",
      mode: "toast",
      type: "error",
    },
    {
      date: new Date(),
      dismissable: true,
      id: "id-4",
      mode: "panel",
      read: false,
      type: "warning",
    },
    {
      date: new Date(),
      dismissable: true,
      id: "id-5",
      mode: "panel",
      read: true,
      type: "info",
    },
  ];

  const [baseDataPanels, baseDataToasts] = partition(
    baseData,
    (item) => item.mode === "panel"
  );

  /** @type {import("svelte/store").Writable<NotificationItem[]>} */
  let baseStore;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(baseDate);

    baseStore = writable(baseData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should initialize and expose the subscription from the injected store", () => {
    /** @type {NotificationItem[]} */
    const initialData = [
      {
        date: new Date(),
        dismissable: true,
        id: "test-id",
        mode: "toast",
        type: "info",
      },
    ];
    const store = createNotificationStore(writable(initialData));

    expect(get(store)).toStrictEqual(initialData);
  });

  it("should expose derived stores for panels and toasts", () => {
    const store = createNotificationStore(baseStore);
    const panelsState = get(store.panels);
    const toastsState = get(store.toasts);

    expect(panelsState).toHaveLength(
      baseData.filter(({ mode }) => mode === "panel").length
    );
    expect(panelsState[0].id).toBe("id-2");
    expect(panelsState[0].read).toBe(false);

    expect(toastsState).toHaveLength(
      baseData.filter(({ mode }) => mode === "toast").length
    );
    expect(toastsState[0].id).toBe("id-1");
    expect(toastsState[1].id).toBe("id-3");
  });

  it("should expose derived stores for the panel count and the unread count", () => {
    const unreadInBaseData = baseDataPanels.filter(
      ({ read }) => read === false
    );

    // test pre-conditions
    expect(baseDataPanels.length).toBeGreaterThan(1);
    expect(unreadInBaseData.length).toBeGreaterThan(0);
    expect(baseDataPanels.length).not.toBe(unreadInBaseData.length);

    const store = createNotificationStore(baseStore);

    expect(get(store.panelCount)).toBe(baseDataPanels.length);
    expect(get(store.unreadCount)).toBe(unreadInBaseData.length);
  });

  it("should expose a method to add a new notification, auto-generate its `id` and `date`, add panel and toast specific properties and place it at the top", () => {
    const store = createNotificationStore(writable([]));

    /** @type {NotificationInput} */
    const newNotificationData = {
      mode: "panel",
      text: "Test notification",
      title: "Test",
      type: "success",
    };

    const result = store.add(newNotificationData);

    expect(result).toStrictEqual({
      ...newNotificationData,
      date: baseDate,
      dismissable: true,
      id: expect.any(String),
      read: false,
    });

    const state = get(store);

    expect(state).toHaveLength(1);
    expect(state[0]).toStrictEqual(result);

    /** @type {NotificationInput} */
    const secondNotificationData = {
      dismissable: false,
      mode: "toast",
      type: "error",
    };

    const secondResult = store.add(secondNotificationData);
    const newState = get(store);

    expect(newState).toHaveLength(2);
    expect(newState[0]).toStrictEqual(secondResult);
    expect(newState[1]).toStrictEqual(result);
  });

  it("should expose a method to clear all notifications", () => {
    const store = createNotificationStore(baseStore);

    store.clear();

    expect(get(store)).toStrictEqual([]);
  });

  it("should expose a method to clear all panel notifications", () => {
    // test pre-conditions
    expect(baseDataPanels.length).toBeGreaterThan(0);
    expect(baseDataToasts.length).toBeGreaterThan(0);

    const store = createNotificationStore(baseStore);

    store.clearPanels();

    const state = get(store);
    const panelsState = get(store.panels);
    const toastsState = get(store.toasts);

    expect(panelsState).toHaveLength(0);
    expect(toastsState).toHaveLength(baseDataToasts.length);
    expect(state).toHaveLength(baseDataToasts.length);
    expect(state.every((item) => item.mode === "toast")).toBe(true);
  });

  it("should expose a method to clear all toast notifications", () => {
    // test pre-conditions
    expect(baseDataPanels.length).toBeGreaterThan(0);
    expect(baseDataToasts.length).toBeGreaterThan(0);

    const store = createNotificationStore(baseStore);

    store.clearToasts();

    const state = get(store);
    const panelsState = get(store.panels);
    const toastsState = get(store.toasts);

    expect(toastsState).toHaveLength(0);
    expect(panelsState).toHaveLength(baseDataPanels.length);
    expect(state).toHaveLength(baseDataPanels.length);
    expect(state.every((item) => item.mode === "panel")).toBe(true);
  });

  it("should expose a method to return a specific notification by its `id`", () => {
    const baseDataItem = baseData.find(({ id }) => id === "id-2");

    // test pre-condition
    expect(baseDataItem).toBeDefined();

    const store = createNotificationStore(baseStore);

    expect(store.get("id-2")).toStrictEqual(baseDataItem);
    expect(store.get("non-existent")).toBeUndefined();
  });

  it("should expose a method to mark a specific notification as read", () => {
    // test pre-conditions
    expect(baseDataPanels.length).toBeGreaterThan(1);
    expect(baseDataToasts.length).toBeGreaterThan(0);
    expect(baseDataPanels[1]).toHaveProperty("read", false);

    const store = createNotificationStore(baseStore);

    store.markAsRead(baseDataPanels[0].id);
    store.markAsRead(baseDataToasts[0].id);

    const panelsState = get(store.panels);
    const toastsState = get(store.toasts);

    expect(panelsState[0].read).toBe(true);
    expect(panelsState[1].read).toBe(false);
    expect(toastsState[0]).not.toHaveProperty("read");
  });

  it("should expose a method to mark all notifications as read", () => {
    // test pre-conditions
    expect(baseDataPanels.length).toBeGreaterThan(1);
    expect(baseDataToasts.length).toBeGreaterThan(0);

    const store = createNotificationStore(baseStore);

    store.markAllAsRead();

    const panelsState = get(store.panels);
    const toastsState = get(store.toasts);

    expect(panelsState.every((item) => item.read)).toBe(true);

    for (const toastState of toastsState) {
      expect(toastState).not.toHaveProperty("read");
    }

    expect.assertions(3 + toastsState.length);
  });

  it("should expose a method to remove a notification by its `id`", () => {
    // test pre-conditions
    expect(baseData.length).toBeGreaterThanOrEqual(3);

    const store = createNotificationStore(baseStore);

    store.remove(baseData[1].id);

    const state = get(store);

    expect(store.get(baseData[1].id)).toBeUndefined();
    expect(state).toHaveLength(baseData.length - 1);
    expect(state[1].id).toBe(baseData[2].id);
  });

  describe("State merging and namespace transitions", () => {
    const dateOlder = new Date("2026-01-01T10:00:00Z");
    const dateMiddle = new Date("2026-01-01T11:00:00Z");
    const dateNewer = new Date("2026-01-01T12:00:00Z");

    /** @type {NotificationItem} */
    const item1 = {
      date: dateOlder,
      dismissable: true,
      id: "1",
      mode: "panel",
      read: false,
      text: "Older",
      type: "info",
    };

    /** @type {NotificationItem} */
    const item2 = {
      date: dateMiddle,
      dismissable: true,
      id: "2",
      mode: "panel",
      read: false,
      text: "Middle",
      type: "info",
    };

    /** @type {NotificationItem} */
    const item3 = {
      date: dateNewer,
      dismissable: true,
      id: "3",
      mode: "panel",
      read: false,
      text: "Newer",
      type: "info",
    };

    /** @param {(current: NotificationItem[], incoming: NotificationItem[]) => NotificationItem[]} getMergeResult */
    const runMergeScenarios = (getMergeResult) => {
      it("should merge new items into an empty state and sort them by date descending", () => {
        const result = getMergeResult([], [item1, item3, item2]);

        expect(result).toStrictEqual([item3, item2, item1]);
      });

      it("should merge new items into an existing state and maintain descending order", () => {
        const result = getMergeResult([item2], [item3, item1]);

        expect(result).toStrictEqual([item3, item2, item1]);
      });

      it("should resolve ID conflicts by prioritizing incoming items over current ones", () => {
        const incomingItem2 = {
          ...item2,
          date: dateNewer,
          id: "2",
          read: true,
          text: "Updated Middle",
        };
        const result = getMergeResult([item1, item2], [incomingItem2]);

        expect(result).toHaveLength(2);
        expect(result).toStrictEqual([incomingItem2, item1]);
      });

      it("should resolve ID conflicts by keeping the incoming item and sorting it according to its newer date", () => {
        // Setup with an older and a middle item
        const incomingItem2 = {
          ...item2,
          date: dateNewer,
          id: "2",
          read: true,
          text: "Updated Middle",
        };

        const result = getMergeResult([item1, item2], [incomingItem2]);

        expect(result).toHaveLength(2);

        // The incoming one wins the ID conflict and is sorted to the top
        expect(result).toStrictEqual([incomingItem2, item1]);
      });

      it("should resolve ID conflicts by keeping the incoming item even if it has an older date, sorting it below newer items", () => {
        // Setup with a middle and a newer item
        const incomingItem2 = {
          ...item2,
          date: dateOlder,
          id: "2",
          read: true,
          text: "Server Correction",
        };

        const result = getMergeResult([item2, item3], [incomingItem2]);

        expect(result).toHaveLength(2);

        // The incoming one wins the ID conflict (text is updated),
        // but it passively slides to the bottom because item3 is newer.
        expect(result).toStrictEqual([item3, incomingItem2]);
      });

      it("should safely handle merging empty arrays without mutating existing state", () => {
        const result = getMergeResult([item1], []);

        expect(result).toStrictEqual([item1]);
      });
    };

    describe("namespace change routing and memory fallback", () => {
      it("should call the transition strategy with `merger` set to undefined if the merge option is disabled", () => {
        const rawStore = writable([]);
        const transitionStrategy = vi.fn();
        const store = createNotificationStore(rawStore, transitionStrategy);

        store.changeNamespace("new-ns", { clearPrevious: false, merge: false });

        expect(transitionStrategy).toHaveBeenCalledExactlyOnceWith("new-ns", {
          clearOldKey: false,
          merger: undefined,
        });
      });

      it("should clear the state in memory if no transition strategy is provided and merge is disabled", () => {
        const rawStore = writable([item1]);
        const store = createNotificationStore(rawStore);

        store.changeNamespace("new-ns", { clearPrevious: false, merge: false });

        expect(get(store)).toStrictEqual([]);
      });

      it("should preserve the state in memory if no transition strategy is provided and merge is enabled", () => {
        const initialData = [item1];
        const rawStore = writable(initialData);
        const store = createNotificationStore(rawStore);

        store.changeNamespace("new-ns", { clearPrevious: false, merge: true });

        expect(get(store)).toStrictEqual(initialData);
      });
    });

    describe("via direct `store.merge()`", () => {
      runMergeScenarios((currentState, incomingItems) => {
        const rawStore = writable(currentState);
        const store = createNotificationStore(rawStore);

        store.merge(incomingItems);

        return get(store);
      });
    });

    describe("via `changeNamespace()` transition strategy", () => {
      runMergeScenarios((currentState, incomingItems) => {
        // Initial state does not matter here, we only test the injected function
        const rawStore = writable([]);
        const transitionStrategy = vi.fn();
        const store = createNotificationStore(rawStore, transitionStrategy);

        store.changeNamespace("new-ns", { clearPrevious: true, merge: true });

        // Extract the defaultMerger function passed to the strategy
        const passedMerger = transitionStrategy.mock.calls[0][1].merger;

        // Execute it directly and return the result
        return passedMerger(currentState, incomingItems);
      });
    });
  });
});
