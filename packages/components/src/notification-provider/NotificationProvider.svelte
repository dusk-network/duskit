<svelte:options immutable={true} />

<script>
  import { createPersistedStore } from "@duskit/svelte-stores";
  import { onDestroy, onMount, setContext } from "svelte";

  /** @typedef {import("./NotificationProvider").NotificationProviderProps} NotificationProviderProps */
  /** @typedef {import("../__shared__/notifications").NotificationNamespaceOptions} NotificationNamespaceOptions */
  /** @typedef {import("../__shared__/notifications").NotificationItem} NotificationItem */

  import {
    NOTIFICATION_CONTEXT_KEY,
    NOTIFICATION_EVENT_KEY,
    NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
    NOTIFICATION_STORAGE_KEY,
  } from "../__shared__/constants";
  import createNotificationStore from "../__shared__/createNotificationStore";
  import notifier from "../__shared__/notifier";

  /** @type {NotificationProviderProps["initialNamespace"]} */
  export let initialNamespace = undefined;

  // Resolved once during initialization to serve as a persistent fallback
  const baseNamespace = initialNamespace ?? NOTIFICATION_STORAGE_KEY;

  /** @typedef {import("../__shared__/notifications").NotificationInput} NotificationInput */

  /** @type {(key: string, value: any) => any} */
  function dateReviver(key, value) {
    if (key === "date" && typeof value === "string") {
      return new Date(value);
    }

    return value;
  }

  /**
   * Handles the namespace change event dispatched by the notifier.
   *
   * @param {CustomEvent<{ namespace: string, options: NotificationNamespaceOptions }>} event
   */
  function handleNamespaceChange(event) {
    const { namespace: newNamespace, options } = event.detail;

    // An empty string triggers a fallback to the base namespace.
    store.changeNamespace(newNamespace || baseNamespace, options);
  }

  /** @type {NotificationItem[]} */
  const initialData = [];

  const rawStore = createPersistedStore(baseNamespace, initialData, {
    reviver: dateReviver,
  });

  const store = createNotificationStore(rawStore, (name, config) =>
    rawStore.rebind(name, config)
  );

  setContext(NOTIFICATION_CONTEXT_KEY, store);

  /** @param {CustomEvent<NotificationInput>} event */
  const handleNotification = (event) => {
    store.add(event.detail);
  };

  onMount(() => {
    notifier.addEventListener(NOTIFICATION_EVENT_KEY, handleNotification);
    notifier.addEventListener(
      NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
      handleNamespaceChange
    );
  });

  onDestroy(() => {
    notifier.removeEventListener(NOTIFICATION_EVENT_KEY, handleNotification);
    notifier.removeEventListener(
      NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
      handleNamespaceChange
    );
  });
</script>

<slot />
