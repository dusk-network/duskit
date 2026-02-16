<script>
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  /** @typedef {import("./Anchor").AnchorProps} AnchorProps */

  import { makeClassName } from "@duskit/string";

  import "./Anchor.css";

  /**
   * @typedef {Object} Props
   * @property {AnchorProps["className"]} [className]
   * @property {AnchorProps["href"]} href
   * @property {AnchorProps["onSurface"]} [onSurface]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    href,
    onSurface = true,
    children,
    ...rest
  } = $props();

  /** @type {HTMLAnchorElement} */
  let rootElement = /** @type {HTMLAnchorElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(
    makeClassName([
      "dusk-anchor",
      `dusk-anchor--${onSurface ? "on-surface" : "off-surface"}`,
      className,
    ])
  );
</script>

<a
  bind:this={rootElement}
  {...rest}
  class={classes}
  {href}
  onclick={bubble("click")}
>
  {@render children?.()}
</a>
