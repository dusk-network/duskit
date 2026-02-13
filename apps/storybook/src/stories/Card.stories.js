import CardExample from "./_examples/CardExample.svelte";

export default {
  title: "Components/Card",
  component: CardExample,
  argTypes: {
    gap: { control: "select", options: ["small", "default", "medium", "large"] },
    onSurface: { control: "boolean" },
    showBody: { control: "boolean" },
  },
};

export const Default = {
  args: {
    gap: "default",
    onSurface: false,
    showBody: true,
  },
};

export const OnSurface = {
  args: {
    ...Default.args,
    onSurface: true,
  },
};

export const NoBody = {
  args: {
    ...Default.args,
    showBody: false,
  },
};

