<svelte:options immutable={true} />

<script>
  import { onMount } from "svelte";

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  let rect = new DOMRect();
  let { height, width } = rect;

  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      rect = entries[0].contentRect;
      height = rect.height;
      width = rect.width;
    });

    resizeObserver.observe(rootElement);

    return () => resizeObserver.disconnect();
  });
</script>

<div bind:this={rootElement} style:height="100%" style:width="100%">
  <slot {height} {rect} {width} />
</div>
