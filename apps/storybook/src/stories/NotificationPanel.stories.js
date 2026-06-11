import NotificationPanelExample from "./_examples/NotificationPanelExample.svelte";

export default {
  component: NotificationPanelExample,
  parameters: {
    layout: "fullscreen",
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      description: {
        component:
          "The `NotificationPanel` is a Drawer component tailored to display the `NotificationFeed`. It relies on the global `NotificationProvider` context. Click the toggle button to open the panel, and use the other buttons to dispatch notifications via the `notifier`.",
      },
    },
  },
  title: "Components/Layout/NotificationPanel",
};

export const Default = {};
