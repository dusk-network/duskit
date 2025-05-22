import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export interface ThrobberProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["svg"]> {
  className?: string;
  duration?: number;
  size?: number;
}

export default class Throbber extends SvelteComponent<ThrobberProps, {}, {}> {
  getRootElement(): SVGSVGElement;
}
