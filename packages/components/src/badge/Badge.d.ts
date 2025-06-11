import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export interface BadgeProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["span"]> {
  className?: string;
  text?: string;
  variant?: "neutral" | "success" | "warning" | "error";
}

export default class Badge extends SvelteComponent<BadgeProps, {}, {}> {
  getRootElement(): HTMLSpanElement;
}
