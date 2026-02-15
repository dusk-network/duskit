import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { getAsHTMLElement } from "@duskit/test-helpers";

import { ProgressBar } from "../..";

/** @type {(container: HTMLElement) => HTMLElement} */
const getBarElement = (container) =>
  getAsHTMLElement(container, ".dusk-progress-bar__filler");

const DEFAULT_MOTION_DURATION = 400;

/** @type {(element: HTMLElement) => number} */
function getRoundedBarPercentage(element) {
  const percentage = getComputedStyle(element).width;

  // we return an impossible width if we don't
  // get a percentage to make tests fail
  return percentage.endsWith("%") ? Math.round(parseFloat(percentage)) : -1;
}

describe("ProgressBar", () => {
  vi.useFakeTimers();

  afterEach(() => {
    cleanup();
    vi.runAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render the `ProgressBar` component with no current percentage set", async () => {
    const { component } = render(ProgressBar);

    await vi.advanceTimersByTimeAsync(DEFAULT_MOTION_DURATION);

    const element = component.getRootElement();
    const barElement = getBarElement(element);

    expect(element).toMatchSnapshot();
    expect(barElement).toHaveClass("dusk-progress-bar__filler--undetermined");
    expect(getComputedStyle(barElement).width).toBe("");
  });

  it("should render the `ProgressBar` component with a set percentage", async () => {
    const { component } = render(ProgressBar, { currentPercentage: 33 });

    await vi.advanceTimersByTimeAsync(DEFAULT_MOTION_DURATION);

    const barElement = getBarElement(component.getRootElement());

    expect(getComputedStyle(barElement).width).toBe("33%");
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
    const { component, rerender } = render(ProgressBar, {
      currentPercentage: 0,
    });
    const barElement = getBarElement(component.getRootElement());

    await vi.advanceTimersByTimeAsync(DEFAULT_MOTION_DURATION);

    expect(getRoundedBarPercentage(barElement)).toBe(0);

    await rerender({ currentPercentage: 50 });
    await vi.advanceTimersByTimeAsync(DEFAULT_MOTION_DURATION);

    expect(getRoundedBarPercentage(barElement)).toBe(50);
  });

  it("should allow for a custom motion duration", async () => {
    const props = {
      currentPercentage: 25,
      motionDuration: DEFAULT_MOTION_DURATION / 2,
    };
    const { component, rerender } = render(ProgressBar, props);
    const barElement = getBarElement(component.getRootElement());

    await vi.advanceTimersByTimeAsync(props.motionDuration + 1);

    expect(getRoundedBarPercentage(barElement)).toBe(25);

    await rerender({ currentPercentage: 77 });
    await vi.advanceTimersByTimeAsync(props.motionDuration);

    expect(getRoundedBarPercentage(barElement)).toBe(77);
  });
});
