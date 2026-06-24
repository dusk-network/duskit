import type { SvelteComponent } from "svelte";
import type { AriaRole, SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, StatusType } from "../dusk.components";

export interface BannerProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "aria-labelledby"
> {
  className?: string;
  role?: AriaRole;
  title: string;
  variant: StatusType;
}

interface BannerSlots {
  default: {};
}

export default class Banner extends SvelteComponent<
  BannerProps,
  {},
  BannerSlots
> {
  getRootElement(): HTMLDivElement;
}
