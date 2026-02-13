import { mdiArrowRight } from "@mdi/js";

import { AnchorButton } from "@duskit/components";

export default {
  title: "Components/AnchorButton",
  component: AnchorButton,
  argTypes: {
    disabled: { control: "boolean" },
    href: { control: "text" },
    icon: { control: "object" },
    size: { control: "select", options: ["small", "default"] },
    text: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary", "tertiary"] },
  },
};

export const Primary = {
  args: {
    href: "https://dusk.network",
    text: "Go to dusk.network",
    variant: "primary",
  },
};

export const WithIcon = {
  args: {
    ...Primary.args,
    text: "Continue",
    icon: { path: mdiArrowRight, position: "after", size: "default" },
  },
};

export const Disabled = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

