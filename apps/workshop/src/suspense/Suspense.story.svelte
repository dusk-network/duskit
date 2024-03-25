<script>
  import { Suspense } from "@duskit/components";

  export let Hst;

  const suspensefulPromise = new Promise((res) =>
    setTimeout(() => res(), 4000)
  );

  let properties = {
    className: undefined,
    errorMessage: "An error occurred",
    errorVariant: "alert",
    gap: "normal",
    pendingMessage: "Something will be revealed...",
    waitFor: suspensefulPromise,
  };
</script>

<Hst.Story title="Suspense" group="components">
  <Suspense
    className={properties.className}
    errorMessage={properties.errorMessage}
    errorVariant={properties.errorVariant}
    gap={properties.gap}
    pendingMessage={properties.pendingMessage}
    waitFor={properties.waitFor}
  />

  <svelte:fragment slot="controls">
    <Hst.Select
      bind:value={properties.errorVariant}
      options={["alert", "details"]}
      title="Error Variant"
    />
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
