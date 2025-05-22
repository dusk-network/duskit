import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Side } from "@floating-ui/dom";

export interface TooltipProps
  extends OmitSvelteSpecificProps<Omit<SvelteHTMLElements["div"], "id">> {
  className?: string;
  defaultDelayHide?: number;
  defaultDelayShow?: number;
  defaultOffset?: number;
  defaultPlace?: Side;
  defaultType?: StatusType;
  id: string;
}

export default class Tooltip extends SvelteComponent<TooltipProps, {}, {}> {
  getRootElement(): HTMLDivElement;
}
