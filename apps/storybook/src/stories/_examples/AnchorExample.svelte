<script>
  import { Anchor } from "@duskit/components";

  export let className = undefined;
  export let href = "https://dusk.network";
  export let onSurface = true;
  export let text = "Read more";
</script>

<Anchor {className} {href} {onSurface} rel="noreferrer" target="_blank">
  {text}
</Anchor>

