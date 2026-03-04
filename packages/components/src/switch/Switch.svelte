<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Switch").SwitchProps} SwitchProps */

  import { createEventDispatcher } from "svelte";

  import { makeClassName } from "@duskit/string";

  import "./Switch.css";

  /** @type {SwitchProps["checked"]} */
  export let checked = false;

  /** @type {SwitchProps["className"]} */
  export let className = undefined;

  /** @type {SwitchProps["disabled"]} */
  export let disabled = false;

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
    checked = !checked;

    dispatch("change", checked);
  }

  $: classes = makeClassName([
    "dusk-switch",
    checked ? "dusk-switch--checked" : "",
    disabled ? "dusk-switch--disabled" : "",
    className,
  ]);
</script>

<div
  bind:this={rootElement}
  {...$$restProps}
  aria-checked={checked}
  aria-disabled={disabled}
  class={classes}
  on:click={handleClick}
  on:keydown={handleKeyDown}
  role="switch"
  tabindex={disabled ? -1 : tabindex}
></div>
