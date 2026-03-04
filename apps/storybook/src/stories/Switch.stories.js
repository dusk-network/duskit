import { Switch } from "@duskit/components";

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
  },
};
