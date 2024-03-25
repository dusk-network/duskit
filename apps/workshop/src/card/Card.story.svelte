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

<Hst.Story title="Card" group="components">
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
    <Hst.Checkbox bind:value={properties.hasToggle} title="hasToggle" />
    <Hst.Checkbox bind:value={properties.isToggled} title="isToggled" />
    <Hst.Checkbox bind:value={properties.onSurface} title="onSurface" />
    <!-- <Hst.Select bind:value="{context}" options="{Object.values(contexts.BUTTON)}" title="Context" /> -->
    <br />
    <hr />
    <br />
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
