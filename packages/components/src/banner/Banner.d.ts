import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps, StatusType } from "../dusk.components";

export interface BannerProps extends OmitSvelteSpecificProps<
  SvelteHTMLElements["div"]
> {
  className?: string;
  title: string;
  variant: StatusType;
}

interface BannerSlots {
  default: {};
}

export default class Banner extends SvelteComponent<
  BannerProps,
  {},
  BannerSlots
> {
  getRootElement(): HTMLDivElement;
}
