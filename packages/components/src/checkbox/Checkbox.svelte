<script>
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  /** @typedef {import("./Checkbox").CheckboxProps} CheckboxProps */

  import { makeClassName, randomUUID } from "@duskit/string";

  import "./Checkbox.css";

  /**
   * @typedef {Object} Props
   * @property {CheckboxProps["checked"]} [checked]
   * @property {CheckboxProps["className"]} [className]
   * @property {CheckboxProps["disabled"]} [disabled]
   * @property {CheckboxProps["id"]} [id]
   * @property {CheckboxProps["name"]} name
   * @property {CheckboxProps["tabindex"]} [tabindex]
   */

  /** @type {Props & { [key: string]: any }} */
  /* eslint-disable prefer-const */
  let {
    checked = $bindable(false),
    className = undefined,
    disabled = false,
    id = `dusk-checkbox-${randomUUID()}`,
    name,
    tabindex = undefined,
    ...rest
  } = $props();
  /* eslint-enable prefer-const */

  /** @type {HTMLInputElement} */
  let rootElement = /** @type {HTMLInputElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(makeClassName(["dusk-checkbox", className]));
</script>

<input
  bind:this={rootElement}
  {...rest}
  type="checkbox"
  {id}
  {tabindex}
  {name}
  {disabled}
  class={classes}
  bind:checked
  onchange={bubble("change")}
/>
