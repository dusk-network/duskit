import { mdiAlertCircleOutline } from "@mdi/js";

import { Icon } from "@duskit/components";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    path: { control: "text" },
    size: { control: "select", options: ["small", "default", "large"] },
    isInStack: { control: "boolean" },
  },
};

export const Default = {
  args: {
    path: mdiAlertCircleOutline,
    size: "default",
    style: "color: var(--error-color);",
  },
};

export const Large = {
  args: {
    path: mdiAlertCircleOutline,
    size: "large",
    style: "color: var(--warning-color);",
  },
};

export const Small = {
  args: {
    path: mdiAlertCircleOutline,
    size: "small",
    style: "color: var(--info-color);",
  },
};

