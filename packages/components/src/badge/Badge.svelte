<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Badge").BadgeProps} BadgeProps */

  import { makeClassName } from "@duskit/string";

  import "./Badge.css";

  /** @type {BadgeProps["className"]} */
  export let className = undefined;

  /** @type {BadgeProps["text"]} */
  export let text = "";

  /** @type {BadgeProps["variant"]} */
  export let variant = "neutral";

  /** @type {HTMLSpanElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName([
    "dusk-badge",
    `dusk-badge--variant-${variant}`,
    className,
  ]);
</script>

<span bind:this={rootElement} class={classes}>{text}</span>
