<svelte:options immutable={true} />

<script>
  /** @typedef {import("./CounterIcon").CounterIconProps} CounterIconProps */

  import { lerp } from "@duskit/math";
  import { makeClassName } from "@duskit/string";
  import {
    mdiCircle,
    mdiNumeric1Circle,
    mdiNumeric2Circle,
    mdiNumeric3Circle,
    mdiNumeric4Circle,
    mdiNumeric5Circle,
    mdiNumeric6Circle,
    mdiNumeric7Circle,
    mdiNumeric8Circle,
    mdiNumeric9Circle,
    mdiNumeric9PlusCircle,
  } from "@mdi/js";
  import { clampWithin, findIndex, isGTE, last } from "lamb";
  import { tweened } from "svelte/motion";

  import { Icon } from "../..";

  import "./CounterIcon.css";

  /** @type {CounterIconProps["baseIconPath"]} */
  export let baseIconPath;

  /** @type {CounterIconProps["className"]} */
  export let className = undefined;

  /** @type {CounterIconProps["count"]} */
  export let count;

  /** @type {CounterIconProps["size"]} */
  export let size = "default";

  /** @type {Icon<"svg">} */
  let rootComponent;

  export const getRootElement = () => rootComponent.getRootElement();

  const numberIcons = [
    mdiNumeric9PlusCircle,
    mdiNumeric1Circle,
    mdiNumeric2Circle,
    mdiNumeric3Circle,
    mdiNumeric4Circle,
    mdiNumeric5Circle,
    mdiNumeric6Circle,
    mdiNumeric7Circle,
    mdiNumeric8Circle,
    mdiNumeric9Circle,
  ];

  // Base shape of the bounce animation.
  const bounceShape = [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1];

  // Final scale modifier applied to the bounce shape.
  const SCALE_MODIFIER = 0.6;

  /**
   * These arrays map the linear animation timeline to the expected bounce scale.
   *
   * - `ranges`: Represents the normalized progress keyframes of the tween (from 0 to 1).
   * - `outputs`: Represents the corresponding target scale applied at each keyframe.
   *
   * For example, when the animation progress reaches 0.25 (`ranges[1]`),
   * the applied scale will be 0.97 * 0.6 (`outputs[1]`).
   */
  const ranges = [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1];
  const outputs = bounceShape.map((n) => n * SCALE_MODIFIER);

  const clampProgress = clampWithin(ranges[0], last(ranges));

  /** @type {(arr: number[], idx: number) => [number, number]} */
  const getStepBounds = (arr, idx) => [arr[idx - 1], arr[idx]];

  /**
   * Triggers the animation resetting the tween to 0 instantaneously,
   * then animating it back to 1 over the defined duration.
   */
  function triggerAnimation() {
    progress.set(0, { duration: 0 });
    progress.set(1);
  }

  /**
   * Interpolates the tweened progress value through
   * the custom bounce ranges.
   *
   * @type {(x: number) => number}
   */
  function getScale(x) {
    const clampedX = clampProgress(x);

    // Forces the index to be at least 1, preventing out of bounds
    // errors when the clamped `x` is exactly equal to `ranges[0]`.
    const idx = Math.max(1, findIndex(ranges, isGTE(clampedX)));

    const [outputStart, outputEnd] = getStepBounds(outputs, idx);
    const [rangeStart, rangeEnd] = getStepBounds(ranges, idx);

    const percentage = (clampedX - rangeStart) / (rangeEnd - rangeStart);

    return lerp(outputStart, outputEnd, percentage);
  }

  const progress = tweened(1, { duration: 1500 });

  $: classes = makeClassName([
    "dusk-counter-icon",
    `dusk-counter-icon--size--${size}`,
    className,
  ]);
  $: numericPath =
    count === 0 ? "" : count > 9 ? numberIcons[0] : numberIcons[count];
  $: scale = getScale($progress);
  $: transformString = `matrix(${scale}, 0, 0, ${scale}, 5, -5)`;
  $: count && triggerAnimation();
</script>

<Icon
  bind:this={rootComponent}
  {...$$restProps}
  className={classes}
  path={baseIconPath}
  {size}
>
  {#if numericPath}
    <g class="dusk-counter-icon__counter" style:transform={transformString}>
      <path class="dusk-counter-icon__foreground" d={mdiCircle} />
      <path class="dusk-counter-icon__background" d={numericPath} />
    </g>
  {/if}
</Icon>
