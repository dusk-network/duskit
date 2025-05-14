<script>
  import { logEvent } from "histoire/client";
  import { Anchor } from "@duskit/components";

  export let Hst;

  let className = undefined;
  let href = "#";
  let slotContent = "A humble anchor";
  let source;

  $: {
    source = `<Anchor`;
    if (className) {
      source += ` className="${className}"`;
    }
    if (href) {
      source += ` href="${href}"`;
    }
    source += `>`;
    source += `${slotContent}`;
    source += `</Anchor>`;
  }
</script>

<svelte:component this={Hst.Story} title="Anchor" group="components" {source}>
  <Anchor {className} {href} on:click={(event) => logEvent("click", event)}
    >{slotContent}</Anchor
  >
  <svelte:fragment slot="controls">
    <div class="htw-p-2 htw-text-gray-900 dark:htw-text-gray-100">Slots</div>
    <svelte:component
      this={Hst.Text}
      bind:value={slotContent}
      title="default"
    />
    <div class="htw-p-2 htw-text-gray-900 dark:htw-text-gray-100">Props</div>
    <svelte:component
      this={Hst.Text}
      bind:value={className}
      title="className"
    />
    <svelte:component this={Hst.Text} bind:value={href} title="href" />
  </svelte:fragment>
</svelte:component>
