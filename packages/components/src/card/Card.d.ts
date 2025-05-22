import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CardProps<T extends keyof HTMLElementTagNameMap = "div"> =
  OmitSvelteSpecificProps<SvelteHTMLElements[T]> & {
    as?: T;
    className?: string;
    gap?: GapSize;
    onSurface?: boolean;
    showBody?: boolean;
  };

interface CardSlots {
  header: {};
  default: {};
  footer: {};
}

export default class Card<
  T extends keyof HTMLElementTagNameMap,
> extends SvelteComponent<CardProps<T>, {}, CardSlots> {
  getRootElement(): HTMLElementTagNameMap[T];
}
