<script>
  import { Button } from "@duskit/components";
  import { logEvent } from "histoire/client";
  import { mdiHome } from "@mdi/js";

  export let Hst;

  /** @typedef {import("svelte").ComponentProps<Button>} ButtonProps */

  let currentProps;

  /** @type {ButtonProps["icon"]}*/
  // eslint-disable-next-line prefer-const -- needs to stay reactive for Svelte bindings
  let iconProp = {
    path: mdiHome,
    position: "before",
    size: "default",
  };

  let useIcon = false;

  /** @type {ButtonProps}*/
  // eslint-disable-next-line prefer-const -- needs to stay reactive for Svelte bindings
  let properties = {
    active: false,
    disabled: false,
    size: "default",
    text: "Click me",
    type: "button",
    variant: "primary",
  };

  $: icon = useIcon ? iconProp : undefined;
  $: currentProps = { ...properties };
</script>

<Hst.Story title="Button" group="components">
  <Button
    active={properties.active}
    disabled={properties.disabled}
    {icon}
    on:click={(event) => logEvent("click", event)}
    size={properties.size}
    text={properties.text}
    type={properties.type}
    variant={properties.variant}
  />

  <svelte:fragment slot="controls">
    <Hst.Text bind:value={properties.text} title="Text" />
    <Hst.Select
      options={["button", "toggle"]}
      title="Type"
      bind:value={properties.type}
    />

    <Hst.Checkbox bind:value={properties.disabled} title="Disabled" />

    {#if properties.type === "toggle"}
      <Hst.Checkbox bind:value={properties.active} title="Active" />
    {/if}

    <Hst.Select
      options={["default", "small"]}
      title="Size"
      bind:value={properties.size}
    />
    <Hst.Select
      options={["primary", "secondary", "tertiary"]}
      title="Variant"
      bind:value={properties.variant}
    />

    <hr />

    <Hst.Checkbox bind:value={useIcon} title="Show icon" />

    {#if useIcon}
      <Hst.Select
        disabled={!useIcon}
        options={["before", "after"]}
        title="Icon position"
        bind:value={iconProp.position}
      />
    {/if}

    <br />
    <hr />
    <br />
    <Hst.Json bind:value={currentProps} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
