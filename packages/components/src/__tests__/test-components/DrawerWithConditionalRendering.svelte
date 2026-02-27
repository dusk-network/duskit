<svelte:options immutable={true} />

<script>
  import { Drawer } from "../../..";

  /** @type {import("svelte").ComponentProps<Drawer>["from"]} */
  export let from;

  /** @type {import("svelte").ComponentProps<Drawer>["open"]} */
  export let open;
</script>

<Drawer {from} {open} let:visible>
  {#if visible}
    <p data-testid="visible-content">Visible content</p>
  {/if}
</Drawer>
