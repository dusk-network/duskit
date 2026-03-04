import type { ComponentProps, SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { OmitSvelteSpecificProps, Tabs } from "@duskit/components";

type TabItem = ComponentProps<Tabs>["items"][number];

export interface ContentSwitchProps extends OmitSvelteSpecificProps<
  SvelteHTMLElements["ul"]
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
