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

  import getDeterministicId from "../__shared__/getDeterministicId";

  import { Icon } from "../..";

  import "./Banner.css";

  /** @type {BannerProps["className"]} */
  export let className = undefined;

  /** @type {BannerProps["role"]} */
  export let role = undefined;

  /** @type {BannerProps["title"]} */
  export let title;

  /** @type {BannerProps["variant"]} */
  export let variant;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const titleId = getDeterministicId("dusk-banner-title");

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

  $: ariaRole =
    role ?? (variant === "error" || variant === "warning" ? "alert" : "status");
  $: classes = makeClassName([
    "dusk-banner",
    `dusk-banner--variant--${variant}`,
    title ? "" : "dusk-banner--no-title",
    className,
  ]);
</script>

<div
  bind:this={rootElement}
  {...$$restProps}
  aria-labelledby={title ? titleId : undefined}
  class={classes}
  role={ariaRole}
>
  <Icon path={getBannerIconPath()} size="large" className="dusk-banner__icon" />
  <div class="dusk-banner__content">
    {#if title}
      <strong class="dusk-banner__title" id={titleId}>{title}</strong>
    {/if}
    <slot>
      <p>No banner content provided.</p>
    </slot>
  </div>
</div>
