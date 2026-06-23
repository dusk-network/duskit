<svelte:options immutable={true} />

<script>
  import { getDeterministicId } from "../../__shared__/getDeterministicId";

  export let prefix = "dummy";

  const firstId = getDeterministicId(prefix);
  const secondId = getDeterministicId(prefix);
</script>

<div data-testid={`consumer-${prefix}`}>
  <span data-testid="id-1">{firstId}</span>
  <span data-testid="id-2">{secondId}</span>
</div>
