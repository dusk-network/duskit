<svelte:options immutable={true} />

<script>
  import { Heading } from "@duskit/components";

  export let as = "h2";
  export let className = undefined;
  export let mono = false;
  export let prominence = "standard";
  export let text = "Dusk Design System";
  export let textAlign = undefined;
  export let uppercase = false;
  export let variant = "plain";
</script>

<Heading {as} {className} {mono} {prominence} {textAlign} {uppercase} {variant}>
  {text}
</Heading>
