import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import { MiddleEllipsis } from "../..";

describe("MiddleEllipsis", () => {
  /** @type {ResizeObserverCallback} */
  let resizeObserverCallback;

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    font: "",

    // we return a fixed predictable width as 10px per char
    // @ts-expect-error
    measureText: (text) => ({ width: text.length * 10 }),
  });

  /**
   * Just a shortcut to avoid creating the spy again and again
   * in singular tests.
   * This means that tests that involve calculations should be
   * done only with the default `as` prop.
   */
  const getBCRectSpy = vi
    .spyOn(HTMLPreElement.prototype, "getBoundingClientRect")
    .mockReturnValue(DOMRect.fromRect({ width: 200 }));

  vi.spyOn(window, "ResizeObserver").mockImplementation(function (callback) {
    resizeObserverCallback = callback;
    return {
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    };
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render the full text when there is enough space", async () => {
    const { container } = render(MiddleEllipsis, { text: "Short text" });

    // Trigger initial calculation as the mock doesn't call the callback
    // @ts-expect-error
    resizeObserverCallback();

    await new Promise(requestAnimationFrame);

    expect(container.firstElementChild?.textContent).toBe("Short text");
    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should render the correct element specified by the `as` prop", () => {
    const { container } = render(MiddleEllipsis, {
      as: "p",
      text: "Short text",
    });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = { className: "foo bar", id: "some-id", text: "some text" };
    const { component } = render(MiddleEllipsis, props);
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-middle-ellipsis", "foo", "bar");
    expect(element).toHaveAttribute("id", "some-id");
  });

  describe("Developer Warnings", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    afterAll(() => {
      errorSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it("should log an error if the element's display is `inline`", () => {
      // @ts-expect-error
      vi.spyOn(window, "getComputedStyle").mockReturnValue({
        display: "inline",
      });

      render(MiddleEllipsis, { as: "span", text: "Text" });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining("display: inline")
      );
    });

    it("should log a console.warn if the element's display is `inline-block`", () => {
      // @ts-expect-error
      vi.spyOn(window, "getComputedStyle").mockReturnValue({
        display: "inline-block",
      });

      render(MiddleEllipsis, { as: "span", text: "Text" });

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("display: inline-block")
      );
    });

    it("should NOT log any warnings if the element's display is `block`", () => {
      // @ts-expect-error
      vi.spyOn(window, "getComputedStyle").mockReturnValue({
        display: "block",
      });

      render(MiddleEllipsis, { as: "span", text: "Text" });

      expect(errorSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe("Truncation and resizing", () => {
    it("should truncate text when the container is too small", async () => {
      const { component } = render(MiddleEllipsis, {
        text: "This is a very, very long string",
      });
      const element = component.getRootElement();

      // Trigger initial calculation as the mock doesn't call the callback
      // @ts-expect-error
      resizeObserverCallback();

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("This is a…ong string");
    });

    it("should update the truncation when the element is resized", async () => {
      const { component } = render(MiddleEllipsis, {
        text: "This is a very, very long string",
      });
      const element = component.getRootElement();

      // Trigger initial calculation as the mock doesn't call the callback
      // @ts-expect-error
      resizeObserverCallback();

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("This is a…ong string");

      getBCRectSpy.mockReturnValueOnce(DOMRect.fromRect({ width: 2000 }));

      // @ts-expect-error
      resizeObserverCallback();

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("This is a very, very long string");

      getBCRectSpy.mockReturnValueOnce(DOMRect.fromRect({ width: 100 }));

      // @ts-expect-error
      resizeObserverCallback();

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("This…tring");

      getBCRectSpy.mockReturnValueOnce(DOMRect.fromRect({ width: 10 }));

      // @ts-expect-error
      resizeObserverCallback();

      await new Promise(requestAnimationFrame);

      // not enough available space, only the ellipsis should be visible
      expect(element.textContent).toBe("…");
    });
  });

  describe("Reactivity", () => {
    it("should react from a text change and apply truncation when necessary", async () => {
      const { component, rerender } = render(MiddleEllipsis, {
        text: "short",
      });
      const element = component.getRootElement();

      // Trigger initial calculation as the mock doesn't call the callback
      // @ts-expect-error
      resizeObserverCallback();

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("short");

      await rerender({ text: "this is now a long text to display" });

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("this is n…to display");

      await rerender({ text: "short again" });

      await new Promise(requestAnimationFrame);

      expect(element.textContent).toBe("short again");
    });

    it("should react to other prop changes", async () => {
      const { component, rerender } = render(MiddleEllipsis, { text: "" });

      await rerender({
        as: "li",
        className: "baz",
      });

      const element = component.getRootElement();

      expect(element.nodeName.toLowerCase()).toBe("li");
      expect(element).toHaveClass("baz");
    });
  });
});
