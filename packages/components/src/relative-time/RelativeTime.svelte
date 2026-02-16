<script>
  /** @typedef {import("./RelativeTime").RelativeTimeProps} RelativeTimeProps */

  import { Rerender } from "../..";

  import { getRelativeTimeString } from "@duskit/date";
  import { makeClassName } from "@duskit/string";

  /**
   * @typedef {Object} Props
   * @property {RelativeTimeProps["autoRefresh"]} [autoRefresh]
   * @property {RelativeTimeProps["className"]} [className]
   * @property {RelativeTimeProps["date"]} date
   * @property {import('svelte').Snippet<[any]>} [children]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    autoRefresh = false,
    className = undefined,
    date,
    children,
    ...rest
  } = $props();

  /** @type {HTMLTimeElement} */
  let rootElement = /** @type {HTMLTimeElement} */ ($state());

  export const getRootElement = () => rootElement;

  const classes = $derived(makeClassName(["dusk-relative-time", className]));

  const childrenRender = $derived(children);
</script>

<time
  bind:this={rootElement}
  {...rest}
  class={classes}
  datetime={date.toISOString()}
>
  {#if autoRefresh}
    <Rerender generateValue={() => getRelativeTimeString(date, "long")}>
      {#snippet children({ value = "" })}
        {@const relativeTime = value}
        {#if childrenRender}
          {@render childrenRender({ relativeTime })}
        {:else}
          {relativeTime}
        {/if}
      {/snippet}
    </Rerender>
  {:else}
    {@const relativeTime = getRelativeTimeString(date, "long")}
    {#if children}{@render children({ relativeTime })}{:else}{relativeTime}{/if}
  {/if}
</time>
