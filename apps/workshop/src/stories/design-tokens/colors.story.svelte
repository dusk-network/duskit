<script>
  export let Hst;
</script>

<svelte:component this={Hst.Story} layout={{ type: 'single', iframe: false }} icon="mdi:palette" title="Colors" group="design-tokens" responsiveDisabled autoPropsDisabled>
  <svelte:component this="{Hst.Variant}" title="Primary Color Palette" responsiveDisabled>
    <svelte:component
      this={Hst.ColorShades}
      shades="{{"Smokey Black": "#101010", "Light Gray": "#E2DFE9", "Cornflower Blue": "#71B1FF", "Magnolia": "#EDEAF3"}}"
    />
  </svelte:component>
  <svelte:component this="{Hst.Variant}" title="Secondary Color Palette" responsiveDisabled>
    <svelte:component
      this={Hst.ColorShades}
      shades="{{"Jet": "#2E2D30", "Granite Gray": "#636167", "Taupe Gray": "#908E94", "Silver Metallic": "#A8A5AF"}}"
    />
  </svelte:component>
  <svelte:component this="{Hst.Variant}" title="Stateful Color Palette" responsiveDisabled>
    <svelte:component
      this={Hst.ColorShades}
      shades="{{"Warning": "#ED254E", "Attention": "#FFCF23", "Success": "#16DB93", "Neutral": "#71B1FF"}}"
    />
  </svelte:component>
</svelte:component>
