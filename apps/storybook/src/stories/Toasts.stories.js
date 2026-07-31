import ToastsExample from "./_examples/ToastsExample.svelte";

export default {
  argTypes: {
    placement: {
      control: "select",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
  },
  args: {
    placement: "top-right",
  },
  component: ToastsExample,
  parameters: {
    disableGlobalOverlays: true,
    docs: {
      description: {
        component:
          "Click the buttons below to trigger the `notifier` and spawn floating toasts. Use the placement control to anchor the container to a physical viewport corner.",
      },
    },
  },
  title: "Components/Display/ToastContainer",
};

export const Default = {};
