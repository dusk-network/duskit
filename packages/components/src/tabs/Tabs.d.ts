import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type TabItem = {
  icon?: IconProp;
  id: string;
  label?: string;
};

export interface TabsProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["div"]> {
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
