import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { readFileSync } from "node:fs";
import { computePosition, offset as setOffset } from "@floating-ui/dom";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { tick } from "svelte";
import { IntersectionObserverMock } from "@duskit/test-helpers";

import { Tooltip } from "../..";

vi.mock("@floating-ui/dom");
vi.useFakeTimers();

/** @param {Record<string, string>} dataset */
function createEventTarget(dataset) {
  const target = document.createElement("div");

  Object.keys(dataset).forEach((key) => {
    target.dataset[key] = dataset[key];
  });

  return document.body.appendChild(target);
}

describe("Tooltip", () => {
  /** @satisfies {import("svelte").ComponentProps<Tooltip>} */
  const baseProps = {
    defaultDelayHide: 300,
    defaultDelayShow: 500,
    defaultOffset: 12,
    defaultPlace: "bottom",
    id: "tooltip-id",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  /** @type {import("@floating-ui/dom").ComputePositionReturn} */
  const defaultComputedPosition = {
    middlewareData: {},
    placement: "left",
    strategy: "fixed",
    x: 999,
    y: 888,
  };

  const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
  const ioDisconnectSpy = vi.spyOn(
    IntersectionObserver.prototype,
    "disconnect"
  );
  const ioObserveSpy = vi.spyOn(IntersectionObserver.prototype, "observe");
  const ioUnobserveSpy = vi.spyOn(IntersectionObserver.prototype, "unobserve");
  const moDisconnectSpy = vi.spyOn(MutationObserver.prototype, "disconnect");
  const moObserveSpy = vi.spyOn(MutationObserver.prototype, "observe");

  vi.mocked(computePosition).mockResolvedValue(defaultComputedPosition);

  it("should retain color fallbacks for the minimum supported CSS peer", () => {
    const styles = readFileSync("src/tooltip/Tooltip.css", "utf8");

    expect(styles).toContain("var(--feedback-surface-solid-info-bg-color)");
    expect(styles).toContain("var(--feedback-surface-solid-info-text-color)");
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.doUnmock("@floating-ui/dom");
    vi.restoreAllMocks();
  });

  it("should render the Tooltip component", () => {
    const { component, getByRole } = render(Tooltip, baseOptions);
    const tooltip = getByRole("tooltip", { hidden: true });

    expect(component.getRootElement()).toBe(tooltip);
    expect(tooltip).toMatchSnapshot();
  });

  it("should disconnect the intersection and mutation observers when unmounting", () => {
    const { unmount } = render(Tooltip, baseOptions);

    unmount();

    expect(ioDisconnectSpy).toHaveBeenCalledTimes(1);
    expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      "data-baz": "baz",
    };
    const { getByRole } = render(Tooltip, { ...baseOptions, props });
    const tooltip = getByRole("tooltip", { hidden: true });

    expect(tooltip).toHaveClass("foo bar");
    expect(tooltip).toHaveAttribute("data-baz", "baz");
    expect(tooltip).toMatchSnapshot();
  });

  it("shouldn't allow overwriting the `left` and `top` style rules", () => {
    const expectedStyle = "color: red; left: 0px; top: 0px;";
    const props = {
      ...baseProps,
      className: "foo bar",
      style: "color: red; left: 99px; top: 99px",
    };
    const { getByRole } = render(Tooltip, { ...baseOptions, props });

    expect(getByRole("tooltip", { hidden: true }).getAttribute("style")).toBe(
      expectedStyle
    );
  });

  it("should add event listeners to the document body when mounting and remove them when unmounting", () => {
    const addListenerSpy = vi.spyOn(document.body, "addEventListener");
    const removeListenerSpy = vi.spyOn(document.body, "removeEventListener");
    const { unmount } = render(Tooltip, baseOptions);
    const handlers = addListenerSpy.mock.calls.map((call) => call[1]);

    expect(addListenerSpy).toHaveBeenCalledTimes(6);
    expect(addListenerSpy).toHaveBeenNthCalledWith(
      1,
      "click",
      expect.any(Function),
      expect.objectContaining({ capture: true })
    );
    expect(addListenerSpy).toHaveBeenNthCalledWith(
      2,
      "focusin",
      expect.any(Function),
      expect.objectContaining({ capture: true })
    );
    expect(addListenerSpy).toHaveBeenNthCalledWith(
      3,
      "focusout",
      expect.any(Function),
      expect.objectContaining({ capture: true })
    );
    expect(addListenerSpy).toHaveBeenNthCalledWith(
      4,
      "keydown",
      expect.any(Function),
      expect.objectContaining({ capture: true })
    );
    expect(addListenerSpy).toHaveBeenNthCalledWith(
      5,
      "mouseenter",
      expect.any(Function),
      expect.objectContaining({ capture: true })
    );
    expect(addListenerSpy).toHaveBeenNthCalledWith(
      6,
      "mouseleave",
      expect.any(Function),
      expect.objectContaining({ capture: true })
    );

    unmount();

    expect(removeListenerSpy).toHaveBeenCalledTimes(6);

    expect(removeListenerSpy).toHaveBeenNthCalledWith(
      1,
      "click",
      handlers[0],
      expect.objectContaining({ capture: true })
    );
    expect(removeListenerSpy).toHaveBeenNthCalledWith(
      2,
      "focusin",
      handlers[1],
      expect.objectContaining({ capture: true })
    );
    expect(removeListenerSpy).toHaveBeenNthCalledWith(
      3,
      "focusout",
      handlers[2],
      expect.objectContaining({ capture: true })
    );
    expect(removeListenerSpy).toHaveBeenNthCalledWith(
      4,
      "keydown",
      handlers[3],
      expect.objectContaining({ capture: true })
    );
    expect(removeListenerSpy).toHaveBeenNthCalledWith(
      5,
      "mouseenter",
      handlers[4],
      expect.objectContaining({ capture: true })
    );
    expect(removeListenerSpy).toHaveBeenNthCalledWith(
      6,
      "mouseleave",
      handlers[5],
      expect.objectContaining({ capture: true })
    );

    addListenerSpy.mockRestore();
    removeListenerSpy.mockRestore();
  });

  describe("Tooltip show and hide events", () => {
    /** @type {HTMLElement} */
    let badTarget;

    /** @type {HTMLElement} */
    let target;

    const prevTooltipElement = document.body.appendChild(
      document.createElement("span")
    );
    const dataset = { tooltipId: "tooltip-id", tooltipText: "some text" };

    beforeEach(() => {
      badTarget = createEventTarget({ tooltipId: "fake-tooltip-id" });
      prevTooltipElement.setAttribute("aria-describedby", baseProps.id);
      target = createEventTarget(dataset);
    });

    describe("Tooltip show events", () => {
      it("should ignore mouse enter and focus-in events if the target is not a valid node", async () => {
        const textNode = document.createTextNode("just some text");

        document.body.appendChild(textNode);

        render(Tooltip, baseOptions);

        await fireEvent.focusIn(textNode);
        await fireEvent.mouseEnter(textNode);

        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(computePosition).not.toHaveBeenCalled();
        expect(ioObserveSpy).not.toHaveBeenCalled();

        textNode.remove();
      });

      it("should ignore mouse enter and focus-in events if the target element doesn't refer to the tooltip", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(document.body, { target: badTarget });
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(badTarget.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );

        await fireEvent.mouseEnter(badTarget);
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(badTarget.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );
        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(computePosition).not.toHaveBeenCalled();
      });

      it('should ignore mouse enter and focus-in events if the target element has the `data-tooltip-disabled` attribute set to `"true"`', async () => {
        const disabledTarget = createEventTarget({
          ...dataset,
          tooltipDisabled: "true",
        });
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(document.body, { target: disabledTarget });
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(disabledTarget.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );

        await fireEvent.mouseEnter(disabledTarget);
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(disabledTarget.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );
        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(computePosition).not.toHaveBeenCalled();
      });

      it("should show the tooltip on a focus-in event if the target element refers to it and start observing target's intersection", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioObserveSpy).toHaveBeenCalledTimes(1);
        expect(ioObserveSpy).toHaveBeenCalledWith(target);
        expect(computePosition).toHaveBeenCalledTimes(1);
        expect(computePosition).toHaveBeenCalledWith(
          target,
          tooltip,
          expect.objectContaining({ placement: baseProps.defaultPlace })
        );
        expect(setOffset).toHaveBeenCalledTimes(1);
        expect(setOffset).toHaveBeenCalledWith({
          mainAxis: baseProps.defaultOffset,
        });

        expect(tooltip).toHaveTextContent(dataset.tooltipText);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(target.getAttribute("aria-describedby")).toBe(baseProps.id);
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBeNull();
      });

      it("should show the tooltip on a mouse enter event if the target element refers to it and start observing target mutations", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioObserveSpy).toHaveBeenCalledTimes(1);
        expect(ioObserveSpy).toHaveBeenCalledWith(target);
        expect(computePosition).toHaveBeenCalledTimes(1);
        expect(computePosition).toHaveBeenCalledWith(
          target,
          tooltip,
          expect.objectContaining({ placement: baseProps.defaultPlace })
        );
        expect(setOffset).toHaveBeenCalledTimes(1);
        expect(setOffset).toHaveBeenCalledWith({
          mainAxis: baseProps.defaultOffset,
        });

        expect(tooltip).toHaveTextContent(dataset.tooltipText);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(target.getAttribute("aria-describedby")).toBe(baseProps.id);
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBeNull();
      });

      it("should show the tooltip if the target is a SVG element", async () => {
        const svgTarget = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );

        svgTarget.dataset.tooltipId = baseProps.id;
        svgTarget.dataset.tooltipText = "Testo SVG";

        document.body.appendChild(svgTarget);

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(svgTarget);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioObserveSpy).toHaveBeenCalledTimes(1);
        expect(computePosition).toHaveBeenCalledTimes(1);
        expect(tooltip).toHaveTextContent("Testo SVG");

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        svgTarget.remove();
      });

      it("should use attributes defined on the target element, if they are present, rather than the defaults", async () => {
        target.setAttribute("data-tooltip-delay-show", "700");
        target.setAttribute("data-tooltip-offset", "0");
        target.setAttribute("data-tooltip-place", "top");

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(computePosition).toHaveBeenCalledTimes(1);
        expect(computePosition).toHaveBeenCalledWith(
          target,
          tooltip,
          expect.objectContaining({ placement: "top" })
        );
        expect(setOffset).toHaveBeenCalledTimes(1);
        expect(setOffset).toHaveBeenCalledWith({ mainAxis: 0 });

        expect(tooltip).toHaveTextContent(dataset.tooltipText);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip).toHaveTextContent(dataset.tooltipText);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBe(
          baseProps.id
        );

        await vi.advanceTimersByTimeAsync(700 - baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(target.getAttribute("aria-describedby")).toBe(baseProps.id);
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBeNull();
      });

      it.each(["error", "info", "success", "warning"])(
        "should ignore the removed data-tooltip-type=%s attribute",
        async (type) => {
          target.dataset.tooltipType = type;

          const { getByRole } = render(Tooltip, baseOptions);
          const tooltip = getByRole("tooltip", { hidden: true });

          await fireEvent.mouseEnter(target);
          await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

          expect(tooltip.className).toBe(
            "dusk-tooltip dusk-tooltip--place--left"
          );
        }
      );

      it("should use the tooltip's component defaults if it receives invalid dataset attributes", async () => {
        const invalidTarget = createEventTarget({
          tooltipDelayShow: "invalid delay",
          tooltipId: baseProps.id,
          tooltipOffset: "invalid offset",
          tooltipPlace: "invalid placement",
          tooltipText: "some text",
        });

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(invalidTarget);

        expect(computePosition).toHaveBeenCalledWith(
          invalidTarget,
          tooltip,
          expect.objectContaining({ placement: baseProps.defaultPlace })
        );
        expect(setOffset).toHaveBeenCalledWith({
          mainAxis: baseProps.defaultOffset,
        });

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
      });

      it("should fallback to internal defaults when dataset and props are invalid or `undefined`", async () => {
        const invalidTarget = createEventTarget({
          tooltipDelayShow: "invalid delay",
          tooltipId: baseProps.id,
          tooltipOffset: "invalid offset",
          tooltipPlace: "invalid placement",
          tooltipText: "some text",
        });

        const props = {
          ...baseProps,
          defaultDelayShow: undefined,
          defaultOffset: undefined,
          defaultPlace: undefined,
        };

        const { getByRole } = render(Tooltip, { ...baseOptions, props });
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(invalidTarget);

        // Expect internal DEFAULT_PLACE ("top")
        expect(computePosition).toHaveBeenCalledWith(
          invalidTarget,
          tooltip,
          expect.objectContaining({ placement: "top" })
        );

        // Expect internal DEFAULT_OFFSET (10)
        expect(setOffset).toHaveBeenCalledWith({
          mainAxis: 10,
        });

        // Expect internal DEFAULT_DELAY_SHOW (500)
        await vi.advanceTimersByTimeAsync(500);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
      });

      it("should not wait for a delay before showing if the value is zero", async () => {
        target.setAttribute("data-tooltip-delay-show", "0");

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(target);
        await tick();

        expect(tooltip).toHaveTextContent(dataset.tooltipText);
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(target.getAttribute("aria-describedby")).toBe(baseProps.id);
        expect(prevTooltipElement.getAttribute("aria-describedby")).toBeNull();
      });

      it("should not show the tooltip after the delay if the target element doesn't exist anymore", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioObserveSpy).toHaveBeenCalledTimes(1);
        expect(computePosition).toHaveBeenCalledTimes(1);
        expect(setOffset).toHaveBeenCalledTimes(1);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");

        target.remove();

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
      });

      it("should not show the tooltip if a hide event is triggered while the position is being computed", async () => {
        const { promise, resolve } = Promise.withResolvers();

        // Force the mock to return this pending promise just for this test
        vi.mocked(computePosition).mockReturnValueOnce(promise);

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        // Trigger the show event. Execution will freeze at the `await computePosition` instruction
        await fireEvent.mouseEnter(target);

        // Trigger the hide event while the show function is still trapped awaiting the promise
        await fireEvent.mouseLeave(target);

        // Now unlock the position computation
        resolve(defaultComputedPosition);

        // Flush pending microtasks to let handleTooltipShow resume its execution
        await tick();

        // Fast-forward the timers to ensure no delayed show logic is executed
        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        // Verify that the tooltip remained strictly hidden and the observers were disconnected
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(tooltip).toHaveTextContent("");
        expect(ioUnobserveSpy).toHaveBeenCalledWith(target);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
      });

      it("should not overwrite dynamically updated text if a show timer is pending (mobile race condition)", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        // Trigger the event that starts the async delay
        await fireEvent.focusIn(target);

        // Simulate the DOM mutation (e.g., toggle state change)
        // while the tooltip timer is still running
        target.dataset.tooltipText = "Dynamically updated text";

        // Allow the MutationObserver to detect the change and update the store
        await tick();

        // Fast-forward the time to let the original setTimeout expire
        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(tooltip).toHaveTextContent("Dynamically updated text");
      });

      it("should cancel the show delay and hide the tooltip if the target receives a click (rapid tap)", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        // The mobile browser sends a synthetic focusin/mouseenter at the start of the tap
        await fireEvent.focusIn(target);

        // Assert the initial clear from the show handler
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

        // A fraction of a second later, the tap concludes with an actual click
        await fireEvent.click(target);

        // Allow Svelte to process the event
        await tick();

        // Fast-forward the time to see if the tooltip appears anyway
        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        // Assert the final state and the secondary clear from the teardown
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
      });

      it("should cancel the show delay if the click occurs on a child element of the target", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        // Add a child element to the target to simulate an inner icon or span
        const childElement = document.createElement("span");

        target.appendChild(childElement);

        // Trigger the focus on the main target
        await fireEvent.focusIn(target);

        // Assert the initial clear from the show handler
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

        // Click the inner child element
        await fireEvent.click(childElement);

        await tick();

        // Fast-forward the time
        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        // The tooltip should remain hidden because the click on the child was intercepted
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
      });

      it("should hide an already visible tooltip immediately if the target is clicked", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        // Fully show the tooltip (simulating desktop hover)
        await fireEvent.mouseEnter(target);

        // Assert the initial clear from the show handler
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        // Click the target
        await fireEvent.click(target);
        await tick();

        // The tooltip should be hidden instantly, ignoring any hide delay
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
      });

      it("should not cancel the show delay if the click occurs on an unrelated element", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });
        const unrelatedElement = document.createElement("div");

        document.body.appendChild(unrelatedElement);

        await fireEvent.focusIn(target);

        // Assert the initial clear from the show handler
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

        clearTimeoutSpy.mockClear();

        await fireEvent.click(unrelatedElement);
        await tick();

        // The teardown should not run, hence `clearTimeout` is not called again
        expect(clearTimeoutSpy).not.toHaveBeenCalled();

        // The tooltip should eventually show up
        await vi.advanceTimersByTimeAsync(Number(baseProps.defaultDelayShow));
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        unrelatedElement.remove();
      });

      it("should ignore the click event if the target is not a valid node", async () => {
        const textNode = document.createTextNode("just a text node");

        document.body.appendChild(textNode);

        render(Tooltip, baseOptions);

        await fireEvent.focusIn(target);

        // Assert the initial clear from the show handler
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

        clearTimeoutSpy.mockClear();

        await fireEvent.click(textNode);
        await tick();

        expect(clearTimeoutSpy).not.toHaveBeenCalled();

        textNode.remove();
      });
    });

    describe("Tooltip hide events", () => {
      it("should ignore mouse leave and focus-out events if the target is not a valid node", async () => {
        const textNode = document.createTextNode("just some text");
        document.body.appendChild(textNode);

        render(Tooltip, baseOptions);

        await fireEvent.focusOut(textNode);
        await fireEvent.mouseLeave(textNode);

        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(ioUnobserveSpy).not.toHaveBeenCalled();
        expect(moDisconnectSpy).not.toHaveBeenCalled();

        textNode.remove();
      });

      it("should ignore mouse leave and focus-out events if the target element doesn't refer to the tooltip", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.mouseEnter(document.body, { target });
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.focusOut(document.body, { target: badTarget });
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.mouseLeave(document.body, { target: badTarget });
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        expect(ioUnobserveSpy).not.toHaveBeenCalled();
        expect(moDisconnectSpy).not.toHaveBeenCalled();
      });

      it("should hide the tooltip on a focus-out event if the target element refers to it", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.focusOut(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledWith(target);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayHide);

        expect(tooltip).toHaveTextContent("");
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
      });

      it("should hide the tooltip on a mouse leave event if the target element refers to it", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.mouseLeave(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledWith(target);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayHide);

        expect(tooltip).toHaveTextContent("");
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
      });

      it("should use the hide delay on the target element, if present, rather than the default", async () => {
        target.setAttribute("data-tooltip-delay-hide", "700");

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.mouseLeave(target);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledWith(target);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(baseProps.defaultDelayHide);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await vi.advanceTimersByTimeAsync(700 - baseProps.defaultDelayHide);

        expect(tooltip).toHaveTextContent("");
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
      });

      it("should use the tooltip's component defaults if it receives invalid dataset attributes", async () => {
        const invalidDelayTarget = createEventTarget({
          tooltipDelayHide: "not-a-number",
          tooltipId: baseProps.id,
        });
        const props = {
          ...baseProps,
          defaultDelayHide: 100,
        };
        const { getByRole } = render(Tooltip, { ...baseOptions, props });
        const tooltip = getByRole("tooltip", { hidden: true });

        // Show the tooltip first
        await fireEvent.focusIn(invalidDelayTarget);
        await vi.advanceTimersToNextTimerAsync();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        clearTimeoutSpy.mockClear();

        await fireEvent.focusOut(invalidDelayTarget);

        await vi.advanceTimersByTimeAsync(50);

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await vi.advanceTimersByTimeAsync(50);

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(tooltip).toHaveTextContent("");
      });

      it("should fallback to internal defaults and hide instantly when dataset and props are invalid or `undefined`", async () => {
        const invalidDelayTarget = createEventTarget({
          tooltipDelayHide: "not-a-number",
          tooltipId: baseProps.id,
        });
        const props = {
          ...baseProps,
          defaultDelayHide: undefined,
        };
        const { getByRole } = render(Tooltip, { ...baseOptions, props });
        const tooltip = getByRole("tooltip", { hidden: true });

        // Show the tooltip first
        await fireEvent.focusIn(invalidDelayTarget);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        await fireEvent.focusOut(invalidDelayTarget);

        // Since DEFAULT_DELAY_HIDE is 0, it skips the setTimeout branch
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(tooltip).toHaveTextContent("");
      });

      it("should not wait for a delay before hiding if the value is zero", async () => {
        target.setAttribute("data-tooltip-delay-hide", "0");

        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.mouseLeave(target);
        await tick();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledWith(target);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
        expect(tooltip).toHaveTextContent("");
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
      });

      it("should hide the tooltip if the user presses the escape key", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.keyDown(target, { key: "a" });
        await vi.advanceTimersToNextTimerAsync();

        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(ioUnobserveSpy).not.toHaveBeenCalled();
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        await fireEvent.keyDown(target, { key: "Escape" });
        await vi.advanceTimersToNextTimerAsync();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledTimes(1);
        expect(ioUnobserveSpy).toHaveBeenCalledWith(target);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
        expect(tooltip).toHaveTextContent("");
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(target.getAttribute("aria-describedby")).toBeNull();
      });

      it("should hide the tooltip if the target element is detached from the DOM and disconnect the observers", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(target.isConnected).toBe(true);
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        target.remove();

        IntersectionObserverMock.trigger(target);

        await tick();

        expect(target.isConnected).toBe(false);
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(ioDisconnectSpy).toHaveBeenCalledTimes(1);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
      });

      it("shouldn't hide the tooltip if unrelated elements are detached from the DOM", async () => {
        const unrelatedElement = document.body.appendChild(
          document.createElement("span")
        );
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        unrelatedElement.remove();

        IntersectionObserverMock.trigger(target);

        await tick();

        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(ioDisconnectSpy).not.toHaveBeenCalled();
        expect(moDisconnectSpy).not.toHaveBeenCalled();
      });

      it("should hide the tooltip if the intersection ratio of the target element is less or equal to zero", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(target.isConnected).toBe(true);
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        IntersectionObserverMock.trigger(target, { intersectionRatio: 0 });

        await tick();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        expect(tooltip.getAttribute("aria-hidden")).toBe("true");
        expect(ioDisconnectSpy).toHaveBeenCalledTimes(1);
        expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
      });

      it("shouldn't hide the tooltip if the intersection ratio of the target is greater than zero", async () => {
        const { getByRole } = render(Tooltip, baseOptions);
        const tooltip = getByRole("tooltip", { hidden: true });

        await fireEvent.focusIn(target);
        await vi.advanceTimersToNextTimerAsync();

        clearTimeoutSpy.mockClear();

        expect(tooltip.getAttribute("aria-hidden")).toBe("false");

        IntersectionObserverMock.trigger(target, { intersectionRatio: 1 });

        await tick();

        expect(clearTimeoutSpy).not.toHaveBeenCalled();
        expect(tooltip.getAttribute("aria-hidden")).toBe("false");
        expect(ioDisconnectSpy).not.toHaveBeenCalled();
        expect(moDisconnectSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("Tooltip dynamic attribute updates (mutation observer)", () => {
    it("should update tooltip text dynamically when the dataset changes while visible", async () => {
      const dynamicTarget = createEventTarget({
        tooltipId: baseProps.id,
        tooltipText: "Initial text",
      });

      const { getByRole } = render(Tooltip, baseOptions);
      const tooltip = getByRole("tooltip", { hidden: true });

      await fireEvent.focusIn(dynamicTarget);
      await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

      expect(tooltip.getAttribute("aria-hidden")).toBe("false");
      expect(tooltip).toHaveTextContent("Initial text");
      expect(moObserveSpy).toHaveBeenCalledTimes(1);
      expect(moObserveSpy).toHaveBeenCalledWith(dynamicTarget, {
        attributeFilter: ["data-tooltip-disabled", "data-tooltip-text"],
        attributes: true,
      });

      // Mutate the dataset
      dynamicTarget.dataset.tooltipText = "Updated text";

      // Flush the MutationObserver microtask queue
      await tick();

      expect(tooltip.getAttribute("aria-hidden")).toBe("false");
      expect(tooltip).toHaveTextContent("Updated text");
      expect(moDisconnectSpy).not.toHaveBeenCalled();
    });

    it("should force hide the tooltip and disconnect the observers if `data-tooltip-disabled` becomes true while visible", async () => {
      const dynamicTarget = createEventTarget({
        tooltipId: baseProps.id,
        tooltipText: "I will be hidden",
      });

      const { getByRole } = render(Tooltip, baseOptions);
      const tooltip = getByRole("tooltip", { hidden: true });

      await fireEvent.mouseEnter(dynamicTarget);
      await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

      expect(tooltip.getAttribute("aria-hidden")).toBe("false");
      expect(moObserveSpy).toHaveBeenCalledTimes(1);
      expect(moObserveSpy).toHaveBeenCalledWith(dynamicTarget, {
        attributeFilter: ["data-tooltip-disabled", "data-tooltip-text"],
        attributes: true,
      });
      expect(dynamicTarget.getAttribute("aria-describedby")).toBe(baseProps.id);

      ioDisconnectSpy.mockClear();
      moDisconnectSpy.mockClear();

      // Mutate the dataset to disable the tooltip
      dynamicTarget.dataset.tooltipDisabled = "true";

      await tick();

      expect(tooltip.getAttribute("aria-hidden")).toBe("true");
      expect(tooltip).toHaveTextContent("");
      expect(dynamicTarget.getAttribute("aria-describedby")).toBeNull();
      expect(ioDisconnectSpy).toHaveBeenCalledTimes(1);
      expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
    });

    it("should force hide the tooltip and disconnect both observers if the target is mutated after being detached from the DOM", async () => {
      const dynamicTarget = createEventTarget({
        tooltipId: baseProps.id,
        tooltipText: "Visible text",
      });

      const { getByRole } = render(Tooltip, baseOptions);
      const tooltip = getByRole("tooltip", { hidden: true });

      await fireEvent.mouseEnter(dynamicTarget);
      await vi.advanceTimersByTimeAsync(baseProps.defaultDelayShow);

      expect(tooltip.getAttribute("aria-hidden")).toBe("false");
      expect(dynamicTarget.getAttribute("aria-describedby")).toBe(baseProps.id);

      ioDisconnectSpy.mockClear();
      moDisconnectSpy.mockClear();

      dynamicTarget.remove();
      dynamicTarget.dataset.tooltipText = "Ghost text";

      await tick();

      expect(dynamicTarget.getAttribute("aria-describedby")).toBeNull();
      expect(tooltip.getAttribute("aria-hidden")).toBe("true");
      expect(tooltip).toHaveTextContent("");
      expect(ioDisconnectSpy).toHaveBeenCalledTimes(1);
      expect(moDisconnectSpy).toHaveBeenCalledTimes(1);
    });
  });
});
