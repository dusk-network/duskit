<script>
  import { logEvent } from "histoire/client";
  import { Switch } from "@duskit/components";

  export let Hst;

  let properties = {
    active: false,
    className: undefined,
    disabled: false,
    onSurface: false,
    tabIndex: 0,
  };
</script>

<svelte:component this={Hst.Story} title="Switch" group="components">
  <Switch {...properties} on:change={(event) => logEvent("change", event)} />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Checkbox}
      bind:value={properties.disabled}
      title="Disabled"
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
