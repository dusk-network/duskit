import type { SvelteComponent } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type StepperStep = {
  iconPath?: string;
  label: string;
};

export interface StepperProps
  extends OmitSvelteSpecificProps<SvelteHTMLElements["div"]> {
  activeStep: number;
  className?: string;
  showStepLabelWhenInactive?: boolean;
  showStepNumbers?: boolean;
  steps: StepperStep[] | number;
  variant?: "primary" | "secondary";
}

export default class Stepper extends SvelteComponent<StepperProps, {}, {}> {
  getRootElement(): HTMLDivElement;
}
