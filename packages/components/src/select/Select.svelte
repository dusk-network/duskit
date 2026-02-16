<script>
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  /** @typedef {import("./Select").SelectProps} SelectProps */

  import { ownPairs } from "lamb";

  import { makeClassName } from "@duskit/string";

  import Options from "./Options.svelte";
  import "./Select.css";

  /**
   * @typedef {Object} Props
   * @property {SelectProps["className"]} [className]
   * @property {SelectProps["options"]} options
   * @property {SelectProps["value"]} [value]
   */

  /** @type {Props & { [key: string]: any }} */
  /* eslint-disable prefer-const */
  let {
    className = undefined,
    options,
    value = $bindable(undefined),
    ...rest
  } = $props();
  /* eslint-enable prefer-const */

  /** @type {HTMLSelectElement} */
  let rootElement = /** @type {HTMLSelectElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(makeClassName(["dusk-select", className]));
</script>

<select
  bind:this={rootElement}
  {...rest}
  bind:value
  class={classes}
  onchange={bubble("change")}
>
  {#if Array.isArray(options)}
    <Options {options} />
  {:else}
    {#each ownPairs(options) as [label, opts] (label)}
      <optgroup {label}>
        <Options options={opts} />
      </optgroup>
    {/each}
  {/if}
</select>
