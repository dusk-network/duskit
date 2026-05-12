import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";
import type { NotificationStore } from "../__shared__/notifications";

export interface NotificationFeedAction {
  disabled?: boolean;
  iconPath: string;
  label: string;
  onClick: (event: MouseEvent) => void;
}

type NotificationFeedProps = ControlledHtmlAttributes<
  SvelteHTMLElements["div"]
> & {
  className?: string;
  extraActions?: NotificationFeedAction[];
  locale?: string;
  store?: NotificationStore;
  tooltipId?: string;
};

export default class NotificationFeed extends SvelteComponent<
  NotificationFeedProps,
  {},
  {}
> {
  getRootElement(): HTMLDivElement;
}
