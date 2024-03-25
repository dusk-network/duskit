<script>
  import { ErrorAlert } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    error: new Error("Something didn't go well..."),
    gap: "normal",
    summary: "No error has actually happened.",
  };
</script>

<Hst.Story title="Error Alert" group="components">
  <ErrorAlert
    className={properties.className}
    error={properties.error}
    gap={properties.gap}
    heading={properties.heading}
    summary={properties.summary}
  />

  <svelte:fragment slot="controls">
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
