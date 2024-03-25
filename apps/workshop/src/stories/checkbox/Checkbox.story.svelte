<script>
  /* eslint-disable import/named */
  import { logEvent } from "histoire/client";
  /* eslint-enable import/named */
  import { Checkbox } from "@duskit/components";

  export let Hst;

  let properties = {
    checked: false,
    className: undefined,
    disabled: false,
    id: undefined,
    name: "my-checkbox",
    tabindex: undefined,
  };
</script>

<svelte:component this={Hst.Story} title="Checkbox" group="components">
  <Checkbox
    className={properties.className}
    name={properties.name}
    id={properties.id}
    disabled={properties.disabled}
    checked={properties.checked}
    on:checked={(event) => logEvent("checked", event)}
    on:changed={(event) => logEvent("changed", event)}
  />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Checkbox}
      bind:value={properties.checked}
      title="Checked"
    />
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
