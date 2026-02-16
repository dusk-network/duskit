<script>
  /** @typedef {import("./AnchorButton").AnchorButtonProps} AnchorButtonProps */

  import { makeClassName } from "@duskit/string";

  import { Anchor, Icon } from "../..";

  import "./Button.css";

  /**
   * @typedef {Object} Props
   * @property {AnchorButtonProps["className"]} [className]
   * @property {AnchorButtonProps["disabled"]} [disabled]
   * @property {AnchorButtonProps["href"]} href
   * @property {AnchorButtonProps["icon"]} [icon]
   * @property {AnchorButtonProps["size"]} [size]
   * @property {AnchorButtonProps["text"]} [text]
   * @property {AnchorButtonProps["variant"]} [variant]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    className = undefined,
    disabled = false,
    href,
    icon = undefined,
    size = "default",
    text = undefined,
    variant = "primary",
    ...rest
  } = $props();

  /** @type {Anchor} */
  let rootElement = /** @type {Anchor} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(
    makeClassName([
      "dusk-anchor-button",
      `dusk-anchor-button--variant--${variant}`,
      `dusk-anchor-button--size--${size}`,
      disabled ? "dusk-anchor-button--disabled" : "",
      icon && text
        ? "dusk-icon-button--labeled"
        : icon
          ? "dusk-icon-button"
          : "",
      className,
    ])
  );
</script>

<Anchor
  bind:this={rootElement}
  {...rest}
  aria-disabled={disabled}
  className={classes}
  {href}
  on:click
  tabindex={disabled ? "-1" : (rest.tabindex ?? undefined)}
>
  {#if icon?.position === "after"}
    {#if text}
      <span class="dusk-anchor-button__text">{text}</span>
    {/if}
    <Icon
      className="dusk-anchor-button__icon"
      path={icon.path}
      size={icon.size}
    />
  {:else if icon}
    <Icon
      className="dusk-anchor-button__icon"
      path={icon.path}
      size={icon.size}
    />
    {#if text}
      <span class="dusk-anchor-button__text">{text}</span>
    {/if}
  {:else if text}
    <span class="dusk-anchor-button__text">{text}</span>
  {/if}
</Anchor>
