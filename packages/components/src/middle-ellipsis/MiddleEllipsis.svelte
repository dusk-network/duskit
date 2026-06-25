<svelte:options immutable={true} />

<script>
  /** @typedef {import("./MiddleEllipsis").MiddleEllipsisProps} MiddleEllipsisProps */

  import { onMount } from "svelte";

  import { makeClassName } from "@duskit/string";

  import observeResize from "../__shared__/observeResize";

  import "./MiddleEllipsis.css";

  /** @type {MiddleEllipsisProps["as"]} */
  export let as = "pre";

  /** @type {MiddleEllipsisProps["className"]} */
  export let className = undefined;

  /** @type {MiddleEllipsisProps["text"]} */
  export let text;

  /** @type {HTMLElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  let availableWidth = 0;

  /** @type {HTMLCanvasElement} */
  let canvas;

  /** @type {CSSStyleDeclaration} */
  let computedStyle;

  /** @type {CanvasRenderingContext2D | null} */
  let context;

  let displayText = text;

  /** @type {number | null} */
  let pendingFrameId = null;

  function scheduleUpdate() {
    if (pendingFrameId !== null) {
      return;
    }

    pendingFrameId = requestAnimationFrame(() => {
      pendingFrameId = null;
      update();
    });
  }

  // eslint-disable-next-line max-statements
  function update() {
    if (!context) {
      return;
    }

    context.font = computedStyle.font;

    if ("letterSpacing" in context) {
      context.letterSpacing = computedStyle.letterSpacing;
    }

    const ellipsis = "…";

    if (context.measureText(text).width <= availableWidth) {
      displayText = text;

      return;
    }

    let start = 0;
    let end = text.length;
    let bestFit = text;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const half = Math.floor(mid / 2);
      const leftPart = text.slice(0, half);
      const rightPart = text.slice(-(mid - half));
      const measured = context.measureText(
        leftPart + ellipsis + rightPart
      ).width;

      if (measured > availableWidth) {
        end = mid - 1;
      } else {
        bestFit = leftPart + ellipsis + rightPart;
        start = mid + 1;
      }
    }

    // We reached the edge case where there is
    // almost no space available, so we show
    // only the ellipsis.
    if (!bestFit.includes(ellipsis)) {
      bestFit = ellipsis;
    }

    displayText = bestFit;
  }

  onMount(() => {
    computedStyle = getComputedStyle(rootElement);

    const { display: rootDisplay } = computedStyle;

    if (rootDisplay === "inline") {
      // eslint-disable-next-line no-console
      console.error(`
        [MiddleEllipsis] Error: the root element ("${as}") has "display: inline".
        An element with a defined size is required to perform the middle ellipsis calculation.
        Please use "display: block" or "display: inline-block" with a defined width.
      `);
    } else if (
      ["inline-block", "inline-flex", "inline-grid"].includes(rootDisplay)
    ) {
      // eslint-disable-next-line no-console
      console.warn(`
        [MiddleEllipsis] Warning: the root element ("${as}") has "display: ${rootDisplay}".
        Make sure it has a defined width or switch to "display: block".
      `);
    }

    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");

    const unobserve = observeResize(rootElement, (entry) => {
      availableWidth = entry.contentRect.width;
      scheduleUpdate();
    });

    return () => {
      if (pendingFrameId !== null) {
        cancelAnimationFrame(pendingFrameId);
      }

      unobserve();
    };
  });

  $: classes = makeClassName(["dusk-middle-ellipsis", className]);
  $: {
    // eslint-disable-next-line no-unused-expressions
    text; // We need to be reactive when text changes
    rootElement && scheduleUpdate();
  }
</script>

<svelte:element
  this={as}
  bind:this={rootElement}
  {...$$restProps}
  class={classes}>{displayText}</svelte:element
>
