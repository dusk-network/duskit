<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Card").CardProps} CardProps */

  import { makeClassName } from "@duskit/string";

  import "./Card.css";

  /** @type {CardProps["as"]} */
  export let as = "div";

  /** @type {CardProps["className"]} */
  export let className = undefined;

  /** @type {CardProps["gap"]} */
  export let gap = "default";

  /** @type {CardProps["showBody"]} */
  export let showBody = true;

  /** @type {HTMLElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-card", `dusk-card--gap-${gap}`, className]);
</script>

<svelte:element
  this={as}
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
>
  {#if $$slots.header}
    <div class="dusk-card__header-container">
      <slot name="header" />
    </div>
  {/if}
  {#if showBody}
    <div class="dusk-card__body-container">
      <slot />
    </div>
  {/if}
  {#if $$slots.footer}
    <div class="dusk-card__footer-container">
      <slot name="footer" />
    </div>
  {/if}
</svelte:element>
