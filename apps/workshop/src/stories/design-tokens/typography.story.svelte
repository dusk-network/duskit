<script>
  import config from "@duskit/design-tokens/js/base/typography.js";
  export let Hst;
</script>

<svelte:component
  this={Hst.Story}
  layout={{ iframe: false, type: "single" }}
  icon="mdi:palette"
  title="Typography"
  group="design-tokens"
  responsiveDisabled
  autoPropsDisabled
>
  <svelte:component
    this={Hst.Variant}
    title={config.typography.body.name}
    responsiveDisabled
  >
    <p>
      <strong>Font Weight:</strong>
      {config.typography.body.$value.fontWeight}
    </p>

    <p>
      <strong>Font Line Height:</strong>
      {config.typography.body.$value.lineHeight}
    </p>

    <p>
      <strong>Font Size:</strong>
      {config.typography.body.$value.fontSize}
    </p>

    <p>
      <strong>Font Family:</strong>
      {config.typography.body.$value.fontFamily}
    </p>
  </svelte:component>
</svelte:component>
