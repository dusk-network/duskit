import { Switch } from "@duskit/components";

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: {
    active: false,
    disabled: false,
  },
};
