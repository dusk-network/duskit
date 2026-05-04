<svelte:options immutable={true} />

<script>
  /** @typedef {import("@duskit/components/src/card/Card").CardProps} CardProps */

  import { Button, Card } from "@duskit/components";

  /** @type {CardProps["as"]} */
  export let as = "div";

  export let className = undefined;

  /** @type {CardProps["variant"]} */
  export let variant = "surface";
</script>

<Card {as} {className} {variant}>
  <svelte:fragment slot="header">
    <strong>Card header</strong>
  </svelte:fragment>

  <p style="margin: 0;">First line of content.</p>
  <p style="margin: 0;">Second line of content.</p>

  <svelte:fragment slot="footer">
    <Button text="Action" variant="secondary" />
  </svelte:fragment>
</Card>
