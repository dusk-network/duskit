<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Button").ButtonProps} ButtonProps */

  import { makeClassName } from "@duskit/string";

  import { Icon } from "../..";

  import "./Button.css";

  /** @type {ButtonProps["className"]} */
  export let className = undefined;

  /** @type {ButtonProps["icon"]} */
  export let icon = undefined;

  /** @type {ButtonProps["pressed"]} */
  export let pressed = false;

  /** @type {ButtonProps["size"]} */
  export let size = "default";

  /** @type {ButtonProps["text"]} */
  export let text = undefined;

  /** @type {ButtonProps["type"]} */
  export let type = "button";

  /** @type {ButtonProps["variant"]} */
  export let variant = "primary";

  /** @type {HTMLButtonElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName([
    "dusk-button",
    `dusk-button--type--${type}`,
    `dusk-button--variant--${variant}`,
    `dusk-button--size--${size}`,
    icon && text ? "dusk-icon-button--labeled" : icon ? "dusk-icon-button" : "",
    className,
  ]);
</script>

<button
  bind:this={rootElement}
  {...$$restProps}
  aria-pressed={type === "toggle" ? pressed : undefined}
  class={classes}
  on:click
  on:mousedown
  on:mouseup
  type={type === "toggle" ? "button" : type}
>
  {#if icon?.position === "after"}
    {#if text}
      <span class="dusk-button__text">{text}</span>
    {/if}
    <Icon className="dusk-button__icon" path={icon.path} {size} />
  {:else if icon}
    <Icon className="dusk-button__icon" path={icon.path} {size} />
    {#if text}
      <span class="dusk-button__text">{text}</span>
    {/if}
  {:else if text}
    <span class="dusk-button__text">{text}</span>
  {/if}
</button>
