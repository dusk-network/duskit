import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps, StatusType } from "../dusk.components";

export interface BadgeProps extends OmitSvelteSpecificProps<
  SvelteHTMLElements["span"]
> {
  className?: string;
  text?: string;
  variant?: "neutral" | StatusType;
}

export default class Badge extends SvelteComponent<BadgeProps, {}, {}> {
  getRootElement(): HTMLSpanElement;
}
