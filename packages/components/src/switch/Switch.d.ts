import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface SwitchProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "aria-checked" | "aria-disabled" | "role" | "tabindex"
> {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  tabindex?: number;
}

interface SwitchEvents {
  change: CustomEvent<boolean>;
}

export default class Switch extends SvelteComponent<
  SwitchProps,
  SwitchEvents,
  {}
> {
  getRootElement(): HTMLDivElement;
}
