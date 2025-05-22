import type { SvelteComponent } from "svelte";
import type { HTMLButtonAttributes, MouseEventHandler } from "svelte/elements";

export type ButtonSize = "default" | "small";

export type ButtonType = "button" | "reset" | "submit" | "toggle";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps
  extends OmitSvelteSpecificProps<Omit<HTMLButtonAttributes, "type">> {
  active?: boolean;
  className?: string;
  icon?: IconProp;
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
