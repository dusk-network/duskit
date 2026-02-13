import type { SvelteComponent } from "svelte";
import type { HTMLTimeAttributes } from "svelte/elements";

import type { OmitSvelteSpecificProps } from "../dusk.components";

export interface RelativeTimeProps extends OmitSvelteSpecificProps<HTMLTimeAttributes> {
  autoRefresh?: boolean;
  className?: string;
  date: Date;
}

interface RelativeTimeSlots {
  default: {
    relativeTime: string;
  };
}

export default class RelativeTime extends SvelteComponent<
  RelativeTimeProps,
  {},
  RelativeTimeSlots
> {
  getRootElement(): HTMLDivElement;
}
