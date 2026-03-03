<svelte:options immutable={true} />

<script>
  import { Anchor } from "@duskit/components";

  export let className = undefined;
  export let href = "https://dusk.network";
  export let text = "Read more";
</script>

<Anchor {className} {href} rel="noreferrer" target="_blank">
  {text}
</Anchor>
