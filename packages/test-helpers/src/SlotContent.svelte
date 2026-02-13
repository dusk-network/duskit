<svelte:options immutable={true} />

<script>
  /** @typedef {import("..").SlotContentProps} SlotContentProps */

  /** @type {SlotContentProps["componentOptions"]} */
  export let componentOptions;

  /** @type {SlotContentProps["component"]} */
  export let Component;

  /** @type {SlotContentProps["text"]} */
  export let text;

  /** @type {InstanceType<SlotContentProps["component"]>} */
  let rootElement;

  export const getRootElement = () => rootElement;
</script>

<svelte:component
  this={Component}
  bind:this={rootElement}
  {...componentOptions}
>
  <span>{text}</span>
</svelte:component>
