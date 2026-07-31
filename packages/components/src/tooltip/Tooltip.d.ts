import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Placement } from "@floating-ui/dom";

import type { ControlledHtmlAttributes, StatusType } from "../dusk.components";

export interface TooltipProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "aria-hidden" | "id" | "role"
> {
  className?: string;
  defaultDelayHide?: number;
  defaultDelayShow?: number;
  defaultOffset?: number;
  defaultPlace?: Placement;
  defaultType?: StatusType;
  id: string;
}

export default class Tooltip extends SvelteComponent<TooltipProps, {}, {}> {
  getRootElement(): HTMLDivElement;
}
