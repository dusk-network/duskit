<svelte:options immutable={true} />

<script>
  import { Button, Drawer } from "@duskit/components";
  import { createEventDispatcher } from "svelte";

  /** @typedef {import("svelte").ComponentProps<Drawer>} DrawerProps */
  /**
   * @template {Element} T
   * @typedef {import("@duskit/svelte-actions").OutsideClickEvent<T>} OutsideClickEvent<T>
   */

  /** @type {DrawerProps["className"]} */
  export let className = undefined;

  /** @type {DrawerProps["from"]} */
  export let from = "left";

  /**
   * Internal prop to switch between Storybook-controlled and self-controlled state.
   * @type {boolean}
   */
  export let interactive = false;

  /** @type {DrawerProps["open"]} */
  export let open = false;

  /** @type {DrawerProps["size"]} */
  export let size = "default";

  /** @param {OutsideClickEvent<HTMLElementTagNameMap["aside"]>} evt */
  function handleOutsideClick(evt) {
    if (!interactive) {
      return;
    }

    open = false;
  }
</script>

<div
  style="padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh;"
>
  {#if interactive && !open}
    <p style="margin-bottom: 1rem; color: var(--on-surface-color);">
      Click the button below to open. Click outside the drawer to close it.
    </p>
    <Button on:click={() => (open = true)} text="Open Drawer" type="button" />
  {:else if !interactive}
    <p style="margin-bottom: 1rem; color: var(--on-surface-color);">
      Use the Storybook Controls panel to toggle the Drawer.
    </p>
  {/if}
</div>

<Drawer
  {className}
  {from}
  {open}
  {size}
  on:outsideclick={handleOutsideClick}
  let:visible
>
  {#if visible}
    <div style="padding: 2rem;">
      <h2>Drawer Content</h2>
      <p style:margin="1rem 0">
        This content is conditionally rendered when the drawer is open.
      </p>
      {#if interactive}
        <Button
          on:click={() => (open = false)}
          text="Close from inside"
          type="button"
        />
      {/if}
    </div>
  {/if}
</Drawer>
