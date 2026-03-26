import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes, IconProp } from "../dusk.components";

type TabItem = {
  icon?: IconProp;
  id: string;
  label?: string;
};

export interface TabsProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"]
> {
  className?: string;
  items: TabItem[];
  selectedTab?: string;
}

interface TabsEvents {
  change: CustomEvent<string>;
}

export default class Tabs extends SvelteComponent<TabsProps, TabsEvents, {}> {
  getRootElement(): HTMLDivElement;
}
