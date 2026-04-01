<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Drawer").DrawerProps} DrawerProps */

  import { makeClassName } from "@duskit/string";
  import { outsideClick } from "@duskit/svelte-actions";
  import { createEventDispatcher } from "svelte";

  import "./Drawer.css";

  /** @type {DrawerProps["className"]} */
  export let className = undefined;

  /** @type {DrawerProps["from"]} */
  export let from;

  /** @type {DrawerProps["open"]} */
  export let open;

  /** @type {DrawerProps["size"]} */
  export let size = "default";

  /** @type {HTMLElementTagNameMap["aside"]} */
  let rootElement;

  export const getRootElement = () => rootElement;

  /** @type {import("svelte/action").Action<HTMLElement, boolean>} */
  function dynamicOutsideClick(node, isOpen) {
    let actionInstance = isOpen ? outsideClick(node) : null;

    return {
      destroy() {
        actionInstance?.destroy();
      },
      update(newIsOpen) {
        if (newIsOpen) {
          actionInstance = outsideClick(node);
        } else {
          actionInstance?.destroy();
          actionInstance = null;
        }
      },
    };
  }

  /** @type {(isOpening: boolean) => Keyframe[]} */
  function getKeyFrames(isOpening) {
    const axis = from === "left" || from === "right" ? "X" : "Y";
    const hasNegativeStart = from === "left" || from === "top";
    const currentTransform = window.getComputedStyle(rootElement).transform;
    const closedTransform = `translate${axis}(${hasNegativeStart ? "-" : ""}100%)`;
    const startTransform =
      currentTransform !== "none" ? currentTransform : closedTransform;
    const targetTransform = isOpening ? `translate${axis}(0)` : closedTransform;

    return [{ transform: startTransform }, { transform: targetTransform }];
  }

  /** @param {KeyboardEvent} event */
  function handleKeyDown(event) {
    if (open && event.key === "Escape") {
      // We must prevent the native default behavior of the escape key
      event.preventDefault();

      // We emit our custom event with the original event as the payload
      // and make it cancelable so consumer components can handle the
      // `Drawer` state gracefully.
      dispatch("cancel", { originalEvent: event }, { cancelable: true });
    }
  }

  /** @param {boolean} isOpen */
  async function handleOpenChange(isOpen) {
    if (!rootElement) {
      return;
    }

    areEventsEnabled = false;

    if (isOpen) {
      isContentVisible = true;
      dispatch("opening");
    } else {
      dispatch("closing");
    }

    if (!(await runAnimation(isOpen))) {
      return;
    }

    if (isOpen) {
      areEventsEnabled = true;
      dispatch("open");
    } else {
      isContentVisible = false;
      dispatch("close");
    }
  }

  /** @type {(isOpening: boolean) => Promise<boolean>}*/
  async function runAnimation(isOpening) {
    const keyframes = getKeyFrames(isOpening);

    currentAnimation?.cancel();

    currentAnimation = rootElement.animate(keyframes, {
      duration: 400,
      easing: "ease-in-out",
    });

    try {
      await currentAnimation.finished;
      currentAnimation = null;
      return true;
    } catch {
      return false;
    }
  }

  /** @type {Animation | null} */
  let currentAnimation = null;
  let areEventsEnabled = open;
  let isContentVisible = open;

  const dispatch = createEventDispatcher();

  $: handleOpenChange(open);
  $: classes = makeClassName([
    "dusk-drawer",
    `dusk-drawer--from--${from}`,
    `dusk-drawer--size--${size}`,
    open ? "dusk-drawer--open" : "",
    areEventsEnabled ? "dusk-drawer--events-enabled" : "",
    className,
  ]);
</script>

<svelte:window on:keydown={handleKeyDown} />

<aside
  bind:this={rootElement}
  use:dynamicOutsideClick={open}
  {...$$restProps}
  aria-hidden={!open}
  class={classes}
  inert={!open}
  on:outsideclick
>
  <slot visible={isContentVisible} />
</aside>
