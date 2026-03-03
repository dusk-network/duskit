import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export interface SwitchProps extends OmitSvelteSpecificProps<
  Omit<SvelteHTMLElements["div"], "tabindex">
> {
  active?: boolean;
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
