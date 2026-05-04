import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type {
  ControlledHtmlAttributes,
  SurfaceVariant,
} from "../dusk.components";

export type CardProps<T extends keyof HTMLElementTagNameMap = "div"> =
  ControlledHtmlAttributes<SvelteHTMLElements[T]> & {
    as?: T;
    className?: string;
    variant?: SurfaceVariant;
  };

interface CardSlots {
  default: {};
  footer: {};
  header: {};
}

export default class Card<
  T extends keyof HTMLElementTagNameMap,
> extends SvelteComponent<CardProps<T>, {}, CardSlots> {
  getRootElement(): HTMLElementTagNameMap[T];
}
