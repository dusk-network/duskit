import type { Readable, Writable } from "svelte/store";

import type { StatusType } from "../dusk.components";

export interface NotificationEventMap {
  "@duskit:notificationnamespacechange": CustomEvent<{
    namespace: string;
    options: NotificationNamespaceOptions;
  }>;
  "@duskit:notify": CustomEvent<NotificationInput>;
}

export type NotificationNamespaceOptions = {
  /**
   * Permanently deletes the storage key of the previous namespace.
   * Set this to true when transitioning from an ephemeral state
   * to prevent orphan data accumulation.
   */
  clearPrevious: boolean;

  /**
   * Merges the notifications from the previous namespace into the new one.
   * Duplicate notifications (evaluated by their unique ID) must be discarded.
   */
  merge: boolean;
};

/**
 * We set up specific overloads while keeping the
 * basic `EventTarget` method types to gain
 * the correct type inference for the consumers.
 */
export interface NotificationEmitter extends EventTarget {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener<K extends keyof NotificationEventMap>(
    type: K,
    listener: (
      this: NotificationEmitter,
      event: NotificationEventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  /**
   * Returns a notification dispatcher bound to a specific identity.
   * If the identity changes before a method is called, the notification is discarded.
   *
   * The validation evaluates if the current identity matches the initial
   * snapshot by applying the `SameValueZero` comparison algorithm.
   *
   * @see [SameValueZero comparison](https://262.ecma-international.org/#sec-samevaluezero)
   * @param getIdentity A function returning the current identity value.
   */
  bounded(
    getIdentity: () => unknown
  ): Pick<NotificationEmitter, "panel" | "toast">;

  /**
   * Dispatches a namespace change event.
   * Passing an empty string should make the listener
   * revert to the initial namespace.
   *
   * @param name The new namespace identifier or an empty string to reset.
   * @param options Configuration for the transition.
   */
  namespace(name: string, options: NotificationNamespaceOptions): void;

  panel(data: Omit<NotificationPanelInput, "mode">): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener<K extends keyof NotificationEventMap>(
    type: K,
    listener: (
      this: NotificationEmitter,
      event: NotificationEventMap[K]
    ) => any,
    options?: boolean | EventListenerOptions
  ): void;

  toast(data: Omit<NotificationToastInput, "mode">): void;
}

interface NotificationBase {
  date: Date;
  iconPath?: string;
  id: string;
  text?: string;
  title?: string;
  type: StatusType;
}

export interface NotificationPanelItem extends NotificationBase {
  dismissable: true;
  mode: "panel";
  read: boolean;
}

export interface NotificationToastItem extends NotificationBase {
  dismissable: boolean;
  mode: "toast";
  timeout?: number;
}

export type NotificationItem = NotificationPanelItem | NotificationToastItem;

export interface NotificationInputBase {
  iconPath?: string;
  text?: string;
  title?: string;
  type: StatusType;
}

export interface NotificationPanelInput extends NotificationInputBase {
  mode: "panel";
}

export type NotificationPanelPayload = Omit<NotificationPanelInput, "mode">;

export interface NotificationToastInput extends NotificationInputBase {
  dismissable: boolean;
  mode: "toast";
  timeout?: number;
}

export type NotificationToastPayload = Omit<NotificationToastInput, "mode">;

export type NotificationInput = NotificationPanelInput | NotificationToastInput;

export interface NotificationStore extends Readable<NotificationItem[]> {
  add: (data: NotificationInput) => NotificationItem;

  /**
   * Changes the storage namespace atomically.
   * If the underlying store supports it, it performs an atomic rebind and merge.
   * Otherwise, it falls back to in-memory logic.
   *
   * @param name The new namespace identifier.
   * @param options Configuration for clearing or merging previous data.
   */
  changeNamespace: (
    name: string,
    options: NotificationNamespaceOptions
  ) => void;

  clear: () => void;
  clearPanels: () => void;
  clearToasts: () => void;
  get: (id: string) => NotificationItem | undefined;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;

  /**
   * Merges an array of external notifications into the current state.
   * By default, it preserves chronological order and deduplicates based on ID.
   *
   * @param items The notifications to merge.
   * @param merger An optional custom logic to resolve conflicts.
   */
  merge: (
    items: NotificationItem[],
    merger?: (
      current: NotificationItem[],
      incoming: NotificationItem[]
    ) => NotificationItem[]
  ) => void;
  panelCount: Readable<number>;
  get panels(): Readable<NotificationPanelItem[]>;
  remove: (id: string) => void;
  get toasts(): Readable<NotificationToastItem[]>;
  unreadCount: Readable<number>;
}

export interface NamespaceTransitionStrategy {
  (
    name: string,
    options: {
      clearOldKey?: boolean;
      merger?: (
        current: NotificationItem[],
        incoming: NotificationItem[]
      ) => NotificationItem[];
    }
  ): void;
}

/**
 * Creates a specialized store to manage the notification state.
 * By accepting a `Writable` store from the outside instead of instantiating
 * it internally, this factory acts as a pure domain decorator. This inversion
 * of control decouples the notification logic from any specific persistence
 * mechanism (like `localStorage` or session storage), making the system
 * fully agnostic and trivially easy to test in isolation.
 */
export function createNotificationStore(
  store: Writable<NotificationItem[]>,
  transitionStrategy?: NamespaceTransitionStrategy
): NotificationStore;

/**
 * Retrieves the `NotificationStore` in the current notification
 * context.
 *
 * @throws {Error} If no store is found in the appointed context.
 */
export function getNotificationContext(): NotificationStore;
