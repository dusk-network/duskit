<svelte:options immutable={true} />

<script>
  import { Drawer } from "@duskit/components";

  /** @type {import("svelte").ComponentProps<Drawer>["className"]} */
  export let className;

  /** @type {import("svelte").ComponentProps<Drawer>["from"]} */
  export let from;

  /** @type {import("svelte").ComponentProps<Drawer>["open"]} */
  export let open;

  /** @type {import("svelte").ComponentProps<Drawer>["size"]} */
  export let size;
</script>

<Drawer {className} {from} {open} {size} let:visible>
  {#if visible}
    <p>Drawer with conditional rendering</p>
  {/if}
</Drawer>
