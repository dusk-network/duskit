import type { SvelteComponent } from "svelte";

interface ResizeAwareSlots {
  default: {
    height: number;
    rect: DOMRect;
    width: number;
  };
}

export default class ResizeAware extends SvelteComponent<
  {},
  {},
  ResizeAwareSlots
> {
  getRootElement(): HTMLDivElement;
}
