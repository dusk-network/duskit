import {
  mdiAccountOutline,
  mdiCheckBold,
  mdiCurrencyUsd,
  mdiFileDocumentOutline,
} from "@mdi/js";
import { Stepper } from "@duskit/components";

export default {
  argTypes: {
    activeStep: { control: "number" },
    showStepLabelWhenInactive: { control: "boolean" },
    showStepNumbers: { control: "boolean" },
    steps: { control: "object" },
  },
  args: {
    activeStep: 0,
    showStepLabelWhenInactive: false,
    showStepNumbers: true,
  },
  component: Stepper,
  title: "Components/Feedback/Stepper",
};

export const Default = {
  args: {
    activeStep: 1,
    showStepNumbers: true,
    showStepLabelWhenInactive: false,
    steps: [
      { label: "Start" },
      { label: "Review" },
      { label: "Confirm" },
      { label: "Done" },
    ],
    style: "max-width: 520px;",
  },
};

export const WithIcons = {
  args: {
    activeStep: 2,
    showStepNumbers: false,
    steps: [
      { iconPath: mdiAccountOutline, label: "Account" },
      { iconPath: mdiFileDocumentOutline, label: "Policy" },
      { iconPath: mdiCurrencyUsd, label: "Payment" },
      { iconPath: mdiCheckBold, label: "Success" },
    ],
    style: "max-width: 520px;",
  },
};
/*
import { Stepper } from "@duskit/components";

export default {
  title: "Components/Feedback/Stepper",
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
*/
