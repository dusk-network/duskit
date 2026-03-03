import type { SvelteComponent } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export interface AnchorProps extends OmitSvelteSpecificProps<
  Omit<HTMLAnchorAttributes, "href">
> {
  className?: string;
  href: string;
}

interface AnchorEvents {
  click: MouseEvent & { currentTarget: HTMLAnchorElement };
}

interface AnchorSlots {
  default: {};
}

export default class Anchor extends SvelteComponent<
  AnchorProps,
  AnchorEvents,
  AnchorSlots
> {
  getRootElement(): HTMLAnchorElement;
}
