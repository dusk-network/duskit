<script>
  import { Button, Tooltip } from "@duskit/components";

  export let id = "demo-tooltip";
  export let defaultDelayHide = 0;
  export let defaultDelayShow = 250;
  export let defaultOffset = 10;
  export let defaultPlace = "top";
  export let defaultType = "info";
</script>

<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
  <Button
    text="Hover me"
    variant="primary"
    data-tooltip-id={id}
    data-tooltip-text="Hello from a tooltip"
  />

  <Button
    text="Right + error"
    variant="secondary"
    data-tooltip-id={id}
    data-tooltip-place="right"
    data-tooltip-type="error"
    data-tooltip-text="Error tooltip on the right"
  />

  <button
    type="button"
    style="display: inline-block; padding: 0.5rem 0.75rem; border: 1px dashed var(--divider-color-primary); border-radius: 0.75rem; background: transparent; color: inherit;"
    data-tooltip-id={id}
    data-tooltip-place="bottom"
    data-tooltip-type="success"
    data-tooltip-text="Focusable element tooltip"
  >
    Focus me
  </button>
</div>

<Tooltip
  {defaultDelayHide}
  {defaultDelayShow}
  {defaultOffset}
  {defaultPlace}
  {defaultType}
  {id}
/>
