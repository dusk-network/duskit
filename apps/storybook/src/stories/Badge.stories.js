import { Badge } from "@duskit/components";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    text: { control: "text" },
    variant: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "error"],
    },
  },
};

export const Default = {
  args: {
    text: "Badge text",
    variant: "info",
  },
};
