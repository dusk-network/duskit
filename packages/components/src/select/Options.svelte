<svelte:options immutable={true} />

<script>
  /** @typedef {import("../dusk.components").OptionItem} OptionItem */

  import { isType } from "lamb";

  /** @type {(v: any) => v is string} */
  const isString = isType("String");

  /** @type {OptionItem[] | string[]} */
  export let options;
</script>

{#each options as option (isString(option) ? option : option.value)}
  {@const isStringOption = isString(option)}
  <option
    disabled={isStringOption ? false : option.disabled}
    value={isStringOption ? option : option.value}
  >
    {isStringOption ? option : (option.label ?? option.value)}
  </option>
{/each}
