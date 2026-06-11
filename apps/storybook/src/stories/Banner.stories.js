import BannerExample from "./_examples/BannerExample.svelte";

export default {
  title: "Components/Feedback/Banner",
  component: BannerExample,
  argTypes: {
    content: { control: "text" },
    title: { control: "text" },
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
};

export const Info = {
  args: {
    title: "Info",
    variant: "info",
    content:
      "https://api.duskit.dev/v2/fallback/logs/errors/transaction_failed_critical_exception_stacktrace_node_modules",
  },
};

export const Success = {
  args: {
    ...Info.args,
    title: "Success",
    variant: "success",
    content: "Operation completed successfully.",
  },
};

export const Warning = {
  args: {
    ...Info.args,
    title: "Warning",
    variant: "warning",
    content: "Double-check your inputs before continuing.",
  },
};

export const Error = {
  args: {
    ...Info.args,
    title: "Error",
    variant: "error",
    content: "Something went wrong.",
  },
};
