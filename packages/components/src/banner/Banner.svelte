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

  /**
   * @typedef {Object} Props
   * @property {BannerProps["className"]} [className]
   * @property {BannerProps["title"]} title
   * @property {BannerProps["variant"]} variant
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props & { [key: string]: any }} */
  const { className = undefined, title, variant, children, ...rest } = $props();

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

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

  const classes = $derived(
    makeClassName(["dusk-banner", `dusk-banner--${variant}`, className])
  );
</script>

<div bind:this={rootElement} {...rest} class={classes}>
  <Icon
    path={getBannerIconPath()}
    size="large"
    className="dusk-banner__icon banner__icon--{variant}"
  />
  <div>
    <strong class="dusk-banner__title">{title}</strong>
    {#if children}{@render children()}{:else}
      <p>No banner content provided.</p>
    {/if}
  </div>
</div>
