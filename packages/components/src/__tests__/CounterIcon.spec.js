import {
  mdiBell,
  mdiCircle,
  mdiNumeric1Circle,
  mdiNumeric9PlusCircle,
} from "@mdi/js";
import { cleanup, render } from "@testing-library/svelte";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

import { CounterIcon } from "../..";

describe("CounterIcon", () => {
  /** @type {import("svelte").ComponentProps<CounterIcon>} */
  const baseProps = {
    baseIconPath: mdiBell,
    count: 0,
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(async () => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render the base icon without the counter when count is 0", () => {
    const { component, container } = render(CounterIcon, baseOptions);
    const rootElement = component.getRootElement();
    const basePath = container.querySelector(`path[d="${mdiBell}"]`);
    const counterGroup = container.querySelector(".dusk-counter-icon__counter");

    expect(rootElement).toBeInTheDocument();
    expect(rootElement).toHaveClass(
      "dusk-counter-icon",
      "dusk-counter-icon--size--default"
    );
    expect(basePath).toBeInTheDocument();
    expect(counterGroup).toBeNull();
  });

  it("should render the counter group with the exact number icon when count is between 1 and 9", () => {
    const props = { ...baseProps, count: 1 };
    const { container } = render(CounterIcon, { ...baseOptions, props });

    const counterGroup = container.querySelector(".dusk-counter-icon__counter");
    const backgroundPath = container.querySelector(
      ".dusk-counter-icon__background"
    );
    const foregroundPath = container.querySelector(
      ".dusk-counter-icon__foreground"
    );

    expect(counterGroup).toBeInTheDocument();
    expect(foregroundPath).toHaveAttribute("d", mdiCircle);
    expect(backgroundPath).toHaveAttribute("d", mdiNumeric1Circle);
  });

  it("should render the 9+ icon when count is greater than 9", () => {
    const props = { ...baseProps, count: 42 };
    const { container } = render(CounterIcon, { ...baseOptions, props });

    const backgroundPath = container.querySelector(
      ".dusk-counter-icon__background"
    );

    expect(backgroundPath).toHaveAttribute("d", mdiNumeric9PlusCircle);
  });

  it("should mount and unmount the counter group when the count toggles between 0 and a positive number", async () => {
    const { container, rerender } = render(CounterIcon, baseOptions);

    expect(container.querySelector(".dusk-counter-icon__counter")).toBeNull();

    await rerender({ count: 1 });

    expect(
      container.querySelector(".dusk-counter-icon__counter")
    ).toBeInTheDocument();

    await rerender({ count: 0 });

    expect(container.querySelector(".dusk-counter-icon__counter")).toBeNull();
  });

  it("should pass additional class names and attributes to the root element", () => {
    const props = {
      ...baseProps,
      className: "custom-test-class",
      "data-testid": "counter-icon-root",
    };
    const { component } = render(CounterIcon, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-counter-icon", "custom-test-class");
    expect(element).toHaveAttribute("data-testid", "counter-icon-root");
  });

  it("should apply the correct size class when the size prop is provided", () => {
    /** @type {import("svelte").ComponentProps<CounterIcon>} */
    const props = { ...baseProps, size: "large" };
    const { component } = render(CounterIcon, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-counter-icon--size--large");
  });

  it("should trigger an animation modifying the transform style over time and settle back to the baseline", async () => {
    vi.useFakeTimers();

    const { container, rerender } = render(CounterIcon, baseOptions);

    // Trigger the animation by mounting the counter
    await rerender({ count: 1 });

    const counterGroup = /** @type {SVGGElement} */ (
      container.querySelector(".dusk-counter-icon__counter")
    );

    // Allow the zero-duration reset (`progress.set(0)`) to flush to the DOM
    await vi.advanceTimersByTimeAsync(1);

    const initialStyle = counterGroup.getAttribute("style");

    // Advance time by a generic small amount to catch the animation mid-flight
    await vi.advanceTimersByTimeAsync(100);

    const midFlightStyle = counterGroup.getAttribute("style");

    // Assert that the engine is mutating the style
    expect(midFlightStyle).not.toBe(initialStyle);

    // Fast-forward through all remaining timers to complete the animation
    await vi.runAllTimersAsync();

    const finalStyle = counterGroup.getAttribute("style");

    // Assert that the animation moved from the mid-flight frame and settled
    expect(finalStyle).not.toBe(midFlightStyle);

    // Assert that the equilibrium state matches the exact baseline we started with
    expect(finalStyle).toBe(initialStyle);

    vi.useRealTimers();
  });
});
