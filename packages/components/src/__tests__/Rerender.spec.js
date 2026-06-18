import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { Rerender } from "../..";

import RerenderCounter from "./test-components/RerenderCounter.svelte";
import RerenderGenerateValue1 from "./test-components/RerenderGenerateValue1.svelte";
import RerenderGenerateValue2 from "./test-components/RerenderGenerateValue2.svelte";

describe("Rerender", () => {
  vi.useFakeTimers();

  let domMutations = 0;

  const incrementMutations = () => domMutations++;
  const mutationObserver = new MutationObserver(incrementMutations);

  /**
   * @param {Parameters<render>[0]} component
   * @param {Parameters<render>[1]} options
   */
  const renderAndObserveContainer = (component, options) => {
    const renderResult = render(component, options);

    mutationObserver.observe(renderResult.container, {
      childList: true,
      subtree: true,
    });

    return renderResult;
  };

  const baseOptions = {
    target: document.body,
  };

  afterEach(() => {
    mutationObserver.disconnect();
    domMutations = 0;
    cleanup();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render its content and re-render it every second by default", async () => {
    const { container } = renderAndObserveContainer(
      RerenderCounter,
      baseOptions
    );

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toMatchInlineSnapshot(`"2"`);

    expect(domMutations).toBe(2);
  });

  it("should accept a custom interval for re-renders", async () => {
    const props = { interval: 2000 };
    const { container } = renderAndObserveContainer(RerenderCounter, {
      ...baseOptions,
      props,
    });

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);

    await vi.advanceTimersByTimeAsync(props.interval / 2);

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);

    await vi.advanceTimersByTimeAsync(props.interval / 2);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);

    await vi.advanceTimersByTimeAsync(props.interval / 2);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);

    await vi.advanceTimersByTimeAsync(props.interval / 2);

    expect(container.textContent).toMatchInlineSnapshot(`"2"`);
    expect(domMutations).toBe(2);
  });

  it("should accept a function for the `interval` property and dynamically evaluate it to schedule the next update", async () => {
    const intervalMock = vi
      .fn()
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(2000)
      .mockReturnValueOnce(3000);

    const props = { interval: intervalMock };
    const { container } = renderAndObserveContainer(RerenderCounter, {
      ...baseOptions,
      props,
    });

    // Initial render
    expect(container.textContent).toMatchInlineSnapshot(`"0"`);
    expect(intervalMock).toHaveBeenCalledTimes(1);

    // Advance to 1ms before the first tick
    await vi.advanceTimersByTimeAsync(999);

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);

    // Complete the first tick (1000ms delay)
    await vi.advanceTimersByTimeAsync(1);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);
    expect(intervalMock).toHaveBeenCalledTimes(2);

    // Advance to 1ms before the second tick
    await vi.advanceTimersByTimeAsync(1999);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);

    // Complete the second tick (2000ms delay)
    await vi.advanceTimersByTimeAsync(1);

    expect(container.textContent).toMatchInlineSnapshot(`"2"`);
    expect(intervalMock).toHaveBeenCalledTimes(3);

    // Advance to 1ms before the third tick
    await vi.advanceTimersByTimeAsync(2999);

    expect(container.textContent).toMatchInlineSnapshot(`"2"`);

    // Complete the third tick (3000ms delay)
    await vi.advanceTimersByTimeAsync(1);

    expect(container.textContent).toMatchInlineSnapshot(`"3"`);
    expect(intervalMock).toHaveBeenCalledTimes(4);

    // Verify exactly 3 mutations occurred
    expect(domMutations).toBe(3);
  });

  it("should clear the previous timeout and schedule a new one when the `interval` function reference changes", async () => {
    const intervalMock1 = vi.fn().mockReturnValue(1000);
    const intervalMock2 = vi.fn().mockReturnValue(2000);

    const { container, rerender } = renderAndObserveContainer(RerenderCounter, {
      ...baseOptions,
      props: { interval: intervalMock1 },
    });

    // Initial render: schedules first tick at 1000ms
    expect(container.textContent).toMatchInlineSnapshot(`"0"`);
    expect(intervalMock1).toHaveBeenCalledTimes(1);

    // Advance 500ms: halfway through the first interval
    await vi.advanceTimersByTimeAsync(500);

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);
    expect(domMutations).toBe(0);

    // Rerender with a completely new function reference
    await rerender({ interval: intervalMock2 });

    // The reactive statement should have cleared the old timer
    // and invoked the new function to schedule a fresh tick
    expect(intervalMock2).toHaveBeenCalledTimes(1);
    expect(intervalMock1).toHaveBeenCalledTimes(1);

    // Advance 500ms. If the old 1000ms timer wasn't cleared, it would
    // fire now (500 + 500 = 1000) causing an unwanted mutation.
    await vi.advanceTimersByTimeAsync(500);

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);
    expect(domMutations).toBe(0);

    // Advance 1500ms more to complete the new 2000ms timer (500 + 1500 = 2000).
    await vi.advanceTimersByTimeAsync(1500);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);
    expect(domMutations).toBe(1);
    expect(intervalMock2).toHaveBeenCalledTimes(2);
  });

  it("should accept a custom `generateValue` function and use its result both as re-render key and as the default slot content", async () => {
    const values = [1, 2];
    const { container } = renderAndObserveContainer(RerenderGenerateValue1, {
      ...baseOptions,
      props: { values },
    });

    expect(container.textContent).toBe("1");

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("2");
    expect(domMutations).toBe(1);
  });

  it("should synchronously update the rendered value when the `generateValue` prop changes", async () => {
    const { container, rerender } = renderAndObserveContainer(Rerender, {
      ...baseOptions,
      props: { generateValue: () => "first" },
    });

    expect(container.textContent).toBe("first");

    await rerender({ generateValue: () => "second" });

    expect(container.textContent).toBe("second");
    expect(domMutations).toBe(1);
  });

  it("should not trigger a DOM mutation if the `generateValue` prop changes but the generated value remains the same", async () => {
    const { container, rerender } = renderAndObserveContainer(Rerender, {
      ...baseOptions,
      props: { generateValue: () => "unchanged" },
    });

    expect(container.textContent).toBe("unchanged");
    expect(domMutations).toBe(0);

    // Injecting a completely new function reference that yields the exact same SVZ result
    await rerender({ generateValue: () => "unchanged" });

    expect(container.textContent).toBe("unchanged");

    // The mutation observer should not have registered any DOM updates
    expect(domMutations).toBe(0);
  });

  it("should not trigger a re-render if the generated value is equal to the previous one by the `SameValueZero` comparison", async () => {
    const values = [1, 2, 0, -0, NaN, NaN, 3, 3, 4];
    const { container } = renderAndObserveContainer(RerenderGenerateValue1, {
      ...baseOptions,
      props: { values },
    });

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("2");

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("0");
    expect(domMutations).toBe(2);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("0");
    expect(domMutations).toBe(2);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("NaN");
    expect(domMutations).toBe(3);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("NaN");
    expect(domMutations).toBe(3);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("3");
    expect(domMutations).toBe(4);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("3");
    expect(domMutations).toBe(4);

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.textContent).toBe("4");
    expect(domMutations).toBe(5);
  });

  it("should expose the custom generated value and let it be used as part of custom content", async () => {
    const { container } = renderAndObserveContainer(
      RerenderGenerateValue2,
      baseOptions
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<!----><!----><span>now the value is: 0</span>"`
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<!----><!----><span>now the value is: 1</span>"`
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<!----><!----><span>now the value is: 2</span>"`
    );
    expect(domMutations).toBe(2);
  });

  it("should clear the previous timeout when the interval property changes to prevent overlapping loops", async () => {
    const props = { interval: 1000 };
    const { container, rerender } = renderAndObserveContainer(RerenderCounter, {
      ...baseOptions,
      props,
    });

    // Advance to 500ms. The first timer is halfway done.
    await vi.advanceTimersByTimeAsync(500);

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);
    expect(domMutations).toBe(0);

    // Change the interval to 2000ms. This should destroy the old 1000ms timer
    // and start a fresh 2000ms timer.
    await rerender({ interval: 2000 });

    // Advance another 500ms. If the old timer wasn't cleared, it would fire now
    // (500 + 500 = 1000) causing a mutation. We check that the DOM is untouched.
    await vi.advanceTimersByTimeAsync(500);

    expect(container.textContent).toMatchInlineSnapshot(`"0"`);
    expect(domMutations).toBe(0);

    // Advance 1500ms more to complete the new 2000ms timer (500 + 1500 = 2000).
    await vi.advanceTimersByTimeAsync(1500);

    expect(container.textContent).toMatchInlineSnapshot(`"1"`);
    expect(domMutations).toBe(1);
  });

  it("should clear the timeout when the component is unmounted", () => {
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = renderAndObserveContainer(RerenderCounter, baseOptions);

    // Clear the spy history because the reactive statement
    // calls clearTimeout(undefined) on initial mount
    clearTimeoutSpy.mockClear();
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockRestore();
  });
});
