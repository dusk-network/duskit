import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface ThrobberProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["svg"],
  "height" | "role" | "viewBox" | "width"
> {
  className?: string;
  duration?: number;
  size?: number;
}

export default class Throbber extends SvelteComponent<ThrobberProps, {}, {}> {
  getRootElement(): SVGSVGElement;
}
