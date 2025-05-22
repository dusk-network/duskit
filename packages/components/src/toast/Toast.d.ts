import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type ToastItem = {
  icon?: string;
  id: string;
  message: string;
  type: StatusType;
};

export interface ToastProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["ul"]> {
  className?: string;
  flyDuration?: number;
  timer?: number;
}

export default class Toast extends SvelteComponent<ToastProps, {}, {}> {
  getRootElement(): HTMLUListElement;
}
