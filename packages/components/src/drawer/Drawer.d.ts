import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OutsideClickEvent } from "@duskit/svelte-actions";

import type { ControlledHtmlAttributes } from "../dusk.components";

type DrawerProps = ControlledHtmlAttributes<
  SvelteHTMLElements["aside"],
  "aria-hidden" | "inert"
> & {
  className?: string;
  from: "left" | "right" | "top" | "bottom";
  open: boolean;
  size?: "default" | "full" | "large" | "small";
};

interface DrawerEvents {
  cancel: CustomEvent<{ originalEvent: KeyboardEvent }>;
  close: CustomEvent<void>;
  closing: CustomEvent<void>;
  open: CustomEvent<void>;
  opening: CustomEvent<void>;
  outsideclick: OutsideClickEvent<HTMLElementTagNameMap["aside"]>;
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
