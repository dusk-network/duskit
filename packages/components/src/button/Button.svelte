<script>
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  /** @typedef {import("./Button").ButtonProps} ButtonProps */

  import { makeClassName } from "@duskit/string";

  import { Icon } from "../..";

  import "./Button.css";

  /**
   * @typedef {Object} Props
   * @property {ButtonProps["active"]} [active]
   * @property {ButtonProps["className"]} [className]
   * @property {ButtonProps["icon"]} [icon]
   * @property {ButtonProps["size"]} [size]
   * @property {ButtonProps["text"]} [text]
   * @property {ButtonProps["type"]} [type]
   * @property {ButtonProps["variant"]} [variant]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    active = false,
    className = undefined,
    icon = undefined,
    size = "default",
    text = undefined,
    type = "button",
    variant = "primary",
    ...rest
  } = $props();

  /** @type {HTMLButtonElement} */
  let rootElement = /** @type {HTMLButtonElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(
    makeClassName([
      "dusk-button",
      `dusk-button--type--${type}`,
      `dusk-button--variant--${variant}`,
      `dusk-button--size--${size}`,
      icon && text
        ? "dusk-icon-button--labeled"
        : icon
          ? "dusk-icon-button"
          : "",
      type === "toggle" && active ? "dusk-button--active" : "",
      className,
    ])
  );
</script>

<button
  bind:this={rootElement}
  {...rest}
  aria-pressed={type === "toggle" ? active : undefined}
  class={classes}
  onclick={bubble("click")}
  onmousedown={bubble("mousedown")}
  onmouseup={bubble("mouseup")}
  type={type === "toggle" ? "button" : type}
>
  {#if icon?.position === "after"}
    {#if text}
      <span class="dusk-button__text">{text}</span>
    {/if}
    <Icon
      className="dusk-button__icon"
      path={icon.path}
      size={icon.size ?? "default"}
    />
  {:else if icon}
    <Icon
      className="dusk-button__icon"
      path={icon.path}
      size={icon.size ?? "default"}
    />
    {#if text}
      <span class="dusk-button__text">{text}</span>
    {/if}
  {:else if text}
    <span class="dusk-button__text">{text}</span>
  {/if}
</button>
