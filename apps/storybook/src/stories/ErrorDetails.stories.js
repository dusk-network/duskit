import { ErrorDetails } from "@duskit/components";

const exampleError = new Error("Something went wrong while loading data.");

export default {
  title: "Components/ErrorDetails",
  component: ErrorDetails,
  argTypes: {
    error: { control: false },
    summary: { control: "text" },
  },
};

export const Default = {
  args: {
    summary: "Details",
    error: exampleError,
  },
};

