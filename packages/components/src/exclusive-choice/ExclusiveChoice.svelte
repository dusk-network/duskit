<script>
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  /** @typedef {import("./ExclusiveChoice").ExclusiveChoiceProps} ExclusiveChoiceProps */

  import { isType } from "lamb";

  import { makeClassName, randomUUID } from "@duskit/string";

  import "./ExclusiveChoice.css";

  /**
   * @typedef {Object} Props
   * @property {ExclusiveChoiceProps["className"]} [className]
   * @property {ExclusiveChoiceProps["name"]} [name]
   * @property {ExclusiveChoiceProps["options"]} options
   * @property {ExclusiveChoiceProps["value"]} value
   */

  /** @type {Props & { [key: string]: any }} */
  /* eslint-disable prefer-const */
  let {
    className = undefined,
    name = undefined,
    options,
    value = $bindable(),
    ...rest
  } = $props();
  /* eslint-enable prefer-const */

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

  export const getRootElement = () => rootElement;

  /** @type {(v: any) => v is string} */
  const isString = isType("String");

  const baseId = `dusk-exclusive-choice-${randomUUID()}`;

  const classes = $derived(makeClassName(["dusk-exclusive-choice", className]));
</script>

<div bind:this={rootElement} {...rest} class={classes} role="radiogroup">
  {#each options as option (option)}
    {@const isStringOption = isString(option)}
    {@const optionValue = isStringOption ? option : option.value}
    {@const id = `${baseId}-${optionValue}`}
    <input
      bind:group={value}
      class="dusk-exclusive-choice__radio"
      checked={optionValue === value}
      disabled={isStringOption ? false : option.disabled}
      {id}
      name={name ?? baseId}
      onchange={bubble("change")}
      type="radio"
      value={optionValue}
    />
    <label class="dusk-exclusive-choice__label" for={id}
      >{isStringOption ? option : (option.label ?? optionValue)}</label
    >
  {/each}
</div>
