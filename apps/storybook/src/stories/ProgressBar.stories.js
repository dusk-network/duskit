import { ProgressBar } from "@duskit/components";
import { bounceIn, expoOut, linear } from "svelte/easing";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["ltr", "rtl"],
      table: {
        defaultValue: {
          summary: "ltr",
        },
      },
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
    size: {
      control: "select",
      options: ["default", "small"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export const Determinate = {
  args: {
    direction: "ltr",
    easing: "Exponential out",
    motionDuration: 400,
    size: "default",
    style: "max-width: 420px;",
    value: 42,
  },
};

export const Indeterminate = {
  args: {
    direction: "ltr",
    motionDuration: 400,
    size: "default",
    style: "max-width: 420px;",
    value: undefined,
  },
};
