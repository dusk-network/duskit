import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export interface ProgressBarProps extends OmitSvelteSpecificProps<
  SvelteHTMLElements["div"]
> {
  className?: string;
  currentPercentage?: number;
  motionDuration?: number;
}

export default class ProgressBar extends SvelteComponent<
  ProgressBarProps,
  {},
  {}
> {
  getRootElement(): HTMLDivElement;
}
