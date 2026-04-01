import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { outsideClick } from "../..";

describe("outsideClick action", () => {
  /** @type {HTMLDivElement} */
  let container;

  /** @type {HTMLDivElement} */
  let insideElement;

  /** @type {HTMLDivElement} */
  let outsideElement;

  const mouseEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });

  beforeEach(() => {
    container = document.createElement("div");
    insideElement = document.createElement("div");
    outsideElement = document.createElement("div");

    container.appendChild(insideElement);
    container.appendChild(outsideElement);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch an `outsideclick` event containing the original `MouseEvent` when a click occurs outside", () => {
    const handleOutclick = vi.fn();
    const action = outsideClick(insideElement);

    insideElement.addEventListener("outsideclick", handleOutclick);

    outsideElement.dispatchEvent(mouseEvent);

    expect(handleOutclick).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        detail: {
          originalEvent: mouseEvent,
        },
      })
    );

    action.destroy();
  });

  /**
   * At runtime, `PointerEvent` is a subclass of `MouseEvent`, so this test might seem
   * like it's just verifying basic JavaScript object assignment.
   * However, this acts as a critical regression guard: it ensures that future maintainers
   * do not accidentally break touch and stylus support by adding overly strict type
   * checks (e.g., `if (!(event instanceof MouseEvent))`) inside the action's logic.
   */
  it("should correctly pass a `PointerEvent` as the `originalEvent` in the payload", () => {
    const handleOutclick = vi.fn();
    const action = outsideClick(insideElement);
    const pointerEvent = new PointerEvent("click", {
      bubbles: true,
      cancelable: true,
      pointerType: "touch",
    });

    insideElement.addEventListener("outsideclick", handleOutclick);

    outsideElement.dispatchEvent(pointerEvent);

    expect(handleOutclick).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        detail: {
          originalEvent: pointerEvent,
        },
      })
    );

    action.destroy();
  });

  it("should not dispatch an `outsideclick` event when a click occurs inside the element", () => {
    const handleOutclick = vi.fn();
    const action = outsideClick(insideElement);

    insideElement.addEventListener("outsideclick", handleOutclick);

    insideElement.dispatchEvent(mouseEvent);

    expect(handleOutclick).not.toHaveBeenCalled();

    action.destroy();
  });

  it('should not dispatch an `outsideclick` event if the bound element is "falsy"', () => {
    // @ts-expect-error we are explicitely testing this edge case
    const action = outsideClick(null);

    expect(() => outsideElement.dispatchEvent(mouseEvent)).not.toThrow();

    action.destroy();
  });

  it("should not dispatch an `outsideclick` event if the event target is not a `Node`", () => {
    const event = new Event("click", {
      bubbles: true,
      cancelable: true,
    });
    const handleOutclick = vi.fn();
    const action = outsideClick(insideElement);

    insideElement.addEventListener("outsideclick", handleOutclick);

    // We dispatch on window that is an `EventTarget` but not a `Node`
    window.dispatchEvent(event);

    expect(handleOutclick).not.toHaveBeenCalled();

    action.destroy();
  });

  it("should use the capture phase for the document listener and remove it when destroyed", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const handleOutclick = vi.fn();
    const action = outsideClick(insideElement);

    expect(addEventListenerSpy).toHaveBeenCalledExactlyOnceWith(
      "click",
      expect.any(Function),
      true
    );

    insideElement.addEventListener("outsideclick", handleOutclick);

    // Trigger the cleanup mechanism explicitly
    action.destroy();

    expect(removeEventListenerSpy).toHaveBeenCalledExactlyOnceWith(
      "click",
      expect.any(Function),
      true
    );

    outsideElement.dispatchEvent(mouseEvent);

    expect(handleOutclick).not.toHaveBeenCalled();
    expect(addEventListenerSpy.mock.calls[0][1]).toBe(
      removeEventListenerSpy.mock.calls[0][1]
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should not dispatch an `outsideclick` event if the bound element is inside a Shadow DOM and is clicked", () => {
    const handleOutclick = vi.fn();

    // Recreating the failure scenario: the element bound
    // to the action lives inside the Shadow DOM.
    const host = document.createElement("div");
    const shadowRoot = host.attachShadow({ mode: "open" });

    // Insert the `insideElement` into the shadow tree and
    // append the host to the container.
    shadowRoot.appendChild(insideElement);
    container.appendChild(host);

    const action = outsideClick(insideElement);

    insideElement.addEventListener("outsideclick", handleOutclick);

    // Click exactly on the element bound to the action and explicitly
    // setting composed: true to cross the Shadow DOM boundary.
    const shadowEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    insideElement.dispatchEvent(shadowEvent);

    expect(handleOutclick).not.toHaveBeenCalled();

    action.destroy();
  });

  it("should not dispatch an `outsideclick` event if the element is detached during the event flow", () => {
    const handleOutclick = vi.fn();
    const transientChild = document.createElement("div");

    insideElement.appendChild(transientChild);
    insideElement.addEventListener("outsideclick", handleOutclick);

    // Register the aggressive listener before initializing the action.
    // In the capture phase, listeners run in registration order.
    // This ensures the node is removed before `outsideClick` evaluates it.
    const removeNodeFn = () => transientChild.remove();

    document.addEventListener("click", removeNodeFn, {
      capture: true,
      once: true,
    });

    // Initialize the action after the aggressive listener.
    const action = outsideClick(insideElement);

    transientChild.dispatchEvent(mouseEvent);

    expect(document.contains(transientChild)).toBe(false);
    expect(handleOutclick).not.toHaveBeenCalled();

    action.destroy();
  });

  it("should not dispatch an `outsideclick` event if the element is moved to another branch of the DOM during the event flow", () => {
    const handleOutclick = vi.fn();
    const movingChild = document.createElement("div");

    insideElement.appendChild(movingChild);
    insideElement.addEventListener("outsideclick", handleOutclick);

    // Register a listener that physically moves the node
    // outside the container before our action runs.
    // This simulates a drag-and-drop start or a portal teleportation.
    const moveNodeFn = () => document.body.appendChild(movingChild);

    document.addEventListener("click", moveNodeFn, {
      capture: true,
      once: true,
    });

    // Initialize the action after the aggressive listener
    // to ensure it runs later in the capture phase
    const action = outsideClick(insideElement);

    movingChild.dispatchEvent(mouseEvent);

    expect(movingChild.parentElement).toBe(document.body);
    expect(insideElement.contains(movingChild)).toBe(false);
    expect(handleOutclick).not.toHaveBeenCalled();

    movingChild.remove();
    action.destroy();
  });
});
