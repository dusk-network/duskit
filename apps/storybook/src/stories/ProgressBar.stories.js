import { ProgressBar } from "@duskit/components";
import { bounceIn, expoOut, linear } from "svelte/easing";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    currentPercentage: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    easing: {
      control: "select",
      description:
        "An easing function that determines the animation physics. While the control here provides presets, the property accepts any custom function.",
      mapping: {
        "Bounce in": bounceIn,
        "Exponential out": expoOut,
        Linear: linear,
      },
      options: ["Bounce in", "Exponential out", "Linear"],
      table: {
        type: {
          summary: "(t: number) => number",
        },
        defaultValue: {
          summary: "expoOut",
        },
      },
    },
    motionDuration: { control: "number" },
  },
};

export const Determinate = {
  args: {
    currentPercentage: 42,
    easing: "Exponential out",
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
