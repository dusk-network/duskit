import { Textbox } from "@duskit/components";

export default {
  title: "Components/Textbox",
  component: Textbox,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "multiline"],
    },
    value: { control: "text" },
  },
};

export const Text = {
  args: {
    type: "text",
    placeholder: "Type here...",
    value: "",
  },
};

export const Number = {
  args: {
    type: "number",
    value: 42,
  },
};

export const Multiline = {
  args: {
    type: "multiline",
    rows: 4,
    value: "First line\nSecond line",
  },
};

