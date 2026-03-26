import type { SvelteComponent } from "svelte";
import type { HTMLSelectAttributes } from "svelte/elements";

import type { ControlledHtmlAttributes, OptionItem } from "../dusk.components";

type GroupedOptionItems = Record<string, OptionItem[] | string[]>;

export interface SelectProps extends ControlledHtmlAttributes<
  HTMLSelectAttributes,
  "value"
> {
  className?: string;
  options: GroupedOptionItems | OptionItem[] | string[];
  value?: string;
}

interface SelectEvents {
  change: Event & { currentTarget: HTMLSelectElement };
}

export default class Select extends SvelteComponent<
  SelectProps,
  SelectEvents,
  {}
> {
  getRootElement(): HTMLSelectElement;
}
