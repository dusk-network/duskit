import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

export interface AgreementProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"],
  "id" | "tabindex"
> {
  checked?: boolean;
  className?: string;
  controlId?: string;
  disabled?: boolean;
  label?: string;
  name: string;
}

interface AgreementEvents {
  change: Event & { currentTarget: HTMLInputElement };
}

export default class Agreement extends SvelteComponent<
  AgreementProps,
  AgreementEvents,
  {}
> {
  getRootElement(): HTMLDivElement;
}
