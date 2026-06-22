<svelte:options immutable={true} />

<script>
  import { Tabs } from "@duskit/components";

  export let items;
  export let selectedTab;

  /** @param {CustomEvent<string>} event */
  function handleChange(event) {
    // eslint-disable-next-line no-console
    console.log(`[Tabs] Tab changed to: ${event.detail}`);
  }
</script>

<div class="dusk-tabs-example-wrapper">
  <Tabs {items} {selectedTab} on:change={handleChange} />
</div>

<style>
  .dusk-tabs-example-wrapper {
    width: 520px;
    max-width: 100%;
    border: 0.125rem dashed #aaa;
    overflow: hidden;
    resize: horizontal;
  }
</style>
