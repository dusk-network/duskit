<script>
  /* eslint-disable import/named */
  import { logEvent } from "histoire/client";
  /* eslint-enable import/named */
  import { Select } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    options: ["Lorem", "Ipsum", "etc."],
    value: "Lorem",
  };
</script>

<Hst.Story title="Select" group="components">
  <Select
    className={properties.className}
    options={properties.options}
    value={properties.value}
    on:change={(event) => logEvent("change", event)}
  />

  <svelte:fragment slot="controls">
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
