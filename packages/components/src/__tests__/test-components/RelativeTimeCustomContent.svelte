<svelte:options immutable={true} />

<script>
  import { RelativeTime } from "../../..";

  /** @type {boolean} */
  export let autoRefresh;

  /** @type {Date} */
  export let date;

  /** @type {RelativeTime} */
  let rootElement;

  export const getRootElement = () => rootElement;
</script>

<RelativeTime bind:this={rootElement} {autoRefresh} {date}>
  <svelte:fragment let:relativeTime>
    <span>The relative time now is {relativeTime}</span>
  </svelte:fragment>
</RelativeTime>
