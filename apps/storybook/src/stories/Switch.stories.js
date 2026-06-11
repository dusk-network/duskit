import { Switch } from "@duskit/components";

export default {
  title: "Components/Interactive/Switch",
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
