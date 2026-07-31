import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import DrawerWithConditionalRendering from "./test-components/DrawerWithConditionalRendering.svelte";
import DrawerWithContent from "./test-components/DrawerWithContent.svelte";

import { Drawer } from "../..";

/** @typedef {import("svelte").ComponentProps<Drawer>} DrawerProps */

describe("Drawer", () => {
  /** @type {(idx: number) => Promise<void>} */
  async function resolveAnimation(idx) {
    animationControllers[idx].resolve();

    return await animationControllers[idx].promise;
  }

  /** @type {DrawerProps["from"][]} */
  const fromOptions = ["left", "right", "top", "bottom"];

  /** @type {DrawerProps["size"][]} */
  const sizeOptions = ["small", "default", "large", "full"];

  /** @type {Record<DrawerProps["from"], Keyframe[]>} */
  const expectedKeyframes = {
    bottom: [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
    left: [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
    right: [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
    top: [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
  };

  /** @type {import("svelte").ComponentProps<Drawer>} */
  const baseProps = {
    from: "left",
    open: false,
  };

  /** @type {import("vitest").MockInstance} */
  let animateSpy;

  /** @type {Array<{ resolve: (value?: any) => void, promise: Promise<void> }>} */
  let animationControllers = [];

  const cancelMock = vi.fn();

  const getComputedStyleSpy = vi
    .spyOn(window, "getComputedStyle")
    // @ts-expect-error we don't care for the full `CSSStyleDeclaration`
    .mockReturnValue({ transform: "none" });

  beforeEach(() => {
    // This spy returns a new, controllable promise each time it's called.
    // This allows us to control the "finished" state of multiple animations
    // independently within a single test.
    animateSpy = vi
      .spyOn(HTMLElement.prototype, "animate")
      // @ts-ignore
      .mockImplementation(() => {
        const { promise, reject, resolve } = Promise.withResolvers();

        animationControllers.push({ promise, resolve });

        return {
          cancel: () => {
            cancelMock();
            // Simulate the native AbortError thrown by the Web Animations API
            reject(
              new DOMException("The user aborted a request.", "AbortError")
            );
          },
          finished: promise,
        };
      });
  });

  afterEach(async () => {
    cleanup();
    animateSpy.mockRestore();

    for (const controller of animationControllers) {
      controller.resolve();
      await controller.promise.catch(() => {});
    }

    animationControllers = [];
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render the `Drawer` component in a closed state by default", () => {
    const { container } = render(Drawer, baseProps);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the root element", () => {
    const { component } = render(Drawer, {
      ...baseProps,
      className: "foo bar",
      id: "my-drawer",
    });
    const drawer = component.getRootElement();

    expect(drawer).toHaveClass(
      "dusk-drawer",
      "dusk-drawer--from--left",
      "dusk-drawer--size--default",
      "foo",
      "bar"
    );
    expect(drawer).toHaveAttribute("id", "my-drawer");
  });

  it.each(fromOptions)(
    'should render a drawer from the "%s" position and animate it correctly',
    async (from) => {
      const expectedOptions = { duration: 400, easing: "ease-in-out" };

      const { rerender } = render(Drawer, { ...baseProps, from, open: false });

      expect(animateSpy).not.toHaveBeenCalled();

      await rerender({ open: true });

      expect(animateSpy).toHaveBeenCalledTimes(1);
      expect(animateSpy).toHaveBeenNthCalledWith(
        1,
        expectedKeyframes[from],
        expectedOptions
      );

      await resolveAnimation(0);

      // @ts-expect-error we don't care for the full `CSSStyleDeclaration`
      getComputedStyleSpy.mockReturnValueOnce(expectedKeyframes[from][1]);

      await rerender({ open: false });

      expect(animateSpy).toHaveBeenCalledTimes(2);
      expect(animateSpy).toHaveBeenNthCalledWith(
        2,
        expectedKeyframes[from].toReversed(),
        expectedOptions
      );

      await resolveAnimation(1);
    }
  );

  it.each(sizeOptions)('should render a drawer with the "%s" size', (size) => {
    const { component } = render(Drawer, { ...baseProps, size });
    const drawer = component.getRootElement();
    expect(drawer).toHaveClass(`dusk-drawer--size--${size}`);
  });

  it("should have the correct `aria-hidden` and `inert` attributes tied to the value of the `open` prop", async () => {
    const { component, rerender } = render(Drawer, {
      ...baseProps,
      open: false,
    });
    const drawer = component.getRootElement();

    expect(drawer).toHaveAttribute("aria-hidden", "true");
    expect(drawer).toHaveAttribute("inert", "true");
    expect(drawer).not.toHaveClass("dusk-drawer--open");

    await rerender({ open: true });

    expect(drawer).toHaveAttribute("aria-hidden", "false");
    expect(drawer).toHaveAttribute("inert", "false");
    expect(drawer).toHaveClass("dusk-drawer--open");
  });

  describe("Animation and Events", () => {
    const openingHandler = vi.fn();
    const openHandler = vi.fn();
    const closingHandler = vi.fn();
    const closeHandler = vi.fn();

    it("should correctly handle a full open and close animation cycle and events", async () => {
      const { container, rerender } = render(Drawer, {
        events: {
          close: closeHandler,
          closing: closingHandler,
          open: openHandler,
          opening: openingHandler,
        },
        props: {
          ...baseProps,
          open: false,
        },
      });
      const drawer = container.firstChild;

      expect(drawer).toHaveAttribute("aria-hidden", "true");
      expect(drawer).not.toHaveClass("dusk-drawer--open");
      expect(drawer).not.toHaveClass("dusk-drawer--events-enabled");

      await rerender({ open: true });

      expect(drawer).toHaveAttribute("aria-hidden", "false");
      expect(drawer).toHaveClass("dusk-drawer--open");
      expect(drawer).not.toHaveClass("dusk-drawer--events-enabled");
      expect(openingHandler).toHaveBeenCalledTimes(1);
      expect(animateSpy).toHaveBeenCalledTimes(1);
      expect(openHandler).not.toHaveBeenCalled();

      await resolveAnimation(0);
      await vi.waitFor(() => {
        expect(openHandler).toHaveBeenCalledTimes(1);
      });

      expect(drawer).toHaveAttribute("aria-hidden", "false");
      expect(drawer).toHaveClass("dusk-drawer--open");
      expect(drawer).toHaveClass("dusk-drawer--events-enabled");

      await rerender({ open: false });

      expect(drawer).toHaveAttribute("aria-hidden", "true");
      expect(drawer).not.toHaveClass("dusk-drawer--open");
      expect(drawer).not.toHaveClass("dusk-drawer--events-enabled");
      expect(closingHandler).toHaveBeenCalledTimes(1);
      expect(animateSpy).toHaveBeenCalledTimes(2);
      expect(closeHandler).not.toHaveBeenCalled();

      await resolveAnimation(1);

      await vi.waitFor(() => {
        expect(closeHandler).toHaveBeenCalledTimes(1);
      });
    });

    it("should handle rapid state changes, cancel the ongoing animation, and resume from the current computed style", async () => {
      const { rerender } = render(Drawer, {
        events: {
          close: closeHandler,
          closing: closingHandler,
          open: openHandler,
          opening: openingHandler,
        },
        props: {
          ...baseProps,
          from: "left",
          open: false,
        },
      });

      await rerender({ open: true });

      expect(openingHandler).toHaveBeenCalledTimes(1);
      expect(animateSpy).toHaveBeenCalledTimes(1);

      // Simulate the drawer being halfway through its opening animation
      const halfwayTransform = "translateX(-50%)";

      // @ts-expect-error we don't care for the full `CSSStyleDeclaration`
      getComputedStyleSpy.mockReturnValueOnce({ transform: halfwayTransform });

      // Immediately request closing BEFORE resolving the first animation.
      // This forces `currentAnimation.cancel()` and triggers the catch block in the component.
      await rerender({ open: false });

      expect(cancelMock).toHaveBeenCalledTimes(1);
      expect(closingHandler).toHaveBeenCalledTimes(1);
      expect(animateSpy).toHaveBeenCalledTimes(2);

      // Verify the new animation started exactly from the halfway point captured by the spy
      expect(animateSpy).toHaveBeenNthCalledWith(
        2,
        [{ transform: halfwayTransform }, { transform: "translateX(-100%)" }],
        { duration: 400, easing: "ease-in-out" }
      );

      // Resolve the second animation (the closing one)
      await resolveAnimation(1);

      await vi.waitFor(() => {
        expect(closeHandler).toHaveBeenCalledTimes(1);
      });

      // The open event should never fire because the opening animation was aborted
      expect(openHandler).not.toHaveBeenCalled();
    });
  });

  describe("Click Outside Behavior", () => {
    it("should emit the `outsideclick` event when the drawer is open and a click occurs outside", () => {
      const outsideclickHandler = vi.fn();

      render(Drawer, {
        events: { outsideclick: outsideclickHandler },
        props: { ...baseProps, open: true },
      });

      // Simulate a click on the document body (outside the drawer)
      document.body.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      );

      expect(outsideclickHandler).toHaveBeenCalledTimes(1);
    });

    it("should enable and disable the outside click listeners dynamically based on the `open` state to prevent memory leaks", async () => {
      const outsideclickHandler = vi.fn();
      const { rerender } = render(Drawer, {
        events: { outsideclick: outsideclickHandler },
        props: { ...baseProps, open: false },
      });

      // 1. Initial state: closed. The action should not be active.
      document.body.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      );

      expect(outsideclickHandler).not.toHaveBeenCalled();

      // 2. State change: open. The action should be mounted and listen to clicks.
      await rerender({ open: true });

      document.body.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      );

      expect(outsideclickHandler).toHaveBeenCalledTimes(1);

      // 3. State change: closed again. The action should be destroyed.
      await rerender({ open: false });

      document.body.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      );

      // The call count remains 1, confirming no new event was intercepted
      expect(outsideclickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Interactions", () => {
    it("should emit a cancelable `cancel` event containing the original event and prevent native default behavior when the `Escape` key is pressed and the drawer is open", () => {
      const cancelHandler = vi.fn();

      render(Drawer, {
        events: { cancel: cancelHandler },
        props: { ...baseProps, open: true },
      });

      const event = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "Escape",
      });

      window.dispatchEvent(event);

      expect(cancelHandler).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          cancelable: true,
          detail: {
            originalEvent: event,
          },
        })
      );
      expect(event.defaultPrevented).toBe(true);
    });

    it("should not emit the `cancel` event when the `Escape` key is pressed and the drawer is closed", () => {
      const cancelHandler = vi.fn();

      render(Drawer, {
        events: { cancel: cancelHandler },
        props: { ...baseProps, open: false },
      });

      const event = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "Escape",
      });

      window.dispatchEvent(event);

      expect(cancelHandler).not.toHaveBeenCalled();
    });

    it("should not emit the `cancel` event when a key other than `Escape` is pressed", () => {
      const cancelHandler = vi.fn();

      render(Drawer, {
        events: { cancel: cancelHandler },
        props: { ...baseProps, open: true },
      });

      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Enter",
        })
      );

      expect(cancelHandler).not.toHaveBeenCalled();
    });
  });

  describe("Slot Content", () => {
    it("should always keep slotted content in the DOM", async () => {
      const { queryByTestId, rerender } = render(DrawerWithContent, {
        from: "left",
        open: false,
      });

      // Content should exist even when closed
      expect(queryByTestId("visible-content")).toBeInTheDocument();

      await rerender({ open: true });

      // Content should still exist when open
      expect(queryByTestId("visible-content")).toBeInTheDocument();
    });

    it("should allow the consumer to conditional render content based on the `visible` slot prop", async () => {
      const { queryByTestId, rerender } = render(
        DrawerWithConditionalRendering,
        {
          from: "left",
          open: false,
        }
      );

      // Content shouldn't be in the DOM in the starting closed state
      expect(queryByTestId("visible-content")).toBeNull();

      // Opening the drawer
      await rerender({ open: true });

      // Content should be mounted immediately without waiting for the animation
      expect(queryByTestId("visible-content")).toBeInTheDocument();

      await resolveAnimation(0);
      await rerender({ open: false });

      // Content should still be in the DOM during the closing animation
      expect(queryByTestId("visible-content")).toBeInTheDocument();

      await resolveAnimation(1);

      // Content shouldn't be in the DOM anymore
      await vi.waitFor(() => {
        expect(queryByTestId("visible-content")).toBeNull();
      });
    });
  });
});
