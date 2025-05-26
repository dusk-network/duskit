<script>
  export let Hst;
  import sizes from "@duskit/design-tokens/js/base/size.js";

  function getSizes(tokens) {
    const baseSize = tokens?.base?.size;

    if (!baseSize) return [];

    return Object.values(baseSize).map((size) => {
      return { [size.key]: size.$value };
    });
  }
</script>

<svelte:component
  this={Hst.Story}
  layout={{ iframe: false, type: "single" }}
  icon="mdi:ruler"
  title="Sizes"
  group="design-tokens"
  responsiveDisabled
  autoPropsDisabled
>
  {#each getSizes(sizes) as size (Object.values(size)[0])}
    <div class="htw-flex htw-flex-col htw-gap-2 htw-my-8">
      <div class="htw-bg-gray-500/10">
        <div
          class="htw-h-20 htw-bg-primary-500"
          style={`width: ${Object.values(size)[0]}`}
        ></div>
      </div>
      <div class="htw-mx-4">
        <div class="htw-flex htw-gap-1">
          <pre class="htw-my-0 htw-truncate htw-shrink">{Object.keys(
              size
            )[0]}</pre>
        </div>
        <div class="htw-flex htw-gap-1">
          <pre
            class="htw-my-0 htw-opacity-50 htw-truncate htw-shrink">{Object.values(
              size
            )[0]}</pre>
        </div>
      </div>
    </div>
  {/each}
</svelte:component>
