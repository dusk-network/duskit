<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Agreement").AgreementProps} AgreementProps */

  import { makeClassName } from "@duskit/string";

  import getDeterministicId from "../__shared__/getDeterministicId";

  import { Checkbox } from "../..";

  import "./Agreement.css";

  /** @type {AgreementProps["checked"]} */
  export let checked = false;

  /** @type {AgreementProps["className"]} */
  export let className = undefined;

  /** @type {AgreementProps["controlId"]} */
  export let controlId = getDeterministicId("dusk-checkbox");

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
    bind:checked
    on:change
    className="dusk-agreement__checkbox"
    id={controlId}
    {name}
    {disabled}
    tabindex={0}
  />
  <label for={controlId} class="dusk-agreement__label">
    {label}
  </label>
</div>
