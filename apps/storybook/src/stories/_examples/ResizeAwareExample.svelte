<script>
  import { ResizeAware } from "@duskit/components";

  export let initialWidth = 360;
  export let initialHeight = 200;
</script>

<div
  style={`width: ${initialWidth}px; height: ${initialHeight}px; resize: both; overflow: auto; border: 1px dashed var(--divider-color-primary); padding: 0.5rem;`}
>
  <ResizeAware let:width let:height>
    <div style="font-family: var(--mono-font-family); font-size: 12px;">
      width: {Math.round(width)}px
      <br />
      height: {Math.round(height)}px
    </div>
  </ResizeAware>
</div>

