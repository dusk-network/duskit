<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Checkbox").CheckboxProps} CheckboxProps */

  import { makeClassName, randomUUID } from "@duskit/string";

  import "./Checkbox.css";

  /** @type {CheckboxProps["checked"]} */
  export let checked = false;

  /** @type {CheckboxProps["className"]} */
  export let className = undefined;

  /** @type {CheckboxProps["disabled"]} */
  export let disabled = false;

  /** @type {CheckboxProps["id"]} */
  export let id = `dusk-checkbox-${randomUUID()}`;

  /** @type {CheckboxProps["name"]} */
  export let name;

  /** @type {CheckboxProps["tabindex"]} */
  export let tabindex = undefined;

  /** @type {HTMLInputElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-checkbox", className]);
</script>

<input
  bind:this={rootElement}
  {...$$restProps}
  bind:checked
  class={classes}
  {disabled}
  {id}
  {name}
  on:change
  {tabindex}
  type="checkbox"
/>
