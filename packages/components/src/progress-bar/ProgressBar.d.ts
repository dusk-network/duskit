import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export interface ProgressBarProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["div"]> {
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
