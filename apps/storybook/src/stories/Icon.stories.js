import { mdiAlertCircleOutline } from "@mdi/js";

import { Icon } from "@duskit/components";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    as: {
      control: false,
      table: {
        defaultValue: { summary: '"svg"' },
        type: { summary: '"g" | "svg"' },
      },
    },
    path: { control: "text" },
    size: { control: "select", options: ["small", "default", "large"] },
  },
};

export const Default = {
  args: {
    path: mdiAlertCircleOutline,
    size: "default",
    style: "color: var(--status-error-color);",
  },
};

export const Large = {
  args: {
    path: mdiAlertCircleOutline,
    size: "large",
    style: "color: var(--status-success-color);",
  },
};

export const Small = {
  args: {
    path: mdiAlertCircleOutline,
    size: "small",
    style: "color: var(--status-info-color);",
  },
};
