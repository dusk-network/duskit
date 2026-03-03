import AnchorExample from "./_examples/AnchorExample.svelte";

export default {
  title: "Components/Anchor",
  component: AnchorExample,
  argTypes: {
    href: { control: "text" },
    text: { control: "text" },
  },
};

export const Default = {
  args: {
    href: "https://dusk.network",
    text: "Visit dusk.network",
  },
};
