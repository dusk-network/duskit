import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export type BannerVariant = "error" | "info" | "success" | "warning";

export interface BannerProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["div"]> {
  className?: string;
  title: string;
  variant: BannerVariant;
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
