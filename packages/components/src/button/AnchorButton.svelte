<svelte:options immutable={true} />

<script>
  /** @typedef {import("./AnchorButton").AnchorButtonProps} AnchorButtonProps */

  import { makeClassName } from "@duskit/string";

  import { Anchor, Icon } from "../..";

  import "./Button.css";

  /** @type {AnchorButtonProps["className"]} */
  export let className = undefined;

  /** @type {AnchorButtonProps["disabled"]} */
  export let disabled = false;

  /** @type {AnchorButtonProps["href"]} */
  export let href;

  /** @type {AnchorButtonProps["icon"]} */
  export let icon = undefined;

  /** @type {AnchorButtonProps["size"]} */
  export let size = "default";

  /** @type {AnchorButtonProps["text"]} */
  export let text = undefined;

  /** @type {AnchorButtonProps["variant"]} */
  export let variant = "primary";

  /** @type {Anchor} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName([
    "dusk-anchor-button",
    `dusk-anchor-button--variant--${variant}`,
    `dusk-anchor-button--size--${size}`,
    disabled ? "dusk-anchor-button--disabled" : "",
    icon && text ? "dusk-icon-button--labeled" : icon ? "dusk-icon-button" : "",
    className,
  ]);
</script>

<Anchor
  bind:this={rootElement}
  {...$$restProps}
  aria-disabled={disabled}
  className={classes}
  {href}
  on:click
  tabindex={disabled ? "-1" : ($$restProps.tabindex ?? undefined)}
>
  {#if icon?.position === "after"}
    {#if text}
      <span class="dusk-anchor-button__text">{text}</span>
    {/if}
    <Icon className="dusk-anchor-button__icon" path={icon.path} {size} />
  {:else if icon}
    <Icon className="dusk-anchor-button__icon" path={icon.path} {size} />
    {#if text}
      <span class="dusk-anchor-button__text">{text}</span>
    {/if}
  {:else if text}
    <span class="dusk-anchor-button__text">{text}</span>
  {/if}
</Anchor>
