import { mdiAccount } from "@mdi/js";

import { Button } from "@duskit/components";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    active: { control: "boolean" },
    icon: { control: "object" },
    size: { control: "select", options: ["small", "default"] },
    text: { control: "text" },
    type: { control: "select", options: ["button", "submit", "reset", "toggle"] },
    variant: { control: "select", options: ["primary", "secondary", "tertiary"] },
  },
};

export const Primary = {
  args: {
    text: "Primary",
    variant: "primary",
  },
};

export const Secondary = {
  args: {
    text: "Secondary",
    variant: "secondary",
  },
};

export const Tertiary = {
  args: {
    text: "Tertiary",
    variant: "tertiary",
  },
};

export const Small = {
  args: {
    text: "Small",
    size: "small",
    variant: "primary",
  },
};

export const WithIcon = {
  args: {
    text: "Profile",
    variant: "primary",
    icon: {
      path: mdiAccount,
      position: "before",
      size: "default",
    },
  },
};

export const ToggleActive = {
  args: {
    text: "Toggle",
    type: "toggle",
    active: true,
    variant: "secondary",
  },
};

