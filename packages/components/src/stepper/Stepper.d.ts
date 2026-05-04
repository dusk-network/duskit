import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { ControlledHtmlAttributes } from "../dusk.components";

type StepperStep = {
  iconPath?: string;
  label: string;
};

export interface StepperProps extends ControlledHtmlAttributes<
  SvelteHTMLElements["div"]
> {
  activeStep: number;
  className?: string;
  showStepLabelWhenInactive?: boolean;
  showStepNumbers?: boolean;
  steps: StepperStep[] | number;
}

export default class Stepper extends SvelteComponent<StepperProps, {}, {}> {
  getRootElement(): HTMLDivElement;
}
