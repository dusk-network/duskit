import { Agreement } from "@duskit/components";

export default {
  title: "Components/Agreement",
  component: Agreement,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    name: { control: "text" },
  },
};

export const Default = {
  args: {
    name: "terms",
    label: "I agree to the Terms of Service",
    checked: false,
  },
};

export const Checked = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    checked: true,
    disabled: true,
  },
};

