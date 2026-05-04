<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ProgressBar").ProgressBarProps} ProgressBarProps */

  import { clamp } from "lamb";
  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  import { makeClassName } from "@duskit/string";

  import "./ProgressBar.css";

  /** @type {ProgressBarProps["className"]} */
  export let className = undefined;

  /** @type {ProgressBarProps["direction"]} */
  export let direction = undefined;

  /** @type {ProgressBarProps["easing"]} */
  export let easing = undefined;

  /** @type {ProgressBarProps["motionDuration"]} */
  export let motionDuration = undefined;

  /** @type {ProgressBarProps["size"]} */
  export let size = "default";

  /** @type {ProgressBarProps["value"]} */
  export let value = undefined;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const DEFAULT_PROGRESS_BAR_MOTION_DURATION = 400;

  /** @type {Record<`aria-${string}`, number> | null} */
  let ariaProps;

  const progress = tweened(0);

  $: dir = direction ?? "ltr";
  $: classes = makeClassName([
    "dusk-progress-bar",
    `dusk-progress-bar--size--${size}`,
    className,
  ]);
  $: if (value === undefined) {
    progress.set(0);
  } else {
    progress.set(clamp(value, 0, 100), {
      duration: motionDuration ?? DEFAULT_PROGRESS_BAR_MOTION_DURATION,
      easing: easing ?? expoOut,
    });
  }

  // separate statement as it depends on $progress
  // which is set in the previous one
  $: ariaProps =
    value === undefined
      ? null
      : {
          "aria-valuemax": 100,
          "aria-valuemin": 0,
          "aria-valuenow": Math.round($progress),
        };
</script>

<div
  bind:this={rootElement}
  {...$$restProps}
  {...ariaProps}
  class={classes}
  {dir}
  role="progressbar"
>
  <div
    class="dusk-progress-bar__filler"
    class:dusk-progress-bar__filler--undetermined={value === undefined}
    style={value !== undefined ? `width: ${$progress}%` : undefined}
  ></div>
</div>
