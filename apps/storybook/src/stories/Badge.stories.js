import { Badge } from "@duskit/components";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    text: { control: "text" },
    variant: { control: "select", options: ["neutral", "success", "warning", "error"] },
  },
};

export const Neutral = {
  args: {
    text: "Neutral",
    variant: "neutral",
  },
};

export const Success = {
  args: {
    text: "Success",
    variant: "success",
  },
};

export const Warning = {
  args: {
    text: "Warning",
    variant: "warning",
  },
};

export const Error = {
  args: {
    text: "Error",
    variant: "error",
  },
};

