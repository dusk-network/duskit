<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Switch").SwitchProps} SwitchProps */

  import { createEventDispatcher } from "svelte";

  import { makeClassName } from "@duskit/string";

  import "./Switch.css";

  /** @type {SwitchProps["active"]} */
  export let active = false;

  /** @type {SwitchProps["className"]} */
  export let className = undefined;

  /** @type {SwitchProps["disabled"]} */
  export let disabled = false;

  /** @type {SwitchProps["onSurface"]} */
  export let onSurface = false;

  /** @type {SwitchProps["tabindex"]} */
  export let tabindex = 0;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const dispatch = createEventDispatcher();

  /** @type {import("svelte/elements").MouseEventHandler<HTMLDivElement>} */
  function handleClick() {
    if (!disabled) {
      toggleSwitch();
    }
  }

  /** @type {import("svelte/elements").KeyboardEventHandler<HTMLDivElement>} */
  function handleKeyDown(event) {
    if (!disabled && event.key === " ") {
      toggleSwitch();
      event.preventDefault();
    }
  }

  function toggleSwitch() {
    active = !active;

    dispatch("change", active);
  }

  $: classes = makeClassName([
    "dusk-switch",
    className,
    onSurface ? "dxusk-switch--on-surface" : "",
  ]);
</script>

<div
  bind:this={rootElement}
  {...$$restProps}
  aria-checked={active}
  aria-disabled={disabled}
  class={classes}
  on:click={handleClick}
  on:keydown={handleKeyDown}
  role="switch"
  tabindex={disabled ? -1 : tabindex}
></div>
