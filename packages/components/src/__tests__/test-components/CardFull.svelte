<script>
  import { Card } from "../../..";

  /** @type {import("svelte").ComponentProps<Card<"div">>["as"]} */
  export let as = "div";

  /** @type {import("svelte").ComponentProps<Card<"div">>["variant"]} */
  export let variant = "surface";
</script>

<Card {as} {variant} {...$$restProps}>
  <span data-testid="header-content" slot="header">Header Content</span>
  <span data-testid="body-content">Body Content</span>
  <span data-testid="footer-content" slot="footer">Footer Content</span>
</Card>
