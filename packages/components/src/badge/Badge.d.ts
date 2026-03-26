import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, StatusType } from "../dusk.components";

export interface BadgeProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["span"]
> {
  className?: string;
  text?: string;
  variant?: "neutral" | StatusType;
}

export default class Badge extends SvelteComponent<BadgeProps, {}, {}> {
  getRootElement(): HTMLSpanElement;
}
