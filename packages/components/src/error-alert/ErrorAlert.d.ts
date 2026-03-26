import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, GapSize } from "../dusk.components";

export interface ErrorAlertProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"]
> {
  className?: string;
  error: Error;
  gap?: GapSize;
  summary: string;
}

export default class ErrorAlert extends SvelteComponent<
  ErrorAlertProps,
  {},
  {}
> {
  getRootElement(): HTMLDivElement;
}
