<script>
  /** @typedef {import("./Switch").SwitchProps} SwitchProps */

  import { createEventDispatcher } from "svelte";

  import { makeClassName } from "@duskit/string";

  import "./Switch.css";

  /**
   * @typedef {Object} Props
   * @property {SwitchProps["active"]} [active]
   * @property {SwitchProps["className"]} [className]
   * @property {SwitchProps["disabled"]} [disabled]
   * @property {SwitchProps["onSurface"]} [onSurface]
   * @property {SwitchProps["tabindex"]} [tabindex]
   */

  /** @type {Props & { [key: string]: any }} */
  /* eslint-disable prefer-const */
  let {
    active = $bindable(false),
    className = undefined,
    disabled = false,
    onSurface = false,
    tabindex = 0,
    ...rest
  } = $props();
  /* eslint-enable prefer-const */

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

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

  const classes = $derived(
    makeClassName([
      "dusk-switch",
      className,
      onSurface ? "dxusk-switch--on-surface" : "",
    ])
  );
</script>

<div
  bind:this={rootElement}
  {...rest}
  aria-checked={active}
  aria-disabled={disabled}
  class={classes}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  role="switch"
  tabindex={disabled ? -1 : tabindex}
></div>
