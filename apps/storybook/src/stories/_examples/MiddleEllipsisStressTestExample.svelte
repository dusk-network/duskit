<script>
  import { MiddleEllipsis } from "@duskit/components";

  const baseText =
    "Stress testing the MiddleEllipsis component with a very long string to ensure smooth animations and resize handling";

  let itemsCount = 1000;

  $: items = Array.from({ length: itemsCount }, (_, i) => ({
    id: i,
    text: `${baseText} (Item ${i})`,
  }));
</script>

<div class="test-wrapper">
  <header class="controls">
    <label>
      Items to render:
      <input
        bind:value={itemsCount}
        max="10000"
        min="10"
        step="10"
        type="number"
      />
    </label>
  </header>

  <main class="resizable-container">
    {#each items as item (item.id)}
      <MiddleEllipsis className="stress-item" text={item.text} />
    {/each}
  </main>
</div>

<style>
  .test-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    font-family: system-ui, sans-serif;
  }

  .controls {
    display: flex;
    padding: 1rem;
    background-color: #f4f4f5;
    border-radius: 0.5rem;
  }

  .resizable-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 18rem;
    max-width: 100%;
    height: 70vh;
    padding: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    resize: horizontal;
    border: 0.125rem dashed #bbb;
    background-color: #fff;
  }

  :global(.stress-item) {
    display: block;
    padding: 0.25rem 0.5rem;
    border: 0.0625rem solid #ccc;
    background-color: #fafafa;
    min-block-size: 2rem;
  }
</style>
