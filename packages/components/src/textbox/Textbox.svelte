<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Textbox").TextboxProps} TextboxProps */
  /** @typedef {import("./Textbox").TextboxType} TextboxType */

  import { makeClassName } from "@duskit/string";

  import "./Textbox.css";

  /** @type {TextboxProps["className"]} */
  export let className = undefined;

  /** @type {TextboxType} */
  export let type = "text";

  /** @type {string | number} */
  export let value = type === "number" ? 0 : "";

  /** @type {HTMLTextAreaElement | HTMLInputElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  export function focus() {
    rootElement?.focus();
  }

  export function select() {
    rootElement?.select();
  }

  /**
   * Needed, as the value cannot be bound to the input element
   * when the type is set dynamically
   * @param {Event & {currentTarget: EventTarget & HTMLInputElement}} event
   */
  function handleInput(event) {
    const target = event.currentTarget;

    value = target.type === "number" ? target.valueAsNumber : target.value;
  }

  $: classes = makeClassName([
    "dusk-textbox",
    `dusk-textbox-${type}`,
    className,
  ]);
</script>

{#if type === "multiline"}
  <textarea
    {...$$restProps}
    class={classes}
    bind:this={rootElement}
    bind:value
    on:blur
    on:focus
    on:input
    on:keydown
    on:paste></textarea>
{:else}
  <input
    {...$$restProps}
    class={classes}
    {type}
    {value}
    bind:this={rootElement}
    on:blur
    on:focus
    on:input={handleInput}
    on:input
    on:keydown
    on:paste
  />
{/if}
