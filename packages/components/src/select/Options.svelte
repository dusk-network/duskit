<script>
  /** @typedef {import("../dusk.components").OptionItem} OptionItem */

  import { isType } from "lamb";

  /** @type {(v: any) => v is string} */
  const isString = isType("String");

  /**
   * @typedef {Object} Props
   * @property {OptionItem[] | string[]} options
   */

  /** @type {Props} */
  const { options } = $props();
</script>

{#each options as option (isString(option) ? option : option.value)}
  <option
    disabled={isString(option) ? false : option.disabled}
    value={isString(option) ? option : option.value}
  >
    {isString(option) ? option : (option.label ?? option.value)}
  </option>
{/each}
