import { ErrorAlert } from "@duskit/components";

const exampleError = new Error("Request failed (500)");

export default {
  title: "Components/ErrorAlert",
  component: ErrorAlert,
  argTypes: {
    error: { control: false },
    gap: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    summary: { control: "text" },
  },
};

export const Default = {
  args: {
    summary: "Unable to complete action",
    error: exampleError,
    gap: "medium",
  },
};
