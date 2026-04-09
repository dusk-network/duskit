<svelte:options immutable={true} />

<script>
  /** @typedef {import("./Tooltip").TooltipProps} TooltipProps */
  /** @typedef {Exclude<TooltipProps["defaultPlace"], undefined>} ValidPlacement */
  /** @typedef {Exclude<TooltipProps["defaultType"], undefined>} ValidType */
  /** @typedef {HTMLElement | SVGElement} ValidTarget */

  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import {
    computePosition,
    flip,
    inline,
    offset as setOffset,
    shift,
  } from "@floating-ui/dom";

  import { makeClassName } from "@duskit/string";

  import "./Tooltip.css";

  /** @type {TooltipProps["className"]} */
  export let className = undefined;

  /**
   * Default delay in ms before hiding the tooltip.
   * @type {TooltipProps["defaultDelayHide"]}
   */
  export let defaultDelayHide = undefined;

  /**
   * Default delay in ms before showing the tooltip.
   * @type {TooltipProps["defaultDelayShow"]}
   */
  export let defaultDelayShow = undefined;

  /**
   * Default offset from the target element.
   * @type {TooltipProps["defaultOffset"]}
   */
  export let defaultOffset = undefined;

  /**
   * Preferred default placement.
   * @type {TooltipProps["defaultPlace"]}
   */
  export let defaultPlace = undefined;

  /**
   * Tooltip's default type.
   * @type {TooltipProps["defaultType"]}
   */
  export let defaultType = undefined;

  /**
   * ID of the tooltip element.
   * @type {TooltipProps["id"]}
   */
  export let id;

  /** @type {HTMLDivElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const DEFAULT_DELAY_HIDE = 0;
  const DEFAULT_DELAY_SHOW = 500;
  const DEFAULT_OFFSET = 10;

  /** @type {ValidPlacement} */
  const DEFAULT_PLACE = "top";

  /** @type {ValidType} */
  const DEFAULT_TYPE = "info";

  /** @type {ValidPlacement[]} */
  const validPlacements = ["top", "right", "bottom", "left"];

  /** @type {ValidType[]}*/
  const validTypes = ["error", "info", "success", "warning"];

  /** @type {(value: string | undefined) => value is ValidPlacement} */
  const isValidPlacement = (value) =>
    value !== undefined &&
    validPlacements.includes(/** @type {ValidPlacement} */ (value));

  /** @type {(target: EventTarget | null) => target is ValidTarget} */
  const isValidTarget = (target) =>
    target !== null &&
    (target instanceof HTMLElement || target instanceof SVGElement);

  /** @type {(value: string | undefined) => value is ValidType} */
  const isValidType = (value) =>
    value !== undefined &&
    validTypes.includes(/** @type {ValidType} */ (value));

  /** @type {(fallback: number) => (value: string | undefined) => number} */
  function parseNumericAttribute(fallback) {
    return (value) => {
      const n = parseInt(value ?? "", 10);

      return Number.isNaN(n) ? fallback : n;
    };
  }

  const parseDelayHide = parseNumericAttribute(
    defaultDelayHide ?? DEFAULT_DELAY_HIDE
  );
  const parseDelayShow = parseNumericAttribute(
    defaultDelayShow ?? DEFAULT_DELAY_SHOW
  );
  const parseOffset = parseNumericAttribute(defaultOffset ?? DEFAULT_OFFSET);

  /** @type {(value: string | undefined) => ValidPlacement} */
  const parsePlacement = (value) =>
    isValidPlacement(value) ? value : (defaultPlace ?? DEFAULT_PLACE);

  /** @type {(value: string | undefined) => ValidType} */
  const parseType = (value) =>
    isValidType(value) ? value : (defaultType ?? DEFAULT_TYPE);

  /** @param {Element} targetNode */
  function teardown(targetNode) {
    clearTimeout(timeoutID);
    state.update((current) => ({ ...current, text: "", visible: false }));
    intersectionObserver.disconnect();
    mutationObserver.disconnect();
    targetNode.removeAttribute("aria-describedby");
    activeTargetNode = null;
  }

  /**
   * Tracks the current active trigger to handle async race conditions.
   * See `handleTooltipShow` function.
   *
   * @type {ValidTarget | null}
   */
  let activeTargetNode = null;

  /** @type {number} */
  let timeoutID = 0;

  const state = writable({
    delayHide: defaultDelayHide ?? DEFAULT_DELAY_HIDE,
    delayShow: defaultDelayShow ?? DEFAULT_DELAY_SHOW,
    offset: defaultOffset ?? DEFAULT_OFFSET,
    place: defaultPlace ?? DEFAULT_PLACE,
    text: "",
    type: defaultType ?? DEFAULT_TYPE,
    visible: false,
    x: 0,
    y: 0,
  });

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0 || !entries[0].target.isConnected) {
      teardown(entries[0].target);
    }
  });

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // The "if" is for the type checker as we already
      // know we have a valid target here
      // istanbul ignore next
      if (!isValidTarget(mutation.target)) {
        return;
      }

      if (!mutation.target.isConnected) {
        teardown(mutation.target);

        return;
      }

      const {
        tooltipDisabled,
        tooltipText = "",
        tooltipType,
      } = mutation.target.dataset;

      if (tooltipDisabled === "true") {
        teardown(mutation.target);

        return;
      }

      state.update((current) => ({
        ...current,
        text: tooltipText,
        type: parseType(tooltipType),
      }));
    });
  });

  /** @param {MouseEvent} event */
  function handleBodyClick(event) {
    if (
      isValidTarget(event.target) &&
      activeTargetNode?.contains(event.target)
    ) {
      teardown(activeTargetNode);
    }
  }

  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (event.key === "Escape") {
      handleTooltipHide(event);
    }
  }

  /** @param {FocusEvent | KeyboardEvent | MouseEvent} event */
  function handleTooltipHide(event) {
    if (!isValidTarget(event.target)) {
      return;
    }

    const targetNode = event.target;
    const { tooltipDelayHide, tooltipId } = targetNode.dataset;

    if (tooltipId !== id) {
      return;
    }

    clearTimeout(timeoutID);

    const delayHide = parseDelayHide(tooltipDelayHide);

    intersectionObserver.unobserve(targetNode);
    mutationObserver.disconnect();
    activeTargetNode = null;

    if (delayHide) {
      timeoutID = window.setTimeout(() => {
        targetNode.removeAttribute("aria-describedby");
        state.update((current) => ({ ...current, text: "", visible: false }));
      }, delayHide);
    } else {
      targetNode.removeAttribute("aria-describedby");
      state.update((current) => ({ ...current, text: "", visible: false }));
    }
  }

  /** @param {FocusEvent | MouseEvent} event */
  // eslint-disable-next-line max-statements
  async function handleTooltipShow(event) {
    if (!isValidTarget(event.target)) {
      return;
    }

    const targetNode = event.target;
    const {
      tooltipDelayShow,
      tooltipDisabled,
      tooltipId,
      tooltipOffset,
      tooltipPlace,
      tooltipText = "",
      tooltipType,
    } = targetNode.dataset;

    if (tooltipId !== id || tooltipDisabled === "true") {
      return;
    }

    activeTargetNode = targetNode;
    clearTimeout(timeoutID);
    state.update((current) => ({ ...current, text: tooltipText }));
    intersectionObserver.observe(targetNode);
    mutationObserver.observe(targetNode, {
      attributeFilter: [
        "data-tooltip-disabled",
        "data-tooltip-text",
        "data-tooltip-type",
      ],
      attributes: true,
    });

    const { placement, x, y } = await computePosition(targetNode, rootElement, {
      middleware: [
        setOffset({ mainAxis: parseOffset(tooltipOffset) }),
        inline(),
        flip({ fallbackAxisSideDirection: "start" }),
        shift(),
      ],
      placement: parsePlacement(tooltipPlace),
      strategy: "fixed",
    });

    // Abort if the target changed or was cleared (e.g., by a hide event) during async positioning.
    if (activeTargetNode !== targetNode) {
      return;
    }

    // We consider only "top", "right", "bottom" and "left" for now.
    const place = /** @type {import("@floating-ui/dom").Side} */ (
      placement.replace(/-.+$/, "")
    );
    const type = parseType(tooltipType);
    const delayShow = parseDelayShow(tooltipDelayShow);

    if (delayShow) {
      timeoutID = window.setTimeout(() => {
        if (targetNode && targetNode.isConnected) {
          setAriaDescription(targetNode);
          state.update((s) => ({ ...s, place, type, visible: true, x, y }));
        }
      }, delayShow);
    } else {
      setAriaDescription(targetNode);
      state.update((s) => ({ ...s, place, type, visible: true, x, y }));
    }
  }

  /** @param {ValidTarget} target */
  function setAriaDescription(target) {
    document
      .querySelector(`[aria-describedby="${id}"]`)
      ?.removeAttribute("aria-describedby");
    target.setAttribute("aria-describedby", id);
  }

  onDestroy(() => {
    intersectionObserver.disconnect();
    mutationObserver.disconnect();
  });

  $: ({ place, text, type, visible, x, y } = $state);
  $: classes = makeClassName([
    "dusk-tooltip",
    `dusk-tooltip--place--${place}`,
    `dusk-tooltip--type--${type}`,
    className,
  ]);
</script>

<svelte:body
  on:click|capture={handleBodyClick}
  on:focusin|capture={handleTooltipShow}
  on:focusout|capture={handleTooltipHide}
  on:keydown|capture={handleKeydown}
  on:mouseenter|capture={handleTooltipShow}
  on:mouseleave|capture={handleTooltipHide}
/>
<div
  {...$$restProps}
  bind:this={rootElement}
  aria-hidden={!visible}
  class={classes}
  {id}
  role="tooltip"
  style:left={`${x}px`}
  style:top={`${y}px`}
>
  {text}
</div>
