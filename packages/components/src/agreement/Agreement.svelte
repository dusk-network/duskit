<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Agreement").AgreementProps} AgreementProps */

  import { makeClassName, randomUUID } from "@duskit/string";

  import { Checkbox } from "../..";

  import "./Agreement.css";

  /** @type {AgreementProps["checked"]} */
  export let checked = false;

  /** @type {AgreementProps["className"]} */
  export let className = undefined;

  /** @type {AgreementProps["controlId"]} */
  export let controlId = `dusk-checkbox-${randomUUID()}`;

  /** @type {AgreementProps["disabled"]} */
  export let disabled = false;

  /** @type {AgreementProps["label"]} */
  export let label;

  /** @type {AgreementProps["name"]} */
  export let name;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-agreement", className]);
</script>

<div bind:this={rootElement} {...$$restProps} class={classes}>
  <Checkbox
    tabindex={0}
    id={controlId}
    {name}
    {disabled}
    bind:checked
    on:change
  />
  <label for={controlId} class="dusk-agreement__label">
    {label}
  </label>
</div>
