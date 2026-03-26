import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface CopyFieldProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"]
> {
  className?: string;
  disabled?: boolean;
  displayValue: string;
  name: string;
  rawValue: string;
  tooltipId?: string;
}

export default class CopyField extends SvelteComponent<CopyFieldProps, {}, {}> {
  getRootElement(): HTMLDivElement;
}
