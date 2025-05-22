import type { SvelteComponent } from "svelte";
import type { HTMLDetailsAttributes } from "svelte/elements";

export interface ErrorDetailsProps
  extends OmitSvelteSpecificProps<HTMLDetailsAttributes> {
  className?: string;
  error: Error | null;
  summary: string;
}

export default class ErrorDetails extends SvelteComponent<
  ErrorDetailsProps,
  {},
  {}
> {
  getRootElement(): HTMLDetailsElement;
}
