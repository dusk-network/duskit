import { get, writable } from "svelte/store";

import { randomUUID } from "@duskit/string";

/** @typedef {import("./Toast").ToastItem} ToastItem */

/** @type {import("./Toast").toast} */
function addToast(type, message, icon) {
  const id = `dusk-toast-${randomUUID()}`;

  toastList.update((store) => {
    return [
      ...store,
      {
        icon: icon,
        id: id,
        message: message,
        type: type,
      },
    ];
  });

  const timeoutID = window.setTimeout(() => {
    deleteToast(id, timeoutID);
  }, get(toastTimer));
}

/**
 * @param {string} id
 * @param {number} timeout
 */
function deleteToast(id, timeout) {
  window.clearTimeout(timeout);

  // Deletes toast from store queue
  toastList.update((store) => {
    return store.filter((toast) => toast.id !== id);
  });
}

/**
 * @type {import("svelte/store").Writable<ToastItem[]>}
 * @description Stores each toast as an object in the array
 */
export const toastList = writable([]);

/**
 * @type {import("svelte/store").Writable<Number>}
 * @description Stores the timer fused by all toasts
 */
export const toastTimer = writable(2000);

export const toast = addToast;
