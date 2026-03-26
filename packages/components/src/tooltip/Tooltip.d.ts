import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Side } from "@floating-ui/dom";

import type { ControlledHtmlAttributes, StatusType } from "../dusk.components";

export interface TooltipProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "aria-hidden" | "id" | "role"
> {
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
