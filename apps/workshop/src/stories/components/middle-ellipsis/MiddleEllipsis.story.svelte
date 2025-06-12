<script>
  import { MiddleEllipsis } from "@duskit/components";

  export let Hst;

  let properties = {
    as: "pre",
    text: "The quick brown fox jumps over the lazy dog",
  };
</script>

<svelte:component this={Hst.Story} title="MiddleEllipsis" group="components">
  <div class="ellipsis-container">
    <MiddleEllipsis {...properties} />
  </div>
  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Json}
      bind:value={properties}
      title="Current Props"
    />
  </svelte:fragment>
</svelte:component>

<style>
  .ellipsis-container {
    width: auto;
    padding: 2rem;
    background-color: #ddd;
  }
</style>
