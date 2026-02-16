<script>
  /** @typedef {import("./Agreement").AgreementProps} AgreementProps */

  import { makeClassName, randomUUID } from "@duskit/string";

  import { Checkbox } from "../..";

  import "./Agreement.css";

  /**
   * @typedef {Object} Props
   * @property {AgreementProps["checked"]} [checked]
   * @property {AgreementProps["className"]} [className]
   * @property {AgreementProps["controlId"]} [controlId]
   * @property {AgreementProps["disabled"]} [disabled]
   * @property {AgreementProps["label"]} label
   * @property {AgreementProps["name"]} name
   */

  /** @type {Props & { [key: string]: any }} */
  /* eslint-disable prefer-const */
  let {
    checked = $bindable(false),
    className = undefined,
    controlId = `dusk-checkbox-${randomUUID()}`,
    disabled = false,
    label,
    name,
    ...rest
  } = $props();
  /* eslint-enable prefer-const */

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(makeClassName(["dusk-agreement", className]));
</script>

<div bind:this={rootElement} {...rest} class={classes}>
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
