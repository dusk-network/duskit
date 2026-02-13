import AnchorExample from "./_examples/AnchorExample.svelte";

export default {
  title: "Components/Anchor",
  component: AnchorExample,
  argTypes: {
    href: { control: "text" },
    onSurface: { control: "boolean" },
    text: { control: "text" },
  },
};

export const Default = {
  args: {
    href: "https://dusk.network",
    onSurface: true,
    text: "Visit dusk.network",
  },
};

export const OffSurface = {
  args: {
    ...Default.args,
    onSurface: false,
  },
};

