<script>
  import { logEvent } from "histoire/client";
  import { Button } from "@duskit/components";

  export let Hst;

  let properties = { className: undefined, disabled: false, text: "click me" };
</script>

<svelte:component this={Hst.Story} title="Button" group="components">
  <Button
    className={properties.className}
    disabled={properties.disabled}
    text={properties.text}
    on:click={(event) => logEvent("click", event)}
  />

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
