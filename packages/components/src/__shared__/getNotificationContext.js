import { getContext } from "svelte";

import { NOTIFICATION_CONTEXT_KEY } from "./constants";

/** @type {import("./notifications").getNotificationContext} */
function getNotificationContext() {
  const store = getContext(NOTIFICATION_CONTEXT_KEY);

  if (!store) {
    throw new Error(
      "`getNotificationContext` must be used within a `NotificationProvider`"
    );
  }

  return store;
}

export default getNotificationContext;
