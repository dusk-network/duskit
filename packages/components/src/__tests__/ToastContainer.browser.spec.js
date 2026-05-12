import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { writable } from "svelte/store";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { apply, collect, compose, pluck } from "lamb";

import { DEFAULT_ANIM_DURATION } from "../__shared__/constants";

import { ToastContainer, createNotificationStore } from "../..";

/** @param {"hidden" | "visible"} value */
function changeVisibilityStateTo(value) {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value,
  });
  document.dispatchEvent(new Event("visibilitychange"));
}

const getMinAndMaxTimeouts = compose(
  collect([apply(Math.min), apply(Math.max)]),
  pluck("timeout")
);

describe("ToastContainer", () => {
  const DEFAULT_TIMEOUT = 5000;
  const originalVisibilityState = /** @type {PropertyDescriptor} */ (
    Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState")
  );

  /** @type {Required<import("../__shared__/notifications").NotificationItem>[]} */
  const baseData = [
    {
      date: new Date(),
      dismissable: true,
      iconPath: "M1 1h22v22H1z",
      id: "id-1",
      mode: "toast",
      text: "Custom body text 1",
      timeout: 4000,
      title: "Custom title 1",
      type: "info",
    },
    {
      date: new Date(),
      dismissable: true,
      iconPath: "M1 1h22v22H1z",
      id: "id-2",
      mode: "panel",
      read: false,
      text: "Custom body text 2",
      title: "Custom title 2",
      type: "warning",
    },
    {
      date: new Date(),
      dismissable: false,
      iconPath: "M1 1h22v22H1z",
      id: "id-3",
      mode: "toast",
      text: "Custom body text 3",
      timeout: 3000,
      title: "Custom title 3",
      type: "error",
    },
  ];

  const toastsInBaseData = baseData.filter((item) => item.mode === "toast");
  const [minTimeout, maxTimeout] = getMinAndMaxTimeouts(toastsInBaseData);
  const firstToDisappearIdxs = toastsInBaseData.reduce(
    (result, current, idx) => {
      if (current.timeout === minTimeout) {
        result.push(idx);
      }

      return result;
    },
    /** @type {number[]} */ ([])
  );

  /** @type {import("@testing-library/svelte").SvelteComponentOptions<ToastContainer>} */
  let baseOptions;

  /** @type {import("../toast-container/ToastContainer").ToastContainerProps} */
  let baseProps;

  /** @type {import("vitest").Mock} */
  let removeSpy;

  vi.useFakeTimers();

  // these needs to be declared after `vi.useFakeTimers()`
  const cafSpy = vi.spyOn(window, "cancelAnimationFrame");
  const rafSpy = vi.spyOn(window, "requestAnimationFrame");

  beforeEach(async () => {
    baseProps = { store: createNotificationStore(writable(baseData)) };
    baseOptions = {
      props: baseProps,
      target: document.body,
    };

    // @ts-expect-error we know that we have passed a store
    removeSpy = vi.spyOn(baseProps.store, "remove");
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    Object.defineProperty(
      Document.prototype,
      "visibilityState",
      originalVisibilityState
    );
  });

  it("should start the animation frame loop when toasts are present and cancel it on unmount", () => {
    const { unmount } = render(ToastContainer, baseOptions);

    expect(rafSpy).toHaveBeenCalledTimes(2);

    unmount();

    expect(cafSpy).toHaveBeenCalledTimes(1);
  });

  it("should render an empty container if the store contains no notifications and not start the animation loop", () => {
    const { component } = render(ToastContainer, {
      ...baseOptions,
      props: { store: createNotificationStore(writable([])) },
    });
    const rootElement = component.getRootElement();

    expect(rootElement).toBeInTheDocument();
    expect(rootElement.childElementCount).toBe(0);
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('should render only notifications with "toast" mode and ignore "panel" mode', () => {
    const { component } = render(ToastContainer, baseOptions);
    const rootElement = component.getRootElement();

    // The element with id-2 is filtered out by the internal derived store
    expect(rootElement.childElementCount).toBe(toastsInBaseData.length);
  });

  it("should accept a tooltip id that will be passed down to the relevant elements", async () => {
    // test pre-condition
    expect(toastsInBaseData.length).toBeGreaterThan(0);
    expect(toastsInBaseData.some(({ dismissable }) => dismissable)).toBe(true);

    const { component, rerender } = render(ToastContainer, baseOptions);
    const rootElement = component.getRootElement();
    let elementsWithTooltipInfo =
      rootElement.querySelectorAll("[data-tooltip-text");

    expect(elementsWithTooltipInfo.length).toBeGreaterThan(0);

    for (const element of elementsWithTooltipInfo) {
      expect(element).not.toHaveAttribute("data-tooltip-id");
    }

    expect.assertions(3 + elementsWithTooltipInfo.length);

    await rerender({ tooltipId: "my-tooltip" });

    elementsWithTooltipInfo =
      rootElement.querySelectorAll("[data-tooltip-text");

    expect(elementsWithTooltipInfo.length).toBeGreaterThan(0);

    for (const element of elementsWithTooltipInfo) {
      expect(element).toHaveAttribute("data-tooltip-id", "my-tooltip");
    }

    expect.assertions(4 + elementsWithTooltipInfo.length * 2);
  });

  it("should throw an error if no store is provided and no context is available", () => {
    // We mock console.error to keep the test output clean,
    // because Svelte will naturally log the component initialization failure.
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Omitting the `store` prop
    expect(() => {
      render(ToastContainer, {
        target: document.body,
      });
    }).toThrow();

    consoleSpy.mockRestore();
  });

  it("should pass additional class names and attributes to the root element", () => {
    const props = {
      ...baseProps,
      className: "custom-test-class",
      "data-testid": "toast-root",
    };
    const { component } = render(ToastContainer, { ...baseOptions, props });
    const rootElement = component.getRootElement();

    expect(rootElement).toHaveClass(
      "dusk-toast-container",
      "custom-test-class"
    );
    expect(rootElement).toHaveAttribute("data-testid", "toast-root");
  });

  it("should skip already expired notifications in the loop", async () => {
    render(ToastContainer, baseOptions);

    // 1. Intercept the remove function and make it a no-op for this test.
    // This prevents Svelte from actually deleting the toast from the store,
    // trapping it inside our timeMap.
    removeSpy.mockImplementationOnce(() => {});

    // 2. Advance time past the expiration of the shortest toast.
    // The loop runs, marks it as expired (state.isExpired = true),
    // and calls our dummy remove function.
    await vi.advanceTimersByTimeAsync(minTimeout + 16);

    // 3. Advance time for the next frame.
    // The loop runs naturally, finds the trapped toast, sees it's already expired,
    // and correctly hits the 'continue' branch without calling remove again.
    await vi.advanceTimersByTimeAsync(16);

    // We verify remove was called exactly once (during step 2).
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });

  it("should stop scheduling new frames when the loop is toggled off", async () => {
    render(ToastContainer, baseOptions);

    // Capture the internal 'loop' function
    const loopFn = rafSpy.mock.calls[rafSpy.mock.calls.length - 1][0];

    // Empty the store to trigger Svelte's reactive block.
    // The reactive block will set 'isLoopRunning = false' and cancel the frame.
    // @ts-expect-error - we know we passed a store
    baseProps.store.clear();

    // Wait for Svelte to process the store change and run its reactive block
    await vi.advanceTimersByTimeAsync(16);

    rafSpy.mockClear();

    // Force the loop to run one more time manually.
    // Because 'isLoopRunning' is now false, the loop will evaluate the final condition,
    // hit the hidden 'else' branch, and safely exit without calling requestAnimationFrame.
    loopFn(performance.now());

    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("should remove a notification when its dismiss button is clicked", async () => {
    const { container } = render(ToastContainer, baseOptions);
    const toasts = container.querySelectorAll(".dusk-toast-container__toast");

    expect(toasts).toHaveLength(toastsInBaseData.length);

    const firstDismissButton = /** @type {HTMLButtonElement} */ (
      toasts[0].querySelector(".dusk-notification__btn-dismiss")
    );

    await fireEvent.click(firstDismissButton);
    await vi.advanceTimersByTimeAsync(DEFAULT_ANIM_DURATION);

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(toastsInBaseData[0].id);
    expect(toasts[0]).not.toBeInTheDocument();
    expect(toasts[1]).toBeInTheDocument();
  });

  it("should pause the decay timer when the cursor enters the notification", async () => {
    const { component } = render(ToastContainer, baseOptions);
    const rootElement = component.getRootElement();
    const toasts = rootElement.querySelectorAll(".dusk-toast-container__toast");

    // Trigger mouse entrance to pause the timer
    await fireEvent.mouseEnter(toasts[0]);

    // Advance timers beyond the expected duration
    await vi.advanceTimersByTimeAsync(
      (toastsInBaseData[0].timeout + toastsInBaseData[1].timeout) * 10
    );

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(toastsInBaseData[1].id);
    expect(toasts[0]).toBeInTheDocument();
    expect(toasts[1]).not.toBeInTheDocument();

    // Resume the timer
    await fireEvent.mouseLeave(toasts[0]);
    await vi.advanceTimersByTimeAsync(
      toastsInBaseData[0].timeout + DEFAULT_ANIM_DURATION
    );

    expect(removeSpy).toHaveBeenCalledTimes(2);
    expect(removeSpy).toHaveBeenNthCalledWith(2, toastsInBaseData[0].id);
    expect(toasts[0]).not.toBeInTheDocument();
    expect(rootElement.childElementCount).toBe(toastsInBaseData.length - 2);
  });

  it("should remove the notifications when their timer expires", async () => {
    const { component } = render(ToastContainer, baseOptions);
    const rootElement = component.getRootElement();
    const toasts = rootElement.querySelectorAll(".dusk-toast-container__toast");

    expect(firstToDisappearIdxs.length).toBeGreaterThan(0);

    await vi.advanceTimersByTimeAsync(minTimeout + DEFAULT_ANIM_DURATION);

    expect(removeSpy).toHaveBeenCalledTimes(firstToDisappearIdxs.length);

    for (const idx of firstToDisappearIdxs) {
      expect(toasts[idx]).not.toBeInTheDocument();
    }

    await vi.advanceTimersByTimeAsync(maxTimeout + DEFAULT_ANIM_DURATION);

    expect(removeSpy).toHaveBeenCalledTimes(toastsInBaseData.length);
    expect(rootElement.childElementCount).toBe(0);
  });

  it("should apply a default timeout when a toast does not specify a timeout", async () => {
    /**
     * Create a toast without the `timeout` property
     *
     * @type {import("../__shared__/notifications").NotificationToastItem}
     */
    const toastWithoutTimeout = {
      date: new Date(),
      dismissable: false,
      id: "id-no-timeout",
      mode: "toast",
      text: "No timeout provided",
      type: "info",
    };

    const customStore = createNotificationStore(
      writable([toastWithoutTimeout])
    );
    const localRemoveSpy = vi.spyOn(customStore, "remove");

    render(ToastContainer, {
      ...baseOptions,
      props: { store: customStore },
    });

    await vi.advanceTimersByTimeAsync(DEFAULT_TIMEOUT - 100);

    expect(localRemoveSpy).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100 + DEFAULT_ANIM_DURATION);

    expect(localRemoveSpy).toHaveBeenCalledWith("id-no-timeout");
  });

  it("should suspend the decay loop when the tab is hidden and realign clocks upon return", async () => {
    const shortestToastId = toastsInBaseData.find(
      (t) => t.timeout === minTimeout
    )?.id;
    const initialTime = Math.min(minTimeout - 100, 1000);

    expect(shortestToastId).toBeTypeOf("string");

    const { component } = render(ToastContainer, baseOptions);
    const rootElement = component.getRootElement();
    const toasts = rootElement.querySelectorAll(".dusk-toast-container__toast");

    expect(firstToDisappearIdxs.length).toBeGreaterThan(0);

    await vi.advanceTimersByTimeAsync(initialTime);

    changeVisibilityStateTo("hidden");

    for (const toast of toasts) {
      expect(toast).toBeInTheDocument();
    }

    expect(cafSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(36_000_000);

    expect(removeSpy).not.toHaveBeenCalled();

    changeVisibilityStateTo("visible");

    await vi.advanceTimersByTimeAsync(
      minTimeout - initialTime + DEFAULT_ANIM_DURATION
    );

    for (const idx of firstToDisappearIdxs) {
      expect(toasts[idx]).not.toBeInTheDocument();
    }

    expect(removeSpy).toHaveBeenCalledTimes(firstToDisappearIdxs.length);
    expect(removeSpy).toHaveBeenCalledWith(shortestToastId);
  });

  it("should not restart the animation loop if the tab becomes visible but the container is empty", () => {
    render(ToastContainer, {
      ...baseOptions,
      props: { store: createNotificationStore(writable([])) },
    });

    rafSpy.mockClear();

    changeVisibilityStateTo("hidden");
    changeVisibilityStateTo("visible");

    expect(rafSpy).not.toHaveBeenCalled();
  });
});
