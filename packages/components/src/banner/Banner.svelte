<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Banner").BannerProps} BannerProps */

  import {
    mdiAlertCircleOutline,
    mdiAlertDecagramOutline,
    mdiAlertOutline,
    mdiCheckDecagramOutline,
  } from "@mdi/js";

  import { makeClassName } from "@duskit/string";

  import { Icon } from "../..";

  import "./Banner.css";

  /** @type {BannerProps["className"]} */
  export let className = undefined;

  /** @type {BannerProps["title"]} */
  export let title;

  /** @type {BannerProps["variant"]} */
  export let variant;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  function getBannerIconPath() {
    switch (variant) {
      case "error":
        return mdiAlertDecagramOutline;
      case "success":
        return mdiCheckDecagramOutline;
      case "warning":
        return mdiAlertOutline;
      default:
        return mdiAlertCircleOutline;
    }
  }

  $: classes = makeClassName([
    "dusk-banner",
    `dusk-banner--variant--${variant}`,
    title ? "" : "dusk-banner--no-title",
    className,
  ]);
</script>

<div bind:this={rootElement} {...$$restProps} class={classes}>
  <Icon path={getBannerIconPath()} size="large" className="dusk-banner__icon" />
  <div class="dusk-banner__content">
    {#if title}
      <strong class="dusk-banner__title">{title}</strong>
    {/if}
    <slot>
      <p>No banner content provided.</p>
    </slot>
  </div>
</div>
