<script>
  import { Textbox } from "@duskit/components";

  export let Hst;

  let properties = { className: undefined, type: "text", value: "" };
</script>

<svelte:component this={Hst.Story} title="Textbox" group="components">
  <Textbox
    className={properties.className}
    type={properties.type}
    value={properties.value}
  />

  <svelte:fragment slot="controls">
    <svelte:component
      this={Hst.Select}
      bind:value={properties.type}
      options={[
        "email",
        "hidden",
        "multiline",
        "number",
        "password",
        "search",
        "tel",
        "text",
        "url",
      ]}
      title="Type"
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
