<script>
  /** @typedef {import("./Badge").BadgeProps} BadgeProps */

  import { makeClassName } from "@duskit/string";

  import "./Badge.css";

  /**
   * @typedef {Object} Props
   * @property {BadgeProps["className"]} [className]
   * @property {BadgeProps["text"]} [text]
   * @property {BadgeProps["variant"]} [variant]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    text = "",
    variant = "neutral",
    ...rest
  } = $props();

  /** @type {HTMLSpanElement} */
  let rootElement = /** @type {HTMLSpanElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(
    makeClassName(["dusk-badge", `dusk-badge--variant-${variant}`, className])
  );
</script>

<span bind:this={rootElement} {...rest} class={classes}>{text}</span>
