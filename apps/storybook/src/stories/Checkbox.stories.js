import { Checkbox } from "@duskit/components";

export default {
  title: "Components/Interactive/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    name: { control: "text" },
  },
};

export const Unchecked = {
  args: {
    checked: false,
  },
};

export const Checked = {
  args: {
    checked: true,
  },
};

export const Disabled = {
  args: {
    checked: true,
    disabled: true,
  },
};
