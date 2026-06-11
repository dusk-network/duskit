import CardExample from "./_examples/CardExample.svelte";

export default {
  title: "Components/Layout/Card",
  component: CardExample,
  argTypes: {
    as: { control: "text" },
    variant: { control: "select", options: ["layer", "surface"] },
  },
};

export const Default = {
  args: {
    as: "div",
    variant: "surface",
  },
};
