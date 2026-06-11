import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export type HeadingProminence =
  | "hero"
  | "major"
  | "strong"
  | "standard"
  | "minor"
  | "subtle";

export type HeadingTag =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span";

export type HeadingTextAlign = "center" | "end" | "start";

export type HeadingVariant =
  | "bracketed-neutral"
  | "bracketed-primary"
  | "bracketed-secondary"
  | "plain";

export type HeadingProps<T extends HeadingTag> = ControlledHtmlAttributes<
  SvelteHTMLElements[T]
> & {
  as: T;
  className?: string;
  mono?: boolean;
  prominence: HeadingProminence;
  textAlign?: HeadingTextAlign;
  uppercase?: boolean;
  variant?: HeadingVariant;
};

interface HeadingSlots {
  default: {};
}

export default class Heading<T extends HeadingTag> extends SvelteComponent<
  HeadingProps<T>,
  {},
  HeadingSlots
> {
  getRootElement(): HTMLElementTagNameMap[T];
}
