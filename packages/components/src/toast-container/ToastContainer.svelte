<svelte:options immutable={true} />

<script>
  /** @typedef {import("./ToastContainer").ToastContainerProps} ToastContainerProps */

  /**
   * @typedef {Object} ToastState
   * @property {number} duration
   * @property {number} elapsed
   * @property {boolean} isExpired
   * @property {boolean} isPaused
   * @property {number} lastTick
   */

  import { makeClassName } from "@duskit/string";
  import { skip, skipIn } from "lamb";
  import { onDestroy } from "svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  import getNotificationContext from "../__shared__/getNotificationContext";
  import { DEFAULT_ANIM_DURATION } from "../__shared__/constants";
  import { Notification } from "../..";

  import "./ToastContainer.css";

  /** @type {ToastContainerProps["className"]} */
  export let className = undefined;

  /** @type {ToastContainerProps["store"]} */
  export let store = undefined;

  /** @type {ToastContainerProps["placement"]} */
  export let placement = "top-right";

  /** @type {ToastContainerProps["tooltipId"]} */
  export let tooltipId = undefined;

  /** @type {HTMLUListElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const DEFAULT_TIMEOUT = 5000;

  /** @type {number} */
  let animationFrameId;

  /** @type {Record<string, number>} */
  let decayProgresses = {};

  /** @type {boolean} */
  let isLoopRunning = false;

  /** @type {boolean} */
  let isMouseInside = false;

  /** @type {Set<number>} */
  const activeTouchPointers = new Set();

  /** @type {Map<string, ToastState>} */
  const timeMap = new Map();

  const getNotificationProps = skip(["id", "timeout"]);

  /** @param {boolean} isPaused */
  const setPaused = (isPaused) => {
    const now = performance.now();

    for (const state of timeMap.values()) {
      state.isPaused = isPaused;

      if (!isPaused) {
        state.lastTick = now;
      }
    }
  };

  const syncPausedState = () =>
    setPaused(isMouseInside || activeTouchPointers.size > 0);

  /** @param {PointerEvent} event */
  const handlePointerEnter = (event) => {
    if (event.pointerType === "mouse") {
      isMouseInside = true;
      syncPausedState();
    }
  };

  /** @param {PointerEvent} event */
  const handlePointerLeave = (event) => {
    if (event.pointerType === "mouse") {
      isMouseInside = false;
      syncPausedState();
    }
  };

  /** @param {PointerEvent} event */
  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") {
      activeTouchPointers.add(event.pointerId);
      syncPausedState();
    }
  };

  /** @param {PointerEvent} event */
  const handlePointerRelease = (event) => {
    if (activeTouchPointers.delete(event.pointerId)) {
      syncPausedState();
    }
  };

  /**
   * Browsers throttle or pause `requestAnimationFrame` in inactive tabs.
   * This stops the loop entirely when hidden to save CPU, and realigns
   * the internal clocks when visible to prevent mass deletion.
   */
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      isLoopRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else if (document.visibilityState === "visible" && timeMap.size > 0) {
      const now = performance.now();

      for (const state of timeMap.values()) {
        state.lastTick = now;
      }

      isLoopRunning = true;
      animationFrameId = requestAnimationFrame(loop);
    }
  };

  /** @param {number} timestamp */
  // eslint-disable-next-line max-statements
  const loop = (timestamp) => {
    let needsUpdate = false;
    const nextProgresses = { ...decayProgresses };

    for (const [id, state] of timeMap.entries()) {
      if (state.isExpired) {
        continue;
      }

      if (!state.isPaused) {
        const delta = timestamp - state.lastTick;

        state.elapsed += delta;
        state.lastTick = timestamp;
        needsUpdate = true;

        if (state.elapsed >= state.duration) {
          state.isExpired = true;
          notificationStore.remove(id);
          nextProgresses[id] = 100;
        } else {
          nextProgresses[id] = (state.elapsed / state.duration) * 100;
        }
      } else {
        state.lastTick = timestamp;
      }
    }

    if (needsUpdate) {
      decayProgresses = nextProgresses;
    }

    if (isLoopRunning) {
      animationFrameId = requestAnimationFrame(loop);
    }
  };

  onDestroy(() => {
    cancelAnimationFrame(animationFrameId);
  });

  $: notificationStore = store ?? getNotificationContext();
  $: ({ toasts } = notificationStore);
  $: effectivePlacement = placement ?? "top-right";
  $: classes = makeClassName([
    "dusk-toast-container",
    `dusk-toast-container--placement--${effectivePlacement}`,
    className,
  ]);
  $: transitionOffset = effectivePlacement.endsWith("left") ? "-100%" : "100%";
  $: {
    const currentIds = new Set();

    for (const toast of $toasts) {
      currentIds.add(toast.id);

      if (!timeMap.has(toast.id)) {
        timeMap.set(toast.id, {
          duration: toast.timeout ?? DEFAULT_TIMEOUT,
          elapsed: 0,
          isExpired: false,
          isPaused: isMouseInside || activeTouchPointers.size > 0,
          lastTick: performance.now(),
        });
      }
    }

    for (const id of timeMap.keys()) {
      if (!currentIds.has(id)) {
        timeMap.delete(id);
        decayProgresses = skipIn(decayProgresses, [id]);
      }
    }

    if (
      timeMap.size > 0 &&
      !isLoopRunning &&
      document.visibilityState === "visible"
    ) {
      isLoopRunning = true;
      animationFrameId = requestAnimationFrame(loop);
    } else if (timeMap.size === 0 && isLoopRunning) {
      isLoopRunning = false;
      cancelAnimationFrame(animationFrameId);
    }
  }
</script>

<svelte:document on:visibilitychange={handleVisibilityChange} />
<svelte:window
  on:pointercancel={handlePointerRelease}
  on:pointerup={handlePointerRelease}
/>

<ul
  bind:this={rootElement}
  {...$$restProps}
  class={classes}
  on:pointerdown={handlePointerDown}
  on:pointerenter={handlePointerEnter}
  on:pointerleave={handlePointerLeave}
>
  {#each $toasts as toast (toast.id)}
    <li
      animate:flip={{ duration: DEFAULT_ANIM_DURATION }}
      class="dusk-toast-container__item"
      in:fly|global={{ duration: DEFAULT_ANIM_DURATION, x: transitionOffset }}
      out:fly|global={{ duration: DEFAULT_ANIM_DURATION, x: transitionOffset }}
    >
      <Notification
        {...getNotificationProps(toast)}
        className="dusk-toast-container__toast"
        decayProgress={decayProgresses[toast.id] ?? 0}
        on:dismiss={() => notificationStore.remove(toast.id)}
        {tooltipId}
      />
    </li>
  {/each}
</ul>
