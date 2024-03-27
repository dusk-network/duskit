<script>
  import { ErrorDetails } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    error: new Error(),
    summary: "No error has actually happened.",
  };
</script>

<svelte:component this={Hst.Story} title="Error Details" group="components">
  <ErrorDetails
    className={properties.className}
    error={properties.error}
    summary={properties.summary}
  />

  <svelte:fragment slot="controls">
    <br />
    <hr />
    <br />
    <svelte:component
      this={Hst.Json}
      bind:value={properties}
      title="Current Props"
    />
  </svelte:fragment>
</svelte:component>
