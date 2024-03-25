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

<svelte:component this={Hst.Story} title="Select" group="components">
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
    <svelte:component
      this={Hst.Json}
      bind:value={properties}
      title="Current Props"
    />
  </svelte:fragment>
</svelte:component>
