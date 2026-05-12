import type { ComponentEvents, ComponentProps, SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";
import type Drawer from "../drawer/Drawer";
import type { NotificationFeedProps } from "../notification-feed/NotificationFeed";

type DrawerProps = ComponentProps<Drawer>;

type NotificationPanelProps = ControlledHtmlAttributes<
  SvelteHTMLElements["aside"],
  "aria-hidden" | "inert"
> &
  Pick<NotificationFeedProps, "locale" | "store" | "tooltipId"> &
  Pick<DrawerProps, "open"> & {
    className?: string;
    from?: "left" | "right";
  };

export type NotificationPanelCloseDetails = {
  originalEvent: KeyboardEvent | MouseEvent | PointerEvent;
  reason: "cancel" | "closebutton" | "outsideclick";
};

type NotificationPanelEvents = Omit<
  ComponentEvents<Drawer>,
  "cancel" | "outsideclick"
> & {
  closerequest: CustomEvent<NotificationPanelCloseDetails>;
};

export default class NotificationPanel extends SvelteComponent<
  NotificationPanelProps,
  NotificationPanelEvents,
  {}
> {
  getRootElement(): ReturnType<Drawer["getRootElement"]>;
}
