<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Card").CardProps} CardProps */

  import { makeClassName } from "@duskit/string";

  import "./Card.css";

  /** @type {CardProps["as"]} */
  export let as = "div";

  /** @type {CardProps["className"]} */
  export let className = undefined;

  /** @type {CardProps["variant"]} */
  export let variant = "surface";

  /** @type {HTMLElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName([
    "dusk-card",
    `dusk-card--variant--${variant}`,
    className,
  ]);
</script>

<svelte:element
  this={as}
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
>
  {#if $$slots.header}
    <header class="dusk-card__header">
      <slot name="header" />
    </header>
  {/if}

  {#if $$slots.default}
    <div class="dusk-card__body">
      <slot />
    </div>
  {/if}

  {#if $$slots.footer}
    <footer class="dusk-card__footer">
      <slot name="footer" />
    </footer>
  {/if}
</svelte:element>
