import { mdiAccount, mdiCogOutline, mdiHome } from "@mdi/js";

import TabsExample from "./_examples/TabsExample.svelte";

const items = [
  { icon: { path: mdiHome }, id: "home", label: "Home" },
  { icon: { path: mdiAccount }, id: "account", label: "Account" },
  { icon: { path: mdiCogOutline }, id: "settings", label: "Settings" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy", label: "Privacy" },
  { id: "about", label: "About" },
];

export default {
  argTypes: {
    items: { control: false },
    selectedTab: { control: false },
  },
  component: TabsExample,
  title: "Components/Interactive/Tabs",
};

export const Default = {
  args: {
    items,
    selectedTab: "home",
  },
};
