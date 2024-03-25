<svelte:options immutable={true} />

<script>
  import { makeClassName } from "@duskit/string";
  import "./styles.css";

  /** @type {String | Undefined} */
  export let className = undefined;

  /** @type {String} */
  export let href;
</script>

<a
  {...$$restProps}
  class={makeClassName(["dusk-anchor", className])}
  {href}
  on:click
>
  <slot />
</a>
