import type { SvelteComponent } from "svelte";
import type { AriaRole, SvelteHTMLElements } from "svelte/elements";

import type { IconSize, OmitSvelteSpecificProps } from "../dusk.components";

export type IconProps<T extends "g" | "svg" = "svg"> = OmitSvelteSpecificProps<
  SvelteHTMLElements[T]
> & {
  as?: T;
  className?: string;
  path: string;
  role?: T extends "g" ? never : AriaRole;
  size?: IconSize;
};

export default class Icon<
  T extends "g" | "svg" = "svg",
> extends SvelteComponent<IconProps<T>, {}, {}> {
  getRootElement(): SVGElementTagNameMap[T];
}
