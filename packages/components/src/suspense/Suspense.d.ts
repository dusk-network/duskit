import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { GapSize, ControlledHtmlAttributes } from "../dusk.components";

export type SuspenseProps<
  R = any,
  T extends keyof HTMLElementTagNameMap = "div",
> = ControlledHtmlAttributes<SvelteHTMLElements[T]> & {
  as?: T;
  className?: string;
  errorMessage?: string;
  errorVariant?: "alert" | "banner" | "details";
  gap?: GapSize;
  pendingMessage?: string;
  waitFor: Promise<R>;
};

interface SuspenseSlots<R> {
  default: {};
  "error-actions": {};
  "error-content": { error: Error };
  "error-extra-content": { error: Error };
  "pending-content": {};
  "success-content": { result: R };
}

export default class Suspense<
  R,
  T extends keyof HTMLElementTagNameMap,
> extends SvelteComponent<SuspenseProps<R, T>, {}, SuspenseSlots<R>> {
  getRootElement(): HTMLElementTagNameMap[T];
}
