<script>
  import config from "@duskit/design-tokens/js/functional/themes/light.js";
  export let Hst;

  function getBaseScaleGroups(tokens) {
    const baseColor = tokens?.base?.color;

    if (!baseColor) return [];

    return Object.values(baseColor).map((colorGroup) => {
      if (colorGroup.$value) {
        return [colorGroup];
      }

      const shades = Object.values(colorGroup)
        .filter((shade) => shade.$value)
        .sort((a, b) => {
          // Sort numerically
          const aShade = parseInt(a.attributes.subitem || "0", 10);
          const bShade = parseInt(b.attributes.subitem || "0", 10);

          return aShade - bShade;
        });

      return shades;
    });
  }

  function getShades(group) {
    const shades = [];

    for (const shade of group) {
      shades.push({ [shade.name]: shade.$value });
    }

    return shades;
  }
</script>

<svelte:component
  this={Hst.Story}
  layout={{ iframe: false, type: "single" }}
  icon="mdi:palette"
  title="Colors"
  group="design-tokens"
  responsiveDisabled
  autoPropsDisabled
>
  <svelte:component this={Hst.Variant} title="Base Scales" responsiveDisabled>
    {#each getBaseScaleGroups(config) as group (group[0])}
      <svelte:component this={Hst.ColorShades} shades={getShades(group)} />
    {/each}
  </svelte:component>
</svelte:component>
