<script>
  /** @typedef {import("./Icon").IconProps} IconProps */

  import { makeClassName } from "@duskit/string";

  import "./Icon.css";

  /**
   * @typedef {Object} Props
   * @property {IconProps["className"]} [className]
   * @property {IconProps["isInStack"]} [isInStack]
   * @property {IconProps["path"]} path
   * @property {IconProps["role"]} [role]
   * @property {IconProps["size"]} [size]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    isInStack = false,
    path,
    role = "graphics-symbol",
    size = "default",
    ...rest
  } = $props();

  /** @type {SVGGElement | SVGSVGElement} */
  let rootElement = /** @type {SVGGElement | SVGSVGElement} */ ($state());

  export const getRootElement = () => rootElement;

  const commonAttributes = $derived({
    ...rest,
    class: makeClassName(["dusk-icon", `dusk-icon--size--${size}`, className]),
  });
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
