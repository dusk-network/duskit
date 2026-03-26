import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, GapSize } from "../dusk.components";

export type CardProps<T extends keyof HTMLElementTagNameMap = "div"> =
  ControlledHtmlAttributes<SvelteHTMLElements[T]> & {
    as?: T;
    className?: string;
    gap?: GapSize;
    showBody?: boolean;
  };

interface CardSlots {
  header: {};
  default: {};
  footer: {};
}

export default class Card<
  T extends keyof HTMLElementTagNameMap = "div",
> extends SvelteComponent<CardProps<T>, {}, CardSlots> {
  getRootElement(): HTMLElementTagNameMap[T];
}
