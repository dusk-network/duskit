<svelte:options immutable={true} />

<script>
  /** @typedef {import("./RelativeTime").RelativeTimeProps} RelativeTimeProps */

  import { Rerender } from "../..";

  import { getRelativeTimeString } from "@duskit/date";
  import { makeClassName } from "@duskit/string";

  /** @type {RelativeTimeProps["autoRefresh"]} */
  export let autoRefresh = false;

  /** @type {RelativeTimeProps["className"]} */
  export let className = undefined;

  /** @type {RelativeTimeProps["date"]} */
  export let date;

  /** @type {HTMLTimeElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  $: classes = makeClassName(["dusk-relative-time", className]);
</script>

<time
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
  datetime={date.toISOString()}
>
  {#if autoRefresh}
    <Rerender
      generateValue={() => getRelativeTimeString(date, "long")}
      let:value
    >
      <slot relativeTime={value}>{value}</slot>
    </Rerender>
  {:else}
    {@const relativeTime = getRelativeTimeString(date, "long")}
    <slot {relativeTime}>{relativeTime}</slot>
  {/if}
</time>
