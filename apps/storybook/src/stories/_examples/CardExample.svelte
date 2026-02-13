<script>
  import { Button, Card } from "@duskit/components";

  export let as = "div";
  export let className = undefined;
  export let gap = "default";
  export let onSurface = false;
  export let showBody = true;
</script>

<Card {as} {className} {gap} {onSurface} {showBody} style="max-width: 420px;">
  <svelte:fragment slot="header">
    <strong>Card header</strong>
  </svelte:fragment>

  <p style="margin: 0;">First line of content.</p>
  <p style="margin: 0;">Second line of content.</p>

  <svelte:fragment slot="footer">
    <Button text="Action" variant="secondary" />
  </svelte:fragment>
</Card>

