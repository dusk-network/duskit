<script>
  /** @typedef {import("./ProgressBar").ProgressBarProps} ProgressBarProps */

  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  import { makeClassName } from "@duskit/string";
  import { DEFAULT_PROGRESS_BAR_MOTION_DURATION } from "./motion";

  import "./ProgressBar.css";

  /**
   * @typedef {Object} Props
   * @property {ProgressBarProps["className"]} [className]
   * @property {ProgressBarProps["currentPercentage"]} [currentPercentage]
   * @property {ProgressBarProps["motionDuration"]} [motionDuration]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    currentPercentage = undefined,
    motionDuration = DEFAULT_PROGRESS_BAR_MOTION_DURATION,
    ...rest
  } = $props();

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

  export const getRootElement = () => rootElement;

  const progress = tweened(0, {
    duration: DEFAULT_PROGRESS_BAR_MOTION_DURATION,
    easing: expoOut,
  });

  const classes = $derived(makeClassName(["dusk-progress-bar", className]));
  $effect(() => {
    if (currentPercentage !== undefined) {
      progress.set(currentPercentage, {
        duration: motionDuration,
      });
    }
  });
</script>

<div bind:this={rootElement} {...rest} class={classes} role="progressbar">
  <div
    style={currentPercentage !== undefined ? `width: ${$progress}%` : undefined}
    class:dusk-progress-bar__filler--undetermined={currentPercentage ===
      undefined}
    class="dusk-progress-bar__filler"
  ></div>
</div>
