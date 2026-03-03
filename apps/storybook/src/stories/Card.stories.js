import CardExample from "./_examples/CardExample.svelte";

export default {
  title: "Components/Card",
  component: CardExample,
  argTypes: {
    as: { control: "text" },
    gap: {
      control: "select",
      options: ["small", "default", "medium", "large"],
    },
    showBody: { control: "boolean" },
  },
};

export const Default = {
  args: {
    as: "div",
    gap: "default",
    showBody: true,
  },
};

export const NoBody = {
  args: {
    ...Default.args,
    showBody: false,
  },
};
