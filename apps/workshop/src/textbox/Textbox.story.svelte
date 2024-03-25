<script>
  import { Textbox } from "@duskit/components";

  export let Hst;

  let properties = { className: undefined, type: "text", value: "" };
</script>

<Hst.Story title="Textbox" group="components">
  <Textbox
    className={properties.className}
    type={properties.type}
    value={properties.value}
  />

  <svelte:fragment slot="controls">
    <Hst.Select
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
    <Hst.Json bind:value={properties} title="Current Props" />
  </svelte:fragment>
</Hst.Story>
