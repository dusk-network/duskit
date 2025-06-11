import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { IconSize, OmitSvelteSpecificProps } from "../dusk.components";

export type IconProps<Stacked extends boolean = false> =
  OmitSvelteSpecificProps<
    SvelteHTMLElements[Stacked extends true ? "g" : "svg"]
  > & {
    className?: string;
    isInStack?: Stacked;
    path: string;
    role?: string;
    size?: IconSize;
  };

export default class Icon<Stacked extends boolean> extends SvelteComponent<
  IconProps<Stacked>,
  {},
  {}
> {
  getRootElement(): Stacked extends true ? SVGGElement : SVGSVGElement;
}
