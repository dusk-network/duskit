import type { SvelteComponent } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

import type { IconProp, OmitSvelteSpecificProps } from "../dusk.components";

export type ButtonSize = "default" | "small";

export type ButtonType = "button" | "reset" | "submit" | "toggle";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps extends OmitSvelteSpecificProps<
  Omit<HTMLButtonAttributes, "type">
> {
  className?: string;
  icon?: IconProp;
  pressed?: boolean;
  size?: ButtonSize;
  text?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
}

interface ButtonEvents {
  click: MouseEvent & { currentTarget: HTMLButtonElement };
  mousedown: MouseEvent & { currentTarget: HTMLButtonElement };
  mouseup: MouseEvent & { currentTarget: HTMLButtonElement };
}

export default class Button extends SvelteComponent<
  ButtonProps,
  ButtonEvents,
  {}
> {
  getRootElement(): HTMLButtonElement;
}
