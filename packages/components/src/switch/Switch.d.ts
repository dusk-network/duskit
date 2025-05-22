import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export interface SwitchProps
  extends OmitSvelteSpecificProps<Omit<SvelteHTMLElements["div"], "tabindex">> {
  className?: string;
  disabled?: boolean;
  onSurface?: boolean;
  tabindex?: number;
  value?: boolean;
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
