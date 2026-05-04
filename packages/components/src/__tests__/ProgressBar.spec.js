import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { getAsHTMLElement } from "@duskit/test-helpers";

import { ProgressBar } from "../..";

/** @type {(x: number) => (n: number) => number} */
const nextMultipleOf = (x) => (n) => Math.ceil(n / x) * x;
const nextMultipleOf16 = nextMultipleOf(16);

const DEFAULT_PROGRESS_BAR_MOTION_DURATION = 400;

/**
 * Vitest's fake timers simulate requestAnimationFrame at exactly 60fps (every 16ms).
 * To avoid floating point rounding issues and test flakiness due to intermediate frames,
 * we explicitly use a custom duration that is a perfect multiple of 16 for all animation tests,
 * completely decoupling them from the production default.
 */
const TEST_MOTION_DURATION = nextMultipleOf16(
  DEFAULT_PROGRESS_BAR_MOTION_DURATION
);

/** @type {(container: HTMLElement) => HTMLElement} */
const getBarElement = (container) =>
  getAsHTMLElement(container, ".dusk-progress-bar__filler");

/** @type {(element: HTMLElement) => number} */
function getRoundedBarPercentage(element) {
  const percentage = element.style.width;

  // we return an impossible width if we don't
  // get a percentage to make tests fail
  return percentage.endsWith("%") ? Math.round(parseFloat(percentage)) : -1;
}

describe("ProgressBar", () => {
  const sizes = /** @type {const} */ (["default", "small"]);

  vi.useFakeTimers();

  afterEach(() => {
    vi.runAllTimers();
    cleanup();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should render the `ProgressBar` component with no current percentage set and using "default" as its size', async () => {
    const { component } = render(ProgressBar);
    const element = component.getRootElement();
    const barElement = getBarElement(element);

    expect(element).toMatchSnapshot();
    expect(element).not.toHaveAttribute("aria-valuemax");
    expect(element).not.toHaveAttribute("aria-valuemin");
    expect(element).not.toHaveAttribute("aria-valuenow");
    expect(element).toHaveClass("dusk-progress-bar--size--default");
    expect(barElement).toHaveClass("dusk-progress-bar__filler--undetermined");
    expect(barElement.style.width).toBe("");
  });

  it('should allow to pick a direction for the progress bar using "ltr" as a default', async () => {
    const { component, rerender } = render(ProgressBar);
    const element = component.getRootElement();

    expect(element).toHaveAttribute("dir", "ltr");

    await rerender({ direction: "rtl" });

    expect(element).toHaveAttribute("dir", "rtl");

    await rerender({ direction: "ltr" });

    expect(element).toHaveAttribute("dir", "ltr");
  });

  it.each(sizes)(
    'should allow to pick the "%s" size and add the correct CSS class for it',
    (size) => {
      const { component } = render(ProgressBar, { props: { size } });
      const element = component.getRootElement();

      expect(element).toHaveClass(`dusk-progress-bar--size--${size}`);
    }
  );

  it("should render the `ProgressBar` component with a set percentage", async () => {
    const { component } = render(ProgressBar, { value: 33 });
    const element = component.getRootElement();
    const barElement = getBarElement(element);

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).toHaveAttribute("aria-valuemax", "100");
    expect(element).toHaveAttribute("aria-valuemin", "0");
    expect(element).toHaveAttribute("aria-valuenow", "33");
    expect(barElement.style.width).toBe("33%");
  });

  it("should pass additional class names and attributes to the rendered element", async () => {
    const props = {
      className: "foo bar",
      id: "some-id",
    };
    const { component, rerender } = render(ProgressBar, props);
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-progress-bar", "foo", "bar");
    expect(element).toHaveAttribute("id", props.id);

    await rerender({ className: "baz" });

    expect(element).toHaveClass("dusk-progress-bar", "baz");
  });

  it("should update the `ProgressBar` component when the current percentage property changes", async () => {
    const { component, rerender } = render(ProgressBar, { value: 0 });
    const element = component.getRootElement();
    const barElement = getBarElement(element);

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).toHaveAttribute("aria-valuemax", "100");
    expect(element).toHaveAttribute("aria-valuemin", "0");
    expect(element).toHaveAttribute("aria-valuenow", "0");

    expect(getRoundedBarPercentage(barElement)).toBe(0);

    await rerender({ value: 50 });
    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).toHaveAttribute("aria-valuemax", "100");
    expect(element).toHaveAttribute("aria-valuemin", "0");
    expect(element).toHaveAttribute("aria-valuenow", "50");
    expect(getRoundedBarPercentage(barElement)).toBe(50);
  });

  it("should clamp the percentage value between `0` and `100`", async () => {
    const { component, rerender } = render(ProgressBar, {
      value: 150,
    });
    const element = component.getRootElement();
    const barElement = getBarElement(element);

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).toHaveAttribute("aria-valuenow", "100");
    expect(getRoundedBarPercentage(barElement)).toBe(100);

    await rerender({ value: -50 });
    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).toHaveAttribute("aria-valuenow", "0");
    expect(getRoundedBarPercentage(barElement)).toBe(0);
  });

  it("should restore the indeterminate state and clear the width when current percentage is set back to `undefined`", async () => {
    const { component, rerender } = render(ProgressBar, { value: 80 });
    const element = component.getRootElement();
    const barElement = getBarElement(element);

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).toHaveAttribute("aria-valuemax", "100");
    expect(element).toHaveAttribute("aria-valuemin", "0");
    expect(element).toHaveAttribute("aria-valuenow", "80");
    expect(getRoundedBarPercentage(barElement)).toBe(80);
    expect(barElement).not.toHaveClass(
      "dusk-progress-bar__filler--undetermined"
    );

    await rerender({ value: undefined });
    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(element).not.toHaveAttribute("aria-valuemax");
    expect(element).not.toHaveAttribute("aria-valuemin");
    expect(element).not.toHaveAttribute("aria-valuenow");
    expect(barElement).toHaveClass("dusk-progress-bar__filler--undetermined");
    expect(barElement.style.width).toBe("");
  });

  it("should allow for a custom easing function and react to its changes", async () => {
    const customEasing = vi.fn((t) => t);
    const props = {
      easing: customEasing,
      value: 25,
    };
    const { component, rerender } = render(ProgressBar, props);
    const barElement = getBarElement(component.getRootElement());

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(customEasing).toHaveBeenCalled();
    expect(getRoundedBarPercentage(barElement)).toBe(25);

    customEasing.mockClear();

    const newEasing = vi.fn((t) => t);

    await rerender({ easing: newEasing, value: 50 });

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(getRoundedBarPercentage(barElement)).toBe(50);
    expect(customEasing).not.toHaveBeenCalled();
    expect(newEasing).toHaveBeenCalled();
  });

  it("should allow for a custom motion duration and react to its changes", async () => {
    const props = {
      /** @type {(t: number) => number} */
      easing: (t) => t,
      motionDuration: nextMultipleOf16(TEST_MOTION_DURATION / 2),
      value: 25,
    };
    const { component, rerender } = render(ProgressBar, props);
    const barElement = getBarElement(component.getRootElement());

    await vi.advanceTimersByTimeAsync(props.motionDuration);

    expect(getRoundedBarPercentage(barElement)).toBe(25);

    const newDuration = nextMultipleOf16(TEST_MOTION_DURATION * 2);

    await rerender({ motionDuration: newDuration, value: 77 });

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(getRoundedBarPercentage(barElement)).toBe(51);

    await vi.advanceTimersByTimeAsync(TEST_MOTION_DURATION);

    expect(getRoundedBarPercentage(barElement)).toBe(77);
  });
});
