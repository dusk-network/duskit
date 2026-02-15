import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps, OptionItem } from "../dusk.components";

export interface ExclusiveChoiceProps extends OmitSvelteSpecificProps<
  SvelteHTMLElements["div"]
> {
  className?: string;
  name?: string;
  options: OptionItem[] | string[];
  value: string;
}

interface ExclusiveChoiceEvents {
  change: Event & { currentTarget: HTMLInputElement };
}

export default class ExclusiveChoice extends SvelteComponent<
  ExclusiveChoiceProps,
  ExclusiveChoiceEvents,
  {}
> {
  getRootElement(): HTMLDivElement;
}
