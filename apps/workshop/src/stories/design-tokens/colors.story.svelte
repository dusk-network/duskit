<script>
  // import * from "@duskit/design-tokens"
  export let Hst;
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
  <svelte:component
    this={Hst.Variant}
    title="Primary Color Palette"
    responsiveDisabled
  >
    <svelte:component
      this={Hst.ColorShades}
      shades={{
        "Cornflower Blue": "#71B1FF",
        Jet: "#EDEAF3",
        "Light Gray": "#E2DFE9",
        "Smokey Black": "#101010",
      }}
    />
  </svelte:component>
  <svelte:component
    this={Hst.Variant}
    title="Secondary Color Palette"
    responsiveDisabled
  >
    <svelte:component
      this={Hst.ColorShades}
      shades={{
        "Granite Gray": "#636167",
        Jet: "#2E2D30",
        "Silver Metallic": "#A8A5AF",
        "Taupe Gray": "#908E94",
      }}
    />
  </svelte:component>
  <svelte:component
    this={Hst.Variant}
    title="Stateful Color Palette"
    responsiveDisabled
  >
    <svelte:component
      this={Hst.ColorShades}
      shades={{
        Attention: "#FFCF23",
        Neutral: "#71B1FF",
        Success: "#16DB93",
        Warning: "#ED254E",
      }}
    />
  </svelte:component>
  <svelte:component this={Hst.Variant} title="Base Scales" responsiveDisabled>
    <svelte:component
      this={Hst.ColorShades}
      shades={{
        "base-color-cornflower-0": "#f1f7ff",
        "base-color-cornflower-1": "#d5e8ff",
        "base-color-cornflower-2": "#abd1ff",
        "base-color-cornflower-3": "#8ec1ff",
        "base-color-cornflower-4": "#71B1FF",
        "base-color-cornflower-5": "#0B79FF",
        "base-color-cornflower-6": "#0863D1",
        "base-color-cornflower-7": "#064B9E",
        "base-color-cornflower-8": "#04336B",
      }}
    />
  </svelte:component>
</svelte:component>
