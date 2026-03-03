<svelte:options immutable={true} />

<script>
  /** @typedef {import("@duskit/components/src/card/Card").CardProps} CardProps */

  import { Button, Card } from "@duskit/components";

  /** @type {CardProps["as"]} */
  export let as = "div";

  export let className = undefined;

  /** @type {CardProps["gap"]} */
  export let gap = "default";

  export let showBody = true;
</script>

<Card {as} {className} {gap} {showBody}>
  <svelte:fragment slot="header">
    <strong>Card header</strong>
  </svelte:fragment>

  <p style="margin: 0;">First line of content.</p>
  <p style="margin: 0;">Second line of content.</p>

  <svelte:fragment slot="footer">
    <Button text="Action" variant="secondary" />
  </svelte:fragment>
</Card>
