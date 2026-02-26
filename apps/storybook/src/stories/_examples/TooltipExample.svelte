<svelte:options immutable={true} />

<script>
  import { Button, Tooltip } from "@duskit/components";
  import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";

  export let id = "demo-tooltip";
  export let defaultDelayHide = 0;
  export let defaultDelayShow = 250;
  export let defaultOffset = 10;

  /** @type {import("@floating-ui/dom").Side} */
  export let defaultPlace = "top";

  /** @type {import("@duskit/components").StatusType} */
  export let defaultType = "info";

  let darkMode = false;
</script>

<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
  <Button
    data-tooltip-id={id}
    data-tooltip-place="bottom"
    data-tooltip-text="Hello from a tooltip"
    text="Bottom + info"
    variant="primary"
  />

  <Button
    data-tooltip-id={id}
    data-tooltip-place="right"
    data-tooltip-text="Error tooltip on the right"
    data-tooltip-type="error"
    text="Right + error"
    variant="secondary"
  />

  <Button
    active={darkMode}
    data-tooltip-id={id}
    data-tooltip-text={`Switch to ${darkMode ? "light" : "dark"} mode`}
    icon={{ path: darkMode ? mdiWeatherSunny : mdiWeatherNight }}
    on:click={() => {
      darkMode = !darkMode;
    }}
    text="Toggle button"
    type="toggle"
    variant="tertiary"
  />
</div>

<Tooltip
  {defaultDelayHide}
  {defaultDelayShow}
  {defaultOffset}
  {defaultPlace}
  {defaultType}
  {id}
/>
