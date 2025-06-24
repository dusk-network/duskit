import type { SvelteComponent } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

import type { IconProp, OmitSvelteSpecificProps } from "../dusk.components";
import type { Anchor } from "../..";
import type { ButtonSize, ButtonVariant } from "./Button";

export interface AnchorButtonProps
  extends OmitSvelteSpecificProps<Omit<HTMLAnchorAttributes, "href">> {
  className?: string;
  href: string;
  disabled?: boolean;
  icon?: IconProp;
  size?: ButtonSize;
  text?: string;
  variant?: ButtonVariant;
}

interface AnchorButtonEvents {
  click: MouseEvent & { currentTarget: HTMLAnchorElement };
}

export default class AnchorButton extends SvelteComponent<
  AnchorButtonProps,
  AnchorButtonEvents,
  {}
> {
  getRootElement(): Anchor;
}
