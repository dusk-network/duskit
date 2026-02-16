<script>
  import { RelativeTime } from "../../..";

  /**
   * @typedef {Object} Props
   * @property {boolean} autoRefresh
   * @property {Date} date
   */

  /** @type {Props} */
  const { autoRefresh, date } = $props();

  /** @type {RelativeTime} */
  let rootElement = /** @type {RelativeTime} */ ($state());

  export const getRootElement = () => rootElement;
</script>

<RelativeTime bind:this={rootElement} {autoRefresh} {date}>
  {#snippet children({ relativeTime = "" })}
    <span>The relative time now is {relativeTime}</span>
  {/snippet}
</RelativeTime>
