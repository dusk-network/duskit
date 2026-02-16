<script>
  /** @typedef {import("./Card").CardProps} CardProps */

  import { makeClassName } from "@duskit/string";

  import "./Card.css";

  /**
   * @typedef {Object} Props
   * @property {CardProps["as"]} [as]
   * @property {CardProps["className"]} [className]
   * @property {CardProps["gap"]} [gap]
   * @property {CardProps["onSurface"]} [onSurface]
   * @property {CardProps["showBody"]} [showBody]
   * @property {import('svelte').Snippet} [header]
   * @property {import('svelte').Snippet} [children]
   * @property {import('svelte').Snippet} [footer]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    as = "div",
    className = undefined,
    gap = "default",
    onSurface = false,
    showBody = true,
    header,
    children,
    footer,
    ...rest
  } = $props();

  /** @type {HTMLElement} */
  let rootElement = /** @type {HTMLElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(
    makeClassName([
      "dusk-card",
      `dusk-card--gap-${gap}`,
      `dusk-card--${onSurface ? "on-surface" : "off-surface"}`,
      className,
    ])
  );
</script>

<svelte:element this={as} bind:this={rootElement} {...rest} class={classes}>
  {#if header}
    <div class="dusk-card__header-container">
      {@render header?.()}
    </div>
  {/if}
  {#if showBody}
    <div class="dusk-card__body-container">
      {@render children?.()}
    </div>
  {/if}
  {#if footer}
    <div class="dusk-card__footer-container">
      {@render footer?.()}
    </div>
  {/if}
</svelte:element>
