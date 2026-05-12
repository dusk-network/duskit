import type { ControlledHtmlAttributes } from "@duskit/components";
import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { NotificationStore } from "../__shared__/notifications";

type ToastContainerProps = ControlledHtmlAttributes<
  SvelteHTMLElements["ul"]
> & {
  className?: string;
  store?: NotificationStore;
  tooltipId?: string;
};

export default class ToastContainer extends SvelteComponent<
  ToastContainerProps,
  {},
  {}
> {
  getRootElement(): HTMLUListElement;
}
