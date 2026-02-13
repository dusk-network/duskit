import { Stepper } from "@duskit/components";

export default {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: {
    activeStep: { control: "number" },
    showStepLabelWhenInactive: { control: "boolean" },
    showStepNumbers: { control: "boolean" },
    steps: { control: "object" },
    variant: { control: "select", options: ["primary", "secondary"] },
  },
};

export const Default = {
  args: {
    activeStep: 1,
    steps: [
      { label: "Start" },
      { label: "Review" },
      { label: "Confirm" },
      { label: "Done" },
    ],
    variant: "primary",
    showStepNumbers: true,
    showStepLabelWhenInactive: false,
    style: "max-width: 520px;",
  },
};

export const Secondary = {
  args: {
    ...Default.args,
    variant: "secondary",
    activeStep: 2,
  },
};

