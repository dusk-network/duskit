<script>
  import { Icon } from "@duskit/components";
  import { mdiHome } from "@mdi/js";

  export let Hst;

  let properties = {
    className: "",
    disabled: false,
    isInStack: false,
    path: mdiHome,
    role: "",
  };
</script>

<svelte:component this={Hst.Story} title="Icon" group="components">
  <Icon {...properties} />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Json}
      bind:value={properties}
      title="Current Props"
    />
  </svelte:fragment>
</svelte:component>
