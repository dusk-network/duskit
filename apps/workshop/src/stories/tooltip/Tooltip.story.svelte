<script>
  import { Tooltip } from "@duskit/components";

  export let Hst;

  let properties = {
    className: undefined,
    defaultDelayHide: 0,
    defaultDelayShow: 500,
    defaultOffset: 10,
    defaultPlace: "top",
    defaultType: "info",
    id: "my-tooltip",
  };
</script>

<svelte:component this={Hst.Story} title="Tooltip" group="components">
  <Tooltip
    className={properties.className}
    defaultDelayHide={properties.defaultDelayHide}
    defaultDelayShow={properties.defaultDelayShow}
    defaultOffset={properties.defaultOffset}
    defaultPlace={properties.defaultPlace}
    defaultType={properties.defaultType}
    id={properties.id}
  />

  <span data-tooltip-id="my-tooltip" data-tooltip-text="The 🍰 is a lie!">
    Hover me for a tip!
  </span>

  <div id="my-tooltip"></div>

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
