import NotificationFeedExample from "./_examples/NotificationFeedExample.svelte";

export default {
  component: NotificationFeedExample,
  parameters: {
    layout: "fullscreen",
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      description: {
        component:
          "The `NotificationFeed` component displays a list of panel notifications. It relies on the global `NotificationProvider` context. Click the buttons below to dispatch panel notifications via the `notifier` and populate the feed.",
      },
    },
  },
  title: "Components/NotificationFeed",
};

export const Default = {};
