<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Select").SelectProps} SelectProps */

  import { ownPairs } from "lamb";

  import { makeClassName } from "@duskit/string";

  import Options from "./Options.svelte";
  import "./Select.css";

  /** @type {SelectProps["className"]} */
  export let className = undefined;

  /** @type {SelectProps["options"]} */
  export let options;

  /** @type {SelectProps["value"]} */
  export let value = undefined;

  /** @type {HTMLSelectElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-select", className]);
</script>

<select
  bind:this={rootElement}
  {...$$restProps}
  bind:value
  class={classes}
  on:change
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
