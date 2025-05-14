<script>
  export let Hst;

  const tokens = {};
</script>

<svelte:component
  this={Hst.Story}
  layout={{ iframe: false, type: "single" }}
  icon="ic:baseline-font-download"
  title="Fonts"
  group="design-tokens"
  responsiveDisabled
  autoPropsDisabled
>
  {#each Object.entries(tokens) as [key, value] (key)}
    <div class="htw-flex htw-flex-col htw-gap-2 htw-my-8">
      <div class="htw-bg-gray-500/10">
        <div
          class="htw-h-20 htw-bg-primary-500"
          style={`width: ${value}`}
        ></div>
      </div>
      <div class="htw-mx-4">
        <div class="htw-flex htw-gap-1">
          <pre class="htw-my-0 htw-truncate htw-shrink">{key}</pre>
        </div>
        <div class="htw-flex htw-gap-1">
          <pre
            class="htw-my-0 htw-opacity-50 htw-truncate htw-shrink">{value}</pre>
        </div>
      </div>
    </div>
  {/each}
</svelte:component>
