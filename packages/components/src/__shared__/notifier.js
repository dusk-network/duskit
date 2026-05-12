import { areSVZ } from "lamb";

import {
  NOTIFICATION_EVENT_KEY,
  NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY,
} from "./constants";

/** @typedef {import("./notifications").NotificationEmitter} NotificationEmitterType */
/** @typedef {import("./notifications").NotificationNamespaceOptions} NotificationNamespaceOptions */
/** @typedef {import("./notifications").NotificationPanelPayload} NotificationPanelPayload */
/** @typedef {import("./notifications").NotificationToastPayload} NotificationToastPayload */

/** @implements {NotificationEmitterType} */
class NotificationEmitter extends EventTarget {
  /**
   * @param {() => unknown} getIdentity
   * @returns {Pick<NotificationEmitterType, "panel" | "toast">}
   */
  bounded(getIdentity) {
    const snapshot = getIdentity();
    const isValid = () => areSVZ(snapshot, getIdentity());

    /** @param {"panel" | "toast"} type */
    const warnDiscarded = (type) => {
      // eslint-disable-next-line no-console
      console.warn(
        `Notification discarded: identity context changed before dispatching "${type}"`
      );
    };

    return {
      panel: (data) => (isValid() ? this.panel(data) : warnDiscarded("panel")),
      toast: (data) => (isValid() ? this.toast(data) : warnDiscarded("toast")),
    };
  }

  /**
   * @param {string} name
   * @param {NotificationNamespaceOptions} options
   */
  namespace(name, options) {
    this.dispatchEvent(
      new CustomEvent(NOTIFICATION_NAMESPACE_CHANGE_EVENT_KEY, {
        detail: {
          namespace: name,
          options,
        },
      })
    );
  }

  /** @param {NotificationPanelPayload} data */
  panel(data) {
    this.dispatchEvent(
      new CustomEvent(NOTIFICATION_EVENT_KEY, {
        detail: { ...data, mode: "panel" },
      })
    );
  }

  /** @param {NotificationToastPayload} data */
  toast(data) {
    this.dispatchEvent(
      new CustomEvent(NOTIFICATION_EVENT_KEY, {
        detail: { ...data, mode: "toast" },
      })
    );
  }
}

/** @type {NotificationEmitterType} */
export default new NotificationEmitter();
