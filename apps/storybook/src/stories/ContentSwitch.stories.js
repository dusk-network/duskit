import { ContentSwitch } from "@duskit/components";
import { mdiAccountOutline, mdiCogOutline, mdiHomeOutline } from "@mdi/js";

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

const tabsWithIcons = [
  { icon: { path: mdiHomeOutline }, id: "home", label: "Home" },
  { icon: { path: mdiAccountOutline }, id: "profile", label: "Profile" },
  { icon: { path: mdiCogOutline }, id: "settings", label: "Settings" },
];

export default {
  component: ContentSwitch,
  title: "Components/Interactive/ContentSwitch",
};

export const Default = {
  args: {
    items: tabs,
    selectedTab: "tab-2",
  },
};

export const WithIcons = {
  args: {
    items: tabsWithIcons,
    selectedTab: "home",
  },
};
