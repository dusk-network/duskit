import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, StatusType } from "../dusk.components";

type NotificationCommonProps = ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "role"
> & {
  className?: string;
  date: Date;
  dismissable: boolean;
  iconPath?: string;
  locale?: string;
  text?: string;
  title?: string;
  tooltipId?: string;
  type: StatusType;
};

type PanelNotificationProps = NotificationCommonProps & {
  mode: "panel";
  read: boolean;
};

type ToastNotificationProps = NotificationCommonProps & {
  decayProgress: number;
  mode: "toast";
};

type NotificationProps = PanelNotificationProps | ToastNotificationProps;

interface NotificationEvents {
  dismiss: CustomEvent<void>;
  markasread: CustomEvent<void>;
  mouseenter: CustomEvent<void>;
  mouseleave: CustomEvent<void>;
}

interface NotificationSlots {
  default: {};
}

export default class Notification extends SvelteComponent<
  NotificationProps,
  NotificationEvents,
  NotificationSlots
> {
  getRootElement(): HTMLDivElement;
}
