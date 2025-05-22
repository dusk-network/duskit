import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export interface ErrorAlertProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["div"]> {
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
