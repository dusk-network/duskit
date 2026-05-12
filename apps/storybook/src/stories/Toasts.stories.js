import ToastsExample from "./_examples/ToastsExample.svelte";

export default {
  component: ToastsExample,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      description: {
        component:
          "The `ToastContainer` is globally mounted in the Storybook decorator. Click the buttons below to trigger the `notifier` and spawn floating toasts.",
      },
    },
  },
  title: "Components/Toasts",
};

export const Default = {};
