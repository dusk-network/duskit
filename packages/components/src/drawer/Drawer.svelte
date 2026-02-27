<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Drawer").DrawerProps} DrawerProps */

  import { makeClassName } from "@duskit/string";
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

<aside
  bind:this={rootElement}
  {...$$restProps}
  aria-hidden={!open}
  class={classes}
  inert={!open}
>
  <slot visible={isContentVisible} />
</aside>
