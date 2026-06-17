<svelte:options immutable={true} />

<script>
  /** @typedef {import("./RelativeTime").RelativeTimeProps} RelativeTimeProps */

  import { getRelativeTimeString, getRelativeTimeUnit } from "@duskit/date";
  import { makeClassName } from "@duskit/string";

  import { Rerender } from "../..";

  import "./RelativeTime.css";

  /** @type {RelativeTimeProps["autoRefresh"]} */
  export let autoRefresh = false;

  /** @type {RelativeTimeProps["className"]} */
  export let className = undefined;

  /** @type {RelativeTimeProps["date"]} */
  export let date;

  /** @type {HTMLTimeElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  /** @param {Date} d */
  const getGenerator = (d) =>
    function () {
      interval = getInterval();

      return getRelativeTimeString(d, "long");
    };

  const getInterval = () =>
    autoRefresh ? getRelativeTimeUnit(date.getTime() - Date.now()).factor : -1;

  let interval = getInterval();

  $: classes = makeClassName(["dusk-relative-time", className]);
  $: generator = getGenerator(date);
</script>

<time
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
  datetime={date.toISOString()}
>
  {#if autoRefresh}
    <Rerender generateValue={generator} {interval} let:value>
      <slot relativeTime={value}>{value}</slot>
    </Rerender>
  {:else}
    {@const relativeTime = getRelativeTimeString(date, "long")}
    <slot {relativeTime}>{relativeTime}</slot>
  {/if}
</time>
