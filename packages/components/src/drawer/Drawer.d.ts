import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import { OmitSvelteSpecificProps } from "@duskit/components";

type DrawerProps = OmitSvelteSpecificProps<SvelteHTMLElements["aside"]> & {
  className?: string;
  from: "left" | "right" | "top" | "bottom";
  open: boolean;
  size?: "default" | "full" | "large" | "small";
};

interface DrawerEvents {
  close: CustomEvent<void>;
  closing: CustomEvent<void>;
  open: CustomEvent<void>;
  opening: CustomEvent<void>;
}

interface DrawerSlots {
  default: {
    visible: boolean;
  };
}

export default class Drawer extends SvelteComponent<
  DrawerProps,
  DrawerEvents,
  DrawerSlots
> {
  getRootElement(): HTMLElementTagNameMap["aside"];
}
