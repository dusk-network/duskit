import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export type MiddleEllipsisProps<T extends keyof HTMLElementTagNameMap = "pre"> =
  ControlledHtmlAttributes<SvelteHTMLElements[T]> & {
    as?: T;
    className?: string;
    text: string;
  };

export default class MiddleEllipsis<
  T extends keyof HTMLElementTagNameMap,
> extends SvelteComponent<MiddleEllipsisProps<T>, {}, {}> {
  getRootElement(): HTMLElementTagNameMap[T];
}
