<svelte:options immutable={true} />

<script>
  import { Icon } from "../../..";

  /** @type {import("svelte").ComponentProps<Icon>["path"]} */
  export let path;

  /** @type {Icon<"g" | "svg">} */
  let rootComponent;

  export const getRootElement = () => rootComponent.getRootElement();
</script>

<Icon bind:this={rootComponent} {...$$restProps} {path}>
  <circle cx="12" cy="12" data-testid="slotted-circle" r="5" />
</Icon>
