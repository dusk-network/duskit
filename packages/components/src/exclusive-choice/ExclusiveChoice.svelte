<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ExclusiveChoice").ExclusiveChoiceProps} ExclusiveChoiceProps */

  import { isType } from "lamb";
  import { makeClassName, randomUUID } from "@duskit/string";

  import "./ExclusiveChoice.css";

  /** @type {ExclusiveChoiceProps["className"]} */
  export let className = undefined;

  /** @type {ExclusiveChoiceProps["name"]} */
  export let name = undefined;

  /** @type {ExclusiveChoiceProps["options"]} */
  export let options;

  /** @type {ExclusiveChoiceProps["value"]} */
  export let value;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  /** @type {(v: any) => v is string} */
  const isString = isType("String");

  const baseId = `dusk-exclusive-choice-${randomUUID()}`;

  $: classes = makeClassName(["dusk-exclusive-choice", className]);
</script>

<div bind:this={rootElement} {...$$restProps} class={classes} role="radiogroup">
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
      on:change
      type="radio"
      value={optionValue}
    />
    <label class="dusk-exclusive-choice__label" for={id}
      >{isStringOption ? option : (option.label ?? optionValue)}</label
    >
  {/each}
</div>
