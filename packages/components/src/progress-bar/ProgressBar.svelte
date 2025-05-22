<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ProgressBar").ProgressBarProps} ProgressBarProps */

  import { expoOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  import { makeClassName } from "@duskit/string";

  import "./ProgressBar.css";

  /** @type {ProgressBarProps["className"]} */
  export let className = undefined;

  /** @type {ProgressBarProps["currentPercentage"]} */
  export let currentPercentage = undefined;

  /** @type {ProgressBarProps["motionDuration"]} */
  export let motionDuration = 400;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const progress = tweened(0, {
    duration: motionDuration,
    easing: expoOut,
  });

  $: classes = makeClassName(["dusk-progress-bar", className]);
  $: currentPercentage !== undefined && progress.set(currentPercentage);
</script>

<div bind:this={rootElement} role="progressbar" class={classes}>
  <div
    style={currentPercentage !== undefined ? `width: ${$progress}%` : undefined}
    class:dusk-progress-bar__filler--undetermined={currentPercentage ===
      undefined}
    class="dusk-progress-bar__filler"
  />
</div>
