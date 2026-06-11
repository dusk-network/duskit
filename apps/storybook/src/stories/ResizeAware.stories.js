import ResizeAwareExample from "./_examples/ResizeAwareExample.svelte";

export default {
  title: "Components/Layout/ResizeAware",
  component: ResizeAwareExample,
  argTypes: {
    initialHeight: { control: "number" },
    initialWidth: { control: "number" },
  },
};

export const Default = {
  args: {
    initialWidth: 360,
    initialHeight: 200,
  },
};
