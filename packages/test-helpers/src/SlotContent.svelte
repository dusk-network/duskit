<script>
  /** @typedef {import("..").SlotContentProps} SlotContentProps */

  /** @type {SlotContentProps["componentOptions"]} */
  export let componentOptions;

  /** @type {SlotContentProps["component"]} */
  export let Component;

  /** @type {SlotContentProps["text"]} */
  export let text;
</script>

<svelte:component this={Component} {...componentOptions}>
  <span>{text}</span>
</svelte:component>
