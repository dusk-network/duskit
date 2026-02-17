import { ProgressBar } from "@duskit/components";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  argTypes: {
    currentPercentage: { control: { type: "range", min: 0, max: 100, step: 1 } },
    motionDuration: { control: "number" },
  },
};

export const Determinate = {
  args: {
    currentPercentage: 42,
    motionDuration: 400,
    style: "max-width: 420px;",
  },
};

export const Indeterminate = {
  args: {
    currentPercentage: undefined,
    motionDuration: 400,
    style: "max-width: 420px;",
  },
};

