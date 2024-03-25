<script>
  import { Throbber } from "@duskit/components";

  export let Hst;

  let properties = { className: undefined, duration: 1800, size: 64 };
</script>

<Hst.Story title="Throbber" group="components">
  <Throbber
    className={properties.className}
    duration={properties.duration}
    size={properties.size}
  />

  <svelte:fragment slot="controls">
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
