import { Throbber } from "@duskit/components";

export default {
  title: "Components/Throbber",
  component: Throbber,
  argTypes: {
    duration: { control: "number" },
    size: { control: "number" },
  },
};

export const Default = {
  args: {
    size: 64,
    duration: 1800,
  },
};

export const Small = {
  args: {
    size: 32,
    duration: 1200,
  },
};

