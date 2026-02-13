import ToastExample from "./_examples/ToastExample.svelte";

export default {
  title: "Components/Toast",
  component: ToastExample,
  parameters: {
    disableGlobalOverlays: true,
  },
  argTypes: {
    flyDuration: { control: "number" },
    timer: { control: "number" },
  },
};

export const Default = {
  args: {
    timer: 2000,
    flyDuration: 500,
  },
};

