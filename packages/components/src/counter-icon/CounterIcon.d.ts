import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, IconSize } from "../dusk.components";

export type CounterIconProps = ControlledHtmlAttributes<
  SvelteHTMLElements["svg"],
  "role"
> & {
  baseIconPath: string;
  className?: string;
  count: number;
  size?: IconSize;
};

export default class CounterIcon extends SvelteComponent<
  CounterIconProps,
  {},
  {}
> {
  getRootElement(): SVGSVGElement;
}
