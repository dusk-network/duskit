<svelte:options immutable={true} />

<script>
  import { ResizeAware } from "../../..";
</script>

<ResizeAware let:height let:rect let:width>
  <div data-testid="slot-content">
    <span data-testid="height">{height}</span>
    <span data-testid="width">{width}</span>
    <span data-testid="rect-x">{rect.x}</span>
  </div>
</ResizeAware>
