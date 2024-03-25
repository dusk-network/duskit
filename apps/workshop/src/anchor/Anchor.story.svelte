<script>
  /* eslint-disable import/named */
  import { logEvent } from "histoire/client";
  /* eslint-enable import/named */
  import { Anchor } from "@duskit/components";

  export let Hst;

  const properties = { className: undefined, href: "#" };
</script>

<Hst.Story title="Anchor" group="components">
  <Anchor
    className={properties.className}
    href={properties.href}
    on:click={(event) => logEvent("click", event)}>A humble anchor</Anchor
  >
</Hst.Story>
