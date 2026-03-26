import type { SvelteComponent } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface CheckboxProps extends ControlledHtmlAttributes<
  HTMLInputAttributes,
  "checked" | "disabled" | "id" | "name" | "tabindex" | "type"
> {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  name: string;
  tabindex?: number;
}

interface CheckboxEvents {
  change: Event & { currentTarget: HTMLInputElement };
}

export default class Checkbox extends SvelteComponent<
  CheckboxProps,
  CheckboxEvents,
  {}
> {
  getRootElement(): HTMLInputElement;
}
