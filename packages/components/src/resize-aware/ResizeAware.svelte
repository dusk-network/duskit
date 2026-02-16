<script>
  import { onMount } from "svelte";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet<[any]>} [children]
   */

  /** @type {Props} */
  const { children } = $props();

  /** @type {HTMLDivElement} */
  let rootElement = /** @type {HTMLDivElement} */ ($state());

  export const getRootElement = () => rootElement;

  let rect = $state(new DOMRect());
  const height = $derived(rect.height);
  const width = $derived(rect.width);

  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      rect = entries[0].contentRect;
    });

    resizeObserver.observe(rootElement);

    return () => resizeObserver.disconnect();
  });
</script>

<div bind:this={rootElement} style:height="100%" style:width="100%">
  {@render children?.({ height, rect, width })}
</div>
