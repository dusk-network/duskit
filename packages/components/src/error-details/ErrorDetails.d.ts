import type { SvelteComponent } from "svelte";
import type { HTMLDetailsAttributes } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface ErrorDetailsProps extends ControlledHtmlAttributes<HTMLDetailsAttributes> {
  className?: string;
  error: Error | null;
  summary: string;
}

export default class ErrorDetails extends SvelteComponent<
  ErrorDetailsProps,
  {},
  {}
> {
  getRootElement(): HTMLDetailsElement | null;
}
