import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, StatusType } from "../dusk.components";

export type ToastItem = {
  icon?: string;
  id: string;
  message: string;
  type: StatusType;
};

export function toast(type: StatusType, message: string, icon: string): void;

export interface ToastProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["ul"]
> {
  className?: string;
  flyDuration?: number;
  timer?: number;
}

export default class Toast extends SvelteComponent<ToastProps, {}, {}> {
  getRootElement(): HTMLUListElement;
}
