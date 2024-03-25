<script>
  /* eslint-disable import/named */
  import { logEvent } from "histoire/client";
  /* eslint-enable import/named */
  import { Switch } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    disabled: false,
    onSurface: false,
    tabIndex: 0,
    value: false,
  };
</script>

<Hst.Story title="Switch" group="components">
  <Switch
    className={properties.className}
    disabled={properties.disabled}
    on:click={(event) => logEvent("click", event)}
    on:keydown={(event) => logEvent("keydown", event)}
    text={properties.text}
  />

  <svelte:fragment slot="controls">
    <Hst.Checkbox bind:value={properties.disabled} title="Disabled" />
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
