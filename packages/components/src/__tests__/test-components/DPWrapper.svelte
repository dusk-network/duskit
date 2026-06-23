<svelte:options immutable={true} />

<script>
  import { DeterministicIdProvider } from "../../..";
  import DPConsumer from "./DPConsumer.svelte";

  /** @type {import("svelte").ComponentProps<DeterministicIdProvider>["namespace"]} */
  export let namespace = undefined;
</script>

<DeterministicIdProvider {namespace}>
  <DPConsumer prefix="alpha" />
  <DPConsumer prefix="beta" />
</DeterministicIdProvider>
