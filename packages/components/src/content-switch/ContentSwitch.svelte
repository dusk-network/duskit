<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ContentSwitch").ContentSwitchProps} ContentSwitchProps */

  import { createEventDispatcher } from "svelte";
  import { Icon } from "@duskit/components";
  import { makeClassName } from "@duskit/string";

  import "./ContentSwitch.css";

  /** @type {ContentSwitchProps["className"]} */
  export let className = undefined;

  /** @type {ContentSwitchProps["items"]} */
  export let items;

  /** @type {ContentSwitchProps["selectedTab"]} */
  export let selectedTab = undefined;

  /** @type {HTMLUListElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  /** @type {string | undefined} */
  let expandedTab;

  /** @type {string | undefined} */
  let focusableTab;

  /** @type {string | undefined} */
  let internalSelectedTab;

  const dispatch = createEventDispatcher();

  /** @type {import("svelte/elements").EventHandler<Event, HTMLLIElement>} */
  function handleTabBlur() {
    expandedTab = internalSelectedTab;
    focusableTab = internalSelectedTab;
  }

  /** @type {import("svelte/elements").EventHandler<Event, HTMLLIElement>} */
  function handleTabClick(event) {
    const clickedID = event.currentTarget.dataset.tabid;

    if (selectedTab !== clickedID) {
      focusableTab = clickedID;
      internalSelectedTab = clickedID;
      selectedTab = clickedID;
      dispatch("change", clickedID);
    }
  }

  /** @type {import("svelte/elements").EventHandler<Event, HTMLLIElement>} */
  function handleTabFocus(event) {
    const { tabid } = event.currentTarget.dataset;

    expandedTab = tabid;
    focusableTab = tabid;
  }

  /** @type {import("svelte/elements").KeyboardEventHandler<HTMLLIElement>} */
  function handleTabKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      handleTabClick(event);

      return;
    }

    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    const currentIndex = items.findIndex((item) => item.id === focusableTab);

    /** @type {number} */
    let newIndex = currentIndex;

    // We don't need a default as we do an early return just above.
    // eslint-disable-next-line default-case
    switch (event.key) {
      case "ArrowLeft":
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case "ArrowRight":
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        newIndex = 0;
        break;
      case "End":
        newIndex = items.length - 1;
        break;
    }

    event.preventDefault();

    if (newIndex !== currentIndex) {
      focusableTab = items[newIndex].id;

      /** @type {HTMLLIElement | null} */ (
        rootElement.querySelector(`[data-tabid="${focusableTab}"]`)
      )?.focus();
    }
  }

  /** @type {import("svelte/elements").EventHandler<Event, HTMLLIElement>} */
  function handleTabMouseOut() {
    expandedTab = internalSelectedTab;
  }

  /** @type {import("svelte/elements").EventHandler<Event, HTMLLIElement>} */
  function handleTabMouseOver(event) {
    expandedTab = event.currentTarget.dataset.tabid;
  }

  $: {
    const isValidSelectedTab =
      selectedTab && items.some((item) => item.id === selectedTab);
    const fallbackTabId = items[0]?.id;

    // React to external `selectedTab` changes
    if (selectedTab !== internalSelectedTab) {
      internalSelectedTab = selectedTab;
      focusableTab = isValidSelectedTab ? selectedTab : fallbackTabId;
      expandedTab = selectedTab;
    } else if (focusableTab === undefined && items.length > 0) {
      // First render without having a defined `selectedTab`
      // so we set a fallback for the "focusable tab".
      // The "expanded" one just follows the "selectedTab" instead.
      focusableTab = fallbackTabId;

      // not necessary: just being explicit
      expandedTab = selectedTab;
    }
  }
  $: classes = makeClassName(["dusk-content-switch", className]);
</script>

<ul bind:this={rootElement} {...$$restProps} class={classes} role="tablist">
  {#each items as item (item.id)}
    {@const { icon, id, label } = item}
    <li
      aria-selected={id === selectedTab}
      class="dusk-content-switch__tab-item"
      class:dusk-content-switch__tab-item--expanded={id === expandedTab}
      class:dusk-content-switch__tab-item--selected={id === selectedTab}
      data-tabid={id}
      on:blur={handleTabBlur}
      on:click={handleTabClick}
      on:focus={handleTabFocus}
      on:keydown={handleTabKeyDown}
      on:mouseover={handleTabMouseOver}
      on:mouseout={handleTabMouseOut}
      role="tab"
      tabindex={id === focusableTab ? 0 : -1}
    >
      {#if icon?.position === "after"}
        {#if label}
          <span class="dusk-content-switch__tab-label">{label}</span>
        {/if}
        <Icon className="dusk-content-switch__tab-icon" path={icon.path} />
      {:else if icon}
        <Icon className="dusk-content-switch__tab-icon" path={icon.path} />
        {#if label}
          <span class="dusk-content-switch__tab-label">{label}</span>
        {/if}
      {:else}
        <span class="dusk-content-switch__tab-label">{label ?? id}</span>
      {/if}
    </li>
  {/each}
</ul>
