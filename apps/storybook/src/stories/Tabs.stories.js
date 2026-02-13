import { mdiAccount, mdiCogOutline, mdiHome } from "@mdi/js";

import { Tabs } from "@duskit/components";

const items = [
  { id: "home", label: "Home", icon: { path: mdiHome } },
  { id: "account", label: "Account", icon: { path: mdiAccount } },
  { id: "settings", label: "Settings", icon: { path: mdiCogOutline } },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy", label: "Privacy" },
  { id: "about", label: "About" },
];

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    items: { control: false },
    selectedTab: { control: false },
  },
};

export const Default = {
  args: {
    items,
    selectedTab: "home",
    style: "max-width: 520px;",
  },
};

