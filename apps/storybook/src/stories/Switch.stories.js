import { Switch } from "@duskit/components";

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
    onSurface: { control: "boolean" },
  },
};

export const Default = {
  args: {
    active: false,
    disabled: false,
    onSurface: false,
  },
};

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

