<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ProgressBar").ProgressBarProps} ProgressBarProps */

  import { clamp } from "lamb";
  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  import { makeClassName } from "@duskit/string";
  import { DEFAULT_PROGRESS_BAR_MOTION_DURATION } from "./motion";

  import "./ProgressBar.css";

  /** @type {ProgressBarProps["className"]} */
  export let className = undefined;

  /** @type {ProgressBarProps["currentPercentage"]} */
  export let currentPercentage = undefined;

  /** @type {ProgressBarProps["motionDuration"]} */
  export let motionDuration = DEFAULT_PROGRESS_BAR_MOTION_DURATION;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  /** @type {Record<`aria-${string}`, number> | null} */
  let ariaProps;

  const progress = tweened(0, {
    duration: motionDuration,
    easing: expoOut,
  });

  $: classes = makeClassName(["dusk-progress-bar", className]);
  $: if (currentPercentage === undefined) {
    progress.set(0);
  } else {
    progress.set(clamp(currentPercentage, 0, 100));
  }

  // separate statement as it depends on $progress
  // which is set in the previous one
  $: ariaProps =
    currentPercentage === undefined
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
  role="progressbar"
>
  <div
    class="dusk-progress-bar__filler"
    class:dusk-progress-bar__filler--undetermined={currentPercentage ===
      undefined}
    style={currentPercentage !== undefined ? `width: ${$progress}%` : undefined}
  ></div>
</div>
