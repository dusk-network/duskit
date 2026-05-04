import { ContentSwitch } from "@duskit/components";

/** @param {CustomEvent} event */
function handleTabChange(event) {
  // eslint-disable-next-line no-console
  console.log(`tab changed to ${event.detail}`);
}

const tabs = [
  { id: "tab-1", label: "Tab label 1" },
  { id: "tab-2", label: "Tab label 2" },
  { id: "tab-3", label: "Tab label 3" },
  { id: "tab-4", label: "Tab label 4" },
  { id: "tab-5", label: "Tab label 5" },
];

export default {
  title: "Components/ContentSwitch",
  component: ContentSwitch,
};

export const Default = {
  args: { items: tabs, selectedTab: "tab-2" },
};
