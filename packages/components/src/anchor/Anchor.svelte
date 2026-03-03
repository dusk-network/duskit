<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Anchor").AnchorProps} AnchorProps */

  import { makeClassName } from "@duskit/string";

  import "./Anchor.css";

  /** @type {AnchorProps["className"]} */
  export let className = undefined;

  /** @type {AnchorProps["href"]} */
  export let href;

  /** @type {HTMLAnchorElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-anchor", className]);
</script>

<a bind:this={rootElement} {...$$restProps} class={classes} {href} on:click>
  <slot />
</a>
