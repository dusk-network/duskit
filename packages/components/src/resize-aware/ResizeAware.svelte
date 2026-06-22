<svelte:options immutable={true} />

<script>
  import { onMount } from "svelte";

  import observeResize from "../__shared__/observeResize";

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  let rect = new DOMRect();
  let { height, width } = rect;

  onMount(() =>
    observeResize(rootElement, (entry) => {
      rect = entry.contentRect;
      height = rect.height;
      width = rect.width;
    })
  );
</script>

<div bind:this={rootElement} style:height="100%" style:width="100%">
  <slot {height} {rect} {width} />
</div>
