<script>
  import { ErrorDetails } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    error: new Error(),
    summary: "No error has actually happened.",
  };
</script>

<Hst.Story title="Error Details" group="components">
  <ErrorDetails
    className={properties.className}
    error={properties.error}
    summary={properties.summary}
  />

  <svelte:fragment slot="controls">
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
