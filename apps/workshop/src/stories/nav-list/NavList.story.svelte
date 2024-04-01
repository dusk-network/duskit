<script>
  import { NavList } from "@duskit/components";

  export let Hst;

  let navigation = [
    {
      link: "https://dusk.network",
      title: "Dusk",
    },
    {
      link: "https://explorer.dusk.network",
      title: "Explorer",
    },
  ];
</script>

<svelte:component this={Hst.Story} title="Nav List" group="components">
  <NavList {navigation} />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Json}
      bind:value={navigation}
      title="Current Props"
    />
  </svelte:fragment>
</svelte:component>
