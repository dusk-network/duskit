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

  it("should dispatch an `outsideclick` event when a click occurs outside the element", () => {
    const handleOutclick = vi.fn();
    const action = outsideClick(insideElement);

    insideElement.addEventListener("outsideclick", handleOutclick);

    outsideElement.dispatchEvent(mouseEvent);

    expect(handleOutclick).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        detail: {
          target: outsideElement,
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
});
