<script>
  /* eslint-disable import/named */
  import { logEvent } from "histoire/client";
  /* eslint-enable import/named */
  import { Badge } from "@duskit/components";

  export let Hst;

  let properties = { className: undefined, text: "Lorem", variant: "neutral" };
</script>

<svelte:component this={Hst.Story} title="Badge" group="components">
  <Badge
    className={properties.className}
    variant={properties.variant}
    on:click={(event) => logEvent("click", event)}
    text={properties.text}
  />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Select}
      bind:value={properties.variant}
      options={["neutral", "warning", "error", "success"]}
      title="Variant"
    />
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
