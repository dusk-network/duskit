import type { SvelteComponent } from "svelte";
import type { HTMLSelectAttributes } from "svelte/elements";

type GroupedOptionItems = Record<string, OptionItem[] | string[]>;

export interface SelectProps
  extends OmitSvelteSpecificProps<Omit<HTMLSelectAttributes, "value">> {
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
