import { Stepper } from "@duskit/components";

export default {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: {
    activeStep: { control: "number" },
    showStepLabelWhenInactive: { control: "boolean" },
    showStepNumbers: { control: "boolean" },
    steps: { control: "object" },
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
    showStepNumbers: true,
    showStepLabelWhenInactive: false,
    style: "max-width: 520px;",
  },
};
