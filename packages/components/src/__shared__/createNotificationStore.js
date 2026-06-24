import {
  compose,
  filterWith,
  getKey,
  sortWith,
  sorterDesc,
  uniquesBy,
} from "lamb";
import { derived, get } from "svelte/store";
import { randomUUID } from "@duskit/string";

/** @typedef {import("./notifications").NotificationItem} NotificationItem */

const getUnreadCount = compose(
  getKey("length"),
  filterWith(({ read }) => !read)
);

/** @type {(items: NotificationItem[]) => NotificationItem[]} */
const normalize = compose(
  sortWith([sorterDesc(getKey("date"))]),
  uniquesBy(getKey("id"))
);

/**
 * @param {NotificationItem[]} current
 * @param {NotificationItem[]} incoming
 */
const defaultMerger = (current, incoming) =>
  normalize(incoming.concat(current));

/** @type {import("./notifications").createNotificationStore} */
function createNotificationStore(store, transitionStrategy) {
  const panels = derived(store, ($store) =>
    $store.filter((item) => item.mode === "panel")
  );
  const toasts = derived(store, ($store) =>
    $store.filter((item) => item.mode === "toast")
  );
  const panelCount = derived(panels, ($panels) => $panels.length);
  const unreadCount = derived(panels, ($panels) => getUnreadCount($panels));

  return {
    add(data) {
      const base = {
        date: new Date(),
        id: randomUUID(),
      };

      /** @type {NotificationItem} */
      const newItem =
        data.mode === "panel"
          ? { ...data, ...base, dismissable: true, read: false }
          : { ...data, ...base };

      store.update((items) => [newItem, ...items]);

      return newItem;
    },

    changeNamespace(name, options) {
      if (typeof transitionStrategy === "function") {
        transitionStrategy(name, {
          clearOldKey: options.clearPrevious,
          merger: options.merge ? defaultMerger : undefined,
        });
      } else if (!options.merge) {
        // Fallback for in-memory stores: if no merge is requested,
        // moving to a new namespace is equivalent to clearing the state.
        this.clear();
      }
    },

    clear() {
      store.set([]);
    },

    clearPanels() {
      store.update((current) =>
        current.filter((item) => item.mode !== "panel")
      );
    },

    clearToasts() {
      store.update((current) =>
        current.filter((item) => item.mode !== "toast")
      );
    },

    get(id) {
      return get(store).find((item) => item.id === id);
    },

    markAllAsRead() {
      store.update((current) =>
        current.map((item) =>
          item.mode === "panel" ? { ...item, read: true } : item
        )
      );
    },

    markAsRead(id) {
      store.update((current) =>
        current.map((item) =>
          item.id === id && item.mode === "panel"
            ? { ...item, read: true }
            : item
        )
      );
    },

    merge(items, merger = defaultMerger) {
      store.update((current) => merger(current, items));
    },

    panelCount,

    get panels() {
      return panels;
    },

    remove(id) {
      store.update((current) => current.filter((item) => item.id !== id));
    },

    subscribe: store.subscribe,

    get toasts() {
      return toasts;
    },

    unreadCount,
  };
}

export default createNotificationStore;
