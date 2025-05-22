<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Stepper").StepperProps} StepperProps */

  import { makeClassName, randomUUID } from "@duskit/string";

  import { Icon } from "../..";
  import "./Stepper.css";

  /**
   * The current active step.
   * The value starts from zero as it refers
   * to the `steps` array elements.
   * @type {number}
   */
  export let activeStep;

  /** @type {StepperProps["className"]} */
  export let className = undefined;

  /**
   * Whether to show the step label when the step is inactive.
   * @type {StepperProps["showStepLabelWhenInactive"]}
   */
  export let showStepLabelWhenInactive = false;

  /**
   * Whether to show step numbers or not.
   * @type {StepperProps["showStepNumbers"]}
   */
  export let showStepNumbers = true;

  /**
   * The number of steps, greater or equal to two,
   * if a number is passed.
   * An array of `StepperStep` objects otherwise.
   *
   * @type {StepperProps["steps"]}
   */
  export let steps;

  /** @type {StepperProps["variant"]} */
  export let variant = "primary";

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => (stepsAmount >= 2 ? rootElement : null);

  $: classes = makeClassName([
    "dusk-stepper",
    `dusk-stepper--variant--${variant}`,
    className,
  ]);
  $: stepsAmount = Array.isArray(steps) ? steps.length : steps;

  /**
   * The width of the bar connecting the steps, based on
   * the active step and on the amount of steps.
   * As the steps are in a grid and centered in the containing
   * cell, the width doesn't represent the actual progress percentage.
   *
   * @type {string}
   *
   * @example
   *
   * With 2 steps, if the active step is 1 the width will be 80%.
   * The remaining 20% is the blank space before and after the steps.
   *
   * If there are 5 steps in total and the active step is 2,
   * the width will be 40%.
   */
  $: progressWidth = `${(100 * activeStep) / stepsAmount}%`;
</script>

{#if stepsAmount >= 2}
  <div
    bind:this={rootElement}
    class={classes}
    style:--columns={stepsAmount}
    style:--progress-width={progressWidth}
    {...$$restProps}
  >
    {#if Array.isArray(steps)}
      {#each steps as currentStep, idx (currentStep)}
        {@const id = `step-${randomUUID()}`}
        <span
          class="dusk-stepper__step"
          class:dusk-stepper__step--processed={idx <= activeStep}
          aria-current={idx === activeStep ? "step" : undefined}
          aria-labelledby={id}
        >
          {#if currentStep.iconPath}
            <Icon path={currentStep.iconPath} />
          {:else}
            {showStepNumbers ? idx + 1 : ""}
          {/if}
        </span>

        <span
          class="dusk-stepper__step-label"
          class:dusk-stepper__step-label--invisible={!showStepLabelWhenInactive &&
            idx !== activeStep}
          {id}
        >
          {currentStep.label}
        </span>
      {/each}
    {:else}
      {#each Array(steps).keys() as idx (idx)}
        <span
          class="dusk-stepper__step"
          class:dusk-stepper__step--processed={idx <= activeStep}
          aria-current={idx === activeStep ? "step" : undefined}
        >
          {showStepNumbers ? idx + 1 : ""}
        </span>
      {/each}
    {/if}
  </div>
{/if}
