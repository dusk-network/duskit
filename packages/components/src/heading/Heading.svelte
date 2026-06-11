<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Heading").HeadingProps<import("./Heading").HeadingTag>} HeadingProps */

  import { makeClassName } from "@duskit/string";

  import "./Heading.css";

  /** @type {HeadingProps["as"]} */
  export let as;

  /** @type {HeadingProps["className"]} */
  export let className = undefined;

  /** @type {HeadingProps["mono"]} */
  export let mono = false;

  /** @type {HeadingProps["prominence"]} */
  export let prominence;

  /** @type {HeadingProps["textAlign"]} */
  export let textAlign = undefined;

  /** @type {HeadingProps["uppercase"]} */
  export let uppercase = false;

  /** @type {HeadingProps["variant"]} */
  export let variant = "plain";

  /** @type {HTMLDivElement | HTMLHeadingElement | HTMLSpanElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: isBracketed =
    variant === "bracketed-neutral" ||
    variant === "bracketed-primary" ||
    variant === "bracketed-secondary";
  $: classes = makeClassName([
    "dusk-heading",
    mono ? "dusk-heading--mono" : undefined,
    `dusk-heading--prominence--${prominence}`,
    `dusk-heading--variant--${variant}`,
    textAlign ? `dusk-heading--align--${textAlign}` : undefined,
    uppercase ? "dusk-heading--uppercase" : undefined,
    className,
  ]);
</script>

<svelte:element
  this={as}
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
>
  {#if isBracketed}
    <span aria-hidden="true" class="dusk-heading__decoration">[</span><slot
    /><span aria-hidden="true" class="dusk-heading__decoration">]</span>
  {:else}
    <slot />
  {/if}
</svelte:element>
