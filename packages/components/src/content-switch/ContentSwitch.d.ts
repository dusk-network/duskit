import type { ComponentProps, SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";
import type Tabs from "../tabs/Tabs";

type TabItem = ComponentProps<Tabs>["items"][number];

export interface ContentSwitchProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["ul"],
  "role"
> {
  className?: string;
  items: TabItem[];
  selectedTab?: string;
}

interface ContentSwitchEvents {
  change: CustomEvent<string>;
}

export default class ContentSwitch extends SvelteComponent<
  ContentSwitchProps,
  ContentSwitchEvents,
  {}
> {
  getRootElement(): HTMLUListElement;
}
