<script>
  import { Card } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    hasToggle: false,
    heading: "Lorem Ipsum",
    iconPath: undefined,
    isToggled: false,
    onSurface: false,
    tag: "div",
  };
</script>

<svelte:component this={Hst.Story} title="Card" group="components">
  <Card
    className={properties.className}
    tag={properties.tag}
    iconPath={properties.iconPath}
    heading={properties.heading}
    hasToggle={properties.hasToggle}
    isToggled={properties.isToggled}
    onSurface={properties.onSurface}
  />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Checkbox}
      bind:value={properties.hasToggle}
      title="hasToggle"
    />
    <svelte:component
      this={Hst.Checkbox}
      bind:value={properties.isToggled}
      title="isToggled"
    />
    <svelte:component
      this={Hst.Checkbox}
      bind:value={properties.onSurface}
      title="onSurface"
    />
    <!-- <svelte:component this={Hst.Select} bind:value="{context}" options="{Object.values(contexts.BUTTON)}" title="Context" /> -->
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
