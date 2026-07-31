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

  let darkMode = false;
</script>

<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
  <Button
    data-tooltip-id={id}
    data-tooltip-place="bottom"
    data-tooltip-text="Hello from a tooltip"
    text="Bottom"
    variant="primary"
  />

  <Button
    data-tooltip-id={id}
    data-tooltip-place="right"
    data-tooltip-text="Tooltip on the right"
    text="Right"
    variant="secondary"
  />

  <Button
    data-tooltip-id={id}
    data-tooltip-text={`Switch to ${darkMode ? "light" : "dark"} mode`}
    icon={{ path: darkMode ? mdiWeatherSunny : mdiWeatherNight }}
    on:click={() => {
      darkMode = !darkMode;
    }}
    pressed={darkMode}
    text="Toggle button"
    type="toggle"
    variant="tertiary"
  />
  <Button
    data-tooltip-id={id}
    data-tooltip-text="Hello from a tooltip"
    text="Neutral"
    variant="secondary"
  />
  <Button
    data-tooltip-id={id}
    data-tooltip-text="Hello from a tooltip"
    text="Also neutral"
    variant="secondary"
  />
  <Button
    data-tooltip-id={id}
    data-tooltip-text="A quite long text to verify word breaking and sundries. Really: this text is quite long and it shouldn't even be in a tooltip."
    text="Long text"
    variant="tertiary"
  />
</div>

<Tooltip
  {defaultDelayHide}
  {defaultDelayShow}
  {defaultOffset}
  {defaultPlace}
  {id}
/>
