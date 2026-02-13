import SuspenseExample from "./_examples/SuspenseExample.svelte";

export default {
  title: "Components/Suspense",
  component: SuspenseExample,
  argTypes: {
    errorMessage: { control: "text" },
    errorVariant: { control: "select", options: ["alert", "banner", "details"] },
    gap: { control: "select", options: ["small", "default", "medium", "large"] },
    ms: { control: "number" },
    pendingMessage: { control: "text" },
    shouldReject: { control: "boolean" },
    value: { control: "text" },
  },
};

export const Resolves = {
  args: {
    ms: 900,
    shouldReject: false,
    value: "Loaded",
    pendingMessage: "Loading...",
    errorMessage: "Error",
    errorVariant: "alert",
    gap: "default",
  },
};

export const Rejects = {
  args: {
    ...Resolves.args,
    shouldReject: true,
    errorVariant: "banner",
  },
};

