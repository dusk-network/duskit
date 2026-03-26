import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface ProgressBarProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "dir" | "role"
> {
  className?: string;
  direction?: "ltr" | "rtl";
  easing?: (t: number) => number;
  motionDuration?: number;
  size?: "default" | "small";
  value?: number;
}

export default class ProgressBar extends SvelteComponent<
  ProgressBarProps,
  {},
  {}
> {
  getRootElement(): HTMLDivElement;
}
