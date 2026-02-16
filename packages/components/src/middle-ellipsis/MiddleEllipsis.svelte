<script>
  /** @typedef {import("./MiddleEllipsis").MiddleEllipsisProps} MiddleEllipsisProps */

  import { onMount } from "svelte";

  import { makeClassName } from "@duskit/string";

  import "./MiddleEllipsis.css";

  /**
   * @typedef {Object} Props
   * @property {MiddleEllipsisProps["as"]} [as]
   * @property {MiddleEllipsisProps["className"]} [className]
   * @property {MiddleEllipsisProps["text"]} text
   */

  /** @type {Props & { [key: string]: any }} */
  const { as = "pre", className = undefined, text, ...rest } = $props();

  /** @type {HTMLElement} */
  let rootElement = /** @type {HTMLElement} */ ($state());

  export const getRootElement = () => rootElement;

  /** @type {HTMLCanvasElement} */
  let canvas;

  /** @type {CanvasRenderingContext2D | null} */
  let context;

  let displayText = $state("");

  /** @type {number | null} */
  let pendingFrameId = null;

  /** @param {string} [nextText] */
  function scheduleUpdate(nextText = text) {
    if (pendingFrameId !== null) {
      return;
    }

    pendingFrameId = requestAnimationFrame(() => {
      pendingFrameId = null;
      update(nextText);
    });
  }

  /** @param {string} textValue */
  // eslint-disable-next-line max-statements
  function update(textValue) {
    if (!context) {
      return;
    }

    context.font = getComputedStyle(rootElement).font;

    const availableWidth = rootElement.getBoundingClientRect().width;
    const ellipsis = "…";

    if (context.measureText(textValue).width <= availableWidth) {
      displayText = textValue;

      return;
    }

    let start = 0;
    let end = textValue.length;
    let bestFit = textValue;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const half = Math.floor(mid / 2);
      const leftPart = textValue.slice(0, half);
      const rightPart = textValue.slice(-(mid - half));
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
    const { display: rootDisplay } = getComputedStyle(rootElement);

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

    const resizeObserver = new ResizeObserver(() => {
      scheduleUpdate();
    });

    resizeObserver.observe(rootElement);
    scheduleUpdate();

    return () => {
      if (pendingFrameId !== null) {
        cancelAnimationFrame(pendingFrameId);
      }

      resizeObserver.disconnect();
    };
  });

  const classes = $derived(makeClassName(["dusk-middle-ellipsis", className]));
  $effect(() => {
    if (rootElement && context) {
      scheduleUpdate(text);
    }
  });
</script>

<svelte:element this={as} bind:this={rootElement} {...rest} class={classes}
  >{displayText || text}</svelte:element
>
