<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Icon").IconProps} IconProps */

  import { makeClassName } from "@duskit/string";

  import "./Icon.css";

  /** @type {IconProps["className"]} */
  export let className = undefined;

  /** @type {IconProps["isInStack"]} */
  export let isInStack = false;

  /** @type {IconProps["path"]} */
  export let path;

  /** @type {IconProps["role"]} */
  export let role = "graphics-symbol";

  /** @type {IconProps["size"]} */
  export let size = "default";

  /** @type {SVGGElement | SVGSVGElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: commonAttributes = {
    ...$$restProps,
    class: makeClassName(["dusk-icon", `dusk-icon--size--${size}`, className]),
  };
</script>

{#if isInStack}
  <g bind:this={rootElement} {...commonAttributes}>
    <rect />
    <path d={path} />
  </g>
{:else}
  <svg bind:this={rootElement} {...commonAttributes} {role} viewBox="0 0 24 24">
    <path d={path} />
  </svg>
{/if}
